import { getSupabaseClient } from './supabaseClient';

// Re-export the shared singleton Supabase client (initialized in supabaseClient.ts)
export const supabase = getSupabaseClient();