import { useState, memo } from 'react';
import { Award, RefreshCw, CheckCircle2, XCircle, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import quizData from '../../quiz_data.json';

const Quiz = memo(function Quiz() {
  const { t, language } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answer, setAnswer] = useState(null);

  const currentQuestion = quizData[currentQuestionIndex][language] || quizData[currentQuestionIndex]['en'];
  const correctAnswer = quizData[currentQuestionIndex].answer;

  const handleOptionClick = (index) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    setAnswer(correctAnswer);

    if (index === correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < quizData.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsAnswered(false);
        setAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswered(false);
    setAnswer(null);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto p-8 md:p-10 border rounded-3xl border-teal-900/10 dark:border-teal-100/10 bg-white/40 dark:bg-[#131E22]/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(13,148,136,0.1)] dark:hover:shadow-[0_0_20px_rgba(20,184,166,0.1)] transition-all duration-300 ease-out group overflow-hidden">
      {showResult ? (
        <div className="text-center space-y-6 animate-in zoom-in duration-300 py-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-50 dark:bg-teal-900/20 mb-2">
            <Award className="w-10 h-10 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#0D1518] dark:text-[#FCFBF8] mb-2">{t('quiz.completed')}</h2>
            <p className="text-[#0D1518]/70 dark:text-[#FCFBF8]/70">
              {t('quiz.score')} <span className="font-bold text-[#0D1518] dark:text-[#FCFBF8]">{score}</span> {t('quiz.out_of')} {quizData.length}
            </p>
          </div>
          
          <button
            onClick={restartQuiz}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:text-[#0A1114] dark:hover:bg-teal-400 font-semibold rounded-full transition-all duration-300 ease-out shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            {t('quiz.restart')}
          </button>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold tracking-tight text-[#0D1518] dark:text-[#FCFBF8]">{t('quiz.title')}</h3>
              <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400">
                <span>Score: {score}</span>
                {isAnswered && (
                  <span className="flex items-center gap-1 text-pink-500 dark:text-pink-400 animate-in fade-in slide-in-from-right-2">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>
            </div>
            <span className="text-sm font-medium px-3 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 rounded-full">
              {t('quiz.question')} {currentQuestionIndex + 1} {t('quiz.of')} {quizData.length}
            </span>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-medium text-[#0D1518] dark:text-[#FCFBF8]">
              {currentQuestion.question}
            </h4>
            
            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => {
                let buttonStyle = "border-teal-900/10 dark:border-teal-100/10 bg-white/50 dark:bg-[#0A1114]/50 text-[#0D1518]/80 dark:text-[#FCFBF8]/80 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:shadow-md hover:-translate-y-0.5";
                let icon = null;

                if (isAnswered) {
                  if (index === answer) {
                    buttonStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500 shadow-sm";
                    icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
                  } else if (index === selectedOption) {
                    buttonStyle = "border-pink-500 bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-400 ring-1 ring-pink-500 shadow-sm";
                    icon = <XCircle className="w-5 h-5 text-pink-500 shrink-0" />;
                  } else {
                    buttonStyle = "border-teal-900/5 dark:border-teal-100/5 opacity-40 bg-white/30 dark:bg-[#0A1114]/30 grayscale";
                  }
                } else if (selectedOption === index) {
                  buttonStyle = "border-teal-600 dark:border-teal-400 ring-1 ring-teal-600 dark:ring-teal-400 shadow-md";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    disabled={isAnswered}
                    className={`flex items-center justify-between w-full p-4 border rounded-2xl text-left font-medium transition-all duration-300 ease-out ${buttonStyle}`}
                  >
                    <span>{option}</span>
                    {icon && <span className="animate-in zoom-in duration-300">{icon}</span>}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="w-full bg-teal-900/5 dark:bg-teal-100/5 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-teal-500 to-pink-500 dark:from-teal-400 dark:to-pink-400 h-full transition-all duration-300 ease-out"
              style={{ width: `${((currentQuestionIndex + (isAnswered ? 1 : 0)) / quizData.length) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default Quiz;
