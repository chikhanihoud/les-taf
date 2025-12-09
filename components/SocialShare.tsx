import React from 'react';
import { Facebook, Twitter, Linkedin, Share2, Link as LinkIcon } from 'lucide-react';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = "Salon d'Emploi — Media Buying 2026",
  description = "Rejoignez le Salon d'Emploi pour recruter les meilleurs Media Buyers",
  className = ''
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
  };

  const handleShare = (platform: string) => {
    const link = shareLinks[platform as keyof typeof shareLinks];
    if (link) {
      window.open(link, '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Partager:</span>
      
      {/* Facebook */}
      <button
        onClick={() => handleShare('facebook')}
        className="group relative p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-110 hover-glow"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Facebook
        </span>
      </button>

      {/* Twitter */}
      <button
        onClick={() => handleShare('twitter')}
        className="group relative p-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white transition-all duration-300 hover:scale-110 hover-glow"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Twitter
        </span>
      </button>

      {/* LinkedIn */}
      <button
        onClick={() => handleShare('linkedin')}
        className="group relative p-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-all duration-300 hover:scale-110 hover-glow"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          LinkedIn
        </span>
      </button>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className="group relative p-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white transition-all duration-300 hover:scale-110 hover-glow"
        aria-label="Copy link"
      >
        <LinkIcon className="w-4 h-4" />
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {copied ? 'Copié!' : 'Copier'}
        </span>
      </button>

      {/* Native Share (Mobile) */}
      {navigator.share && (
        <button
          onClick={handleNativeShare}
          className="group relative p-2 rounded-full bg-brand-cyan hover:bg-brand-blue text-white transition-all duration-300 hover:scale-110 hover-glow md:hidden"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
