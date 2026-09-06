import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageSquare } from 'lucide-react';

export const FloatingWidgets: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open(
      'https://wa.me/919361066465?text=Hi%20Pranesh,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="w-11 h-11 rounded-full bg-white text-slate-700 hover:text-indigo-600 shadow-lg border border-slate-200/80 flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <button
        onClick={openWhatsApp}
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all cursor-pointer"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <MessageSquare className="w-5 h-5" />
        </div>
        <span className="text-xs sm:text-sm font-bold pr-1">Chat on WhatsApp</span>
      </button>
    </div>
  );
};
