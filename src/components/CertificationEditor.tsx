
import React, { useState, useEffect } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { useCertification } from '@/contexts/CertificationContext';
import { CertificationEditorSection } from './certification/CertificationEditorSection';
import { CertificationSidebar } from './certification/CertificationSidebar';

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
        <div className="lg:col-span-2">
          <CertificationEditorSection 
            content={content}
            setContent={setContent}
            copyScore={copyScore}
            isAnalyzing={isAnalyzing}
            isSubmitting={isSubmitting}
            canSubmitForCertification={canSubmitForCertification}
            aiResults={aiResults}
            isExploding={isExploding}
            onResetEditor={resetEditor}
            onAnalyze={runClientValidation}
            onSubmit={submitForAIReview}
          />
        </div>
        
        {/* Sidebar - Takes 1/3 of space on desktop */}
        <div>
          <CertificationSidebar 
            copyScore={copyScore}
            isAnalyzing={isAnalyzing}
            clientResults={clientResults}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificationEditor;
