import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Calendar, Tag, Briefcase, Wrench, ArrowLeft } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md px-6 sm:px-8 py-4 border-b border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {project.category}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Hero Banner / Image */}
          {project.image_url && (
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title & Category Badge */}
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">
                {project.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{project.project_date}</span>
              </span>
            </div>
            
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {project.title}
            </h2>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-slate-100 text-xs sm:text-sm">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[11px] mb-1">
                Role
              </span>
              <strong className="text-slate-800 font-bold">
                {project.role || 'Designer & Developer'}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[11px] mb-1">
                Tools Used
              </span>
              <strong className="text-slate-800 font-bold">
                {project.tools || 'Photoshop, VS Code'}
              </strong>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[11px] mb-1">
                Project Year
              </span>
              <strong className="text-slate-800 font-bold">
                {project.project_date || '2026'}
              </strong>
            </div>
          </div>

          {/* Overview & Description */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-bold text-slate-900">
              Project Overview &amp; Objective
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
              {project.full_description || project.short_description}
            </p>
          </div>

          {/* Technologies Used */}
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h3 className="font-heading text-base font-bold text-slate-900 mb-3">
                Technologies &amp; Methods
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                  >
                    <Tag className="w-3 h-3 text-indigo-500" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Links (Live Demo, GitHub) */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <span>Visit Live Project</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-md transition-all cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors cursor-pointer ml-auto"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
