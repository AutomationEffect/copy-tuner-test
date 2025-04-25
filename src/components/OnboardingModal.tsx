
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { edictsSystem } from "@/data/structuredEdictsPillars";
import { Badge } from "@/components/ui/badge";

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OnboardingModal = ({ open, onOpenChange }: OnboardingModalProps) => {
  const [step, setStep] = useState(0);
  const [videoCompleted, setVideoCompleted] = useState(false);

  const steps = [
    {
      title: "Welcome to Copy Tuner!",
      description: "Learn Jon Benson's Conversion Optimization System (COS) and become a certified copywriter.",
      content: (
        <div className="space-y-6">
          <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
            <div className="text-white text-center p-6">
              <p className="text-lg mb-4">Welcome Video</p>
              <p className="text-sm text-slate-300">
                In the full version, this will be an embedded video explaining the certification process.
              </p>
              <Button 
                variant="outline" 
                className="mt-4 border-white text-white hover:bg-white hover:text-slate-800"
                onClick={() => setVideoCompleted(true)}
              >
                Mark as Watched
              </Button>
            </div>
          </div>
          <p className="text-gray-600">
            This video introduces you to the Copy Tuner certification process. 
            Watch it to understand how to use the editor and what to expect.
          </p>
        </div>
      )
    },
    {
      title: "The 4 Pillars of COS",
      description: "The foundation of effective sales copy",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {edictsSystem.pillars.map((pillar) => (
              <div key={pillar.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h3 className="font-semibold text-lg mb-2">{pillar.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{pillar.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{pillar.edicts.length} Edicts</Badge>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            These four pillars form the foundation of the COS system. Each pillar contains specific edicts that guide effective copywriting.
          </p>
        </div>
      )
    },
    {
      title: "Certification Process",
      description: "How to get certified using Copy Tuner",
      content: (
        <div className="space-y-6">
          <ol className="relative border-l border-gray-200 ml-3">
            <li className="mb-6 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 text-white text-sm">1</span>
              <h3 className="font-semibold text-lg">Edit Bad Copy</h3>
              <p className="text-gray-600 mb-2">
                Start with the provided sample of poorly written copy in the certification editor.
              </p>
            </li>
            <li className="mb-6 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 text-white text-sm">2</span>
              <h3 className="font-semibold text-lg">Get Real-Time Feedback</h3>
              <p className="text-gray-600 mb-2">
                As you edit, you'll receive instant feedback on how well you're following the 21 Edicts.
              </p>
            </li>
            <li className="mb-6 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 text-white text-sm">3</span>
              <h3 className="font-semibold text-lg">Submit for AI Review</h3>
              <p className="text-gray-600 mb-2">
                Once your copy reaches a score of 85% or higher, submit it for an AI review.
              </p>
            </li>
            <li className="mb-6 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3 text-white text-sm">4</span>
              <h3 className="font-semibold text-lg">Receive Certification</h3>
              <p className="text-gray-600 mb-2">
                If your copy passes the AI review, you'll receive certification and unlock Pro Mode.
              </p>
            </li>
          </ol>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (step === 0 && !videoCompleted) {
      return;
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onOpenChange(false);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const currentStep = steps[step];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{currentStep.title}</DialogTitle>
          <DialogDescription>{currentStep.description}</DialogDescription>
        </DialogHeader>
        
        <div className="py-4">{currentStep.content}</div>
        
        <DialogFooter className="flex justify-between items-center">
          <div className="flex space-x-1">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`block w-2 h-2 rounded-full ${
                  i === step ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          
          <div className="flex space-x-2">
            {step > 0 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              disabled={step === 0 && !videoCompleted}
            >
              {step < steps.length - 1 ? "Next" : "Get Started"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
