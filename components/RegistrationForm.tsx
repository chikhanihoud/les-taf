import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { ShieldCheck, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

// NEW Webhook URL for JSON Data
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxH7pA84eSlAImvTU_MZugt2mBQkVlRHSNIAK5L8TT7NS9MjqvO99zWPgU7kYb8yuar/exec";

interface RegistrationFormProps {
  lang: 'fr' | 'ar';
  t: {
    title: string;
    exclusive: string;
    steps: { title: string; desc: string; }[];
    form: {
      title: string;
      subtitle: string;
      security: string;
      successTitle: string;
      successMsg: string;
      wizard: {
        next: string;
        submit: string;
        q1: string; p1: string;
        q2: string; p2: string;
        q3: string; p3: string;
        q4: string; p4: string;
        errEmpty: string;
        errEmail: string;
        errPhone: string;
      }
    }
  }
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ t, lang }) => {
  const [step, setStep] = useState(0); // 0: Name, 1: Email, 2: Phone, 3: Company
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    company: ''
  });
  const [currentInput, setCurrentInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when step changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setError(null);
    
    // Pre-fill input if we went back (optional, here we just use empty or current state mapping)
    switch(step) {
      case 0: setCurrentInput(formData.fullname); break;
      case 1: setCurrentInput(formData.email); break;
      case 2: setCurrentInput(formData.phone); break;
      case 3: setCurrentInput(formData.company); break;
    }
  }, [step]);

  const validateStep = (value: string, currentStep: number) => {
    if (!value.trim()) return t.form.wizard.errEmpty;

    if (currentStep === 1) { // Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return t.form.wizard.errEmail;
    }

    if (currentStep === 2) { // Phone
      // Basic check: at least 8 digits
      const phoneClean = value.replace(/\D/g, '');
      if (phoneClean.length < 8) return t.form.wizard.errPhone;
    }

    return null;
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateStep(currentInput, step);
    
    if (validationError) {
      setError(validationError);
      // Shake animation logic could go here
      return;
    }

    // Save current answer
    const newData = { ...formData };
    if (step === 0) newData.fullname = currentInput;
    if (step === 1) newData.email = currentInput;
    if (step === 2) newData.phone = currentInput;
    if (step === 3) newData.company = currentInput;
    
    setFormData(newData);

    if (step < 3) {
      setStep(step + 1);
      setCurrentInput(''); // Clear for next step (or use newData values if we wanted persist)
    } else {
      // Final Step: Submit
      await submitData(newData);
    }
  };

  const submitData = async (finalData: typeof formData) => {
    setIsSubmitting(true);
    
    // 1. Save Locally (Backup)
    try {
        const newLead = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            name: finalData.fullname,
            email: finalData.email,
            phone: finalData.phone,
            company: finalData.company
        };
        const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
        localStorage.setItem('leads', JSON.stringify([...existingLeads, newLead]));
    } catch (e) {
        console.error("Local storage error", e);
    }

    // 2. Send JSON to Webhook
    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // standard for Google Scripts
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalData)
        });
    } catch (err) {
        console.error("Webhook error", err);
    }

    // Artificial delay for UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const getCurrentQuestion = () => {
    switch(step) {
      case 0: return { q: t.form.wizard.q1, p: t.form.wizard.p1, type: 'text' };
      case 1: return { q: t.form.wizard.q2, p: t.form.wizard.p2, type: 'email' };
      case 2: return { q: t.form.wizard.q3, p: t.form.wizard.p3, type: 'tel' };
      case 3: return { q: t.form.wizard.q4, p: t.form.wizard.p4, type: 'text' };
      default: return { q: '', p: '', type: 'text' };
    }
  };

  const currentQ = getCurrentQuestion();
  const progress = ((step + 1) / 4) * 100;

  return (
    <section id="register" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
          
          {/* Left Side: Steps Context */}
          <div className="lg:w-1/2 space-y-8 pt-10">
            <h2 className="text-4xl font-bold text-brand-deepBlue leading-tight">
              {t.title} <span className="text-brand-blue">{t.exclusive}</span>
            </h2>
            <div className="space-y-6">
                {t.steps.map((stepItem, idx) => (
                  <div key={idx} className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-cyan/10 flex items-center justify-center shrink-0">
                          <span className="text-brand-cyan font-bold text-xl">{idx + 1}</span>
                      </div>
                      <div>
                          <h4 className="font-bold text-brand-deepBlue text-lg">{stepItem.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300">{stepItem.desc}</p>
                      </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Right Side: Wizard Form */}
          <div className="lg:w-5/12 w-full">
            <div className="glass-strong rounded-2xl shadow-2xl p-8 border-2 border-brand-yellow/20 relative overflow-hidden min-h-[400px] flex flex-col hover-lift transition-all duration-500">
              
              {!submitted ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 animate-fade-in">{t.form.title}</h3>
                    {/* Progress Bar */}
                    <div className="w-full bg-brand-darkBlue/50 h-2 rounded-full overflow-hidden backdrop-blur-sm">
                        <div 
                            className="h-full transition-all duration-500 ease-out relative overflow-hidden"
                            style={{ 
                              width: `${progress}%`,
                              background: 'linear-gradient(90deg, #dcfe11 0%, #ccfa04 50%, #b4dc02 100%)'
                            }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                        </div>
                    </div>
                    <p className="text-brand-cyan text-sm mt-2 text-right font-semibold">
                       Step {step + 1} / 4
                    </p>
                  </div>

                  <form onSubmit={handleNext} className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                        <label className="block text-xl md:text-2xl font-bold text-white leading-relaxed animate-fade-in">
                            {currentQ.q}
                        </label>
                        
                        <div className="relative">
                            <input 
                                ref={inputRef}
                                type={currentQ.type}
                                className={`w-full bg-white/5 border-b-2 text-white text-xl md:text-2xl py-3 px-2 focus:outline-none transition-all duration-300 placeholder-white/40 rounded-t-lg ${
                                  error 
                                    ? 'border-red-500 animate-shake' 
                                    : 'border-brand-yellow focus:border-brand-lime focus:bg-white/10 focus:shadow-lg focus:shadow-brand-yellow/20'
                                }`}
                                placeholder={currentQ.p}
                                value={currentInput}
                                onChange={(e) => setCurrentInput(e.target.value)}
                                disabled={isSubmitting}
                                style={{ direction: 'ltr', textAlign: lang === 'ar' && currentQ.type === 'tel' ? 'right' : (lang === 'ar' ? 'right' : 'left') }}
                            />
                            {error && (
                                <p className="text-red-400 text-sm mt-2 animate-pulse absolute -bottom-8 left-0 font-semibold">
                                    {error}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-12">
                        <Button 
                            type="submit" 
                            className="w-full text-lg shadow-xl flex items-center justify-center gap-2 hover-glow transition-all duration-300 hover:scale-105" 
                            style={{ backgroundColor: '#b4dc02' }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    {step === 3 ? t.form.wizard.submit : t.form.wizard.next}
                                    {step < 3 && (lang === 'ar' ? <ArrowRight className="transform rotate-180" /> : <ArrowRight />)}
                                </>
                            )}
                        </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-scale-in">
                    <div className="w-24 h-24 bg-brand-lime rounded-full flex items-center justify-center mb-4 shadow-lg shadow-brand-lime/40 animate-bounce">
                        <CheckCircle2 className="w-12 h-12 text-brand-deepBlue" />
                    </div>
                    <h3 className="text-3xl font-bold text-white animate-fade-in-up">{t.form.successTitle}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed animate-fade-in-up delay-100">{t.form.successMsg}</p>
                </div>
              )}

              {/* Security Footnote */}
              {!submitted && (
                  <div className="flex items-center justify-center gap-2 text-xs text-brand-cyan/80 mt-6 pt-4 border-t border-white/10">
                    <ShieldCheck size={14} />
                    <span>{t.form.security}</span>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};