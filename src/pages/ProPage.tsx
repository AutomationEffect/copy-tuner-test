
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useCertification } from '@/contexts/CertificationContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from '@/components/ui/use-toast';
import NavBar from '@/components/NavBar';
import TipTapEditor from '@/components/TipTapEditor';

const ProPage = () => {
  const { isCertified } = useCertification();
  const { toast } = useToast();
  const [content, setContent] = useState('<p>Paste your own copy here to analyze it against the COS principles...</p>');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Redirect if not certified
  if (!isCertified) {
    return <Navigate to="/certification" />;
  }

  const handleAnalyze = () => {
    if (content.length < 100) {
      toast({
        title: "Copy Too Short",
        description: "Please enter at least 100 characters for analysis.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Mock analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Your copy has been analyzed against the COS principles.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavBar />
      
      <main className="flex-grow container max-w-7xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Pro Mode</h1>
          <p className="text-gray-600">
            Analyze your own copy against the 21 Edicts of the COS system
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border shadow-apple">
            <CardHeader>
              <CardTitle>Your Copy</CardTitle>
              <CardDescription>
                Enter or paste the copy you want to analyze
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TipTapEditor 
                content={content} 
                onChange={setContent} 
                className="min-h-[500px]"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Copy"}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="space-y-6">
            <Card className="border shadow-apple">
              <CardHeader>
                <CardTitle>Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Analyze Any Copy</h3>
                  <p className="text-sm text-gray-600">
                    You can analyze sales pages, emails, social posts and more.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Get Specific Feedback</h3>
                  <p className="text-sm text-gray-600">
                    The analysis breaks down how well your copy follows each edict.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">No Length Restriction</h3>
                  <p className="text-sm text-gray-600">
                    As a certified copywriter, you can analyze copy of any length.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border shadow-apple">
              <CardHeader>
                <CardTitle>Analysis Record</CardTitle>
                <CardDescription>
                  Your recent analyses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 italic">
                  No analyses yet. Analyze your first copy to see records here.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProPage;
