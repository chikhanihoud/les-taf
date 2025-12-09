import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'cyan' | 'yellow' | 'white';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'cyan',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  };

  const colorClasses = {
    cyan: 'border-brand-cyan border-t-transparent',
    yellow: 'border-brand-yellow border-t-transparent',
    white: 'border-white border-t-transparent'
  };

  return (
    <div 
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

interface ProgressIndicatorProps {
  value: number;
  max?: number;
  variant?: 'linear' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value,
  max = 100,
  variant = 'linear',
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  if (variant === 'circular') {
    const sizeMap = { sm: 40, md: 60, lg: 80 };
    const radius = sizeMap[size] / 2 - 5;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg width={sizeMap[size]} height={sizeMap[size]} className="transform -rotate-90">
          <circle
            cx={sizeMap[size] / 2}
            cy={sizeMap[size] / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx={sizeMap[size] / 2}
            cy={sizeMap[size] / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-brand-cyan transition-all duration-500"
            strokeLinecap="round"
          />
        </svg>
        {showLabel && (
          <span className="absolute text-sm font-bold text-brand-deepBlue dark:text-white">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        {showLabel && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${
        size === 'sm' ? 'h-1' : size === 'md' ? 'h-2' : 'h-3'
      }`}>
        <div
          className="h-full bg-gradient-to-r from-brand-cyan to-brand-blue transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};
