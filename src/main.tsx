import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: system-ui, sans-serif;">
      <h1 style="color: #DC2626;">Application Error</h1>
      <p>Failed to load the application. Please check the console for details.</p>
      <pre style="background: #f3f4f6; padding: 10px; border-radius: 4px; overflow: auto;">${error}</pre>
    </div>
  `;
}
