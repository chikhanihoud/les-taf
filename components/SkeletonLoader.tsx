import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string;
  height?: string;
  className?: string;
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width = '100%',
  height,
  className = '',
  count = 1
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700 animate-pulse';
  
  const shimmerClasses = 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent';

  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-lg';
      case 'text':
        return 'rounded h-4';
      case 'card':
        return 'rounded-xl';
      default:
        return 'rounded';
    }
  };

  const getDefaultHeight = () => {
    if (height) return height;
    switch (variant) {
      case 'circular':
        return width;
      case 'text':
        return '1rem';
      case 'card':
        return '200px';
      default:
        return '100px';
    }
  };

  const skeletonElement = (
    <div
      className={`${baseClasses} ${shimmerClasses} ${getVariantClasses()} ${className}`}
      style={{ width, height: getDefaultHeight() }}
      aria-label="Loading..."
      role="status"
    />
  );

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <React.Fragment key={index}>{skeletonElement}</React.Fragment>
        ))}
      </div>
    );
  }

  return skeletonElement;
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-4 mb-4">
        <SkeletonLoader variant="circular" width="48px" />
        <div className="flex-1 space-y-2">
          <SkeletonLoader variant="text" width="60%" />
          <SkeletonLoader variant="text" width="40%" />
        </div>
      </div>
      <SkeletonLoader variant="rectangular" height="150px" className="mb-4" />
      <SkeletonLoader variant="text" count={3} />
    </div>
  );
};
