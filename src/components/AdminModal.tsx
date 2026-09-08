import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Database,
  Key,
  Copy,
  Check,
  Upload,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  LogOut,
  FolderOpen,
} from 'lucide-react';
import { Project, SupabaseConfig } from '../types';
import {
  getStoredSupabaseConfig,
  saveStoredSupabaseConfig,
  getSupabaseClient,
  SUPABASE_SETUP_SQL,
  persistProject,
  removeProject,
} from '../lib/supabaseClient';

interface AdminModalProps {
  isOpen: boolean;
  projects: Project[];
  onClose: () => void;
  onProjectsUpdated: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  projects,
  onClose,
  onProjectsUpdated,
}) => {
  // Tabs: 'projects' | 'edit-form' | 'supabase-config' | 'sql-guide'
  const [activeTab, setActiveTab] = useState<'projects' | 'edit-form' | 'supabase-config' | 'sql-guide'>('projects');
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('nexora_admin_auth') === 'true';
  });
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Supabase Config state
  const [config, setConfig] = useState<SupabaseConfig>(getStoredSupabaseConfig());
  const [configStatus, setConfigStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [configMessage, setConfigMessage] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  // Form state
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [formTechInput, setFormTechInput] = useState('');
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Authentication Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });

        if (error) {
          setAuthError(error.message);
          setAuthLoading(false);
          return;
        }

        // After successful sign-in, verify the user is listed in `public.admins`.
        const userId = (data as any)?.user?.id ?? (data as any)?.session?.user?.id;
        if (!userId) {
          setAuthError('Authentication succeeded but no user id was returned.');
          setAuthLoading(false);
          return;
        }

        try {
          const { data: adminRecord, error: adminError } = await supabase
            .from('admins')
            .select('user_id')
            .eq('user_id', userId)
            .maybeSingle();

          if (adminError) {
            setAuthError(`Admin check failed: ${adminError.message}`);
            // Sign out to avoid leaving an authenticated but unauthorized session
            await supabase.auth.signOut().catch(() => {});
            setAuthLoading(false);
            return;
          }

          if (!adminRecord) {
            // Not an admin
            setAuthError('This account is not authorized as an admin.');
            await supabase.auth.signOut().catch(() => {});
            setIsAuthenticated(false);
            localStorage.removeItem('nexora_admin_auth');
            setAuthLoading(false);
            return;
          }

          // Authorized admin
          setIsAuthenticated(true);
          localStorage.setItem('nexora_admin_auth', 'true');
          setAuthLoading(false);
          return;
        } catch (innerErr: unknown) {
          const msg = innerErr instanceof Error ? innerErr.message : 'Admin verification failed';
          setAuthError(msg);
          await supabase.auth.signOut().catch(() => {});
          setAuthLoading(false);
          return;
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Login failed';
        setAuthError(msg);
        setAuthLoading(false);
        return;
      }
    }

    // Default Local / Demo Admin Login
    if (authPassword === 'admin123' || authPassword === 'nexora2026') {
      setIsAuthenticated(true);
      localStorage.setItem('nexora_admin_auth', 'true');
    } else {
      setAuthError('Invalid credentials. (For instant local testing, use password: "admin123" or configure your Supabase Auth below)');
    }
    setAuthLoading(false);
  };

  const handleInstantDemoLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('nexora_admin_auth', 'true');
  };

  const handleLogout = () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    setIsAuthenticated(false);
    localStorage.removeItem('nexora_admin_auth');
  };

  // Supabase Config Save & Test
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfigStatus('idle');
    setConfigMessage('');

    saveStoredSupabaseConfig({
      url: config.url.trim(),
      anonKey: config.anonKey.trim(),
    });

    const client = getSupabaseClient();
    if (client) {
      try {
        const { error } = await client.from('projects').select('count', { count: 'exact', head: true });
        if (error) {
          setConfigStatus('error');
          setConfigMessage(`Credentials saved, but query returned: ${error.message}. (Ensure you have executed the SQL script to create the "projects" table!)`);
        } else {
          setConfigStatus('success');
          setConfigMessage('Successfully connected to Supabase database!');
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Connection failed';
        setConfigStatus('error');
        setConfigMessage(`Connection test error: ${msg}`);
      }
    } else {
      setConfigStatus('idle');
      setConfigMessage('Config cleared. System is running in Local Storage Fallback Mode.');
    }
    onProjectsUpdated();
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Project Form Handlers
  const handleAddNewProject = () => {
    const newOrder = projects.length > 0 ? Math.max(...projects.map((p) => p.display_order || 0)) + 1 : 1;
    setEditingProject({
      id: `proj-${Date.now()}`,
      title: '',
      short_description: '',
      full_description: '',
      image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github_url: '',
      live_url: '',
      category: 'Web Development',
      project_date: '2026',
      display_order: newOrder,
      status: 'published',
      role: 'Web Developer & Designer',
      tools: 'VS Code, Photoshop',
    });
    setFormTechInput('HTML, CSS, JavaScript');
    setFormError('');
    setActiveTab('edit-form');
  };

  const handleEditProject = (proj: Project) => {
    setEditingProject({ ...proj });
    setFormTechInput(proj.technologies ? proj.technologies.join(', ') : '');
    setFormError('');
    setActiveTab('edit-form');
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await removeProject(id);
      onProjectsUpdated();
    }
  };

  const handleToggleStatus = async (proj: Project) => {
    const newStatus = proj.status === 'published' ? 'hidden' : 'published';
    await persistProject({ ...proj, status: newStatus });
    onProjectsUpdated();
  };

  const handleMoveOrder = async (proj: Project, direction: 'up' | 'down') => {
    const sorted = [...projects].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    const idx = sorted.findIndex((p) => p.id === proj.id);
    if (idx < 0) return;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= sorted.length) return;

    const currentOrder = proj.display_order || 0;
    const targetOrder = sorted[targetIdx].display_order || 0;

    await persistProject({ ...proj, display_order: targetOrder });
    await persistProject({ ...sorted[targetIdx], display_order: currentOrder });
    onProjectsUpdated();
  };

  const handleSaveProjectForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title?.trim()) {
      setFormError('Project title is required.');
      return;
    }

    setFormSaving(true);
    setFormError('');

    const techArray = formTechInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const projectToSave: Project = {
      id: editingProject.id || `proj-${Date.now()}`,
      title: editingProject.title.trim(),
      short_description: editingProject.short_description || '',
      full_description: editingProject.full_description || editingProject.short_description || '',
      image_url: editingProject.image_url || '',
      technologies: techArray,
      github_url: editingProject.github_url || '',
      live_url: editingProject.live_url || '',
      category: editingProject.category || 'Web Development',
      project_date: editingProject.project_date || '2026',
      display_order: Number(editingProject.display_order) || 0,
      status: (editingProject.status as 'published' | 'hidden') || 'published',
      role: editingProject.role || '',
      tools: editingProject.tools || '',
    };

    const result = await persistProject(projectToSave);
    setFormSaving(false);

    if (result.success) {
      onProjectsUpdated();
      setActiveTab('projects');
      setEditingProject(null);
    } else {
      setFormError(result.error || 'Failed to save project.');
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setEditingProject((prev) => (prev ? { ...prev, image_url: reader.result as string } : null));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-slate-900 text-white px-6 sm:px-8 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold">
                Admin Management Portal
              </h2>
              <span className="text-xs text-slate-400">
                Supabase Full-Stack Project CMS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isAuthenticated ? (
          /* Admin Login View */
          <div className="p-6 sm:p-12 max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                <Key className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-slate-900">
                Admin Access
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Enter your Supabase admin credentials or click Quick Demo Access.
              </p>
            </div>

            {authError && (
              <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Admin Email
                </label>
                <input
                  type="email"
                  placeholder="admin@nexora.studio"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                {authLoading ? 'Verifying...' : 'Sign In to Dashboard'}
              </button>
            </form>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
              <span className="text-xs text-slate-500 block">
                Want to test the project management features right away?
              </span>
              <button
                type="button"
                onClick={handleInstantDemoLogin}
                className="w-full py-2 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Instant Local Admin Access (No Supabase Required)
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex flex-col flex-1">
            
            {/* Navigation Tabs */}
            <div className="bg-slate-50 px-6 sm:px-8 pt-3 border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'projects'
                    ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                All Projects ({projects.length})
              </button>

              <button
                onClick={() => {
                  handleAddNewProject();
                }}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'edit-form'
                    ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                + {editingProject?.title ? 'Edit Project' : 'New Project'}
              </button>

              <button
                onClick={() => setActiveTab('supabase-config')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'supabase-config'
                    ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" />
                  <span>Supabase Config</span>
                </span>
              </button>

              <button
                onClick={() => setActiveTab('sql-guide')}
                className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'sql-guide'
                    ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                SQL Schema &amp; RLS
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="p-6 sm:p-8 flex-1">
              
              {/* TAB 1: ALL PROJECTS LIST */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-slate-900">
                        Project Management
                      </h3>
                      <p className="text-xs text-slate-500">
                        Add, modify, reorder, or publish/hide portfolio projects.
                      </p>
                    </div>

                    <button
                      onClick={handleAddNewProject}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                    {projects
                      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
                      .map((proj, idx) => (
                        <div
                          key={proj.id}
                          className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                              {proj.image_url ? (
                                <img
                                  src={proj.image_url}
                                  alt={proj.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                                  No img
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-bold text-sm text-slate-900">
                                  {proj.title}
                                </h4>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    proj.status === 'published'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-slate-100 text-slate-500'
                                  }`}
                                >
                                  {proj.status}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  • {proj.category} ({proj.project_date})
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-1 mt-1 max-w-xl">
                                {proj.short_description}
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                            {/* Order Controls */}
                            <button
                              onClick={() => handleMoveOrder(proj, 'up')}
                              disabled={idx === 0}
                              title="Move Up"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                            >
                              <MoveUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleMoveOrder(proj, 'down')}
                              disabled={idx === projects.length - 1}
                              title="Move Down"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                            >
                              <MoveDown className="w-4 h-4" />
                            </button>

                            {/* Toggle Publish/Hide */}
                            <button
                              onClick={() => handleToggleStatus(proj)}
                              title={proj.status === 'published' ? 'Hide Project' : 'Publish Project'}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 cursor-pointer"
                            >
                              {proj.status === 'published' ? (
                                <Eye className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <EyeOff className="w-4 h-4 text-slate-400" />
                              )}
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => handleEditProject(proj)}
                              title="Edit Project"
                              className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 cursor-pointer"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteProject(proj.id, proj.title)}
                              title="Delete Project"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB 2: EDIT / NEW PROJECT FORM */}
              {activeTab === 'edit-form' && editingProject && (
                <form onSubmit={handleSaveProjectForm} className="space-y-6 max-w-3xl">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h3 className="font-heading text-xl font-bold text-slate-900">
                      {editingProject.title ? `Editing: ${editingProject.title}` : 'Add New Portfolio Project'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('projects')}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                  </div>

                  {formError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProject.title || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-sm font-semibold"
                        placeholder="e.g. Sonora — Headphones Launch Banner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Category
                      </label>
                      <select
                        value={editingProject.category || 'Web Development'}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-sm font-medium"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Branding">Branding</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Project Date / Year
                      </label>
                      <input
                        type="text"
                        value={editingProject.project_date || '2026'}
                        onChange={(e) => setEditingProject({ ...editingProject, project_date: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-sm"
                        placeholder="2026"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Short Description
                      </label>
                      <input
                        type="text"
                        value={editingProject.short_description || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, short_description: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-sm"
                        placeholder="Brief 1-sentence summary of the work..."
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Full Description &amp; Design Process
                      </label>
                      <textarea
                        rows={4}
                        value={editingProject.full_description || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, full_description: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-sm"
                        placeholder="Detailed breakdown of the brief, tools, approach, and final results..."
                      />
                    </div>

                    {/* Image Upload & URL */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Project Image (URL or Upload File)
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3 items-start">
                        <input
                          type="text"
                          value={editingProject.image_url || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                          className="flex-1 w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-sm"
                          placeholder="https://... or upload below"
                        />
                        <label className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors shrink-0">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Local Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {editingProject.image_url && (
                        <div className="mt-2.5 w-32 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                          <img
                            src={editingProject.image_url}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Technologies (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={formTechInput}
                        onChange={(e) => setFormTechInput(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-sm"
                        placeholder="Photoshop, HTML, CSS, React"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Live Demo / Project URL
                      </label>
                      <input
                        type="url"
                        value={editingProject.live_url || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-sm"
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        GitHub / Source Code Link
                      </label>
                      <input
                        type="url"
                        value={editingProject.github_url || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-sm"
                        placeholder="https://github.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Display Order (Number)
                      </label>
                      <input
                        type="number"
                        value={editingProject.display_order ?? 1}
                        onChange={(e) => setEditingProject({ ...editingProject, display_order: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Status
                      </label>
                      <select
                        value={editingProject.status || 'published'}
                        onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as 'published' | 'hidden' })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-sm font-semibold"
                      >
                        <option value="published">Published (Visible to visitors)</option>
                        <option value="hidden">Hidden (Draft)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={formSaving}
                      className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                    >
                      {formSaving ? 'Saving Project...' : 'Save Project to Database'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab('projects')}
                      className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: SUPABASE CONFIG */}
              {activeTab === 'supabase-config' && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-slate-900">
                      Supabase Connection Credentials
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Paste your free Supabase project URL and Anon (Public) Key here. Credentials are encrypted and saved in your browser.
                    </p>
                  </div>

                  {configMessage && (
                    <div
                      className={`p-4 rounded-xl text-xs font-medium flex items-start gap-2.5 ${
                        configStatus === 'success'
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                          : configStatus === 'error'
                          ? 'bg-rose-50 border border-rose-200 text-rose-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {configStatus === 'success' ? (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <span>{configMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveConfig} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        SUPABASE_URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://your-project.supabase.co"
                        value={config.url}
                        onChange={(e) => setConfig({ ...config, url: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        SUPABASE_ANON_KEY (Public Key)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        value={config.anonKey}
                        onChange={(e) => setConfig({ ...config, anonKey: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-xs font-mono"
                      />
                      <span className="text-[11px] text-slate-400 block mt-1">
                        Do NOT use the service_role key here. Use the public anon key found in your Supabase Project Settings → API.
                      </span>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                      >
                        Save &amp; Test Connection
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setConfig({ url: '', anonKey: '', isConnected: false, useLocalFallback: true });
                          saveStoredSupabaseConfig({ url: '', anonKey: '' });
                          setConfigStatus('idle');
                          setConfigMessage('Switched to Local Cache mode.');
                        }}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
                      >
                        Reset to Local Mode
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 4: SQL SCHEMA GUIDE */}
              {activeTab === 'sql-guide' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-slate-900">
                        Supabase Database Setup Script &amp; RLS Policies
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Run this SQL script in your Supabase dashboard's "SQL Editor" to create the required tables and security rules.
                      </p>
                    </div>

                    <button
                      onClick={handleCopySql}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shrink-0 cursor-pointer"
                    >
                      {copiedSql ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">SQL Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy SQL Script</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 overflow-x-auto text-xs font-mono text-emerald-300 border border-slate-800">
                    <pre>{SUPABASE_SETUP_SQL}</pre>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
