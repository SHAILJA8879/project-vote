import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Moon, Sun, LayoutDashboard, Home, Globe } from 'lucide-react';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary';

function AppContent() {
  const { t, language, setLanguage } = useLanguage();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 bg-[#FCFBF8] dark:bg-[#0A1114]">
        <header className="sticky top-0 z-50 border-b border-teal-900/10 dark:border-teal-100/10 bg-[#FCFBF8]/70 dark:bg-[#0A1114]/70 backdrop-blur-xl shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="font-bold text-lg tracking-tight">ProjectVote</span>
              <nav className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-2 text-sm font-medium text-teal-900/70 hover:text-teal-700 dark:text-teal-100/70 dark:hover:text-teal-300 transition-colors">
                  <Home className="w-4 h-4" />
                  {t('nav.home')}
                </Link>
                <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-teal-900/70 hover:text-teal-700 dark:text-teal-100/70 dark:hover:text-teal-300 transition-colors">
                  <LayoutDashboard className="w-4 h-4" />
                  {t('nav.dashboard')}
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-teal-900/5 dark:hover:bg-teal-100/5 transition-colors text-sm font-medium text-teal-900/70 dark:text-teal-100/70"
                aria-label={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
                title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? 'EN' : 'HI'}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-teal-900/5 dark:hover:bg-teal-100/5 transition-colors text-teal-900/70 dark:text-teal-100/70"
                aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </ErrorBoundary>
        </main>

        <footer className="border-t border-teal-900/10 dark:border-teal-100/10 py-10 px-4">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-teal-900/40 dark:text-teal-100/40 max-w-2xl mx-auto leading-relaxed">
                {t('footer.disclaimer')}
              </p>
              <p className="text-xs font-medium text-teal-600 dark:text-teal-400">
                {t('footer.privacy')}
              </p>
            </div>
            <p className="text-sm text-teal-900/60 dark:text-teal-100/60">
              &copy; {new Date().getFullYear()} {t('footer.text')}
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
