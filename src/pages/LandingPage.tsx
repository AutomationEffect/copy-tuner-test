
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import NavBar from '@/components/NavBar';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
      <NavBar />
      
      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center px-4 py-16 md:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-text">Copy Tuner</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Master the art of converting copy using Jon Benson's Conversion Optimization System
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link to="/auth">Get Certified Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <a href="#learn-more">Learn More</a>
            </Button>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-blue-400/30 rounded-2xl blur-xl opacity-50"></div>
            <Card className="relative border bg-white/80 backdrop-blur-sm shadow-apple-lg rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src="https://placehold.co/1200x630/e4e9f2/1a2d54?text=Copy+Tuner+Screenshot" 
                  alt="Copy Tuner Editor Interface" 
                  className="w-full h-auto object-cover"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="learn-more" className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Copy Tuner Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Feature 
              title="Learn the 21 Edicts" 
              description="Master Jon Benson's 21 Edicts for effective sales copy through interactive lessons and real-time feedback."
              number="01"
            />
            <Feature 
              title="Practice & Get Feedback" 
              description="Edit poor copy examples and receive instant analysis on how well you're applying the COS principles."
              number="02"
            />
            <Feature 
              title="Earn Certification" 
              description="Submit your improved copy for AI review and earn your COS certification to demonstrate your expertise."
              number="03"
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6">Ready to become a certified copywriter?</h3>
            <Button asChild size="lg" className="px-8">
              <Link to="/auth">Start Now</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Copy Tuner</h4>
              <p className="text-slate-300">
                Learn, practice, and master sales copywriting with Jon Benson's proven conversion system.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-slate-300 hover:text-white">Home</Link></li>
                <li><Link to="/auth" className="text-slate-300 hover:text-white">Login</Link></li>
                <li><a href="#learn-more" className="text-slate-300 hover:text-white">How it Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <p className="text-slate-300 mb-2">
                Questions about the certification program?
              </p>
              <a href="mailto:support@copytuner.com" className="text-primary hover:underline">support@copytuner.com</a>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>© {new Date().getFullYear()} Copy Tuner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureProps {
  title: string;
  description: string;
  number: string;
}

const Feature = ({ title, description, number }: FeatureProps) => {
  return (
    <div className="relative p-6 rounded-xl border bg-white shadow-apple">
      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium text-sm">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default LandingPage;
