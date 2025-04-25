
import React from 'react';
import { edictsSystem } from '@/data/structuredEdictsPillars';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const ReferenceGuide = () => {
  return (
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
  );
};
