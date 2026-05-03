import { memo } from 'react';

const StatCard = memo(function StatCard({ label, value, change, icon: Icon }) {
  return (
    <div className="relative p-7 border rounded-3xl border-teal-900/10 dark:border-teal-100/10 bg-white/40 dark:bg-[#131E22]/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(13,148,136,0.1)] dark:hover:shadow-[0_0_20px_rgba(20,184,166,0.1)] hover:border-teal-300/80 dark:hover:border-teal-600/50 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out group overflow-hidden">
      <div className="flex flex-row items-center justify-between pb-4">
        <h3 className="text-sm font-semibold text-[#0D1518]/80 dark:text-[#FCFBF8]/80">{label}</h3>
        <div className="p-2.5 rounded-full bg-teal-50 dark:bg-teal-900/20 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white dark:group-hover:bg-teal-500 dark:group-hover:text-[#0D1518] transition-all duration-300 ease-out">
          <Icon className="w-4 h-4 text-teal-600 dark:text-teal-400 group-hover:text-white dark:group-hover:text-[#0D1518] transition-colors" />
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold tracking-tight text-[#0D1518] dark:text-[#FCFBF8]">{value}</div>
        <p className="text-sm font-medium text-[#0D1518]/70 dark:text-[#FCFBF8]/70 mt-2 flex items-center gap-1">
          {change.startsWith('+') ? (
            <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-md">{change}</span>
          ) : (
            change
          )}
        </p>
      </div>
    </div>
  );
});

export default StatCard;
