import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle, Shield } from 'lucide-react';

interface RiskBadgeProps {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ 
  level, 
  size = 'md', 
  showIcon = true 
}) => {
  const getRiskStyles = () => {
    switch (level) {
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200';
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
    }
  };

  const getRiskIcon = () => {
    switch (level) {
      case 'LOW':
        return <CheckCircle className="h-3 w-3" />;
      case 'MEDIUM':
        return <Shield className="h-3 w-3" />;
      case 'HIGH':
        return <AlertTriangle className="h-3 w-3" />;
      case 'CRITICAL':
        return <XCircle className="h-3 w-3" />;
      default:
        return <AlertTriangle className="h-3 w-3" />;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-1';
      case 'lg':
        return 'text-sm px-3 py-1.5';
      default:
        return 'text-xs px-2.5 py-1';
    }
  };

  return (
    <Badge 
      className={`${getRiskStyles()} ${getSizeClass()} font-medium border transition-colors`}
      variant="outline"
    >
      {showIcon && (
        <span className="mr-1.5">
          {getRiskIcon()}
        </span>
      )}
      {level}
    </Badge>
  );
};

export default RiskBadge;