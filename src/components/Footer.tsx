import React from 'react';
import { Mail, Phone, Linkedin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Left: Brand Identity */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-heading font-bold text-lg text-white">
                Nexora<span className="text-indigo-400">.studio</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <span className="text-slate-300 font-semibold">Pranesh RV</span>
            </div>
            <p className="text-slate-500 text-xs max-w-sm">
              Freelance Web Developer &amp; Graphic Designer based in Erode, India. Crafting modern digital products and commercial visual identities.
            </p>
          </div>

          {/* Center: Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-medium text-xs">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#why-us" className="hover:text-white transition-colors">Why Choose Me</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Right: Social Connections */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:praneshrv567@gmail.com"
              title="Email Pranesh"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/919361066465"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp Message"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-slate-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/pranesh-rv-615962343"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-slate-700 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} Pranesh RV (Nexora.studio). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Management Dashboard (Supabase)</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
