import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  t: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, t }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const timeUnits = [
    { value: timeLeft.days, label: t.days },
    { value: timeLeft.hours, label: t.hours },
    { value: timeLeft.minutes, label: t.minutes },
    { value: timeLeft.seconds, label: t.seconds }
  ];

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6 animate-fade-in-up delay-500">
      {timeUnits.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-brand-yellow to-brand-lime rounded-xl md:rounded-2xl p-3 md:p-4 shadow-2xl shadow-brand-yellow/30 hover:scale-105 transition-transform duration-300">
                <span className="text-2xl md:text-4xl lg:text-5xl font-black text-brand-deepBlue tabular-nums">
                  {formatNumber(unit.value)}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow to-brand-lime rounded-xl md:rounded-2xl blur-md opacity-50 -z-10 animate-glow-pulse"></div>
            </div>
            <span className="text-xs md:text-sm font-bold text-white/80 mt-2 uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
          {index < timeUnits.length - 1 && (
            <span className="text-2xl md:text-4xl font-bold text-brand-yellow animate-pulse hidden sm:block">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
