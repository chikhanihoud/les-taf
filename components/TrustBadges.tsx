import React from 'react';

interface TrustBadgesProps {
  t: {
    title: string;
  };
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({ t }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-700 dark:text-gray-200 scroll-reveal">
          {t.title}
        </h3>
      </div>
    </section>
  );
};

