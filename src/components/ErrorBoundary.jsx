import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { LanguageContext } from '../context/LanguageContext';

class ErrorBoundaryInternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const { t } = this.context;
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="p-4 rounded-full bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400">
            <AlertCircle className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#0D1518] dark:text-[#FCFBF8]">{t('error.title')}</h2>
            <p className="text-[#0D1518]/70 dark:text-[#FCFBF8]/70 max-w-md mx-auto">
              {t('error.subtitle')}
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:text-[#0A1114] dark:hover:bg-teal-400 font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            {t('error.button')}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundaryInternal.contextType = LanguageContext;

export default function ErrorBoundary({ children }) {
  return <ErrorBoundaryInternal>{children}</ErrorBoundaryInternal>;
}
