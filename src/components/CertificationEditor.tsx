
import React, { useState, useEffect } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { useCertification } from '@/contexts/CertificationContext';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScoreCard } from '@/components/certification/ScoreCard';
import { AIFeedbackCard } from '@/components/certification/AIFeedbackCard';
import { CertificationControls } from '@/components/certification/CertificationControls';
import { ReferenceGuide } from '@/components/certification/ReferenceGuide';
import TipTapEditor from './TipTapEditor';
import ConfettiExplosion from 'react-confetti-explosion';

const CertificationEditor = () => {
  const { 
    content, 
    setContent,
    clientResults,
    aiResults,
    isAnalyzing,
    isSubmitting,
    copyScore,
    canSubmitForCertification,
    runClientValidation,
    submitForAIReview,
    resetEditor,
  } = useEditor();
  
  const { unlockProMode, isCertified } = useCertification();
  const [isExploding, setIsExploding] = useState(false);
  
  // Trigger validation on content change
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      runClientValidation();
    }, 1000);
    
    return () => clearTimeout(debounceTimeout);
  }, [content, runClientValidation]);
  
  // Handle successful certification
  useEffect(() => {
    if (aiResults?.passed && !isCertified) {
      setIsExploding(true);
      unlockProMode();
    }
  }, [aiResults, isCertified, unlockProMode]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Area - Takes 2/3 of space on desktop */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border shadow-apple">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Certification Editor</CardTitle>
                <Button variant="outline" size="sm" onClick={resetEditor}>
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
                onAnalyze={runClientValidation}
                onSubmit={submitForAIReview}
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
        
        {/* Sidebar - Takes 1/3 of space on desktop */}
        <div className="space-y-6">
          <ScoreCard copyScore={copyScore} isAnalyzing={isAnalyzing} />
          <Card className="border shadow-apple">
            <CardHeader>
              <CardTitle>Edict Checklist</CardTitle>
              <CardDescription>
                Track your progress against the 21 edicts
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {clientResults?.edict_results && (
                  <EdictResultsList results={clientResults.edict_results} />
                )}
              </div>
            </CardContent>
          </Card>
          <ReferenceGuide />
        </div>
      </div>
    </div>
  );
};

export default CertificationEditor;
