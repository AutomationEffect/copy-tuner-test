
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface CertificationContextType {
  isCertified: boolean;
  certificationDate: string | null;
  isProModeEnabled: boolean;
  unlockProMode: () => Promise<void>;
}

const CertificationContext = createContext<CertificationContextType | undefined>(undefined);

export const CertificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [isCertified, setIsCertified] = useState(false);
  const [certificationDate, setCertificationDate] = useState<string | null>(null);
  const [isProModeEnabled, setIsProModeEnabled] = useState(false);
  const { toast } = useToast();

  // Update certification status based on user data
  useEffect(() => {
    if (user) {
      setIsCertified(user.certification_status === 'passed');
      setCertificationDate(user.certification_date || null);
      setIsProModeEnabled(user.certification_status === 'passed');
    } else {
      setIsCertified(false);
      setCertificationDate(null);
      setIsProModeEnabled(false);
    }
  }, [user]);

  const unlockProMode = async () => {
    try {
      // Mock unlock pro mode - will be replaced with API call
      setIsCertified(true);
      const now = new Date().toISOString();
      setCertificationDate(now);
      setIsProModeEnabled(true);
      
      toast({
        title: "Pro Mode Unlocked!",
        description: "Congratulations! You now have access to Pro Mode features."
      });
      
      return true;
    } catch (error) {
      console.error('Unlock error:', error);
      toast({
        title: "Unlock Failed",
        description: "Failed to unlock Pro Mode. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  return (
    <CertificationContext.Provider value={{
      isCertified,
      certificationDate,
      isProModeEnabled,
      unlockProMode
    }}>
      {children}
    </CertificationContext.Provider>
  );
};

export const useCertification = () => {
  const context = useContext(CertificationContext);
  if (context === undefined) {
    throw new Error('useCertification must be used within a CertificationProvider');
  }
  return context;
};
