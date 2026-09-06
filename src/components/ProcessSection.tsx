import React from 'react';
import { Search, PenSquare, CodeXml, Rocket } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'Understand your core business goals, target audience, brand tone, and technical constraints before touching design or code.',
      icon: Search,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      num: '02',
      title: 'Design',
      desc: 'Explore composition, typography scale, color harmony, and wireframes to establish an intuitive visual system.',
      icon: PenSquare,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      num: '03',
      title: 'Develop',
      desc: 'Construct clean, responsive code and pixel-perfect assets, rigorously tested across mobile, tablet, and desktop viewports.',
      icon: CodeXml,
      color: 'bg-violet-50 text-violet-600',
    },
    {
      num: '04',
      title: 'Deliver',
      desc: 'Final quality review, deployment assistance, asset handoff, and ongoing support as your new digital presence launches live.',
      icon: Rocket,
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <section id="process" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Workflow &amp; Methodology</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            A Simple, Proven 4-Step Process
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Structured execution from initial brainstorm to live deployment with zero guesswork.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-slate-800/80 rounded-3xl p-7 border border-slate-700/80 hover:border-slate-600 transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-heading text-3xl font-bold text-slate-700">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <span>Step {step.num} of 04</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
