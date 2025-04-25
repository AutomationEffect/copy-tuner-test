
import React, { useState, useEffect } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { useCertification } from '@/contexts/CertificationContext';
import { edictsSystem } from '@/data/structuredEdictsPillars';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,  // Re-added CardFooter import
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TipTapEditor from './TipTapEditor';
import ConfettiExplosion from 'react-confetti-explosion';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
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
      setShowSuccessMessage(true);
      unlockProMode();
    }
  }, [aiResults, isCertified, unlockProMode]);

  const getScoreColor = () => {
    if (copyScore >= 85) return "text-green-600";
    if (copyScore >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const getProgressColor = () => {
    if (copyScore >= 85) return "bg-green-600";
    if (copyScore >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

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
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Copy Score:</span>
                <span className={`text-lg font-bold ${getScoreColor()}`}>
                  {copyScore}%
                </span>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="secondary"
                  onClick={runClientValidation}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze"}
                </Button>
                <Button 
                  onClick={submitForAIReview} 
                  disabled={!canSubmitForCertification || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit for Certification"}
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          {aiResults && (
            <Card className={`border ${aiResults.passed ? 'border-green-500 bg-green-50' : 'border-amber-500 bg-amber-50'} shadow-apple`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {aiResults.passed ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Certification Passed!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                      <span>Almost There!</span>
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {aiResults.passed 
                    ? "Congratulations! Your copy meets the COS standards." 
                    : "Your copy needs some improvements to meet certification standards."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <h4 className="mt-0">AI Feedback:</h4>
                  <p>{aiResults.feedback}</p>
                  
                  <div className="mt-4">
                    <h4 className="mb-2">Edict Results:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.entries(aiResults.edict_results).map(([edictId, result]) => {
                        const edict = edictsSystem.pillars
                          .flatMap(p => p.edicts)
                          .find(e => e.id === parseInt(edictId));
                        
                        return edict ? (
                          <div 
                            key={edictId} 
                            className={`p-3 rounded-lg border ${
                              result.passed ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <span className="font-medium text-sm">{edict.name}</span>
                              <Badge variant={result.passed ? "default" : "outline"} className="ml-2">
                                {result.score}%
                              </Badge>
                            </div>
                            <p className="text-xs mt-1 text-gray-600">{result.feedback}</p>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
              {aiResults.passed && (
                <CardFooter>
                  <Button 
                    onClick={() => window.location.href = "/pro"} 
                    className="w-full"
                  >
                    Continue to Pro Mode
                  </Button>
                </CardFooter>
              )}
            </Card>
          )}
          
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
          <Card className="border shadow-apple">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Copy Score</span>
                <span className={`text-xl font-bold ${getScoreColor()}`}>
                  {copyScore}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={copyScore} className={getProgressColor()} />
              <p className="text-sm mt-2 text-gray-500">
                {copyScore < 70 && "Your copy needs significant improvement."}
                {copyScore >= 70 && copyScore < 85 && "Your copy is improving but not yet ready for submission."}
                {copyScore >= 85 && "Your copy meets the minimum threshold for submission!"}
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-apple">
            <CardHeader>
              <CardTitle>Edict Checklist</CardTitle>
              <CardDescription>
                Track your progress against the 21 edicts
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[400px] overflow-y-auto">
              <Tabs defaultValue="1">
                <TabsList className="w-full justify-start overflow-x-auto">
                  {edictsSystem.pillars.map((pillar) => (
                    <TabsTrigger key={pillar.id} value={pillar.id.toString()}>
                      {pillar.name.split(' ')[0]}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {edictsSystem.pillars.map((pillar) => (
                  <TabsContent key={pillar.id} value={pillar.id.toString()} className="mt-4 space-y-4">
                    {pillar.edicts.map((edict) => {
                      const result = clientResults?.edict_results[edict.id];
                      const passed = result?.passed || false;
                      
                      return (
                        <div key={edict.id} className="flex items-start space-x-2">
                          <div className={`mt-0.5 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center ${
                            passed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {passed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <span className="text-xs">{edict.id}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <span className="font-medium">{edict.name}</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                      <Info className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">{edict.description}</p>
                                    <p className="text-xs italic mt-1">Example: {edict.example}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            {result && (
                              <div className="flex items-center justify-between mt-1">
                                <Progress 
                                  value={result.score} 
                                  className={`h-1 ${passed ? 'bg-green-600' : 'bg-gray-300'}`} 
                                />
                                <span className="text-xs ml-2">{result.score}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                View COS Reference Guide
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>COS Reference Guide</SheetTitle>
                <SheetDescription>
                  Jon Benson's Conversion Optimization System
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {edictsSystem.pillars.map((pillar) => (
                  <div key={pillar.id}>
                    <h3 className="text-lg font-semibold mb-2">{pillar.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{pillar.description}</p>
                    <div className="space-y-4">
                      {pillar.edicts.map((edict) => (
                        <div key={edict.id} className="border-l-4 border-primary pl-4 py-1">
                          <h4 className="font-medium">
                            {edict.id}. {edict.name}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{edict.description}</p>
                          <div className="bg-slate-50 p-2 mt-2 rounded text-xs">
                            <p className="font-medium">Example:</p>
                            <p className="mt-1 whitespace-pre-line">{edict.example}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default CertificationEditor;
