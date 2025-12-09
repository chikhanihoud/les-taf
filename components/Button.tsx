import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  loading = false,
  fullWidth = false,
  disabled,
  onClick,
  ...props 
}) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = Date.now();

    setRipples(prev => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 600);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      createRipple(event);
      onClick?.(event);
    }
  };

  const baseStyles = "px-8 py-3 rounded-full transition-all duration-300 font-hero shadow-lg transform hover:scale-105 hover:shadow-2xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantStyles = "";
  
  switch (variant) {
    case 'primary':
      variantStyles = "bg-brand-yellow text-brand-deepBlue hover:bg-brand-lime focus:ring-brand-yellow hover:shadow-brand-yellow/50";
      break;
    case 'secondary':
      variantStyles = "bg-brand-deepBlue text-brand-yellow hover:bg-brand-darkBlue focus:ring-brand-deepBlue hover:shadow-brand-deepBlue/50";
      break;
    case 'outline':
      variantStyles = "border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-deepBlue hover:shadow-brand-yellow/30";
      break;
  }

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${widthClass} ${className}`}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%) scale(0)',
            animation: 'ripple 0.6s ease-out'
          }}
        />
      ))}
      
      {/* Content */}
      <span className="relative flex items-center justify-center gap-2">
        {loading && <LoadingSpinner size="sm" color={variant === 'primary' ? 'cyan' : 'yellow'} />}
        {children}
      </span>
    </button>
  );
};