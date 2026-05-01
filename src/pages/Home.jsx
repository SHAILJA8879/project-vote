import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Loading from '../components/Loading';

const Timeline = lazy(() => import('../components/Timeline'));
const EligibilityForm = lazy(() => import('../components/EligibilityForm'));

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-teal-400/20 dark:bg-teal-600/10 blur-[100px] rounded-full -z-10 animate-pulse pointer-events-none duration-1000" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-[20%] w-3 h-3 bg-teal-500 rounded-full opacity-30 animate-bounce pointer-events-none" style={{ animationDuration: '3s' }} />
      <div className="absolute top-40 right-[15%] w-4 h-4 bg-pink-400 rounded-full opacity-40 animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-40 left-[10%] w-2 h-2 bg-teal-600 rounded-full opacity-50 animate-ping pointer-events-none" style={{ animationDuration: '5s' }} />

      <div className="space-y-8 max-w-4xl relative z-10 pt-12">
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-tight">
          <span className="text-[#0D1518] dark:text-[#FCFBF8]">{t('home.welcome')}</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-600 via-teal-500 to-pink-500 dark:from-teal-300 dark:via-teal-400 dark:to-pink-400 drop-shadow-sm">
            ProjectVote
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-[#0D1518]/70 dark:text-[#FCFBF8]/70 max-w-2xl mx-auto leading-relaxed font-medium">
          {t('home.subtitle')}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 pt-12 relative z-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center px-10 py-4 text-base font-bold text-white transition-all duration-300 ease-out bg-teal-600 rounded-full hover:bg-teal-700 dark:bg-teal-500 dark:text-[#0A1114] dark:hover:bg-teal-400 shadow-[0_8px_20px_rgba(13,148,136,0.3)] hover:shadow-[0_12px_25px_rgba(13,148,136,0.4)] hover:-translate-y-1 active:scale-95"
        >
          {t('home.btn.dashboard')}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
        <a
          href="#eligibility"
          className="inline-flex items-center justify-center px-10 py-4 text-base font-bold transition-all duration-300 ease-out border-2 rounded-full text-teal-800 border-teal-200 hover:bg-teal-50 dark:text-teal-100 dark:border-teal-800 dark:hover:bg-teal-900/30 shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95 bg-white/50 dark:bg-[#0A1114]/50 backdrop-blur-md"
        >
          {t('home.btn.learn')}
        </a>
      </div>

      <div className="grid gap-6 pt-20 sm:grid-cols-3 max-w-4xl w-full text-left relative z-10">
        {[
          { title: t('home.feature1.title'), desc: t('home.feature1.desc') },
          { title: t('home.feature2.title'), desc: t('home.feature2.desc') },
          { title: t('home.feature3.title'), desc: t('home.feature3.desc') },
        ].map((feature, i) => (
          <section key={i} aria-labelledby={`feature-title-${i}`} className="relative p-8 border rounded-3xl border-teal-900/10 dark:border-teal-100/10 bg-white/40 dark:bg-[#131E22]/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(13,148,136,0.1)] dark:hover:shadow-[0_0_20px_rgba(20,184,166,0.1)] hover:border-teal-300/80 dark:hover:border-teal-600/50 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out group overflow-hidden">
            <CheckCircle2 className="w-8 h-8 mb-5 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300 ease-out" />
            <h3 id={`feature-title-${i}`} className="text-lg font-bold text-[#0D1518] dark:text-[#FCFBF8]">{feature.title}</h3>
            <p className="mt-2 text-sm text-[#0D1518]/80 dark:text-[#FCFBF8]/90 leading-relaxed">{feature.desc}</p>
          </section>
        ))}
      </div>

      <section id="eligibility" className="w-full pt-20 mt-12 border-t border-zinc-200/50 dark:border-zinc-800/50 text-left scroll-mt-20 relative z-10">
        <Suspense fallback={<Loading />}>
          <EligibilityForm />
        </Suspense>
      </section>

      <section className="w-full pt-20 mt-12 border-t border-zinc-200/50 dark:border-zinc-800/50 text-left relative z-10">
        <Suspense fallback={<Loading />}>
          <Timeline />
        </Suspense>
      </section>
    </div>
  );
}
