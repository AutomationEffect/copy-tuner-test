
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { EdictsValidationResult, AIValidationResult } from '@/types';
import { sampleBadCopy } from '@/data/sampleBadCopy';

interface EditorContextType {
  content: string;
  setContent: (content: string) => void;
  clientResults: EdictsValidationResult | null;
  aiResults: AIValidationResult | null;
  isAnalyzing: boolean;
  isSubmitting: boolean;
  copyScore: number;
  canSubmitForCertification: boolean;
  runClientValidation: () => void;
  submitForAIReview: () => Promise<void>;
  resetEditor: () => void;
  saveProgress: () => Promise<void>;
}

const initialClientResults: EdictsValidationResult = {
  total_score: 0,
  edict_results: {}
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<string>(sampleBadCopy);
  const [clientResults, setClientResults] = useState<EdictsValidationResult | null>(initialClientResults);
  const [aiResults, setAiResults] = useState<AIValidationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyScore, setCopyScore] = useState(0);
  const [canSubmitForCertification, setCanSubmitForCertification] = useState(false);
  const { toast } = useToast();

  // Auto-save timer
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (content !== sampleBadCopy) {
        saveProgress();
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [content]);

  // This is a placeholder for client-side validation logic
  const runClientValidation = () => {
    setIsAnalyzing(true);
    
    // Simulate validation delay
    setTimeout(() => {
      // Mock validation for now - will be replaced with actual validators
      const mockScore = Math.min(
        Math.max(30, Math.floor(content.length / 100)), 
        90
      );
      
      const mockResults: EdictsValidationResult = {
        total_score: mockScore,
        edict_results: {
          1: { passed: mockScore > 50, score: mockScore > 50 ? 100 : 50 },
          2: { passed: mockScore > 60, score: mockScore > 60 ? 100 : 60 },
          3: { passed: mockScore > 70, score: mockScore > 70 ? 100 : 70 }
        }
      };
      
      setClientResults(mockResults);
      setCopyScore(mockScore);
      setCanSubmitForCertification(mockScore >= 85);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Your copy score is ${mockScore}%`,
      });
    }, 1000);
  };

  const submitForAIReview = async () => {
    if (!canSubmitForCertification) {
      toast({
        title: "Cannot Submit Yet",
        description: "Your copy needs to reach a score of at least 85% before submission.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Mock AI review - will be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockAIResults: AIValidationResult = {
        total_score: 92,
        passing_threshold: 90,
        passed: true,
        feedback: "Excellent work! Your copy has significantly improved and now adheres to most of the COS principles.",
        edict_results: {
          1: { 
            passed: true, 
            score: 95, 
            feedback: "Good use of short, punchy sentences to maintain reader engagement." 
          },
          2: { 
            passed: true, 
            score: 90, 
            feedback: "Your headline effectively addresses the prospect's key pain point." 
          },
          3: { 
            passed: true, 
            score: 92, 
            feedback: "Excellent emotional triggers throughout the copy." 
          }
        }
      };
      
      setAiResults(mockAIResults);
      toast({
        title: "AI Review Complete",
        description: mockAIResults.passed 
          ? "Congratulations! Your copy has passed certification!"
          : "Your copy needs some more work. Please review the feedback."
      });
    } catch (error) {
      console.error('AI Review error:', error);
      toast({
        title: "Review Failed",
        description: "Failed to complete AI review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetEditor = () => {
    setContent(sampleBadCopy);
    setClientResults(initialClientResults);
    setAiResults(null);
    setCopyScore(0);
    setCanSubmitForCertification(false);
    toast({
      title: "Editor Reset",
      description: "The editor has been reset to the original bad copy."
    });
  };

  const saveProgress = async () => {
    // Mock save - will be replaced with actual API call
    try {
      console.log('Saving progress...', content);
      // In the real implementation, this would save to Supabase
      localStorage.setItem('copy_tuner_draft', content);
      return;
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save your progress.",
        variant: "destructive"
      });
      return;
    }
  };

  return (
    <EditorContext.Provider value={{
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
      saveProgress
    }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
