import { useState, memo } from 'react';
import electionData from '../../election_steps.json';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const EligibilityForm = memo(function EligibilityForm() {
  const { t, language } = useLanguage();
  const [age, setAge] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [triedSubmit, setTriedSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitted(false);
    setTriedSubmit(true);

    if (!age || !state) {
      setError(t('form.validation.empty'));
      return;
    }

    const ageNum = parseInt(age, 10);
    if (ageNum < 18 || ageNum > 120) {
      setError(t('form.validation.age'));
      return;
    }

    setIsSubmitted(true);
    setTriedSubmit(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto p-8 border rounded-3xl border-teal-900/10 dark:border-teal-100/10 bg-white/40 dark:bg-[#131E22]/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(13,148,136,0.1)] dark:hover:shadow-[0_0_20px_rgba(20,184,166,0.1)] hover:border-teal-300/80 dark:hover:border-teal-600/50 transition-all duration-300 ease-out group overflow-hidden">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-[#0D1518] dark:text-[#FCFBF8]">{t('form.title')}</h2>
        <p className="text-sm text-[#0D1518]/70 dark:text-[#FCFBF8]/70 mt-1">{t('form.subtitle')}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-[#0D1518] dark:text-[#FCFBF8] mb-1.5">{t('form.age.label')}</label>
            <input
              type="number"
              value={age}
              onChange={(e) => { setAge(e.target.value); setIsSubmitted(false); setError(''); }}
              placeholder={t('form.age.placeholder')}
              className={`w-full px-4 py-3 bg-white/50 dark:bg-[#0A1114]/50 border rounded-xl focus:ring-2 outline-none transition-all duration-300 ease-out text-[#0D1518] dark:text-[#FCFBF8] ${
                triedSubmit && (!age || (parseInt(age, 10) < 18 || parseInt(age, 10) > 120))
                ? 'border-pink-500 focus:ring-pink-500 dark:focus:ring-pink-400' 
                : 'border-teal-900/10 dark:border-teal-100/10 focus:ring-teal-500 dark:focus:ring-teal-400'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#0D1518] dark:text-[#FCFBF8] mb-1.5">{t('form.state.label')}</label>
            <select
              value={state}
              onChange={(e) => { setState(e.target.value); setIsSubmitted(false); setError(''); }}
              className={`w-full px-4 py-3 bg-white/50 dark:bg-[#0A1114]/50 border rounded-xl focus:ring-2 outline-none transition-all duration-300 ease-out text-[#0D1518] dark:text-[#FCFBF8] ${
                triedSubmit && !state
                ? 'border-pink-500 focus:ring-pink-500 dark:focus:ring-pink-400' 
                : 'border-teal-900/10 dark:border-teal-100/10 focus:ring-teal-500 dark:focus:ring-teal-400'
              }`}
            >
              <option value="" disabled>{t('form.state.placeholder')}</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:text-[#0A1114] dark:hover:bg-teal-400 font-bold rounded-2xl transition-all duration-300 ease-out shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
        >
          {t('form.button')}
        </button>
      </form>

      {error && (
        <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 animate-in slide-in-from-top-2 fade-in duration-300 ease-out border border-pink-200/50 dark:border-pink-900/50">
          <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="font-medium text-sm">{error}</p>
        </div>
      )}

      {isSubmitted && !error && (
        <div className="mt-8 animate-in slide-in-from-top-2 fade-in duration-300 ease-out border-t border-teal-900/10 dark:border-teal-100/10 pt-6">
          <div className="space-y-6">
            <div className="flex items-start gap-3 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">{t('form.success.msg')} {state}!</p>
                <p className="text-xs opacity-80 mt-0.5">{t('form.success.submsg')}</p>
              </div>
            </div>
            
            <div className="space-y-3 pl-2 border-l-2 border-teal-900/10 dark:border-teal-100/10 ml-2">
              {electionData.map((step) => {
                const stepData = step[language] || step['en'];
                return (
                  <div key={step.step} className="relative pl-6 pb-4 last:pb-0">
                    <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-teal-300 dark:bg-teal-600" />
                    <h4 className="font-semibold text-[#0D1518] dark:text-[#FCFBF8] text-sm mb-1">{stepData.name}</h4>
                    <p className="text-xs text-[#0D1518]/70 dark:text-[#FCFBF8]/70">{stepData.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default EligibilityForm;
