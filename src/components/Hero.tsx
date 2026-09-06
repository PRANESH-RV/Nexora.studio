import React from 'react';
import { ArrowRight, Sparkles, Code2, Palette, MapPin, Briefcase, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject }) => {
  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Subtle colorful decorative blurred background blobs (inspired by modern high-end agency portfolios) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-gradient-to-tr from-indigo-200/40 via-violet-200/30 to-emerald-200/40 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-emerald-100/50 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Eyebrow badge matching reference style: "● We Build E-commerce Stores / Web & Graphic Design" */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
            <span>Web Development &amp; Graphic Design</span>
            <span className="text-slate-300">|</span>
            <span className="text-indigo-900 font-bold">Nexora.studio</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.08] mb-6">
            Crafting Impactful{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500">
              Web &amp; Visual
            </span>{' '}
            Experiences
          </h1>

          {/* Subtitle with real honest information */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mb-10 font-normal">
            Hi, I'm <strong className="text-slate-900 font-semibold">Pranesh RV</strong> — Computer Science student &amp; freelance Web Developer &amp; Graphic Designer. From concept to deployment, I build modern responsive websites, brand identities, and high-impact visual systems that help businesses scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
            <button
              onClick={onStartProject}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-semibold text-base shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/35 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-sm hover:border-slate-300 transition-all"
            >
              <span>View Selected Work</span>
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </a>
          </div>

          {/* Quick Pillars Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left pt-6 border-t border-slate-200/80">
            <div className="bg-white/80 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-start gap-3.5 hover:border-indigo-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Based in</span>
                <strong className="text-sm sm:text-base font-bold text-slate-800">Erode, Tamil Nadu, India</strong>
                <p className="text-xs text-slate-500 mt-0.5">Available for remote &amp; on-site collaborations</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-start gap-3.5 hover:border-emerald-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Core Focus</span>
                <strong className="text-sm sm:text-base font-bold text-slate-800">Web Dev &amp; Graphic Design</strong>
                <p className="text-xs text-slate-500 mt-0.5">HTML/CSS/JS, Python, Photoshop, UI/UX</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-start gap-3.5 hover:border-violet-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Current Status</span>
                <strong className="text-sm sm:text-base font-bold text-emerald-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Open for Select Projects
                </strong>
                <p className="text-xs text-slate-500 mt-0.5">Freelance contracts &amp; client commissions</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
