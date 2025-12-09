import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from './Button';

interface VideoSectionProps {
  t: {
    title: string;
    thumbnailText: string;
    subtitleInfo: string;
    cta: string;
  }
}

export const VideoSection: React.FC<VideoSectionProps> = ({ t }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "x9uwwra";

  return (
    <section id="video" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Floating Shapes */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-brand-cyan/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-brand-yellow/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto mb-12 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-deepBlue mb-4 gradient-text-cyan-yellow">
            {t.title}
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video group cursor-pointer hover-lift transition-all duration-500 border-2 border-transparent hover:border-brand-yellow/30 scroll-reveal" onClick={() => setIsPlaying(true)}>
          {!isPlaying ? (
            <>
              <img 
                src={`https://www.dailymotion.com/thumbnail/video/${videoId}`}
                alt="Video Thumbnail" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-brand-yellow rounded-full flex items-center justify-center pl-2 shadow-2xl shadow-brand-yellow/60 group-hover:scale-125 group-hover:shadow-brand-yellow/80 transition-all duration-500 animate-glow-pulse">
                  <Play className="w-10 h-10 text-brand-deepBlue fill-current" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 text-left rtl:text-right rtl:right-6 rtl:left-auto">
                <p className="text-white font-bold text-lg drop-shadow-lg">{t.thumbnailText}</p>
                <p className="text-gray-200 font-light text-sm drop-shadow-md">{t.subtitleInfo}</p>
              </div>
            </>
          ) : (
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.dailymotion.com/embed/video/${videoId}?autoplay=1&mute=1`}
              title="Dailymotion video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          )}
        </div>

        <div className="mt-12 scroll-reveal">
           <Button variant="primary" onClick={() => document.getElementById('register')?.scrollIntoView({behavior: 'smooth'})}>
              {t.cta}
           </Button>
        </div>
      </div>
    </section>
  );
};