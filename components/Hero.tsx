import React from 'react';
import { Button } from './Button';
import { CountdownTimer } from './CountdownTimer';

interface HeroProps {
  t: {
    title: string;
    subtitle: string;
    date: string;
    sector: string;
    cta: string;
    countdown: {
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
  }
}

export const Hero: React.FC<HeroProps> = ({ t }) => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-brand-deepBlue bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://i.ibb.co/2G0kxJk/Design-sans-titre-21.png")',
        backgroundPositionY: `${scrollY * 0.5}px`
      }}
    >
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 gradient-overlay-animated"></div>

      {/* Floating Shapes */}
      <div className="floating-shape floating-shape-1"></div>
      <div className="floating-shape floating-shape-2"></div>
      <div className="floating-shape floating-shape-3"></div>

      {/* Decorative Side Patterns - Hidden on mobile, maintained for desktop visual balance */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-24 flex flex-col justify-between py-10 z-10 pointer-events-none select-none hidden md:flex">
         <div className="space-y-0">
             <div className="w-16 h-16 md:w-24 md:h-24 bg-brand-deepBlue border-r-[16px] md:border-r-[24px] border-b-[16px] md:border-b-[24px] border-brand-darkBlue rounded-br-full mb-0"></div>
             <div className="w-16 h-16 md:w-24 md:h-24 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle,_#1875bb_2px,_transparent_2.5px)] bg-[length:8px_8px] opacity-50 rounded-tr-full"></div>
             </div>
             <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-yellow rounded-full ml-2 md:ml-4 my-4"></div>
             <div className="w-16 h-16 md:w-24 md:h-24 bg-brand-blue rounded-tr-full mb-0"></div>
             <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-deepBlue border-4 border-brand-darkBlue rounded-full ml-2 md:ml-4 my-4"></div>
             <div className="w-16 h-16 md:w-24 md:h-24 bg-brand-yellow rounded-br-full"></div>
             <div className="w-16 h-16 md:w-24 md:h-24 bg-brand-blue rounded-tr-full"></div>
             <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-deepBlue border-4 border-brand-darkBlue rounded-full ml-2 md:ml-4"></div>
             <div className="w-16 h-16 md:w-24 md:h-24 relative overflow-hidden mt-4">
                 <div className="absolute inset-0 bg-[radial-gradient(circle,_#1875bb_2px,_transparent_2.5px)] bg-[length:8px_8px] opacity-50 rounded-br-full"></div>
             </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-yellow rounded-full ml-2 md:ml-4 mt-4"></div>
         </div>
      </div>

       <div className="absolute top-0 bottom-0 right-0 w-16 md:w-24 flex flex-col justify-between py-10 z-10 pointer-events-none select-none hidden md:flex">
         <div className="space-y-0 flex flex-col items-end">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-darkBlue rounded-full mr-2 md:mr-4 mb-4"></div>
             <div className="w-16 h-16 md:w-24 md:h-24 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[radial-gradient(circle,_#1875bb_2px,_transparent_2.5px)] bg-[length:8px_8px] opacity-50 rounded-tl-full"></div>
             </div>
             <div className="w-16 h-16 md:w-24 md:h-24 bg-brand-yellow rounded-bl-full my-0"></div>
             <div className="w-16 h-16 md:w-24 md:h-24 border-l-[16px] md:border-l-[24px] border-b-[16px] md:border-b-[24px] border-white rounded-bl-full"></div>
             <div className="w-16 h-16 md:w-24 md:h-24 relative overflow-hidden mt-4">
                 <div className="absolute inset-0 bg-[radial-gradient(circle,_#dcfe11_2px,_transparent_2.5px)] bg-[length:8px_8px] opacity-50 rounded-tl-full"></div>
             </div>
             <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-blue rounded-full mr-2 md:mr-4 my-4"></div>
             <div className="w-16 h-16 md:w-24 md:h-24 bg-brand-yellow rounded-tl-full"></div>
             <div className="w-16 h-16 md:w-24 md:h-24 bg-brand-darkBlue rounded-bl-full"></div>
             <div className="w-16 h-16 md:w-24 md:h-24 relative overflow-hidden mt-4">
                 <div className="absolute inset-0 bg-[radial-gradient(circle,_#1875bb_2px,_transparent_2.5px)] bg-[length:8px_8px] opacity-50 rounded-tl-full"></div>
             </div>
             <div className="w-16 h-16 md:w-24 md:h-24 bg-brand-yellow rounded-bl-full mt-4"></div>
         </div>
      </div>


      <div className="container mx-auto px-4 relative z-20 flex flex-col items-center text-center">
        <div className="flex flex-col items-center max-w-5xl w-full">
          
          <div className="flex flex-col items-center gap-2 md:gap-4 w-full">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight gradient-text uppercase leading-none drop-shadow-lg animate-fade-in-up">
                {t.title}
              </h1>
              
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-brand-cyan uppercase tracking-wide leading-none drop-shadow-md animate-fade-in-up delay-100">
                {t.subtitle}
              </h2>

              {/* Date Line */}
              <div className="flex items-center justify-center gap-4 w-full animate-fade-in-up delay-200">
                <div className="h-1 bg-brand-yellow w-12 md:w-20 rounded-full hidden sm:block shadow-sm glow-yellow"></div>
                <span className="text-xl md:text-3xl font-bold text-white uppercase tracking-widest whitespace-nowrap leading-none drop-shadow-md">
                  {t.date}
                </span>
                <div className="h-1 bg-brand-yellow w-12 md:w-20 rounded-full hidden sm:block shadow-sm glow-yellow"></div>
              </div>
              
              <p className="text-lg md:text-2xl font-bold text-white uppercase tracking-wider leading-none drop-shadow-md animate-fade-in-up delay-300">
                {t.sector}
              </p>
          </div>

          {/* Countdown Timer */}
          <div className="mt-8">
            <CountdownTimer 
              targetDate={new Date('2026-01-26T09:00:00')} 
              t={t.countdown}
            />
          </div>

          {/* CTA Button */}
          <div className="pt-10 animate-fade-in-up delay-400">
            <Button onClick={scrollToRegister} className="text-base md:text-lg px-8 py-3 hover-glow transition-all duration-300 hover:scale-105">
              {t.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};