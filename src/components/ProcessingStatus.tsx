import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Loader2, 
  Upload, 
  Scan, 
  Brain, 
  CheckCircle, 
  AlertTriangle,
  Clock
} from 'lucide-react';

interface ProcessingStatusProps {
  isProcessing: boolean;
  progress: number;
  status: string;
  stage: string;
  estimatedTime?: number;
  error?: string | null;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  isProcessing,
  progress,
  status,
  stage,
  estimatedTime,
  error
}) => {
  const getStageIcon = (currentStage: string) => {
    switch (currentStage) {
      case 'extraction':
        return <Upload className="h-5 w-5 text-blue-600" />;
      case 'analysis':
        return <Scan className="h-5 w-5 text-purple-600" />;
      case 'processing':
        return <Brain className="h-5 w-5 text-green-600" />;
      case 'finalization':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
    }
  };

  const getStageColor = (currentStage: string) => {
    switch (currentStage) {
      case 'extraction':
        return 'bg-blue-100 text-blue-800';
      case 'analysis':
        return 'bg-purple-100 text-purple-800';
      case 'processing':
        return 'bg-green-100 text-green-800';
      case 'finalization':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = () => {
    if (error) return 'bg-red-500';
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-purple-500';
    return 'bg-blue-500';
  };

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <div className="flex-1">
              <h4 className="font-medium text-red-800">Analysis Failed</h4>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isProcessing && progress === 100) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div className="flex-1">
              <h4 className="font-medium text-green-800">Analysis Complete!</h4>
              <p className="text-sm text-green-600">Document authenticity verification finished successfully</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isProcessing) {
    return null;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStageIcon(stage)}
              <div>
                <h4 className="font-medium">{status}</h4>
                <Badge className={getStageColor(stage)} variant="secondary">
                  {stage.charAt(0).toUpperCase() + stage.slice(1)}
                </Badge>
              </div>
            </div>
            {estimatedTime && estimatedTime > 0 && (
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>~{estimatedTime}s remaining</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full transition-all duration-300 ${getProgressColor()}`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              ></div>
            </div>
          </div>

          {/* Stage Indicators */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${
                progress >= 10 ? 'bg-blue-500' : 'bg-gray-300'
              }`}></div>
              <span className="mt-1">Extract</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${
                progress >= 40 ? 'bg-purple-500' : 'bg-gray-300'
              }`}></div>
              <span className="mt-1">Analyze</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${
                progress >= 70 ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <span className="mt-1">Process</span>
            </div>
            <div className="flex-1 h-px bg-gray-300 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${
                progress >= 95 ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <span className="mt-1">Complete</span>
            </div>
          </div>

          {/* Detailed Status */}
          <div className="text-center text-sm text-gray-600">
            {stage === 'extraction' && 'Extracting text content from document...'}
            {stage === 'analysis' && 'AI analyzing document structure and authenticity...'}
            {stage === 'processing' && 'Processing fraud detection and compliance checks...'}
            {stage === 'finalization' && 'Generating final analysis report...'}
            {stage === 'completed' && 'Analysis complete! Results are ready.'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingStatus;