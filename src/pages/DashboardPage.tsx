
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import NavBar from '@/components/NavBar';
import OnboardingModal from '@/components/OnboardingModal';

const DashboardPage = () => {
  const { user } = useAuth();
  const { isCertified, certificationDate, isProModeEnabled } = useCertification();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  useEffect(() => {
    // Check if user needs to see the onboarding modal
    // In a real implementation, this would check the user's onboard_complete status
    const hasSeenOnboarding = localStorage.getItem('copy_tuner_onboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);
  
  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('copy_tuner_onboarding', 'true');
  };
  
  // Format the certification date
  const formattedDate = certificationDate 
    ? new Date(certificationDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavBar />
      
      <main className="flex-grow container max-w-7xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name || 'Copywriter'}</h1>
          <p className="text-gray-600">Your copy certification journey starts here</p>
        </div>
        
        {/* Status Card */}
        <Card className="mb-8 border shadow-apple bg-white">
          <CardHeader>
            <CardTitle>Certification Status</CardTitle>
            <CardDescription>
              {isCertified 
                ? `Congratulations! You were certified on ${formattedDate}` 
                : "Complete the certification process to unlock Pro Mode"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Badge className={isCertified ? 'bg-green-500' : 'bg-amber-500'}>
                  {isCertified ? 'PASSED' : 'PENDING'}
                </Badge>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Certification Progress</span>
                  <span className="text-sm font-medium">
                    {isCertified ? '100%' : '0%'}
                  </span>
                </div>
                <Progress value={isCertified ? 100 : 0} className={isCertified ? 'bg-green-500' : undefined} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {isCertified ? (
              <Button asChild className="w-full">
                <Link to="/pro">Go to Pro Mode</Link>
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link to="/certification">Start Certification</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Quick Links */}
        <h2 className="text-xl font-bold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <QuickLink
            title="Certification Editor"
            description="Work on your certification by editing bad copy"
            href="/certification"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <QuickLink
            title="COS Glossary"
            description="Reference guide for all 21 edicts"
            href="/glossary"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <QuickLink
            title="Pro Mode"
            description="Analyze your own copy (requires certification)"
            href="/pro"
            color="bg-gradient-to-br from-green-500 to-green-600"
            disabled={!isProModeEnabled}
          />
        </div>
        
        {/* Resources */}
        <h2 className="text-xl font-bold mb-4">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border shadow-apple">
            <CardHeader>
              <CardTitle>COS Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Jon Benson's Conversion Optimization System consists of 4 Pillars and 21 Edicts that guide
                the creation of high-converting copy.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setShowOnboarding(true)}>
                Review COS Introduction
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border shadow-apple">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Have questions about the certification process or need assistance with the editor?
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link to="/glossary">View Glossary</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <OnboardingModal open={showOnboarding} onOpenChange={handleOnboardingClose} />
    </div>
  );
};

interface QuickLinkProps {
  title: string;
  description: string;
  href: string;
  color: string;
  disabled?: boolean;
}

const QuickLink = ({ title, description, href, color, disabled = false }: QuickLinkProps) => {
  return (
    <Link 
      to={disabled ? '#' : href} 
      className={`block group ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-1'} transition-all duration-200`}
    >
      <div className={`h-full rounded-xl p-6 text-white shadow-lg ${color}`}>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
        {disabled && (
          <Badge variant="outline" className="mt-3 border-white/30 text-white/90">
            Locked
          </Badge>
        )}
      </div>
    </Link>
  );
};

export default DashboardPage;
