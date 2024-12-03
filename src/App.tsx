import React, { useState, useEffect } from 'react';
import { Brain, ChevronRight, Star, LogOut } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import Logo from './components/Logo';
import Features from './components/Features';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoginModal from './components/auth/LoginModal';
import ChildrenDashboard from './components/children/ChildrenDashboard';
import { getCurrentUser, signOut, supabase } from './services/auth';
import type { User } from '@supabase/supabase-js';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser).catch(console.error);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      toast.success('Successfully signed out!');
    } catch (error) {
      toast.error('Failed to sign out.');
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-cream font-averia">
      <Toaster position="top-right" />
      
      {/* Navigation */}
      <nav className="fixed w-full bg-cream/90 backdrop-blur-md z-50 border-b-2 border-purple-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Logo size="sm" />
              <span className="text-2xl font-bold text-purple-primary">
                Parenting Pal
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-lg text-purple-primary hover:text-coral-primary">Features</a>
              <a href="#benefits" className="text-lg text-purple-primary hover:text-coral-primary">Benefits</a>
              <a href="#testimonials" className="text-lg text-purple-primary hover:text-coral-primary">Stories</a>
            </div>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-lg text-purple-primary">
                  Welcome, {user.user_metadata.full_name || 'User'}!
                </span>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-coral-primary hover:text-coral-primary/80"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-coral-primary text-white px-6 py-2 rounded-full hover:bg-coral-primary/90 transition-colors text-lg"
              >
                Join the Fun!
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {user ? (
        <div className="pt-20">
          <ChildrenDashboard />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            {/* ... existing hero section code ... */}
          </section>

          <Features />
          <Benefits />
          <Testimonials />
        </>
      )}

      <Footer />
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
}

export default App;