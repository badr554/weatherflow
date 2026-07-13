import { Suspense, lazy, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function PageFade({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function ThemedToaster() {
  const { tokens } = useTheme();
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: tokens.card2,
          color: tokens.text,
          border: `1px solid ${tokens.border}`,
          backdropFilter: 'blur(20px)',
        },
      }}
    />
  );
}

function AppRoutes() {
  return (
    <PageFade>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </PageFade>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
        <ThemedToaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
