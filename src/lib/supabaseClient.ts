import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Project, SupabaseConfig } from '../types';
import { INITIAL_PROJECTS } from '../data/initialProjects';

const STORAGE_KEY_CONFIG = 'nexora_supabase_config';
const STORAGE_KEY_PROJECTS = 'nexora_local_projects';

// Default Supabase config (placeholder for user to insert credentials)
export const DEFAULT_SUPABASE_CONFIG: SupabaseConfig = {
  url: '',
  anonKey: '',
  isConnected: false,
  useLocalFallback: true,
};

// SQL script provided for user to execute in Supabase SQL editor
export const SUPABASE_SETUP_SQL = `-- 1. Create the projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  image_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  github_url TEXT DEFAULT '',
  live_url TEXT DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Web Development',
  project_date TEXT NOT NULL DEFAULT '2026',
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'hidden')),
  role TEXT DEFAULT '',
  tools TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Anyone can read published projects
CREATE POLICY "Public can view published projects"
  ON public.projects
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- 4. Policy: Authenticated admin can view all projects (including hidden)
CREATE POLICY "Admin can view all projects"
  ON public.projects
  FOR SELECT
  TO authenticated
  USING (true);

-- 5. Policy: Authenticated admin can insert projects
CREATE POLICY "Admin can insert projects"
  ON public.projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 6. Policy: Authenticated admin can update projects
CREATE POLICY "Admin can update projects"
  ON public.projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 7. Policy: Authenticated admin can delete projects
CREATE POLICY "Admin can delete projects"
  ON public.projects
  FOR DELETE
  TO authenticated
  USING (true);

-- 8. Storage bucket setup instructions for project images:
-- Go to Storage in Supabase -> Create a new public bucket named "project-images"
-- Add policy: Allow public read access on bucket "project-images"
-- Add policy: Allow authenticated users to upload/update/delete objects in "project-images"`;

export function getStoredSupabaseConfig(): SupabaseConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_SUPABASE_CONFIG,
        ...parsed,
        isConnected: Boolean(parsed.url && parsed.anonKey),
      };
    }
  } catch (err) {
    console.error('Failed to parse Supabase config from localStorage', err);
  }
  return DEFAULT_SUPABASE_CONFIG;
}

export function saveStoredSupabaseConfig(config: Partial<SupabaseConfig>): void {
  try {
    const current = getStoredSupabaseConfig();
    const updated = {
      ...current,
      ...config,
      isConnected: Boolean(config.url && config.anonKey),
    };
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save Supabase config', err);
  }
}

export function getSupabaseClient(): SupabaseClient | null {
  const config = getStoredSupabaseConfig();
  if (config.url && config.anonKey) {
    try {
      return createClient(config.url, config.anonKey);
    } catch (e) {
      console.warn('Could not initialize Supabase client:', e);
    }
  }
  return null;
}

// Local Storage Projects Cache Helper
export function getLocalProjects(): Project[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load local projects', err);
  }
  return INITIAL_PROJECTS;
}

export function saveLocalProjects(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save local projects', err);
  }
}

// Unified Fetch: tries Supabase first, gracefully falls back to local cache
export async function fetchAllProjects(): Promise<{ projects: Project[]; source: 'supabase' | 'local' }> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        // format data
        const formatted: Project[] = data.map((item) => ({
          ...item,
          technologies: Array.isArray(item.technologies)
            ? item.technologies
            : typeof item.technologies === 'string'
            ? item.technologies.split(',').map((s: string) => s.trim())
            : [],
        }));
        saveLocalProjects(formatted);
        return { projects: formatted, source: 'supabase' };
      }
    } catch (err) {
      console.warn('Error fetching from Supabase, falling back to local cache', err);
    }
  }

  return { projects: getLocalProjects(), source: 'local' };
}

// Unified Save/Insert/Update
export async function persistProject(project: Project): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();
  const localProjects = getLocalProjects();
  const existingIdx = localProjects.findIndex((p) => p.id === project.id);

  let updatedList: Project[];
  if (existingIdx >= 0) {
    updatedList = [...localProjects];
    updatedList[existingIdx] = { ...project, updated_at: new Date().toISOString() };
  } else {
    updatedList = [...localProjects, { ...project, created_at: new Date().toISOString() }];
  }
  saveLocalProjects(updatedList);

  if (client) {
    try {
      const { error } = await client.from('projects').upsert({
        id: project.id,
        title: project.title,
        short_description: project.short_description,
        full_description: project.full_description,
        image_url: project.image_url,
        technologies: project.technologies,
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        category: project.category,
        project_date: project.project_date,
        display_order: project.display_order,
        status: project.status,
        role: project.role || '',
        tools: project.tools || '',
        updated_at: new Date().toISOString(),
      });

      if (error) {
        return { success: false, error: error.message };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      return { success: false, error: msg };
    }
  }

  return { success: true };
}

// Delete Project
export async function removeProject(id: string): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();
  const localProjects = getLocalProjects().filter((p) => p.id !== id);
  saveLocalProjects(localProjects);

  if (client) {
    try {
      const { error } = await client.from('projects').delete().eq('id', id);
      if (error) {
        return { success: false, error: error.message };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      return { success: false, error: msg };
    }
  }

  return { success: true };
}
