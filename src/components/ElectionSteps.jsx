import { memo } from 'react';
import electionData from '../../election_steps.json';
import { useLanguage } from '../context/LanguageContext';

const ElectionSteps = memo(function ElectionSteps() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out pt-4">
      <div>
        <h3 className="text-2xl font-bold tracking-tight text-[#0D1518] dark:text-[#FCFBF8]">{t('steps.title')}</h3>
        <p className="text-[#0D1518]/70 dark:text-[#FCFBF8]/70 mt-2">{t('steps.subtitle')}</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 relative">
        {/* Optional connecting line for larger screens */}
        <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-teal-900/10 dark:bg-teal-100/10 -z-10" />
        
        {electionData.map((step) => {
          const stepData = step[language] || step['en'];
          return (
            <div 
              key={step.step} 
              className="relative p-8 border rounded-3xl border-teal-900/10 dark:border-teal-100/10 bg-white/40 dark:bg-[#131E22]/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(13,148,136,0.1)] dark:hover:shadow-[0_0_20px_rgba(20,184,166,0.1)] hover:border-teal-300/80 dark:hover:border-teal-600/50 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out flex flex-col gap-5 group overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-600 text-white dark:bg-teal-500 dark:text-[#0A1114] font-bold text-lg shrink-0 ring-4 ring-white dark:ring-[#0A1114] shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-out">
                  {step.step}
                </div>
                <h4 className="font-bold text-xl text-[#0D1518] dark:text-[#FCFBF8]">{stepData.name}</h4>
              </div>
              <p className="text-sm text-[#0D1518]/70 dark:text-[#FCFBF8]/70 leading-relaxed">
                {stepData.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ElectionSteps;
