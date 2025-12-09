import React from 'react';
import { Button } from './Button';
import { Facebook, Instagram, Linkedin, ArrowUp, Lock, Globe } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
  lang: 'fr' | 'ar';
  onToggleLang: () => void;
  t: {
    mainCta: string;
    mainCtaHighlight: string;
    button: string;
    desc: string;
    followUs: string;
    rights: string;
    admin: string;
    backToTop: string;
    switchLang: string;
  }
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick, lang, onToggleLang, t }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-brand-deepBlue via-brand-darkBlue to-brand-deepBlue text-white pt-20 pb-10 relative overflow-hidden">
      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-brand-yellow/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-brand-cyan/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Final CTA */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-8 glass-dark p-10 rounded-3xl border-2 border-brand-yellow/20 hover-lift transition-all duration-500 scroll-reveal">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text">
            {t.mainCta} <br />
            <span className="text-brand-yellow">{t.mainCtaHighlight}</span>
          </h2>
          <Button onClick={scrollToRegister} className="text-xl px-12 py-4 hover-glow transition-all duration-300">
            {t.button}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-t border-white/10 pt-10">
          <div className="max-w-md flex flex-col items-start gap-2">
             {/* Logo Section */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg border-2 border-brand-yellow flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-brand-yellow flex items-center justify-center">
                        <span className="font-bold text-sm text-brand-yellow leading-none">C</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center text-brand-yellow">
                    <span className="text-lg font-normal leading-none -mb-1">Coin</span>
                    <span className="text-lg font-black leading-none tracking-wide">CARRIERE</span>
                </div>
            </div>
            
             {/* Text under logo */}
            <div className="mt-1">
                 <p className="text-gray-400 dark:text-gray-300 text-sm leading-relaxed max-w-xs">
                    {t.desc}
                 </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-brand-yellow text-right md:text-left rtl:md:text-right">{t.followUs}</h4>
            <div className="flex gap-4 justify-end md:justify-start rtl:md:justify-end">
              <a href="https://web.facebook.com/profile.php?id=61583302304374" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-blue hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/50">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/coin.carriere/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-pink-600/50">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/coin-carriere/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-blue-700/50">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 dark:text-gray-300">
          <p>{t.rights}</p>
          
          <div className="flex items-center gap-6 mt-4 md:mt-0">
             <button onClick={onToggleLang} className="flex items-center gap-2 hover:text-white transition-all duration-300 bg-white/10 px-3 py-1 rounded-full border border-white/20 hover:border-brand-yellow hover:bg-white/20 hover:scale-105">
                <Globe size={12} /> {t.switchLang}
             </button>

             {onAdminClick && (
                <button onClick={onAdminClick} className="flex items-center gap-1 hover:text-white transition-all duration-300 opacity-50 hover:opacity-100 hover:scale-105">
                    <Lock size={12} /> {t.admin}
                </button>
             )}
             <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-brand-yellow transition-all duration-300 hover:scale-105">
                {t.backToTop} <ArrowUp className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};