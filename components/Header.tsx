import React, { useState, useEffect } from 'react';

interface HeaderProps {
  lang: 'fr' | 'ar';
  t: {
    tagline: string;
    academy1: string;
    academy2: string;
  }
}

export const Header: React.FC<HeaderProps> = ({ lang, t }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2 md:py-3' : 'bg-transparent py-3 md:py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative h-full">
        
        {/* --- Mobile Layout (md:hidden) --- */}
        <div className="md:hidden flex items-center justify-between w-full relative h-[40px]">
             {/* Logo Section */}
             <div className="flex items-center gap-2 z-20 cursor-pointer hover-scale transition-transform" onClick={() => scrollToSection('hero')}>
                <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-colors duration-300 ${
                  isScrolled ? 'border-brand-deepBlue' : 'border-brand-yellow'
                }`}>
                   <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                       isScrolled ? 'border-brand-deepBlue' : 'border-brand-yellow'
                   }`}>
                      <span className={`font-bold text-[10px] leading-none ${
                          isScrolled ? 'text-brand-deepBlue' : 'text-brand-yellow'
                      }`}>C</span>
                   </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <span className={`text-[10px] font-normal leading-none -mb-0.5 ${
                      isScrolled ? 'text-brand-deepBlue' : 'text-brand-yellow'
                  }`}>Coin</span>
                  <span className={`text-[10px] font-black leading-none tracking-wide ${
                      isScrolled ? 'text-brand-deepBlue' : 'text-brand-yellow'
                  }`}>CARRIERE</span>
                </div>
             </div>

             {/* Center: Tagline */}
             <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center pointer-events-none">
                 <span className={`inline-block text-[9px] sm:text-[10px] font-bold italic tracking-wide whitespace-nowrap transition-all duration-500 ${
                     isScrolled ? 'text-brand-deepBlue' : 'text-white animate-heartbeat'
                 }`}>
                   {t.tagline}
                 </span>
             </div>

             {/* Academy Text */}
             <div className="flex flex-col items-end z-20">
                 <span className={`text-[10px] font-bold leading-none ${
                     isScrolled ? 'text-brand-deepBlue' : 'text-white'
                 }`}>{t.academy1}</span>
                 <span className={`text-[10px] font-bold leading-none ${
                     isScrolled ? 'text-brand-deepBlue' : 'text-brand-yellow'
                 }`}>{t.academy2}</span>
             </div>
        </div>


        {/* --- Desktop Layout (hidden md:flex) --- */}
        <div className="hidden md:flex items-center justify-between w-full">
            {/* Logo - Coin CARRIERE */}
            <div className="flex items-center gap-3 cursor-pointer group transition-transform hover-scale" onClick={() => scrollToSection('hero')}>
              <div className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center transition-colors duration-300 ${
                isScrolled ? 'border-brand-deepBlue' : 'border-brand-yellow'
              }`}>
                 <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                     isScrolled ? 'border-brand-deepBlue' : 'border-brand-yellow'
                 }`}>
                    <span className={`font-bold text-sm leading-none ${
                        isScrolled ? 'text-brand-deepBlue' : 'text-brand-yellow'
                    }`}>C</span>
                 </div>
              </div>
              
              <div className="flex flex-col justify-center items-start">
                <span className={`text-xl font-normal leading-none -mb-1 ${
                    isScrolled ? 'text-brand-deepBlue' : 'text-brand-yellow'
                }`}>Coin</span>
                <span className={`text-xl font-black leading-none tracking-wide ${
                    isScrolled ? 'text-brand-deepBlue' : 'text-brand-yellow'
                }`}>CARRIERE</span>
              </div>
            </div>

            {/* Center Tagline */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className={`inline-block font-bold italic text-xl lg:text-2xl tracking-wider transition-all duration-500 ${
                    isScrolled 
                    ? 'text-brand-deepBlue' 
                    : 'text-white animate-heartbeat'
                }`}>
                  {t.tagline}
                </span>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                <nav className={`flex items-center gap-8 ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Media Buying Academy Logo */}
                  <div className={`flex flex-col items-center justify-center leading-none select-none ${lang === 'ar' ? 'pr-6 border-r' : 'pl-6 border-l'} border-gray-300/30`}>
                     <span className={`font-medium text-xl ${isScrolled ? 'text-black' : 'text-white'}`}>
                        {t.academy1}
                     </span>
                     <span className={`font-medium text-xl text-brand-yellow ${isScrolled ? 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]' : ''}`}>
                        {t.academy2}
                     </span>
                  </div>
                </nav>
            </div>
        </div>
      </div>
    </header>
  );
};