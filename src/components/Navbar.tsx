import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Send, ShieldCheck, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Why Choose Me', href: '#why-us' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const servicesList = [
    { name: 'Website Design & Dev', href: '#services' },
    { name: 'Graphic & Banner Design', href: '#services' },
    { name: 'UI/UX Prototyping', href: '#services' },
    { name: 'Logo & Visual Identity', href: '#services' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Portfolio Pill */}
        <div className="flex items-center gap-3">
          <a href="#home" className="group flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-emerald-400 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-white font-bold text-base">
                N
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                Nexora<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">.studio</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 -mt-1 tracking-wider uppercase">
                Pranesh RV
              </span>
            </div>
          </a>

          {/* Reference pill: "Portfolio - Work We Proud Of" */}
          <a
            href="#work"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Portfolio</span>
            <span className="text-emerald-600 font-normal">| Selected Work</span>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <a
            href="#home"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Home
          </a>
          <a
            href="#work"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Work
          </a>

          {/* Services with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <a
              href="#services"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors py-1"
            >
              <span>Services</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </a>
            {servicesDropdown && (
              <div className="absolute top-full left-0 w-56 pt-2 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 space-y-1">
                  {servicesList.map((service, index) => (
                    <a
                      key={index}
                      href={service.href}
                      onClick={() => setServicesDropdown(false)}
                      className="block px-3 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                    >
                      {service.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            href="#about"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            About
          </a>
          <a
            href="#why-us"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Why Me
          </a>
          <a
            href="#skills"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Skills
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Dashboard link */}
          <button
            onClick={onOpenAdmin}
            title="Open Admin Project Dashboard"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden md:inline">Admin Portal</span>
          </button>

          {/* Let's Talk Primary CTA */}
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Let's Talk</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-5 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-semibold text-slate-800 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Admin Management Dashboard</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Get in Touch (Free Quote)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
