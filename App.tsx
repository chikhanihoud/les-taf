import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { RegistrationForm } from './components/RegistrationForm';
import { Benefits } from './components/Benefits';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { StickyCTA } from './components/StickyCTA';
import { ToastContainer } from './components/Toast';
import { ToastProvider } from './contexts/ToastContext';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { DarkModeToggle } from './components/DarkModeToggle';
import { AnimatedStats } from './components/AnimatedStats';
import { FAQ } from './components/FAQ';
import { translations } from './translations';

function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [lang, setLang] = useState<'fr' | 'ar'>('fr');

  useEffect(() => {
    // Update HTML dir attribute for RTL support
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Scroll Reveal Animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [view]);

  const toggleLang = () => {
    setLang(prev => prev === 'fr' ? 'ar' : 'fr');
  };

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (view === 'dashboard') {
    return <Dashboard onBack={() => setView('landing')} />;
  }

  const t = translations[lang];

  return (
    <DarkModeProvider>
      <ToastProvider>
        <div className={`${lang === 'ar' ? 'font-arabic' : 'font-sans'} text-gray-900 bg-white dark:bg-brand-deepBlue dark:text-white selection:bg-brand-yellow selection:text-brand-deepBlue transition-colors duration-300`}>
          <Header lang={lang} t={t.header} />
          <main>
            <Hero t={t.hero} />
            <AnimatedStats t={t.stats} />
            <VideoSection t={t.video} />
            <Benefits t={t.benefits} />
            <RegistrationForm t={t.registration} lang={lang} />
            <Testimonials t={t.testimonials} lang={lang} />
            <FAQ t={t.faq} />
          </main>
          <Footer 
            onAdminClick={() => setView('dashboard')} 
            t={t.footer} 
            lang={lang}
            onToggleLang={toggleLang}
          />
          <StickyCTA onClick={scrollToRegister} text={t.hero.cta} />
          <DarkModeToggle />
          <ToastContainer />
        </div>
      </ToastProvider>
    </DarkModeProvider>
  );
}

export default App;