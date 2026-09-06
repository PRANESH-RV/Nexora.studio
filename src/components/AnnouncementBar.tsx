import React, { useState } from 'react';
import { ArrowRight, X, Sparkles } from 'lucide-react';

interface AnnouncementBarProps {
  onActionClick: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onActionClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-900 text-white text-xs sm:text-sm py-2 px-4 relative z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-center gap-2 text-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Open for Projects
          </span>
          <span className="text-slate-200">
            Available for Web Development &amp; Graphic Design Freelance Projects — Let's collaborate!
          </span>
          <button
            onClick={onActionClick}
            className="inline-flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors ml-1 underline decoration-indigo-400/50 hover:decoration-indigo-300"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Close notification"
          className="text-slate-400 hover:text-white p-1 rounded transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
