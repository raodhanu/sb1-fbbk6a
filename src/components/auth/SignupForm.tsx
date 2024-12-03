import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signupSchema, type SignupFormData } from '../../lib/validators';

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => Promise<void>;
  isLoading: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-purple-primary font-medium mb-1">
          Full Name
        </label>
        <input
          {...register('fullName')}
          type="text"
          id="fullName"
          className="w-full px-4 py-2 rounded-lg border-2 border-purple-primary/20 focus:border-purple-primary focus:outline-none"
          placeholder="Enter your full name"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-purple-primary font-medium mb-1">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-4 py-2 rounded-lg border-2 border-purple-primary/20 focus:border-purple-primary focus:outline-none"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-purple-primary font-medium mb-1">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          className="w-full px-4 py-2 rounded-lg border-2 border-purple-primary/20 focus:border-purple-primary focus:outline-none"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-coral-primary text-white py-3 rounded-lg font-bold hover:bg-coral-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
};

export default SignupForm;