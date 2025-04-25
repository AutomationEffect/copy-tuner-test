
import React from 'react';
import { ScoreCard } from './ScoreCard';
import { ReferenceGuide } from './ReferenceGuide';
import { EdictResultsList } from './EdictResultsList';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CertificationSidebarProps {
  copyScore: number;
  isAnalyzing: boolean;
  clientResults: any;
}

export const CertificationSidebar = ({
  copyScore,
  isAnalyzing,
  clientResults,
}: CertificationSidebarProps) => {
  return (
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
  );
};
