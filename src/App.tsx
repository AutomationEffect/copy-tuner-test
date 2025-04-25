
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { EditorProvider } from "./contexts/EditorContext";
import { CertificationProvider } from "./contexts/CertificationContext";

import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import CertificationPage from "./pages/CertificationPage";
import ProPage from "./pages/ProPage";
import GlossaryPage from "./pages/GlossaryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <EditorProvider>
          <CertificationProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/certification" element={
                  <ProtectedRoute>
                    <CertificationPage />
                  </ProtectedRoute>
                } />
                <Route path="/pro" element={
                  <ProtectedRoute>
                    <ProPage />
                  </ProtectedRoute>
                } />
                <Route path="/glossary" element={
                  <ProtectedRoute>
                    <GlossaryPage />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CertificationProvider>
        </EditorProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
