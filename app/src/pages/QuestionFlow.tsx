import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { useLanguage } from '../i18n';
import { Header } from '../components/Header';
import { GlossaryPanel } from '../components/GlossaryPanel';

export const QuestionFlow = () => {
  const navigate = useNavigate();
  const { questions, currentQuestionIndex, answers, resultKey, selectedRole, answerQuestion, goToPreviousQuestion, submitTest } = useTest();
  const t = useTranslation();
  const { language } = useLanguage();
  const optionsContainerRef = useRef<HTMLDivElement>(null);

  // Clear all hover states when question changes
  useEffect(() => {
    if (optionsContainerRef.current) {
      const buttons = optionsContainerRef.current.querySelectorAll('button');
      buttons.forEach((button) => {
        // Force blur to remove focus
        button.blur();
        // Temporarily disable pointer events to clear hover state
        button.style.pointerEvents = 'none';
      });

      // Re-enable pointer events after a brief delay
      const timeout = setTimeout(() => {
        buttons.forEach((button) => {
          button.style.pointerEvents = '';
        });
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [currentQuestionIndex]);

  // Update page title for accessibility
  useEffect(() => {
    document.title = `${t('question.surveyModule')} - Step ${currentQuestionIndex + 1}/${questions.length} - Impulse26 Key`;
  }, [currentQuestionIndex, questions.length, t]);

  // Redirect to loading page when test is submitted
  useEffect(() => {
    if (resultKey) {
      navigate('/loading');
    }
  }, [resultKey, navigate]);

  // Redirect to role selection if no role selected
  useEffect(() => {
    if (!selectedRole) {
      navigate('/role-selection');
    }
  }, [selectedRole, navigate]);

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

  // Helper function to get role-appropriate option text
  const getOptionText = (option: any, role: string | null, language: string): string => {
    // If user selected a role (not secret) and option has role-specific variant
    if (role && role !== 'secret' && option.textByRole) {
      const roleKey = role as 'product_design' | 'tech_engineering' | 'business_strategy';
      const roleVariant = option.textByRole[roleKey];
      if (roleVariant) {
        return language === 'zh' ? roleVariant.zh : roleVariant.en;
      }
    }
    // Otherwise use generic version
    return language === 'zh' ? (option.text?.zh || option.textCN) : (option.text?.en || option.textEN);
  };

  // Find current question's answer if it exists
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);

  const canSubmit = isLastQuestion && answers.length === questions.length;

  const handleOptionClick = (optionId: 'A' | 'B' | 'C', event: React.MouseEvent<HTMLButtonElement>) => {
    answerQuestion(currentQuestion.id, optionId);

    // Remove hover state by blurring the clicked element
    event.currentTarget.blur();

    // Force remove hover state by adding pointer-events-none temporarily
    const button = event.currentTarget;
    button.style.pointerEvents = 'none';

    // Re-enable pointer events after question transition
    setTimeout(() => {
      button.style.pointerEvents = '';
    }, 50);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex === 0) {
      // First question - go back to role selection
      navigate('/role-selection');
    } else {
      goToPreviousQuestion();
    }
  };

  const handleSubmit = () => {
    submitTest();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <Header showHomeButton={true} />
      </div>
      <GlossaryPanel />

      {/* Progress Bar - Mobile only, sticky below header */}
      <div className="sm:hidden sticky top-[60px] z-40 bg-white/95 backdrop-blur-sm border-b border-[#d8bfd1] px-4 py-3 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="font-jetbrains-mono font-medium text-[10px] leading-[16px] text-[#800082] uppercase">
            SURVEY
          </span>
          <span className="font-jetbrains-mono font-medium text-[10px] leading-[16px] text-[#800082] uppercase">
            STEP {String(currentQuestionIndex + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
          </span>
        </div>
        <div className="w-full bg-[#d8bfd1] h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#800082] to-[#a100c2] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <main className="flex-1 py-8 sm:py-12 md:py-24 pb-24 sm:pb-24 px-4 sm:px-6 md:px-16" id="main-content">
        <div className="max-w-[1280px] mx-auto">
          {/* Survey Module Badge */}
          <div className="mb-6 sm:mb-8 md:mb-12 flex justify-between items-center">
            <div className="inline-block px-3 py-1 bg-[#f7e3ef] border border-[#800082] rounded-sm">
              <span className="font-jetbrains-mono font-medium text-[10px] sm:text-[12px] leading-[16px] sm:leading-[18px] text-[#800082] uppercase">
                {t('question.surveyModule')}
              </span>
            </div>
            {/* Desktop step counter - hidden on mobile */}
            <span className="hidden sm:inline-block font-jetbrains-mono font-medium text-[10px] sm:text-[12px] leading-[16px] sm:leading-[18px] text-[#800082] uppercase tracking-normal">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>

          {/* Question Card */}
          <div className="bg-[#ffeff8] border border-[#d8bfd1] rounded-lg p-5 sm:p-8 md:p-10 mb-6 sm:mb-8 md:mb-10 shadow-soft">
            {/* Question Text */}
            <div className="mb-6 sm:mb-8 md:mb-10 border-l-4 border-[#800082] pl-4 sm:pl-6 md:pl-8">
              <h2 id="question-text" className="font-space-grotesk font-bold text-[18px] sm:text-[24px] md:text-[32px] leading-[1.3] tracking-tight text-[#231821]">
                {language === 'zh'
                  ? (currentQuestion.text?.zh || currentQuestion.textCN)
                  : (currentQuestion.text?.en || currentQuestion.textEN)}
              </h2>
            </div>

            {/* Options */}
            <div ref={optionsContainerRef} className="space-y-3 sm:space-y-4" role="radiogroup" aria-labelledby="question-text">
              {currentQuestion.options.map((option) => {
                const isSelected = currentAnswer?.selectedOption === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={(e) => handleOptionClick(option.id, e)}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`Option ${option.id}: ${getOptionText(option, selectedRole, language)}`}
                    className={`w-full p-4 sm:p-5 md:p-6 text-left border-2 rounded-lg transition-all duration-200
                      ${isSelected
                        ? 'border-[#800082] bg-[#800082] text-white shadow-soft'
                        : 'border-[#d8bfd1] hover:border-[#800082] active:border-[#800082] bg-white focus:outline-none focus:ring-0'
                      }
                    `}
                  >
                    <p className={`font-72-brand text-[13px] sm:text-[15px] md:text-body-lg leading-[1.6] ${isSelected ? 'font-bold' : 'font-normal'} ${isSelected ? 'text-white' : 'text-[#534150]'}`}>
                      {getOptionText(option, selectedRole, language)}
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
              className="relative flex-1 px-4 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-[#534150] font-72-brand text-[13px] sm:text-[15px] md:text-body-lg rounded-full transition-all duration-300 hover:translate-y-[-1px] hover:border-[#800082] hover:text-[#800082] active:border-[#800082] active:text-[#800082] flex items-center justify-center gap-2 overflow-hidden"
              style={{
                borderWidth: '3px',
                borderColor: '#d8bfd1',
                background: 'linear-gradient(145deg, #ffffff 0%, #fef5fb 100%)',
                boxShadow: '0 1px 0 0 rgba(255,255,255,0.8) inset, 0 2px 8px -2px rgba(168,0,170,0.15)'
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none opacity-30"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)'
                }}
              />
              <span className="relative z-10">←</span>
              <span className="relative z-10">
                {currentQuestionIndex === 0 ? t('question.backToRoleSelection') : t('question.previousStep')}
              </span>
            </button>

            {canSubmit && (
              <button
                onClick={handleSubmit}
                className="relative flex-1 px-4 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-white font-72-brand text-[13px] sm:text-[15px] md:text-body-lg rounded-full overflow-hidden transition-all duration-300 hover:translate-y-[-2px] active:translate-y-[1px] flex items-center justify-center gap-2 group"
                style={{
                  background: 'linear-gradient(145deg, #c026d3 0%, #a800aa 50%, #800082 100%)',
                  boxShadow: `
                    0 1px 0 0 rgba(255,255,255,0.3) inset,
                    0 -1px 0 0 rgba(0,0,0,0.2) inset,
                    0 6px 0 0 #800082,
                    0 10px 20px -4px rgba(168,0,170,0.4),
                    0 0 40px -10px rgba(246,90,242,0.5)
                  `
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `
                    0 1px 0 0 rgba(255,255,255,0.4) inset,
                    0 -1px 0 0 rgba(0,0,0,0.2) inset,
                    0 8px 0 0 #800082,
                    0 14px 28px -4px rgba(168,0,170,0.5),
                    0 0 60px -5px rgba(246,90,242,0.7)
                  `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `
                    0 1px 0 0 rgba(255,255,255,0.3) inset,
                    0 -1px 0 0 rgba(0,0,0,0.2) inset,
                    0 6px 0 0 #800082,
                    0 10px 20px -4px rgba(168,0,170,0.4),
                    0 0 40px -10px rgba(246,90,242,0.5)
                  `;
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[30%] pointer-events-none opacity-40"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)'
                  }}
                />
                <span className="relative z-10">{t('question.submitTest')}</span>
                <span className="relative z-10">✓</span>
              </button>
            )}
          </div>

          {/* Think About It - Question-specific hint */}
          {(currentQuestion.hintEN || currentQuestion.hintCN) && (
            <div className="mb-6 sm:mb-8 text-center">
              <div className="inline-flex flex-col items-center gap-2 bg-[#f7e3ef] border border-[#d8bfd1] rounded-lg px-4 sm:px-6 py-3 sm:py-4">
                <span className="font-jetbrains-mono font-medium text-[10px] sm:text-[11px] text-[#800082] uppercase tracking-wide">
                  {t('question.thinkAboutIt')}
                </span>
                <p className="font-72-brand text-[13px] sm:text-[15px] text-[#534150] leading-[1.5] text-center">
                  {language === 'zh' ? currentQuestion.hintCN : currentQuestion.hintEN}
                </p>
              </div>
            </div>
          )}

          {/* Progress Bar - Desktop only */}
          <div className="hidden sm:block w-full bg-[#d8bfd1] h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#800082] to-[#a100c2] h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Buttons - Only visible on mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#800082] px-4 py-3 z-50 shadow-[0px_-4px_8px_rgba(128,0,130,0.1)]">
        {canSubmit ? (
          /* Last question: Show Previous + Submit + View Terms */
          <div className="flex flex-col gap-2 mb-0">
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                className="relative flex-1 px-3 py-2.5 text-[#231821] font-poppins font-bold text-[13px] rounded-full transition-all flex items-center justify-center gap-1.5 uppercase overflow-hidden"
                style={{
                  borderWidth: '2px',
                  borderColor: '#800082',
                  background: 'linear-gradient(145deg, #ffffff 0%, #fef5fb 100%)',
                  boxShadow: '0 1px 0 0 rgba(255,255,255,0.8) inset'
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none opacity-30"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)'
                  }}
                />
                <span className="relative z-10">←</span>
                <span className="relative z-10">PREVIOUS</span>
              </button>

              <button
                onClick={handleSubmit}
                className="relative flex-1 px-4 py-2.5 text-white font-poppins font-semibold text-[14px] rounded-full overflow-hidden flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(145deg, #c026d3 0%, #a800aa 50%, #800082 100%)',
                  boxShadow: `
                    0 1px 0 0 rgba(255,255,255,0.3) inset,
                    0 4px 0 0 #800082,
                    0 8px 16px -4px rgba(168,0,170,0.4)
                  `
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[30%] pointer-events-none opacity-40"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)'
                  }}
                />
                <span className="relative z-10">{t('question.submitTest')}</span>
                <span className="relative z-10">✓</span>
              </button>
            </div>

            <button
              onClick={() => {
                const glossaryButton = document.querySelector('button[data-glossary-trigger="true"]') as HTMLButtonElement;
                if (glossaryButton) {
                  glossaryButton.click();
                } else {
                  window.dispatchEvent(new Event('openGlossary'));
                }
              }}
              className="w-full min-h-[44px] px-4 py-3 text-[#5d38e3] font-poppins font-medium text-[14px] flex items-center justify-center gap-2 hover:bg-[#f7e3ef] rounded-lg transition-colors"
              aria-label={language === 'zh' ? '查看术语帮助' : 'View glossary terms'}
            >
              <span className="text-[18px]">?</span>
              <span>{language === 'zh' ? '术语帮助' : 'View Terms'}</span>
            </button>
          </div>
        ) : (
          /* Regular questions: Show Previous + View Terms */
          <div className="flex gap-2 items-center justify-between mb-0">
            <button
              onClick={handlePrevious}
              className="relative flex-1 px-3 py-2.5 text-[#231821] font-poppins font-bold text-[13px] rounded-full transition-all flex items-center justify-center gap-1.5 uppercase overflow-hidden"
              style={{
                borderWidth: '2px',
                borderColor: '#a800aa',
                background: 'linear-gradient(145deg, #ffffff 0%, #fef5fb 100%)',
                boxShadow: '0 1px 0 0 rgba(255,255,255,0.8) inset'
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none opacity-30"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)'
                }}
              />
              <span className="relative z-10">←</span>
              <span className="relative z-10">
                {currentQuestionIndex === 0 ? (language === 'zh' ? '返回' : 'BACK') : 'PREVIOUS'}
              </span>
            </button>

            <button
              onClick={() => {
                const glossaryButton = document.querySelector('button[data-glossary-trigger="true"]') as HTMLButtonElement;
                if (glossaryButton) {
                  glossaryButton.click();
                } else {
                  window.dispatchEvent(new Event('openGlossary'));
                }
              }}
              className="min-h-[44px] min-w-[44px] px-4 py-3 text-[#5d38e3] font-poppins font-medium text-[14px] flex items-center gap-2 whitespace-nowrap hover:bg-[#f7e3ef] rounded-lg transition-colors"
              aria-label={language === 'zh' ? '查看术语帮助' : 'View glossary terms'}
            >
              <span className="text-[18px]">?</span>
              <span>{language === 'zh' ? '术语帮助' : 'View Terms'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
