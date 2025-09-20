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
    <div className="space-y-8">
      {/* Authenticity Overview - Enhanced */}
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="flex items-center justify-center space-x-3 text-2xl font-bold">
            <Shield className="h-7 w-7 text-blue-600" />
            <span>Authenticity Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg ${
                analysis.authenticity.isAuthentic 
                  ? 'bg-gradient-to-br from-green-100 to-emerald-200' 
                  : 'bg-gradient-to-br from-red-100 to-rose-200'
              }`}>
                {getAuthenticityIcon()}
              </div>
              <h4 className="font-bold text-lg mb-2">Status</h4>
              <Badge 
                className={`text-sm font-bold px-4 py-2 ${
                  analysis.authenticity.isAuthentic 
                    ? 'bg-green-100 text-green-800 border-green-200' 
                    : 'bg-red-100 text-red-800 border-red-200'
                }`}
                variant="outline"
              >
                {analysis.authenticity.isAuthentic ? 'AUTHENTIC' : 'QUESTIONABLE'}
              </Badge>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="font-bold text-lg mb-2">Confidence</h4>
              <div className="text-3xl font-bold text-blue-600">
                {analysis.authenticity.confidenceScore}%
              </div>
            </div>
            <div className="text-center">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg ${
                analysis.authenticity.riskLevel === 'LOW' ? 'bg-gradient-to-br from-green-100 to-emerald-200' :
                analysis.authenticity.riskLevel === 'MEDIUM' ? 'bg-gradient-to-br from-yellow-100 to-orange-200' :
                analysis.authenticity.riskLevel === 'HIGH' ? 'bg-gradient-to-br from-orange-100 to-red-200' :
                'bg-gradient-to-br from-red-100 to-rose-200'
              }`}>
                <AlertTriangle className={`h-10 w-10 ${
                  analysis.authenticity.riskLevel === 'LOW' ? 'text-green-600' :
                  analysis.authenticity.riskLevel === 'MEDIUM' ? 'text-yellow-600' :
                  analysis.authenticity.riskLevel === 'HIGH' ? 'text-orange-600' :
                  'text-red-600'
                }`} />
              </div>
              <h4 className="font-bold text-lg mb-2">Risk Level</h4>
              <RiskBadge level={analysis.authenticity.riskLevel} size="lg" />
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="h-10 w-10 text-purple-600" />
              </div>
              <h4 className="font-bold text-lg mb-2">Score</h4>
              <div className="text-3xl font-bold text-purple-600">
                {analysis.authenticity.authenticityScore}/100
              </div>
            </div>
          </div>

          {/* Enhanced Score Progress Bar */}
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-gray-900">Overall Authenticity Score</span>
              <span className="text-2xl font-bold text-gray-900">{analysis.authenticity.authenticityScore}%</span>
            </div>
            <div className="relative">
              <Progress 
                value={analysis.authenticity.authenticityScore} 
                className="h-4 bg-gray-200"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-white mix-blend-difference">
                  {analysis.authenticity.authenticityScore}% Complete
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Findings - Enhanced */}
      {analysis.keyFindings.length > 0 && (
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Key Findings</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Important observations from the document analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analysis.keyFindings.map((finding, index) => (
                <div key={index} className={`flex items-start space-x-4 p-6 rounded-2xl border-l-4 shadow-lg ${
                  finding.type === 'critical' ? 'bg-red-50 border-red-500' :
                  finding.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    finding.type === 'critical' ? 'bg-red-100' :
                    finding.type === 'warning' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    {getFindingIcon(finding.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 mb-2">{finding.title}</h4>
                    <p className="text-gray-700 mb-3 leading-relaxed">{finding.description}</p>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      finding.type === 'critical' ? 'bg-red-100 text-red-800' :
                      finding.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      <strong className="mr-1">Impact:</strong> {finding.impact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fraud Detection - Enhanced */}
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-3 text-2xl font-bold">
            <AlertTriangle className="h-7 w-7 text-orange-600" />
            <span>Fraud Detection</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-gray-900">Overall Fraud Risk</span>
                <div className="text-3xl font-bold text-orange-600">
                  {analysis.fraudDetection.overallFraudRisk}%
                </div>
              </div>
              <div className="relative">
                <Progress 
                  value={analysis.fraudDetection.overallFraudRisk} 
                  className="h-4 bg-gray-200"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white mix-blend-difference">
                    Risk Level: {analysis.fraudDetection.overallFraudRisk < 30 ? 'Low' : 
                               analysis.fraudDetection.overallFraudRisk < 70 ? 'Medium' : 'High'}
                  </span>
                </div>
              </div>
            </div>

            {analysis.fraudDetection.fraudIndicators.length > 0 ? (
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900">
                  Fraud Indicators ({analysis.fraudDetection.fraudIndicators.length})
                </h4>
                {analysis.fraudDetection.fraudIndicators.map((indicator, index) => (
                  <div key={index} className={`border-l-4 p-6 rounded-2xl shadow-lg ${
                    indicator.severity === 'HIGH' ? 'border-red-500 bg-red-50' :
                    indicator.severity === 'MEDIUM' ? 'border-yellow-500 bg-yellow-50' :
                    'border-green-500 bg-green-50'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`px-3 py-1 text-sm font-bold ${
                        indicator.severity === 'HIGH' ? 'bg-red-100 text-red-800 border-red-200' :
                        indicator.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-green-100 text-green-800 border-green-200'
                      }`} variant="outline">
                        {indicator.severity} SEVERITY
                      </Badge>
                      <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {indicator.location}
                      </span>
                    </div>
                    <h5 className="font-bold text-lg capitalize mb-2 text-gray-900">
                      {indicator.type.replace('_', ' ')}
                    </h5>
                    <p className="text-gray-700 mb-4 leading-relaxed">{indicator.description}</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 font-medium">
                        💡 <strong>Suggestion:</strong> {indicator.suggestion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-green-50 rounded-2xl">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No fraud indicators detected</h3>
                <p className="text-gray-600">Document appears to be legitimate and secure</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status - Enhanced */}
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">Compliance Check</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Legal compliance and missing elements assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">Compliance Status</span>
                <Badge className={`px-4 py-2 text-sm font-bold ${getComplianceColor(analysis.compliance.complianceStatus)}`} variant="outline">
                  {analysis.compliance.complianceStatus.replace('_', ' ')}
                </Badge>
              </div>
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