
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { AIFeedbackCard } from './AIFeedbackCard';
import { CertificationControls } from './CertificationControls';
import TipTapEditor from '../TipTapEditor';
import ConfettiExplosion from 'react-confetti-explosion';

interface CertificationEditorSectionProps {
  content: string;
  setContent: (content: string) => void;
  copyScore: number;
  isAnalyzing: boolean;
  isSubmitting: boolean;
  canSubmitForCertification: boolean;
  aiResults: any;
  isExploding: boolean;
  onResetEditor: () => void;
  onAnalyze: () => void;
  onSubmit: () => void;
}

export const CertificationEditorSection = ({
  content,
  setContent,
  copyScore,
  isAnalyzing,
  isSubmitting,
  canSubmitForCertification,
  aiResults,
  isExploding,
  onResetEditor,
  onAnalyze,
  onSubmit,
}: CertificationEditorSectionProps) => {
  return (
    <div className="space-y-6">
      <Card className="border shadow-apple">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Certification Editor</CardTitle>
            <Button variant="outline" size="sm" onClick={onResetEditor}>
              Reset
            </Button>
          </div>
          <CardDescription>
            Edit the sample copy below to improve it using the COS principles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TipTapEditor 
            content={content} 
            onChange={setContent} 
            autoFocus 
            className="min-h-[500px]"
          />
        </CardContent>
        <CardFooter>
          <CertificationControls
            copyScore={copyScore}
            isAnalyzing={isAnalyzing}
            isSubmitting={isSubmitting}
            canSubmitForCertification={canSubmitForCertification}
            onAnalyze={onAnalyze}
            onSubmit={onSubmit}
          />
        </CardFooter>
      </Card>
      
      {aiResults && <AIFeedbackCard results={aiResults} />}
      
      {isExploding && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <ConfettiExplosion 
            force={0.8}
            duration={3000}
            particleCount={250}
            width={1600}
          />
        </div>
      )}
    </div>
  );
};
