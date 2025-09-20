import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AuthModal } from '@/components/AuthModal';
import { legalSimplifierAPI, type SimplificationResponse } from '@/services/legalSimplifierAPI';
import { DatabaseService, type DocumentProcessing } from '@/services/database';
import { DocumentParser, type ParsedDocument } from '@/services/documentParser';
import { 
  Upload, 
  FileText, 
  Download, 
  Copy, 
  Clock, 
  Target, 
  IndianRupee, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  X,
  History,
  User,
  LogOut
} from 'lucide-react';

interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  status: string;
  estimatedTime: number;
}

const LegalSimplifier: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    status: 'Ready to process',
    estimatedTime: 0
  });
  const [result, setResult] = useState<SimplificationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [documentHistory, setDocumentHistory] = useState<DocumentProcessing[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
    loadDocumentHistory();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await DatabaseService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    }
  };

  const loadDocumentHistory = async () => {
    try {
      const history = await getDocumentHistory(5);
      setDocumentHistory(history);
    } catch (error) {
      console.error('Failed to load document history:', error);
    }
  };

  // Process text using actual API with database integration
  const processText = useCallback(async (text: string) => {
    try {
      setError(null);
      setResult(null);
      
      // Validate input
      const validation = legalSimplifierAPI.validateDocument(text);
      if (!validation.isValid) {
        setError(validation.errors.join('. '));
        return;
      }

      setProcessing({
        isProcessing: true,
        progress: 0,
        status: 'Initializing...',
        estimatedTime: 90
      });

      const currentFile = uploadedFiles[0];
      const response = await legalSimplifierAPI.simplifyLegalText(
        {
          text,
          documentType: 'legal-document',
          complexity: 'high'
        },
        {
          onProgress: (progress, status, estimatedTime) => {
            setProcessing(prev => ({
              ...prev,
              progress,
              status,
              estimatedTime
            }));
          }
        },
        currentFile?.name,
        currentFile?.size
      );

      // Convert API response to expected format
      const processedResult: SimplificationResponse & { 
        originalText: string; 
        wordCount: number; 
        complexityReduction: number 
      } = {
        ...response,
        originalText: text,
        wordCount: text.split(' ').filter(word => word.length > 0).length,
        complexityReduction: Math.max(0, response.originalComplexity - response.simplifiedComplexity)
      };

      setResult(processedResult);
      setActiveTab('results');
      setProcessing({
        isProcessing: false,
        progress: 100,
        status: 'Complete',
        estimatedTime: 0
      });

      // Reload document history to show the new document
      await loadDocumentHistory();

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setProcessing({
        isProcessing: false,
        progress: 0,
        status: 'Error',
        estimatedTime: 0
      });
    }
  }, [uploadedFiles]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const validatedFiles: File[] = [];
    
    // Validate each file
    for (const file of acceptedFiles) {
      const validation = DocumentParser.validateFile(file);
      if (validation.isValid) {
        validatedFiles.push(file);
      } else {
        setError(validation.error || 'Invalid file');
        return;
      }
    }

    setUploadedFiles(prev => [...prev, ...validatedFiles]);
    
    // Extract text from first uploaded file
    if (validatedFiles.length > 0) {
      try {
        setProcessing({
          isProcessing: true,
          progress: 20,
          status: 'Extracting text from document...',
          estimatedTime: 15
        });

        const parsedDocument: ParsedDocument = await DocumentParser.parseDocument(validatedFiles[0]);
        
        setInputText(parsedDocument.text);
        setActiveTab('text');
        
        // Show document stats
        const stats = parsedDocument.pageCount 
          ? `Extracted ${parsedDocument.wordCount} words from ${parsedDocument.pageCount} pages`
          : `Extracted ${parsedDocument.wordCount} words`;
          
        setProcessing({
          isProcessing: false,
          progress: 100,
          status: `${stats} - Ready to simplify!`,
          estimatedTime: 0
        });
        
        // Clear any previous errors
        setError(null);
        
      } catch (error) {
        console.error('Document parsing error:', error);
        setError(error instanceof Error ? error.message : 'Failed to extract text from document. Please try a different file or copy the text manually.');
        setProcessing({
          isProcessing: false,
          progress: 0,
          status: 'Extraction failed',
          estimatedTime: 0
        });
      }
    }
  }, []);

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxSize: 50 * 1024 * 1024 // 50MB to handle large legal documents
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Legal Simplifier</h1>
                <p className="text-sm text-gray-600">Convert Complex Legalese to Plain English</p>
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={async () => {
                      await DatabaseService.signOut();
                      setUser(null);
                      setDocumentHistory([]);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Sign In to Save Results
                </Button>
              )}
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-500" />
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                97.8% Accuracy
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                &lt; 2 minutes
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <IndianRupee className="h-5 w-5 text-purple-500" />
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                ₹149/document
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="upload">Upload Document</TabsTrigger>
              <TabsTrigger value="text">Enter Text</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="history" disabled={!user}>
                History {!user && <span className="text-xs ml-1">(Sign in required)</span>}
              </TabsTrigger>
            </TabsList>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Legal Document</CardTitle>
                  <CardDescription>
                    Support for PDF, DOC, DOCX files up to 10MB
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    {...getRootProps()}
                    className={`
                      border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer
                      ${isDragActive 
                        ? 'border-blue-400 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                      }
                    `}
                  >
                    <input {...getInputProps()} />
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    {isDragActive ? (
                      <p className="text-blue-600 text-lg">Drop your files here...</p>
                    ) : (
                      <div>
                        <p className="text-gray-600 text-lg mb-2">
                          Drag & drop legal documents here, or click to select
                        </p>
                        <p className="text-sm text-gray-400">
                          PDF, DOC, DOCX files up to 10MB
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files:</h3>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-blue-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-500">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setActiveTab('text');
                                }}
                              >
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Text Input Tab */}
            <TabsContent value="text" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Input Area */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Legal Text Input</span>
                    </CardTitle>
                    <CardDescription>
                      Paste your legal document or contract text below
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Enter or paste your legal document text here..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="min-h-[300px] text-sm"
                    />
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-xs text-gray-500">
                        {inputText.split(' ').filter(word => word.length > 0).length} words
                      </p>
                      <Button 
                        onClick={() => processText(inputText)}
                        disabled={!inputText.trim() || processing.isProcessing}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        {processing.isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Simplify Text
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Processing Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Processing Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {error && (
                        <Alert className="border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <AlertTitle>Processing Error</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">{processing.status}</p>
                          <p className="text-xs text-gray-500">
                            {processing.isProcessing ? `~${Math.ceil(processing.estimatedTime)}s remaining` : ''}
                          </p>
                        </div>
                        <Progress value={processing.progress} className="w-full" />
                      </div>

                      {processing.isProcessing && (
                        <Alert>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <AlertTitle>Processing in progress</AlertTitle>
                          <AlertDescription>
                            Our AI is analyzing your document and converting complex legal language into plain English.
                          </AlertDescription>
                        </Alert>
                      )}

                      {result && !processing.isProcessing && (
                        <Alert className="border-green-200 bg-green-50">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <AlertTitle>Processing Complete!</AlertTitle>
                          <AlertDescription>
                            Your document has been successfully simplified. Check the results tab.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-6">
              {result ? (
                <>
                  {/* Statistics */}
                  <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <Target className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="text-2xl font-bold text-green-600">{result.accuracy}%</p>
                            <p className="text-xs text-gray-500">Accuracy</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-2xl font-bold text-blue-600">{result.processingTime}s</p>
                            <p className="text-xs text-gray-500">Processing Time</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-purple-500" />
                          <div>
                            <p className="text-2xl font-bold text-purple-600">{(result as any).wordCount}</p>
                            <p className="text-xs text-gray-500">Word Count</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <ArrowRight className="h-5 w-5 text-orange-500" />
                          <div>
                            <p className="text-2xl font-bold text-orange-600">{Math.round((result as any).complexityReduction)}%</p>
                            <p className="text-xs text-gray-500">Complexity Reduction</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Key Terms Simplified */}
                  {result.keyTermsSimplified && result.keyTermsSimplified.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Key Legal Terms Simplified</CardTitle>
                        <CardDescription>Common legal jargon converted to plain English</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-3 md:grid-cols-2">
                          {result.keyTermsSimplified.map((term, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <p className="text-sm text-red-600 font-medium">"{term.original}"</p>
                                <p className="text-sm text-green-600">→ "{term.simplified}"</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Comparison */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-red-600">Original Legal Text</CardTitle>
                        <CardDescription>Complex legal language</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <Textarea
                            value={(result as any).originalText}
                            readOnly
                            className="min-h-[300px] text-sm bg-red-50 border-red-200"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard((result as any).originalText)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-600">Simplified Version</CardTitle>
                        <CardDescription>Plain English translation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <Textarea
                            value={result.simplifiedText}
                            readOnly
                            className="min-h-[300px] text-sm bg-green-50 border-green-200"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(result.simplifiedText)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Actions */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Export Results</h3>
                          <p className="text-sm text-gray-600">Download or share your simplified document</p>
                        </div>
                        <div className="flex space-x-3">
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                          <Button variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download DOCX
                          </Button>
                          <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Process Another Document
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Yet</h3>
                    <p className="text-gray-600 mb-4">
                      Upload a document or enter text to see simplified results here.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('upload')}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              {user ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <History className="h-5 w-5" />
                        <span>Recent Documents</span>
                      </CardTitle>
                      <CardDescription>
                        Your processed documents and results
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {documentHistory.length > 0 ? (
                        <div className="space-y-4">
                          {documentHistory.map((doc, index) => (
                            <div key={doc.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <FileText className="h-4 w-4 text-blue-500" />
                                    <p className="font-medium text-gray-900">
                                      {doc.file_name || `Document ${index + 1}`}
                                    </p>
                                    <Badge 
                                      variant={doc.status === 'completed' ? 'default' : 'secondary'}
                                      className="text-xs"
                                    >
                                      {doc.status}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                                    <div>
                                      <p className="font-medium">{doc.accuracy_score}%</p>
                                      <p className="text-xs">Accuracy</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">{doc.processing_time}s</p>
                                      <p className="text-xs">Time</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">{doc.word_count}</p>
                                      <p className="text-xs">Words</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">{new Date(doc.created_at).toLocaleDateString()}</p>
                                      <p className="text-xs">Date</p>
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-2 truncate">
                                    {doc.original_text.substring(0, 100)}...
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setInputText(doc.original_text);
                                      setResult({
                                        simplifiedText: doc.simplified_text,
                                        accuracy: doc.accuracy_score,
                                        processingTime: doc.processing_time,
                                        originalComplexity: doc.complexity_reduction + 50, // estimated
                                        simplifiedComplexity: 50 - doc.complexity_reduction, // estimated
                                        keyTermsSimplified: doc.key_terms_simplified || []
                                      });
                                      setActiveTab('results');
                                    }}
                                  >
                                    <ArrowRight className="h-4 w-4 mr-1" />
                                    View
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Documents Yet</h3>
                          <p className="text-gray-600 mb-4">
                            Process your first legal document to see it here.
                          </p>
                          <Button 
                            variant="outline" 
                            onClick={() => setActiveTab('upload')}
                          >
                            Upload Document
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign In Required</h3>
                    <p className="text-gray-600 mb-4">
                      Sign in to access your document history and save results.
                    </p>
                    <Button 
                      onClick={() => setIsAuthModalOpen(true)}
                    >
                      Sign In
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          setUser(user);
          setIsAuthModalOpen(false);
          loadDocumentHistory();
        }}
      />
    </div>
  );
};

export default LegalSimplifier;