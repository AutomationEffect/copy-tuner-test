
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { AIValidationResult } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EdictResultsList } from './EdictResultsList';

interface AIFeedbackCardProps {
  results: AIValidationResult;
}

export const AIFeedbackCard = ({ results }: AIFeedbackCardProps) => {
  return (
    <Card className={`border ${results.passed ? 'border-green-500 bg-green-50' : 'border-amber-500 bg-amber-50'} shadow-apple`}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {results.passed ? (
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
          {results.passed 
            ? "Congratulations! Your copy meets the COS standards." 
            : "Your copy needs some improvements to meet certification standards."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <h4 className="mt-0">AI Feedback:</h4>
          <p>{results.feedback}</p>
          <EdictResultsList results={results.edict_results} />
        </div>
      </CardContent>
      {results.passed && (
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
  );
};
