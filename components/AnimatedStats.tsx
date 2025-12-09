import React, { useState, useEffect, useRef } from 'react';
import { Users, Building2, TrendingUp, Award } from 'lucide-react';

interface AnimatedStatsProps {
  t: {
    title: string;
    stats: {
      value: number;
      label: string;
      suffix?: string;
    }[];
  };
}

const StatCard: React.FC<{ value: number; label: string; suffix?: string; icon: React.ElementType; delay: number }> = ({ value, label, suffix = '', icon: Icon, delay }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCount();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCount = () => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
  };

  return (
    <div 
      ref={ref}
      className="glass-light p-8 rounded-2xl hover-lift transition-all duration-500 border-2 border-transparent hover:border-brand-yellow/30 scroll-reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="p-4 rounded-full bg-gradient-to-br from-brand-yellow to-brand-lime shadow-lg shadow-brand-yellow/30">
          <Icon className="w-8 h-8 text-brand-deepBlue" />
        </div>
        <div>
          <div className="text-4xl md:text-5xl font-black text-brand-deepBlue mb-2">
            {count}{suffix}
          </div>
          <div className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AnimatedStats: React.FC<AnimatedStatsProps> = ({ t }) => {
  const icons = [Users, Building2, TrendingUp, Award];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-40 h-40 bg-brand-cyan/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-brand-yellow/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text-cyan-yellow scroll-reveal">
          {t.title}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {t.stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              icon={icons[index]}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
