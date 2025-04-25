
import React from 'react';
import { Button } from '@/components/ui/button';

interface CertificationControlsProps {
  copyScore: number;
  isAnalyzing: boolean;
  isSubmitting: boolean;
  canSubmitForCertification: boolean;
  onAnalyze: () => void;
  onSubmit: () => void;
}

export const CertificationControls = ({
  copyScore,
  isAnalyzing,
  isSubmitting,
  canSubmitForCertification,
  onAnalyze,
  onSubmit
}: CertificationControlsProps) => {
  const getScoreColor = () => {
    if (copyScore >= 85) return "text-green-600";
    if (copyScore >= 70) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="flex justify-between border-t pt-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Copy Score:</span>
        <span className={`text-lg font-bold ${getScoreColor()}`}>
          {copyScore}%
        </span>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="secondary"
          onClick={onAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze"}
        </Button>
        <Button 
          onClick={onSubmit} 
          disabled={!canSubmitForCertification || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit for Certification"}
        </Button>
      </div>
    </div>
  );
};
