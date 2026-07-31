import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { useLanguage } from '../i18n';
import { Header } from '../components/Header';
import { GlossaryPanel } from '../components/GlossaryPanel';

export const QuestionFlow = () => {
  const navigate = useNavigate();
  const { questions, currentQuestionIndex, answers, resultKey, answerQuestion, goToPreviousQuestion, submitTest } = useTest();
  const t = useTranslation();
  const { language } = useLanguage();

  // Redirect to loading page when test is submitted
  useEffect(() => {
    if (resultKey) {
      navigate('/loading');
    }
  }, [resultKey, navigate]);

  // Redirect to home if no questions loaded
  useEffect(() => {
    if (questions.length === 0) {
      navigate('/');
    }
  }, [questions, navigate]);

  if (questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((answers.length) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Find current question's answer if it exists
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

  const canSubmit = isLastQuestion && answers.length === questions.length;

  const handleOptionClick = (optionId: 'A' | 'B' | 'C') => {
    answerQuestion(currentQuestion.id, optionId);
  };

  const handlePrevious = () => {
    goToPreviousQuestion();
  };

  const handleSubmit = () => {
    submitTest();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <GlossaryPanel />

      {/* Progress Bar - Mobile only, at top */}
      <div className="sm:hidden bg-white border-b border-[#d8bfd1] px-4 py-3">
        <div className="flex justify-between items-center mb-2">
          <span className="font-jetbrains-mono font-medium text-[10px] leading-[16px] text-[#a800aa] uppercase">
            SURVEY
          </span>
          <span className="font-jetbrains-mono font-medium text-[10px] leading-[16px] text-[#a800aa] uppercase">
            STEP {String(currentQuestionIndex + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
          </span>
        </div>
        <div className="w-full bg-[#d8bfd1] h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#a800aa] to-[#f65af2] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <main className="flex-1 py-8 sm:py-12 md:py-24 pb-24 sm:pb-24 px-4 sm:px-6 md:px-16">
        <div className="max-w-[1280px] mx-auto">
          {/* Survey Module Badge */}
          <div className="mb-6 sm:mb-8 md:mb-12 flex justify-between items-center">
            <div className="inline-block px-3 py-1 bg-[#f7e3ef] border border-[#a800aa] rounded-sm">
              <span className="font-jetbrains-mono font-medium text-[10px] sm:text-[12px] leading-[16px] sm:leading-[18px] text-[#a800aa] uppercase">
                {t('question.surveyModule')}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-[#ffeff8] border border-[#d8bfd1] rounded-lg p-5 sm:p-8 md:p-10 mb-6 sm:mb-8 md:mb-10 shadow-soft">
            {/* Question Text */}
            <div className="mb-6 sm:mb-8 md:mb-10 border-l-4 border-[#a800aa] pl-4 sm:pl-6 md:pl-8">
              <h2 className="font-space-grotesk font-bold text-[18px] sm:text-[24px] md:text-[32px] leading-[1.3] tracking-tight text-[#231821]">
                {language === 'zh'
                  ? (currentQuestion.text?.zh || currentQuestion.textCN)
                  : (currentQuestion.text?.en || currentQuestion.textEN)}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3 sm:space-y-4">
              {currentQuestion.options.map((option) => {
                const isSelected = currentAnswer?.selectedOption === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option.id)}
                    className={`w-full p-4 sm:p-5 md:p-6 text-left border-2 rounded-lg transition-all duration-200
                      ${isSelected
                        ? 'border-[#a800aa] bg-[#a800aa] text-white shadow-soft'
                        : 'border-[#d8bfd1] hover:border-[#a800aa] bg-white'
                      }
                    `}
                  >
                    <p className={`font-72-brand text-[13px] sm:text-[15px] md:text-body-lg leading-[1.6] ${isSelected ? 'font-bold' : 'font-normal'} ${isSelected ? 'text-white' : 'text-[#534150]'}`}>
                      {language === 'zh'
                        ? (option.text?.zh || option.textCN)
                        : (option.text?.en || option.textEN)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons - Hidden on mobile, visible on desktop */}
          <div className="hidden sm:flex gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex-1 px-4 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-[#f7e3ef] text-[#231821] font-72-brand text-[13px] sm:text-[15px] md:text-body-lg border border-[#867181] rounded-lg hover:border-[#a800aa] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>←</span>
              {t('question.previousStep')}
            </button>

            {canSubmit && (
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-[#a800aa] text-white font-72-brand text-[13px] sm:text-[15px] md:text-body-lg rounded-lg border-b-4 border-[#800082] shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2"
              >
                {t('question.submitTest')}
                <span>✓</span>
              </button>
            )}
          </div>

          {/* Help Text */}
          <div className="mb-6 sm:mb-8 text-center">
            <div className="inline-flex items-center gap-2 bg-[#f7e3ef] border border-[#d8bfd1] rounded-lg px-4 sm:px-6 py-2 sm:py-3">
              <span className="text-[#5d38e3]">ℹ️</span>
              <p className="font-72-brand text-[12px] sm:text-body-sm text-[#534150]">
                {t('question.helpText')}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Buttons - Only visible on mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#a800aa] px-4 py-3 z-50 shadow-[0px_-4px_8px_rgba(168,0,170,0.1)]">
        <div className="flex gap-2 items-center justify-between mb-0">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex-1 px-3 py-2.5 bg-white text-[#231821] font-space-grotesk font-bold text-[13px] border-2 border-[#a800aa] rounded-lg hover:bg-[#f7e3ef] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 uppercase"
          >
            <span>←</span>
            PREVIOUS
          </button>

          <button
            onClick={() => {
              // Try to click desktop glossary button if visible
              const glossaryButton = document.querySelector('button[data-glossary-trigger="true"]') as HTMLButtonElement;
              if (glossaryButton) {
                glossaryButton.click();
              } else {
                // If desktop button not found (mobile), dispatch custom event
                window.dispatchEvent(new Event('openGlossary'));
              }
            }}
            className="px-3 py-2.5 text-[#5d38e3] font-space-grotesk font-medium text-[12px] flex items-center gap-1 whitespace-nowrap"
          >
            <span className="text-[16px]">?</span> {language === 'zh' ? '术语帮助' : 'View Terms'}
          </button>
        </div>
      </div>
    </div>
  );
};
