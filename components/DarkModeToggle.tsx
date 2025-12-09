import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

export const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-24 right-6 z-50 p-3 rounded-full glass-dark hover-glow transition-all duration-300 hover:scale-110 group"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <Sun 
          className={`absolute inset-0 w-6 h-6 text-brand-yellow transition-all duration-500 ${
            isDarkMode 
              ? 'opacity-0 rotate-90 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        
        {/* Moon Icon */}
        <Moon 
          className={`absolute inset-0 w-6 h-6 text-brand-cyan transition-all duration-500 ${
            isDarkMode 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-brand-deepBlue text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        {isDarkMode ? 'Mode clair' : 'Mode sombre'}
      </span>
    </button>
  );
};
