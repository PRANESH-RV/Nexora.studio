export interface Project {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  image_url: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  category: 'Web Development' | 'Graphic Design' | 'UI/UX Design' | string;
  project_date: string;
  display_order: number;
  status: 'published' | 'hidden';
  role?: string;
  tools?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
  useLocalFallback: boolean;
}

export interface ContactMessage {
  name: string;
  email: string;
  type: string;
  message: string;
}
