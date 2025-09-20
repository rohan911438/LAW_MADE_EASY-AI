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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="h-8 w-8" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Document Authenticity Checker
              </h1>
            </div>
            <p className="text-xl mb-6 text-blue-100">
              AI-Powered Verification in Seconds with 99.2% Accuracy
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <Target className="h-5 w-5 text-green-300" />
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-0">
                  99.2% Accuracy
                </Badge>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="h-5 w-5 text-blue-300" />
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-0">
                  &lt; 30 seconds
                </Badge>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Award className="h-5 w-5 text-purple-300" />
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-0">
                  ₹99/document
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload Document</TabsTrigger>
              <TabsTrigger value="results">Analysis Results</TabsTrigger>
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
                    Support for PDF, DOC, DOCX, TXT, and image files up to 50MB
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
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Upload className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          {isDragActive ? 'Drop the document here' : 'Drag & drop your document'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          or click to select from your computer
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                        <Badge variant="outline">PDF</Badge>
                        <Badge variant="outline">DOC</Badge>
                        <Badge variant="outline">DOCX</Badge>
                        <Badge variant="outline">TXT</Badge>
                        <Badge variant="outline">JPG</Badge>
                        <Badge variant="outline">PNG</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-6 space-y-4">
                      <h4 className="font-medium text-gray-900">Uploaded Document</h4>
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">{file.name}</p>
                              <p className="text-sm text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* How It Works */}
              <Card>
                <CardHeader>
                  <CardTitle>How Document Verification Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Upload className="h-6 w-6 text-blue-600" />
                      </div>
                      <h4 className="font-medium mb-2">Upload Document</h4>
                      <p className="text-sm text-gray-600">Drag & drop or select your legal document</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Scan className="h-6 w-6 text-purple-600" />
                      </div>
                      <h4 className="font-medium mb-2">AI Analysis</h4>
                      <p className="text-sm text-gray-600">Advanced AI scans for authenticity and fraud</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-medium mb-2">Get Results</h4>
                      <p className="text-sm text-gray-600">Receive detailed authenticity report</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Download className="h-6 w-6 text-orange-600" />
                      </div>
                      <h4 className="font-medium mb-2">Download Report</h4>
                      <p className="text-sm text-gray-600">Export verification certificate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-6">
              <ProcessingStatus 
                isProcessing={processing.isProcessing}
                progress={processing.progress}
                status={processing.status}
                stage={processing.stage}
                estimatedTime={processing.estimatedTime}
                error={error}
              />

              {result && (
                <AnalysisResults
                  analysis={result}
                  onDownloadCertificate={downloadCertificate}
                  onCopyVerificationId={() => copyToClipboard(result.documentId)}
                  onViewDetails={() => copyToClipboard(JSON.stringify(result, null, 2))}
                />
              )}
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              {user ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Analysis History</CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={loadAnalysisHistory}
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
                          <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{item.file_name || 'Unknown Document'}</h4>
                                <p className="text-sm text-gray-600">
                                  Analyzed: {new Date(item.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RiskBadge level={item.risk_level as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'} />
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                              <span>Score: {item.authenticity_score}%</span>
                              <span>Status: {item.is_authentic ? 'Authentic' : 'Questionable'}</span>
                              <span>ID: {item.document_id}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No analysis history found</p>
                        <p className="text-sm">Upload and analyze documents to see your history here</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Sign in to view history</h3>
                    <p className="text-gray-600 mb-4">
                      Create an account to save and track your document analysis history
                    </p>
                    <Button onClick={() => setIsAuthModalOpen(true)}>
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