import React, { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { signIn, signUp } from '../../services/auth';
import type { LoginFormData, SignupFormData } from '../../lib/validators';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const result = await signIn(data);
      
      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.message) {
        toast.success(result.message);
      }
      
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      const result = await signUp(data);
      
      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.message) {
        toast.success(result.message);
      }
      
      setIsLogin(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-cream rounded-2xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-purple-primary hover:text-coral-primary"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-3xl font-bold text-purple-primary mb-6 text-center">
          {isLogin ? 'Welcome Back!' : 'Join the Fun!'}
        </h2>
        
        {isLogin ? (
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        ) : (
          <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
        )}
        
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-primary hover:text-coral-primary transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;