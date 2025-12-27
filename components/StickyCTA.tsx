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
    <div className="fixed bottom-24 right-6 z-50 animate-fade-in">
      <Button
        onClick={onClick}
        className="shadow-2xl shadow-brand-yellow/30 hover-glow transition-all duration-300 hover:scale-105 px-5 py-2 text-sm md:text-base flex items-center gap-2 backdrop-blur-md bg-brand-yellow/95 border border-white/20"
      >
        <span className="bg-brand-deepBlue text-brand-yellow rounded-full p-1 w-6 h-6 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
        </span>
        <span className="font-bold tracking-tight">{text}</span>
      </Button>
    </div>
  );
};
