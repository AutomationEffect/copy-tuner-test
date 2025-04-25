
import NavBar from '@/components/NavBar';
import CertificationEditor from '@/components/CertificationEditor';
import ErrorLogger from '@/utils/errorLogger';
import { useEffect } from 'react';
import { useCertification } from '@/contexts/CertificationContext';
import { useToast } from '@/hooks/use-toast';

const CertificationPage = () => {
  const { isCertified } = useCertification();
  const { toast } = useToast();

  useEffect(() => {
    try {
      // Log component mount
      console.info('CertificationPage: Component mounted');
      
      // Handle any initialization errors
      if (!isCertified) {
        console.info('CertificationPage: User not certified');
      }
    } catch (error) {
      if (error instanceof Error) {
        ErrorLogger.log(error, { component: 'CertificationPage', isCertified });
        toast({
          title: 'Error',
          description: 'An error occurred while loading the certification page.',
          variant: 'destructive',
        });
      }
    }
  }, [isCertified, toast]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavBar />
      <main className="flex-grow container mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Copy Certification</h1>
          <p className="text-gray-600">
            Edit the provided copy using the COS principles to pass certification and unlock Pro Mode
          </p>
        </div>
        <CertificationEditor />
      </main>
    </div>
  );
};

export default CertificationPage;
