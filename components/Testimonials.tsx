import React from 'react';
import { Quote } from 'lucide-react';
import { TestimonialItem } from '../types';

interface TestimonialsProps {
  lang: 'fr' | 'ar';
  t: {
    title: string;
  }
}

const testimonials: TestimonialItem[] = [
  {
    quoteFr: "Grâce aux Media Buyers, nos ventes ont augmenté de 35%.",
    quoteAr: "بفضل الميديا بايرز، زادت مبيعاتنا بنسبة 35%.",
    author: "Mohamed",
    location: "Casablanca",
    image: "https://i.ibb.co/VcWwn845/Generated-Image-December-01-2025-10-42-PM.png"
  },
  {
    quoteFr: "Une organisation impeccable et des profils très compétents.",
    quoteAr: "تنظيم لا تشوبه شائبة وملفات تعريف ذات كفاءة عالية.",
    author: "Fatima",
    location: "Rabat",
    image: "https://i.ibb.co/XhS5dyy/Generated-Image-December-01-2025-10-48-PM.png"
  },
  {
    quoteFr: "Le meilleur investissement pour notre agence cette année.",
    quoteAr: "أفضل استثمار لوكالتنا هذا العام.",
    author: "Karim",
    location: "Marrakech",
    image: "https://i.ibb.co/4RshVL1C/Generated-Image-December-01-2025-10-53-PM.png"
  }
];

export const Testimonials: React.FC<TestimonialsProps> = ({ t, lang }) => {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-brand-darkBlue via-brand-deepBlue to-brand-darkBlue text-white relative overflow-hidden">
      {/* Floating Shapes */}
      <div className="absolute top-10 right-20 w-40 h-40 bg-brand-yellow/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-20 w-32 h-32 bg-brand-cyan/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text scroll-reveal">
          {t.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div 
              key={idx} 
              className="glass-dark p-8 rounded-xl relative hover-lift transition-all duration-500 border-2 border-transparent hover:border-brand-yellow/30 scroll-reveal"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <Quote className={`absolute top-4 w-12 h-12 text-brand-cyan/30 transition-all duration-300 group-hover:text-brand-cyan/50 ${lang === 'ar' ? 'left-4 transform scale-x-[-1]' : 'right-4'}`} />
              <div className="mb-6">
                 {/* Avatar placeholder */}
                 <div className="w-16 h-16 rounded-full bg-gray-300 mb-4 overflow-hidden border-3 border-brand-yellow shadow-lg shadow-brand-yellow/30 hover-scale transition-transform">
                    <img 
                      src={item.image || `https://picsum.photos/100/100?random=${idx + 10}`} 
                      alt={item.author} 
                      className="w-full h-full object-cover"
                    />
                 </div>
                 <p className="text-lg font-medium mb-2 leading-relaxed text-white/90">
                   "{lang === 'ar' ? (item.quoteAr || item.quoteFr) : item.quoteFr}"
                 </p>
              </div>
              <div className="border-t border-white/20 pt-4">
                <p className="font-bold text-brand-yellow">{item.author}</p>
                <p className="text-sm text-gray-300">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};