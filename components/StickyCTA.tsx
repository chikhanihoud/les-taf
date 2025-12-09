import React, { useState, useEffect } from 'react';
import { Button } from './Button';

interface StickyCTAProps {
  onClick: () => void;
  text: string;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({ onClick, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past hero section (approximately 100vh)
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Button
        onClick={onClick}
        className="shadow-2xl shadow-brand-yellow/50 hover-glow transition-all duration-300 hover:scale-110 px-6 py-3 text-base md:text-lg"
      >
        {text}
      </Button>
    </div>
  );
};
