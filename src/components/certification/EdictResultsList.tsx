
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { edictsSystem } from '@/data/structuredEdictsPillars';

interface EdictResultsListProps {
  results: Record<string, { passed: boolean; score: number; feedback?: string }>;
}

export const EdictResultsList = ({ results }: EdictResultsListProps) => {
  return (
    <div className="mt-4">
      <h4 className="mb-2">Edict Results:</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {Object.entries(results).map(([edictId, result]) => {
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
  );
};
