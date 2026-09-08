import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Supabase Connection Test (Console only - no UI changes)
function testSupabaseConnection() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const urlLoaded = !!supabaseUrl;
  const keyLoaded = !!supabaseAnonKey;

  if (urlLoaded && keyLoaded) {
    console.log('✅ Supabase environment variables loaded successfully');
    console.log(`   Project URL: ${supabaseUrl}`);
    console.log(`   Anon Key: ${supabaseAnonKey.substring(0, 20)}...${supabaseAnonKey.substring(supabaseAnonKey.length - 8)}`);
  } else {
    const missing = [];
    if (!urlLoaded) missing.push('VITE_SUPABASE_URL');
    if (!keyLoaded) missing.push('VITE_SUPABASE_ANON_KEY');
    console.error(`❌ Missing Supabase environment variables: ${missing.join(', ')}`);
  }
}

// Run test before app renders
testSupabaseConnection();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
