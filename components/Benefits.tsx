import React from 'react';

interface BenefitsProps {
  t: {
    sectionTitle: string;
    items: {
      title: string;
      description: string;
    }[]
  }
}

const images = [
  "https://i.ibb.co/7NRSRkkL/Generated-Image-December-01-2025-8-26-PM.png",
  "https://i.ibb.co/d0BzSqjr/Generated-Image-December-01-2025-8-44-PM.png",
  "https://i.ibb.co/fdc3YHC2/Generated-Image-December-01-2025-9-06-PM.png",
  "https://i.ibb.co/m5VFpXpP/Generated-Image-December-01-2025-9-37-PM.png"
];

export const Benefits: React.FC<BenefitsProps> = ({ t }) => {
  return (
    <section id="benefits" className="py-24 bg-gradient-to-br from-brand-blue via-brand-darkBlue to-brand-deepBlue relative overflow-hidden">
      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-cyan/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold text-white gradient-text-cyan-yellow">{t.sectionTitle}</h2>
            <div className="w-24 h-1 bg-brand-yellow mx-auto glow-yellow rounded-full"></div>
        </div>

        {/* Grid Section */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {t.items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover-lift transition-all duration-500 flex flex-col h-full group border-2 border-transparent hover:border-brand-yellow hover:shadow-brand-yellow/20 scroll-reveal"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-64 overflow-hidden bg-gray-100 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deepBlue/30 to-transparent group-hover:from-brand-deepBlue/10 transition-all duration-500 z-10"></div>
                <img 
                  src={images[index]} 
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col text-center justify-center bg-gradient-to-br from-white to-gray-50 group-hover:from-brand-yellow/5 group-hover:to-white transition-all duration-500">
                <h3 className="text-xl md:text-2xl font-bold text-brand-deepBlue mb-4 leading-tight group-hover:text-brand-blue transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium text-lg group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};