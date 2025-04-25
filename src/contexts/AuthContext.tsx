
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // This is a mock implementation until we connect Supabase
  useEffect(() => {
    // Check for saved user in localStorage (temporary solution until Supabase)
    const savedUser = localStorage.getItem('copy_tuner_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Mock login - will be replaced with Supabase auth
      const mockUser: User = {
        id: '1',
        email,
        name: 'Test User',
        certification_status: 'pending',
        onboard_complete: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setUser(mockUser);
      localStorage.setItem('copy_tuner_user', JSON.stringify(mockUser));
      toast({
        title: "Success!",
        description: "You've successfully logged in.",
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Mock logout - will be replaced with Supabase auth
      setUser(null);
      localStorage.removeItem('copy_tuner_user');
      toast({
        title: "Logged Out",
        description: "You've been successfully logged out.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Failed",
        description: "An error occurred during logout.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated: !!user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
