import { useEffect, useRef, useState } from 'react';
import { UserPlus, Vote, Trophy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function TimelineItem({ title, description, icon: Icon, isLast, index }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative flex gap-6 pb-12 group">
      {/* Vertical Line */}
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-0.5 -ml-px bg-teal-900/10 dark:bg-teal-100/10 z-0">
          <div 
            className="w-full bg-teal-500 transition-all duration-300 ease-out"
            style={{ 
              height: isVisible ? '100%' : '0%',
              transitionDelay: `${index * 100 + 300}ms`
            }}
          />
        </div>
      )}

      {/* Icon Circle */}
      <div 
        className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-[#0A1114] shadow-md transition-all duration-300 ease-out shrink-0
          ${isVisible ? 'bg-teal-500 scale-100' : 'bg-teal-200 dark:bg-teal-900/50 scale-50'}`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <Icon className={`w-5 h-5 transition-colors duration-300 ${isVisible ? 'text-white' : 'text-teal-700 dark:text-teal-400'}`} />
      </div>

      {/* Content Card */}
      <div 
        className={`flex-1 pt-1 transition-all duration-300 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        style={{ transitionDelay: `${index * 100 + 200}ms` }}
      >
        <div className="relative p-8 border rounded-3xl border-teal-900/10 dark:border-teal-100/10 bg-white/40 dark:bg-[#131E22]/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(236,72,153,0.1)] dark:hover:shadow-[0_0_20px_rgba(236,72,153,0.1)] hover:border-pink-300/80 dark:hover:border-pink-600/50 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out group overflow-hidden">
          <h3 className="text-xl font-bold text-[#0D1518] dark:text-[#FCFBF8]">{title}</h3>
          <p className="mt-3 text-sm text-[#0D1518]/70 dark:text-[#FCFBF8]/70 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const { t } = useLanguage();
  const steps = [
    {
      title: t('timeline.step1.title'),
      description: t('timeline.step1.desc'),
      icon: UserPlus
    },
    {
      title: t('timeline.step2.title'),
      description: t('timeline.step2.desc'),
      icon: Vote
    },
    {
      title: t('timeline.step3.title'),
      description: t('timeline.step3.desc'),
      icon: Trophy
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto py-12">
      <div className="mb-10 text-center space-y-3">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t('timeline.title')}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
          {t('timeline.subtitle')}
        </p>
      </div>

      <div className="pl-4 sm:pl-0">
        {steps.map((step, index) => (
          <TimelineItem 
            key={index}
            index={index}
            title={step.title}
            description={step.description}
            icon={step.icon}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
