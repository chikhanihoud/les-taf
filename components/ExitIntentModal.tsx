import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { X, Mail, CheckCircle, Loader2 } from 'lucide-react';

// Google Script for Leads
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxH7pA84eSlAImvTU_MZugt2mBQkVlRHSNIAK5L8TT7NS9MjqvO99zWPgU7kYb8yuar/exec";

interface ExitIntentModalProps {
  lang: 'fr' | 'ar';
  t: any; // Using any for flexibility with quick translation updates
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ lang, t }) => {
  /* 
     State for full registration form
  */
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Translations for the modal
  const content = t.exitModal;
  const isRtl = lang === 'ar';

  useEffect(() => {
    // Check if already shown in this session
    if (sessionStorage.getItem('exitModalShown')) return;

    // 1. Desktop Exit Intent: Mouse leaves top of window
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        triggerModal();
      }
    };

    // 2. Mobile/General: Visibility Change (switching tabs/apps)
    const handleVisibilityChange = () => {
       if (document.visibilityState === 'hidden') {
           triggerModal();
       }
    };

    // 3. Mobile: Back Button Interception
    const handlePopState = (e: PopStateEvent) => {
        triggerModal();
    };

    if (!sessionStorage.getItem('exitModalShown')) {
        window.history.pushState({ modal: true }, "", window.location.href);
    }
    
    // REMOVED: Fast Scroll Up detection

    const triggerModal = () => {
        if (!sessionStorage.getItem('exitModalShown')) {
            setIsOpen(true);
            sessionStorage.setItem('exitModalShown', 'true');
        }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Minimal Validation
    if (!formData.name.trim()) {
        setError(lang === 'ar' ? 'الاسم مطلوب' : 'Le nom est requis');
        return;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        setError(lang === 'ar' ? 'البريد الإلكتروني غير صالح' : 'Email invalide');
        return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
        setError(lang === 'ar' ? 'رقم الهاتف غير صالح' : 'Numéro de téléphone invalide');
        return;
    }

    setIsSubmitting(true);
    
    // Prepare full registration data
    const leadData = {
        date: new Date().toLocaleDateString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: "Exit Intent Signup" // Auto-filled source
    };

    try {
         await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        });

        // Store locally
        const existing = JSON.parse(localStorage.getItem('leads') || '[]');
        localStorage.setItem('leads', JSON.stringify([...existing, leadData]));

        await new Promise(r => setTimeout(r, 1000));
        
        setIsSuccess(true);
        setTimeout(() => {
            setIsOpen(false);
        }, 4000); 
        
    } catch (err) {
        console.error("Submission error", err);
    } finally {
        setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-brand-yellow overflow-hidden animate-scale-in"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Close Button */}
        <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
        >
            <X size={24} />
        </button>

        {!isSuccess ? (
            <div className="p-8">
                <div className="text-center mb-6">
                    <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-600 text-sm font-bold mb-3 animate-pulse">
                        {content.title}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {content.subtitle}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {content.text}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Name Input */}
                    <input
                        type="text"
                        name="name"
                        placeholder={content.placeholderName}
                        className={`w-full bg-gray-50 dark:bg-slate-800 border focus:ring-2 border-gray-200 dark:border-slate-700 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-blue focus:ring-brand-blue/20 transition-all`}
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />

                    {/* Email Input */}
                    <div className="relative">
                        <Mail className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3' : 'left-3'} text-gray-400`} size={20} />
                        <input
                            type="email"
                            name="email"
                            placeholder={content.placeholder}
                            className={`w-full bg-gray-50 dark:bg-slate-800 border focus:ring-2 border-gray-200 dark:border-slate-700 rounded-xl py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} focus:outline-none focus:border-brand-blue focus:ring-brand-blue/20 transition-all`}
                            value={formData.email} 
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>

                    {/* Phone Input */}
                    <input
                        type="tel"
                        name="phone"
                        placeholder={content.placeholderPhone}
                        className={`w-full bg-gray-50 dark:bg-slate-800 border focus:ring-2 border-gray-200 dark:border-slate-700 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-blue focus:ring-brand-blue/20 transition-all`}
                        style={{ textAlign: isRtl ? 'right' : 'left', direction: 'ltr' }} 
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />

                    {error && <p className="text-red-500 text-xs mt-1 text-center font-semibold">{error}</p>}

                    <Button 
                        type="submit" 
                        className="w-full py-4 text-lg font-bold shadow-lg hover:shadow-brand-yellow/30"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : content.button}
                    </Button>
                </form>

                <button 
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center mt-4 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 underline decoration-gray-300"
                >
                    {content.close}
                </button>
            </div>
        ) : (
            <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {lang === 'ar' ? 'تم التسجيل بنجاح!' : 'Inscription réussie !'}
                </h3>
                <p className="text-sm text-gray-500">
                    {lang === 'ar' ? 'سنتصل بك قريباً.' : 'Nous vous contacterons bientôt.'}
                </p>
            </div>
        )}
      </div>
    </div>
  );
};
