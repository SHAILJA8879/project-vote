import { BarChart3, Users, Activity, CreditCard } from 'lucide-react';
import { lazy, Suspense, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Loading from '../components/Loading';
import StatCard from '../components/StatCard';
import VoteSystem from '../components/VoteSystem';

const ElectionSteps = lazy(() => import('../components/ElectionSteps'));
const Quiz = lazy(() => import('../components/Quiz'));
const ElectionCompanion = lazy(() => import('../components/ElectionCompanion'));

export default function Dashboard() {
  const { t } = useLanguage();
  
  const stats = useMemo(() => [
    { label: t('dashboard.stat.revenue'), value: '$45,231.89', change: '+20.1%', icon: CreditCard },
    { label: t('dashboard.stat.subscriptions'), value: '+2350', change: '+180.1%', icon: Users },
    { label: t('dashboard.stat.sales'), value: '+12,234', change: '+19%', icon: BarChart3 },
    { label: t('dashboard.stat.active'), value: '+573', change: '+201', icon: Activity },
  ], [t]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 id="dashboard-title" className="text-3xl font-bold tracking-tight text-[#0D1518] dark:text-[#FCFBF8]">{t('dashboard.title')}</h2>
        <p className="text-[#0D1518]/80 dark:text-[#FCFBF8]/80 mt-2">{t('dashboard.subtitle')}</p>
      </div>

      <VoteSystem />

      <section aria-labelledby="dashboard-title" className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
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

      <section aria-label="Election Stages">
        <Suspense fallback={<Loading />}>
          <ElectionSteps />
        </Suspense>
      </section>
    </div>
  );
}

