import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, ArrowUpRight, Sparkles, Filter, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
  onOpenAdmin: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onOpenProject,
  onOpenAdmin,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Filter only published projects for the public showcase
  const publishedProjects = useMemo(() => {
    return projects.filter((p) => p.status === 'published');
  }, [projects]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    publishedProjects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [publishedProjects]);

  // Filtered list
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return publishedProjects;
    return publishedProjects.filter((p) => p.category === selectedFilter);
  }, [publishedProjects, selectedFilter]);

  return (
    <section id="work" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Top Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Selected Portfolio</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
              Featured Work &amp; Case Studies
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl">
              A curated selection of client work across web development, commercial ad campaigns, and brand design.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Project Count Pill */}
            <div className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tracking-wider">
              {String(filteredProjects.length).padStart(2, '0')} PROJECTS AVAILABLE
            </div>

            {/* Quick Manage button */}
            <button
              onClick={onOpenAdmin}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline decoration-indigo-200 hover:decoration-indigo-500 cursor-pointer"
            >
              + Manage via Supabase
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Projects ({publishedProjects.length})
          </button>

          {categories.map((cat) => {
            const count = publishedProjects.filter((p) => p.category === cat).length;
            const isSelected = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-12 text-center">
            <Layers className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="font-heading text-lg font-bold text-slate-700">No projects found in this category</h3>
            <p className="text-slate-500 text-sm mt-1">You can add new projects using the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onOpenProject(project)}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1.5 flex flex-col cursor-pointer"
              >
                {/* Thumbnail Image Container */}
                <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-100 to-indigo-50 text-slate-400 font-semibold text-sm">
                      [Project Preview]
                    </div>
                  )}

                  {/* Hover Overlay Badge */}
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-xs text-slate-900 font-bold text-xs shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      View Project Details →
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-medium text-[11px] shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Year Pill */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-700 font-bold text-[11px] shadow-xs">
                      {project.project_date}
                    </span>
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed font-normal">
                      {project.short_description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Tags */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-md">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Bottom Action Row */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1">
                        <span>Explore Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>

                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Live Demo"
                            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Source Code"
                            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
