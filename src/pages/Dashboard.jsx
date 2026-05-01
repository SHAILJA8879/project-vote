import { BarChart3, Users, Activity, CreditCard } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Loading from '../components/Loading';

const ElectionSteps = lazy(() => import('../components/ElectionSteps'));
const Quiz = lazy(() => import('../components/Quiz'));
const ElectionCompanion = lazy(() => import('../components/ElectionCompanion'));

export default function Dashboard() {
  const { t } = useLanguage();
  const stats = [
    { label: t('dashboard.stat.revenue'), value: '$45,231.89', change: '+20.1%', icon: CreditCard },
    { label: t('dashboard.stat.subscriptions'), value: '+2350', change: '+180.1%', icon: Users },
    { label: t('dashboard.stat.sales'), value: '+12,234', change: '+19%', icon: BarChart3 },
    { label: t('dashboard.stat.active'), value: '+573', change: '+201', icon: Activity },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 id="dashboard-title" className="text-3xl font-bold tracking-tight text-[#0D1518] dark:text-[#FCFBF8]">{t('dashboard.title')}</h2>
        <p className="text-[#0D1518]/80 dark:text-[#FCFBF8]/80 mt-2">{t('dashboard.subtitle')}</p>
      </div>

      <section aria-labelledby="dashboard-title" className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="relative p-7 border rounded-3xl border-teal-900/10 dark:border-teal-100/10 bg-white/40 dark:bg-[#131E22]/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(13,148,136,0.1)] dark:hover:shadow-[0_0_20px_rgba(20,184,166,0.1)] hover:border-teal-300/80 dark:hover:border-teal-600/50 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out group overflow-hidden">
              <div className="flex flex-row items-center justify-between pb-4">
                <h3 className="text-sm font-semibold text-[#0D1518]/80 dark:text-[#FCFBF8]/80">{stat.label}</h3>
                <div className="p-2.5 rounded-full bg-teal-50 dark:bg-teal-900/20 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white dark:group-hover:bg-teal-500 dark:group-hover:text-[#0D1518] transition-all duration-300 ease-out">
                  <Icon className="w-4 h-4 text-teal-600 dark:text-teal-400 group-hover:text-white dark:group-hover:text-[#0D1518] transition-colors" />
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold tracking-tight text-[#0D1518] dark:text-[#FCFBF8]">{stat.value}</div>
                <p className="text-sm font-medium text-[#0D1518]/70 dark:text-[#FCFBF8]/70 mt-2 flex items-center gap-1">
                  {stat.change.startsWith('+') ? (
                    <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-md">{stat.change}</span>
                  ) : (
                    stat.change
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-7">
        <section aria-label="Interactive Quiz" className="col-span-4 min-h-[300px] flex flex-col">
          <Suspense fallback={<Loading />}>
            <Quiz />
          </Suspense>
        </section>
        <section aria-label="Election Day Companion" className="col-span-3 min-h-[300px] flex flex-col">
          <Suspense fallback={<Loading />}>
            <ElectionCompanion />
          </Suspense>
        </section>
      </div>

      {/* Election Steps Component */}
      <section aria-label="Election Stages">
        <Suspense fallback={<Loading />}>
          <ElectionSteps />
        </Suspense>
      </section>
    </div>
  );
}

