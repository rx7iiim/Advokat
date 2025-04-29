import React from 'react';

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'text-blue-500',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-solid ${color} border-t-transparent ${sizeClasses[size]}`}
        style={{ animationTimingFunction: 'cubic-bezier(0.53, 0.21, 0.29, 0.67)' }}
      />
    </div>
  );
};

export default Loader;