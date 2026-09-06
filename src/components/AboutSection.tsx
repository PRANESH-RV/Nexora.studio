import React from 'react';
import { UserCheck, Laptop, GraduationCap, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section id="about" className="py-20 bg-slate-50 border-y border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>About Pranesh RV</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Computer Science Engineer &amp; Creative Technologist
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Bridging technical precision with creative visual craft to deliver digital solutions that look stunning and perform reliably.
          </p>
        </div>

        {/* Bento Grid: Who I Am & What I Do */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Who I Am Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-slate-900">Who I Am</h3>
                <span className="text-xs text-slate-400 font-medium">Identity &amp; Background</span>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
              I'm a Computer Science Engineering student and freelance Web Developer &amp; Graphic Designer who thrives on building modern websites, intuitive UI/UX experiences, and impactful promotional graphics. I balance rigorous technical logic with an eye for modern visual aesthetics.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-2 h-2 rounded-full bg-sky-500 mt-2 shrink-0"></span>
                <span>
                  <strong>Academic Track:</strong> Currently pursuing B.E. in Computer Science &amp; Engineering at Erode Sengunthar Engineering College (2025–Present).
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-2 h-2 rounded-full bg-sky-500 mt-2 shrink-0"></span>
                <span>
                  <strong>Foundation:</strong> Holds a Diploma in Computer Science (2025) with strong foundations in algorithms, databases, and front-end markup.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-2 h-2 rounded-full bg-sky-500 mt-2 shrink-0"></span>
                <span>
                  <strong>Passion:</strong> Deeply curious about typography, modern design systems, clean code structure, and web accessibility.
                </span>
              </li>
            </ul>
          </div>

          {/* What I Do Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-slate-900">What I Do</h3>
                <span className="text-xs text-slate-400 font-medium">Services &amp; Capabilities</span>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
              I make digital products look effortless, engaging, and professional. Whether you need a high-converting web landing page, a responsive portfolio, or crisp commercial ad banners that elevate your marketing campaigns, I deliver end-to-end results.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <span>
                  <strong>Websites that convert:</strong> Clean HTML/CSS/JavaScript, React applications, mobile-first responsive design, and smooth animations.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <span>
                  <strong>Graphics that captivate:</strong> Product ad banners, promotional posters, brand identities, and social media creative assets using Photoshop &amp; Illustrator.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <span>
                  <strong>Client-first delivery:</strong> Transparent communication via WhatsApp/Email, iterative revisions, and honest freelance pricing.
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Action Callout Card (Inspired by reference screenshot 2: "Ready to build something legendary? Let's turn your vision into a world-class digital product") */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="max-w-2xl">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to build something legendary?
            </h3>
            <p className="text-slate-300 mt-2 text-sm sm:text-base">
              Let's turn your vision into a high-converting website or striking graphic design that impresses your clients and boosts your brand.
            </p>
          </div>
          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5 transition-all shrink-0 cursor-pointer"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
