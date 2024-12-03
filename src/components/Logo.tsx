import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${sizes[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Heart shape forming parent figure */}
      <path
        d="M50 85C50 85 80 65 80 40C80 25 70 15 55 15C45 15 50 25 50 25C50 25 55 15 45 15C30 15 20 25 20 40C20 65 50 85 50 85Z"
        fill="currentColor"
        className="text-purple-primary"
      />
      
      {/* Child figure */}
      <circle
        cx="50"
        cy="45"
        r="12"
        fill="currentColor"
        className="text-coral-primary"
      />
      
      {/* Protective arc */}
      <path
        d="M35 55C35 55 50 65 65 55"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        className="text-yellow-primary"
      />
    </svg>
  );
};

export default Logo;