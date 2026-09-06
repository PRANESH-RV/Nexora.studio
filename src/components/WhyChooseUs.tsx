import React from 'react';
import {
  HeartHandshake,
  Award,
  Wallet,
  Clock,
  ShieldCheck,
  Zap,
  MessageSquare,
  TrendingUp,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      num: '01',
      title: 'Customer-Centric Approach',
      desc: 'I place your specific business objectives and client needs at the core of every design and code decision, delivering measurable results.',
      icon: HeartHandshake,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      num: '02',
      title: 'Technical Craft & Attention',
      desc: 'From semantic HTML to crisp Photoshop typography, I treat every pixel and line of code with rigorous attention to detail and precision.',
      icon: Award,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      num: '03',
      title: 'Affordable Freelance Rates',
      desc: 'High-end agency visual polish at accessible freelance rates, making modern digital presence achievable for founders and businesses.',
      icon: Wallet,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      num: '04',
      title: 'Ongoing Support & Revisions',
      desc: 'I provide dedicated post-handoff support, responsive revisions, and setup assistance so your launch is smooth and worry-free.',
      icon: Clock,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      num: '05',
      title: 'Security & Clean Code',
      desc: 'Built with clean code structure, secure Supabase backend configurations, and zero bloat for safe, future-proof maintenance.',
      icon: ShieldCheck,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      num: '06',
      title: 'Modern & Reliable Stack',
      desc: 'Utilizing modern HTML5, CSS3, JavaScript/TypeScript, React, Python, and Adobe Photoshop to ensure fast, scalable outputs.',
      icon: Zap,
      color: 'bg-lime-50 text-lime-600',
    },
    {
      num: '07',
      title: 'Transparent Communication',
      desc: 'Direct WhatsApp and Email contact with rapid updates, milestone demos, and proactive collaboration throughout the project lifecycle.',
      icon: MessageSquare,
      color: 'bg-teal-50 text-teal-600',
    },
    {
      num: '08',
      title: 'Fast Performance & Mobile-First',
      desc: 'Architected for instant load speeds and seamless adaptability across mobile phones, tablets, laptops, and ultra-wide displays.',
      icon: TrendingUp,
      color: 'bg-rose-50 text-rose-600',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Why Choose Nexora</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Why Clients &amp; Teams Trust My Work
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Reasons ambitious founders and freelance clients choose Nexora to build and scale their digital products.
          </p>
        </div>

        {/* 8 Numbered Bento Cards (Inspired by Reference Screenshot 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200/90 transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-heading text-2xl sm:text-3xl font-bold text-slate-200 group-hover:text-indigo-200 transition-colors">
                      {item.num}
                    </span>
                    <div className={`w-11 h-11 rounded-2xl ${item.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-slate-900 mb-2.5 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                  <span>Guaranteed Quality</span>
                  <span className="text-base">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
