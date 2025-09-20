import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AuthModal } from '@/components/AuthModal';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { RiskBadge } from '@/components/RiskBadge';
import { AnalysisResults } from '@/components/AnalysisResults';
import ProcessingStatus from '@/components/ProcessingStatus';
import { 
  documentAuthenticityAPI, 
  type DocumentAnalysisResponse,
  type DocumentAuthenticityRequest,
  extractTextFromDocumentFile 
} from '@/services/documentAuthenticityAPI';
import { DatabaseService } from '@/services/database';
import {
  Upload,
  FileCheck,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Download,
  Copy,
  Eye,
  History,
  User,
  LogOut,
  Loader2,
  Sparkles,
  ArrowRight,
  X,
  FileText,
  Scan,
  TrendingUp,
  AlertCircle,
  Award,
  RefreshCw
} from 'lucide-react';

interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  status: string;
  stage: string;
  estimatedTime: number;
}

const DocumentAuthenticity: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    status: 'Ready to verify',
    stage: 'idle',
    estimatedTime: 0
  });
  const [result, setResult] = useState<DocumentAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [analysisHistory, setAnalysisHistory] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<any>(null);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus();
    loadAnalysisHistory();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await DatabaseService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.log('No authenticated user - using demo mode');
      setUser(null);
    }
  };

  const loadAnalysisHistory = async () => {
    try {
      const history = await documentAuthenticityAPI.getAuthenticityHistory(10);
      setAnalysisHistory(history);
    } catch (error) {
      console.log('No analysis history available - user not authenticated');
      setAnalysisHistory([]);
    }
  };

  // Handle file drop
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);
    setError(null);
    
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      await analyzeDocument(file);
    }
  }, []);

  // Analyze document
  const analyzeDocument = useCallback(async (file: File) => {
    try {
      setError(null);
      setResult(null);
      setActiveTab('results');
      
      // Extract text from file
      setProcessing({
        isProcessing: true,
        progress: 5,
        status: 'Extracting document content...',
        stage: 'extraction',
        estimatedTime: 25
      });

      const documentContent = await extractTextFromDocumentFile(file);
      
      // Validate document
      const validation = documentAuthenticityAPI.validateDocument(documentContent);
      if (!validation.isValid) {
        setError(validation.errors.join('. '));
        setProcessing({
          isProcessing: false,
          progress: 0,
          status: 'Validation failed',
          stage: 'error',
          estimatedTime: 0
        });
        return;
      }

      // Analyze document authenticity
      const request: DocumentAuthenticityRequest = {
        documentContent,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        documentType: 'legal-document'
      };

      const analysis = await documentAuthenticityAPI.analyzeDocumentAuthenticity(
        request,
        {
          onProgress: (progress, status, estimatedTime) => {
            setProcessing(prev => ({
              ...prev,
              progress,
              status,
              estimatedTime: estimatedTime || 0
            }));
          },
          onStageChange: (stage, details) => {
            setProcessing(prev => ({
              ...prev,
              stage,
              status: details || prev.status
            }));
          }
        }
      );

      setResult(analysis);
      setProcessing({
        isProcessing: false,
        progress: 100,
        status: 'Analysis complete',
        stage: 'completed',
        estimatedTime: 0
      });

      // Refresh history
      await loadAnalysisHistory();

    } catch (error) {
      console.error('Document analysis error:', error);
      setError(error instanceof Error ? error.message : 'Failed to analyze document. Please try again.');
      setProcessing({
        isProcessing: false,
        progress: 0,
        status: 'Analysis failed',
        stage: 'error',
        estimatedTime: 0
      });
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
      'text/plain': ['.txt'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: false
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadCertificate = () => {
    if (!result) return;
    
    const certificate = documentAuthenticityAPI.generateCertificate(result);
    const blob = new Blob([certificate], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `authenticity-certificate-${result.documentId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navigation />
      
      {/* Hero Header Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Title */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text">
                Document Authenticity Checker
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 font-medium">
                AI-Powered Verification in Seconds with 99.2% Accuracy
              </p>
            </div>
            
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">99.2%</h3>
                <p className="text-blue-100 text-sm">Accuracy</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">&lt; 30</h3>
                <p className="text-blue-100 text-sm">seconds</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">₹99</h3>
                <p className="text-blue-100 text-sm">/document</p>
              </div>
            </div>

            {/* Quality Badge */}
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-blue-100">4.9 ★ Rating</span>
              </div>
              <div className="w-px h-4 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-200" />
                <span className="text-blue-100">Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white shadow-lg border-0 h-12 p-1 rounded-full">
                <TabsTrigger 
                  value="upload" 
                  className="rounded-full px-6 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
                >
                  Upload Document
                </TabsTrigger>
                <TabsTrigger 
                  value="results" 
                  className="rounded-full px-6 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
                >
                  Analysis Results
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  disabled={!user}
                  className="rounded-full px-6 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium disabled:opacity-50"
                >
                  History {!user && <span className="text-xs ml-1">(Sign in required)</span>}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-8">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">Upload Legal Document</CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Support for PDF, DOC, DOCX, TXT, and image files up to 50MB
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    {...getRootProps()}
                    className={`
                      border-3 border-dashed rounded-2xl p-16 text-center transition-all cursor-pointer
                      ${isDragActive 
                        ? 'border-blue-400 bg-blue-50 scale-105' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 hover:scale-102'
                      }
                    `}
                  >
                    <input {...getInputProps()} />
                    <div className="space-y-6">
                      <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
                        <Upload className="h-12 w-12 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 mb-2">
                          {isDragActive ? 'Drop the document here' : 'Drag & drop your document'}
                        </p>
                        <p className="text-gray-600 text-lg">
                          or click to select from your computer
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-3">
                        {['PDF', 'DOC', 'DOCX', 'TXT', 'JPG', 'PNG'].map((format) => (
                          <Badge key={format} variant="outline" className="px-3 py-1 text-sm font-medium">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-8 space-y-4">
                      <h4 className="font-bold text-xl text-gray-900 text-center">Uploaded Document</h4>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 shadow-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                              <FileText className="h-7 w-7 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-lg">{file.name}</p>
                              <p className="text-gray-600">
                                {(file.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Button
                              onClick={() => analyzeDocument(file)}
                              disabled={processing.isProcessing}
                              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-medium"
                            >
                              {processing.isProcessing ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Analyzing...
                                </>
                              ) : (
                                <>
                                  <Scan className="h-4 w-4 mr-2" />
                                  Analyze Now
                                </>
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* How It Works */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">How Document Verification Works</CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Our AI-powered process ensures comprehensive document authenticity verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Upload className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-lg mb-2">Upload Document</h4>
                      <p className="text-gray-600">Drag & drop or select your legal document securely</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Scan className="h-8 w-8 text-purple-600" />
                      </div>
                      <h4 className="font-bold text-lg mb-2">AI Analysis</h4>
                      <p className="text-gray-600">Advanced AI scans for authenticity and fraud indicators</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="font-bold text-lg mb-2">Get Results</h4>
                      <p className="text-gray-600">Receive detailed authenticity report in seconds</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Download className="h-8 w-8 text-orange-600" />
                      </div>
                      <h4 className="font-bold text-lg mb-2">Download Report</h4>
                      <p className="text-gray-600">Export verification certificate for your records</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-8">
              {processing.isProcessing || result ? (
                <>
                  <ProcessingStatus 
                    isProcessing={processing.isProcessing}
                    progress={processing.progress}
                    status={processing.status}
                    stage={processing.stage}
                    estimatedTime={processing.estimatedTime}
                    error={error}
                  />

                  {result && (
                    <div className="space-y-8">
                      {/* Success Header */}
                      <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-emerald-50">
                        <CardContent className="pt-8 pb-8">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                              <CheckCircle className="h-10 w-10 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Analysis Complete!</h2>
                            <p className="text-lg text-gray-600">
                              Document authenticity verification finished successfully
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <AnalysisResults
                        analysis={result}
                        onDownloadCertificate={downloadCertificate}
                        onCopyVerificationId={() => copyToClipboard(result.documentId)}
                        onViewDetails={() => copyToClipboard(JSON.stringify(result, null, 2))}
                      />
                    </div>
                  )}
                </>
              ) : (
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileCheck className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready for Document Analysis</h3>
                    <p className="text-gray-600 text-lg mb-6">
                      Upload a document to get started with AI-powered authenticity verification
                    </p>
                    <Button 
                      onClick={() => setActiveTab('upload')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium"
                    >
                      Upload Document
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-8">
              {user ? (
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">Analysis History</CardTitle>
                        <CardDescription className="text-gray-600 text-lg">
                          View your previous document authenticity verifications
                        </CardDescription>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={loadAnalysisHistory}
                        className="border-2"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {analysisHistory.length > 0 ? (
                      <div className="space-y-4">
                        {analysisHistory.map((item, index) => (
                          <div key={index} className="border-2 border-gray-100 rounded-2xl p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                  <FileText className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-lg text-gray-900">{item.file_name || 'Unknown Document'}</h4>
                                  <p className="text-gray-600">
                                    Analyzed: {new Date(item.created_at).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <RiskBadge level={item.risk_level as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'} size="lg" />
                                <Button variant="ghost" size="sm" className="hover:bg-blue-100">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center space-x-6 text-sm">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-700">Score:</span>
                                <Badge variant={item.authenticity_score >= 70 ? 'default' : 'destructive'}>
                                  {item.authenticity_score}%
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-700">Status:</span>
                                <Badge variant={item.is_authentic ? 'default' : 'destructive'}>
                                  {item.is_authentic ? 'Authentic' : 'Questionable'}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-700">ID:</span>
                                <span className="text-gray-600 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                  {item.document_id}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <History className="h-10 w-10 opacity-50" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No analysis history found</h3>
                        <p className="text-gray-600 mb-6">Upload and analyze documents to see your history here</p>
                        <Button 
                          onClick={() => setActiveTab('upload')}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Analyze Your First Document
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="text-center py-16">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <User className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view history</h3>
                    <p className="text-gray-600 text-lg mb-8">
                      Create an account to save and track your document analysis history
                    </p>
                    <Button 
                      onClick={() => setIsAuthModalOpen(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium"
                    >
                      Sign In / Sign Up
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={checkAuthStatus}
      />
    </div>
  );
};

export default DocumentAuthenticity;