import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      // Always attempt the request rather than pausing on navigator.onLine === false;
      // our own error mapping (see api/errors.ts) already produces a friendly
      // "no internet" message once the request actually fails.
      networkMode: 'always',
    },
    mutations: {
      networkMode: 'always',
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
