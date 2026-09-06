import React, { useState, useEffect, useCallback } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SkillsSection } from './components/SkillsSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ChoiceModal } from './components/ChoiceModal';
import { AdminModal } from './components/AdminModal';
import { FloatingWidgets } from './components/FloatingWidgets';
import { Project, ContactMessage } from './types';
import { fetchAllProjects } from './lib/supabaseClient';

export default function App() {
  // Preloader state (subtle, fast, 800ms)
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Modals state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [choiceMessage, setChoiceMessage] = useState<ContactMessage | null>(null);
  const [contactServiceType, setContactServiceType] = useState('Website Development');

  // Load projects from Supabase or local cache
  const loadProjects = useCallback(async () => {
    const { projects: fetchedProjects } = await fetchAllProjects();
    setProjects(fetchedProjects);
  }, []);

  useEffect(() => {
    loadProjects();
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [loadProjects]);

  // Actions
  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectService = (serviceName: string) => {
    setContactServiceType(serviceName);
    handleScrollToContact();
  };

  const handleContactSubmit = (msg: ContactMessage) => {
    setChoiceMessage(msg);
  };

  // Subtle Premium Preloader
  if (isAppLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center text-white transition-opacity duration-300">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-400 p-0.5 animate-bounce">
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-heading font-bold text-lg text-white">
            N
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="font-heading font-bold text-base tracking-tight text-white">
            Nexora<span className="text-emerald-400">.studio</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-600"></span>
          <span className="text-xs text-slate-400">Pranesh RV</span>
        </div>
        <div className="w-24 h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-emerald-400 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-indigo-500 selection:text-white">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar onActionClick={handleScrollToContact} />

      {/* 2. Sticky Modern Navbar */}
      <Navbar
        onOpenContact={handleScrollToContact}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero onStartProject={handleScrollToContact} />

        {/* 4. Projects Section (Work) */}
        <ProjectsSection
          projects={projects}
          onOpenProject={(p) => setSelectedProject(p)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 5. Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 6. About Section */}
        <AboutSection onContactClick={handleScrollToContact} />

        {/* 7. Why Choose Me (8 Core Values) */}
        <WhyChooseUs />

        {/* 8. Skills & Technologies */}
        <SkillsSection />

        {/* 9. Process (How I Work) */}
        <ProcessSection />

        {/* 10. Contact Section */}
        <ContactSection
          initialProjectType={contactServiceType}
          onSubmitContact={handleContactSubmit}
        />
      </main>

      {/* 11. Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* 12. Floating Action Widgets */}
      <FloatingWidgets />

      {/* 13. Modals */}
      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Contact Choice Modal (WhatsApp, Email, LinkedIn) */}
      <ChoiceModal
        messageData={choiceMessage}
        onClose={() => setChoiceMessage(null)}
      />

      {/* Admin Project Management Suite (Supabase + Local Fallback) */}
      <AdminModal
        isOpen={isAdminOpen}
        projects={projects}
        onClose={() => setIsAdminOpen(false)}
        onProjectsUpdated={loadProjects}
      />
    </div>
  );
}
