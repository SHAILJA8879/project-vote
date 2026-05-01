import { useState, memo } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const INITIAL_TASKS = [
  { id: 'id', key: 'companion.item1', completed: false },
  { id: 'booth', key: 'companion.item2', completed: false },
  { id: 'vote', key: 'companion.item3', completed: false }
];

const ElectionCompanion = memo(function ElectionCompanion() {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300 pt-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-[#0D1518] dark:text-[#FCFBF8] flex items-center gap-2">
          {t('companion.title')} <span className="text-2xl">🗳️</span>
        </h3>
        <p className="text-sm text-[#0D1518]/70 dark:text-[#FCFBF8]/70">{t('companion.subtitle')}</p>
      </div>

      <div className="relative p-8 border rounded-3xl border-teal-900/10 dark:border-teal-100/10 bg-white/40 dark:bg-[#131E22]/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(13,148,136,0.1)] dark:hover:shadow-[0_0_20px_rgba(20,184,166,0.1)] hover:border-teal-300/80 dark:hover:border-teal-600/50 transition-all duration-300 ease-out max-w-xl w-full group overflow-hidden">
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-[#0D1518]/70 dark:text-[#FCFBF8]/70">{t('companion.progress')}</span>
            <span className="text-sm font-bold text-teal-600 dark:text-teal-400">{progress}%</span>
          </div>
          <div className="w-full bg-teal-900/5 dark:bg-teal-100/5 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-teal-500 to-pink-500 dark:from-teal-400 dark:to-pink-400 h-full transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-3" role="group" aria-label={t('companion.subtitle')}>
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => toggleTask(task.id)}
              role="checkbox"
              aria-checked={task.completed}
              className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ease-out text-left group
                ${task.completed 
                  ? 'bg-teal-50/50 dark:bg-teal-900/10 border-teal-200/50 dark:border-teal-800/50 opacity-70' 
                  : 'bg-white dark:bg-[#131E22] border-teal-900/10 dark:border-teal-100/10 hover:border-teal-300/80 dark:hover:border-teal-600/50 shadow-sm hover:shadow-md hover:-translate-y-0.5'
                }`}
            >
              <div className="shrink-0 transition-transform duration-300 ease-out group-hover:scale-110">
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                ) : (
                  <Circle className="w-6 h-6 text-teal-900/30 dark:text-teal-100/30 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300" />
                )}
              </div>
              <span className={`font-medium transition-all duration-300 ease-out ${task.completed ? 'line-through text-teal-900/50 dark:text-teal-100/50' : 'text-[#0D1518] dark:text-[#FCFBF8]'}`}>
                {t(task.key)}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
});

export default ElectionCompanion;
