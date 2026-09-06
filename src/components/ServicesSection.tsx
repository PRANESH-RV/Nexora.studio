import React from 'react';
import { Globe, Image, LayoutTemplate, PenTool, ArrowUpRight, Check } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const services = [
    {
      idx: '01',
      title: 'Website Design & Development',
      tag: 'Development',
      desc: 'Modern, mobile-first websites and landing pages engineered to load fast, rank well, and convert visitors into clients.',
      deliverables: [
        'Responsive layouts for Mobile, Tablet & Desktop',
        'Clean HTML5, CSS3, JavaScript / React markup',
        'Fast page load speeds & SEO optimization',
        'Direct inquiry integration (WhatsApp, Email)',
      ],
      icon: Globe,
      accent: 'border-indigo-500/20 hover:border-indigo-500/50 bg-indigo-50/30',
      badgeColor: 'bg-indigo-50 text-indigo-700',
    },
    {
      idx: '02',
      title: 'Graphic & Advertising Design',
      tag: 'Creative Design',
      desc: 'Striking promotional graphics, product launch banners, and social media creative sets designed to grab attention.',
      deliverables: [
        'E-commerce & commercial product ad banners',
        'Social media marketing graphics (Instagram, LinkedIn)',
        'Event posters, digital flyers & web promotional assets',
        'High-resolution print-ready files (CMYK/RGB)',
      ],
      icon: Image,
      accent: 'border-emerald-500/20 hover:border-emerald-500/50 bg-emerald-50/30',
      badgeColor: 'bg-emerald-50 text-emerald-700',
    },
    {
      idx: '03',
      title: 'UI / UX Design & Prototyping',
      tag: 'Interface Design',
      desc: 'Intuitive user interface flows, wireframes, and interactive component libraries built using Figma.',
      deliverables: [
        'End-to-end user experience wireframing',
        'Interactive Figma prototypes with clickable states',
        'Modern color systems, typography & iconography',
        'Developer-ready asset handoff & CSS specs',
      ],
      icon: LayoutTemplate,
      accent: 'border-violet-500/20 hover:border-violet-500/50 bg-violet-50/30',
      badgeColor: 'bg-violet-50 text-violet-700',
    },
    {
      idx: '04',
      title: 'Logo & Visual Identity',
      tag: 'Branding',
      desc: 'Memorable brand identities, vector logo designs, and cohesive visual language for ambitious startups.',
      deliverables: [
        'Custom vector logo marks (scalable SVG/EPS/PNG)',
        'Comprehensive brand guidelines & color palettes',
        'Typography pairing and usage recommendations',
        'Social media avatar and header brand suites',
      ],
      icon: PenTool,
      accent: 'border-amber-500/20 hover:border-amber-500/50 bg-amber-50/30',
      badgeColor: 'bg-amber-50 text-amber-700',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Specialized Services</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            What I Can Help You Build
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            From your first rough sketch to a deployed product or commercial ad campaign that drives real results.
          </p>
        </div>

        {/* Services 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.idx}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-xl font-bold text-slate-300 group-hover:text-indigo-600 transition-colors">
                      /{srv.idx}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${srv.badgeColor}`}>
                      {srv.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {srv.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {srv.desc}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Key Deliverables:
                    </span>
                    {srv.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(srv.title)}
                  className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white border border-slate-200 hover:border-transparent text-sm font-semibold transition-all group-hover:shadow-md cursor-pointer"
                >
                  <span>Request This Service</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
