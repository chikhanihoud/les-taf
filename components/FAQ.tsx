import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQProps {
  t: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
}

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="glass-light rounded-xl overflow-hidden border-2 border-transparent hover:border-brand-yellow/20 transition-all duration-300">
      <button
        onClick={onClick}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-white/50 transition-colors duration-300"
      >
        <span className="text-lg font-bold text-brand-deepBlue pr-4">{question}</span>
        <ChevronDown 
          className={`w-6 h-6 text-brand-yellow flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="p-6 pt-0 text-gray-700 dark:text-gray-300 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

export const FAQ: React.FC<FAQProps> = ({ t }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-20 left-10 w-40 h-40 bg-brand-cyan/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-brand-yellow/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text-cyan-yellow scroll-reveal">
          {t.title}
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {t.items.map((item, index) => (
            <div key={index} className="scroll-reveal" style={{ animationDelay: `${index * 100}ms` }}>
              <FAQItem
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => toggleItem(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
