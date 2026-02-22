import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('main.tsx loaded');
console.log('Environment variables:', {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Missing',
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found in DOM');
  throw new Error('Root element not found');
}

console.log('Root element found, attempting to render...');

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('App rendered successfully');
} catch (error) {
  console.error('Failed to render app:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: system-ui, sans-serif; background: #000; color: #fff; min-height: 100vh;">
      <div style="max-width: 800px; margin: 0 auto;">
        <h1 style="color: #DC2626; margin-bottom: 20px;">Application Error</h1>
        <p style="margin-bottom: 20px;">Failed to load the application. Check console for details.</p>
        <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; border: 2px solid #DC2626;">
          <h2 style="color: #DC2626; margin-bottom: 10px;">Error Details:</h2>
          <pre style="color: #ff6b6b; overflow: auto; white-space: pre-wrap;">${error}</pre>
        </div>
        <div style="margin-top: 20px; padding: 20px; background: #1a1a1a; border-radius: 8px; border: 2px solid #fff;">
          <h2 style="margin-bottom: 10px;">Environment Variables:</h2>
          <p>VITE_SUPABASE_URL: ${import.meta.env.VITE_SUPABASE_URL ? 'Set ✓' : 'Missing ✗'}</p>
          <p>VITE_SUPABASE_ANON_KEY: ${import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set ✓' : 'Missing ✗'}</p>
          <p>MODE: ${import.meta.env.MODE}</p>
        </div>
        <button
          onclick="window.location.reload()"
          style="margin-top: 20px; background: #DC2626; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold;"
        >
          Reload Page
        </button>
      </div>
    </div>
  `;
}
