import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { RiskBadge } from '@/components/RiskBadge';
import { 
  Shield, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  FileCheck,
  AlertCircle,
  Download,
  Copy,
  Eye
} from 'lucide-react';
import type { DocumentAnalysisResponse } from '@/services/documentAuthenticityAPI';

interface AnalysisResultsProps {
  analysis: DocumentAnalysisResponse;
  onDownloadCertificate?: () => void;
  onCopyVerificationId?: () => void;
  onViewDetails?: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  analysis,
  onDownloadCertificate,
  onCopyVerificationId,
  onViewDetails
}) => {
  const getAuthenticityIcon = () => {
    return analysis.authenticity.isAuthentic ? (
      <CheckCircle className="h-8 w-8 text-green-600" />
    ) : (
      <XCircle className="h-8 w-8 text-red-600" />
    );
  };

  const getAuthenticityColor = () => {
    return analysis.authenticity.isAuthentic ? 'text-green-600' : 'text-red-600';
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'COMPLIANT':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PARTIAL_COMPLIANCE':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'NON_COMPLIANT':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFindingIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <FileCheck className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Authenticity Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Authenticity Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${analysis.authenticity.isAuthentic ? 'bg-green-100' : 'bg-red-100'}`}>
                {getAuthenticityIcon()}
              </div>
              <h4 className="font-medium">Status</h4>
              <p className={`text-sm font-medium ${getAuthenticityColor()}`}>
                {analysis.authenticity.isAuthentic ? 'AUTHENTIC' : 'QUESTIONABLE'}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-medium">Confidence</h4>
              <p className="text-sm font-medium text-blue-600">
                {analysis.authenticity.confidenceScore}%
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className={`h-8 w-8 ${
                  analysis.authenticity.riskLevel === 'LOW' ? 'text-green-600' :
                  analysis.authenticity.riskLevel === 'MEDIUM' ? 'text-yellow-600' :
                  analysis.authenticity.riskLevel === 'HIGH' ? 'text-orange-600' :
                  'text-red-600'
                }`} />
              </div>
              <h4 className="font-medium">Risk Level</h4>
              <RiskBadge level={analysis.authenticity.riskLevel} />
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-medium">Score</h4>
              <p className="text-sm font-medium text-purple-600">
                {analysis.authenticity.authenticityScore}/100
              </p>
            </div>
          </div>

          {/* Score Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Authenticity Score</span>
              <span className="text-sm text-gray-600">{analysis.authenticity.authenticityScore}%</span>
            </div>
            <Progress value={analysis.authenticity.authenticityScore} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Key Findings */}
      {analysis.keyFindings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Key Findings</CardTitle>
            <CardDescription>
              Important observations from the document analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.keyFindings.map((finding, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                  {getFindingIcon(finding.type)}
                  <div className="flex-1">
                    <h4 className="font-medium">{finding.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{finding.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      <strong>Impact:</strong> {finding.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fraud Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Fraud Detection</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Overall Fraud Risk</span>
              <div className="flex items-center space-x-2">
                <Progress 
                  value={analysis.fraudDetection.overallFraudRisk} 
                  className="w-24 h-2" 
                />
                <Badge className={`${
                  analysis.fraudDetection.overallFraudRisk < 30 ? 'bg-green-100 text-green-800' :
                  analysis.fraudDetection.overallFraudRisk < 70 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {analysis.fraudDetection.overallFraudRisk}%
                </Badge>
              </div>
            </div>

            {analysis.fraudDetection.fraudIndicators.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-medium">
                  Fraud Indicators ({analysis.fraudDetection.fraudIndicators.length})
                </h4>
                {analysis.fraudDetection.fraudIndicators.map((indicator, index) => (
                  <div key={index} className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`${
                        indicator.severity === 'HIGH' ? 'bg-red-100 text-red-800' :
                        indicator.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {indicator.severity}
                      </Badge>
                      <span className="text-xs text-gray-500">{indicator.location}</span>
                    </div>
                    <h5 className="font-medium capitalize mb-1">
                      {indicator.type.replace('_', ' ')}
                    </h5>
                    <p className="text-sm text-gray-600 mb-2">{indicator.description}</p>
                    <p className="text-xs text-blue-600">
                      💡 <strong>Suggestion:</strong> {indicator.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="font-medium">No fraud indicators detected</p>
                <p className="text-sm">Document appears to be legitimate</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Check</CardTitle>
          <CardDescription>
            Legal compliance and missing elements assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Compliance Status</span>
              <Badge className={getComplianceColor(analysis.compliance.complianceStatus)}>
                {analysis.compliance.complianceStatus.replace('_', ' ')}
              </Badge>
            </div>

            {analysis.compliance.missingElements.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">
                  Missing Elements ({analysis.compliance.missingElements.length})
                </h4>
                {analysis.compliance.missingElements.map((element, index) => (
                  <div key={index} className="p-4 border border-yellow-200 bg-yellow-50 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{element.element}</h5>
                      <Badge className={`${
                        element.importance === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                        element.importance === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                        element.importance === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {element.importance}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{element.description}</p>
                    <p className="text-xs text-blue-600">
                      💡 <strong>Suggestion:</strong> {element.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {analysis.compliance.legalRequirements.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Legal Requirements</h4>
                {analysis.compliance.legalRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{requirement.requirement}</h5>
                      <p className="text-xs text-gray-600">{requirement.details}</p>
                    </div>
                    <Badge className={`ml-3 ${
                      requirement.status === 'MET' ? 'bg-green-100 text-green-800' :
                      requirement.status === 'PARTIAL' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {requirement.status.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Document Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Document Analysis</CardTitle>
          <CardDescription>
            Extracted information and document structure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Extracted Information</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium block">Parties:</span>
                  <p className="text-sm text-gray-600">
                    {analysis.documentMetadata.extractedParties.length > 0 ? 
                      analysis.documentMetadata.extractedParties.join(', ') : 
                      'None detected'
                    }
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium block">Dates:</span>
                  <p className="text-sm text-gray-600">
                    {analysis.documentMetadata.extractedDates.length > 0 ? 
                      analysis.documentMetadata.extractedDates.join(', ') : 
                      'None detected'
                    }
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium block">Amounts:</span>
                  <p className="text-sm text-gray-600">
                    {analysis.documentMetadata.extractedAmounts.length > 0 ? 
                      analysis.documentMetadata.extractedAmounts.join(', ') : 
                      'None detected'
                    }
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Document Structure</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Sections:</span>
                  <span className="text-sm font-medium">
                    {analysis.documentMetadata.documentStructure.sections}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Clauses:</span>
                  <span className="text-sm font-medium">
                    {analysis.documentMetadata.documentStructure.clauses}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Estimated Pages:</span>
                  <span className="text-sm font-medium">
                    {analysis.documentMetadata.documentStructure.pages}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>
            Download certificate and export results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-4">
            {onDownloadCertificate && (
              <Button onClick={onDownloadCertificate}>
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
            )}
            {onCopyVerificationId && (
              <Button 
                variant="outline"
                onClick={onCopyVerificationId}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Verification ID
              </Button>
            )}
            {onViewDetails && (
              <Button 
                variant="outline"
                onClick={onViewDetails}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            )}
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm">
              <strong>Verification ID:</strong> {analysis.documentId}
            </p>
            <p className="text-sm text-gray-600">
              Processing Time: {analysis.authenticity.processingTime}ms | 
              Analyzed on: {new Date(analysis.authenticity.timestamp).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;