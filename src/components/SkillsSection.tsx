import React, { useState } from 'react';
import { Code, Palette, Layout, Terminal, Layers, Sparkles } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'dev' | 'design'>('all');

  const devSkills = [
    { name: 'HTML5 / Semantic Web', level: 'Advanced', desc: 'Accessible, clean, SEO-optimized markup structure' },
    { name: 'CSS3 / Modern Layouts', level: 'Advanced', desc: 'Flexbox, CSS Grid, animations, and Tailwind utility systems' },
    { name: 'JavaScript (ES6+)', level: 'Skilled', desc: 'Modern async DOM, API integration, interactive state' },
    { name: 'Python', level: 'Core', desc: 'Programming logic, scripting, and computer science foundations' },
    { name: 'Responsive Web Design', level: 'Mastery', desc: 'Flawless multi-device layout adaptation from 320px to 4K' },
    { name: 'React / Component UI', level: 'Skilled', desc: 'Declarative component architecture & modern Vite workflows' },
  ];

  const designSkills = [
    { name: 'UI / UX Design', level: 'Advanced', desc: 'User journey mapping, wireframing, and visual hierarchy' },
    { name: 'Figma', level: 'Proficient', desc: 'Interactive prototypes, auto-layout design systems' },
    { name: 'Adobe Photoshop', level: 'Advanced', desc: 'Commercial ad banners, photo manipulation, and retouching' },
    { name: 'Adobe Illustrator', level: 'Skilled', desc: 'Precision vector logo marks, badges, and icon graphics' },
    { name: 'Canva Pro', level: 'Fast', desc: 'Rapid marketing campaign assets and social media graphics' },
    { name: 'Typography & Layout', level: 'Specialist', desc: 'Pairing, optical kerning, baseline rhythms, and readability' },
  ];

  return (
    <section id="skills" className="py-20 bg-slate-50 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Tech &amp; Creative Stack</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Tools &amp; Technologies I Work With
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            A balanced toolkit spanning technical development and high-end visual design software.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              All Technologies
            </button>
            <button
              onClick={() => setActiveTab('dev')}
              className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'dev'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Development</span>
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'design'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Design &amp; Creative</span>
            </button>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Development Column */}
          {(activeTab === 'all' || activeTab === 'dev') && (
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-slate-900">Development</h3>
                    <span className="text-xs text-slate-400">Front-End &amp; Computer Science</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                  {devSkills.length} Skills
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {devSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-sm text-slate-800">{skill.name}</h4>
                      <span className="text-[10px] font-semibold text-indigo-600 bg-white px-2 py-0.5 rounded-md border border-indigo-100">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Design Column */}
          {(activeTab === 'all' || activeTab === 'design') && (
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-slate-900">Design &amp; Visuals</h3>
                    <span className="text-xs text-slate-400">UI/UX &amp; Graphic Production</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                  {designSkills.length} Tools
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {designSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-sm text-slate-800">{skill.name}</h4>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-white px-2 py-0.5 rounded-md border border-emerald-100">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
