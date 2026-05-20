import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { useLanguage } from '../i18n';
import { Header } from '../components/Header';

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Survey Module Badge */}
          <div className="mb-8 flex justify-between items-center">
            <span className="inline-block px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded">
              {t('question.surveyModule')}
            </span>
            <span className="text-sm text-gray-600">
              ║ {currentQuestionIndex + 1} / {questions.length} ║
            </span>
          </div>

          {/* Question Card */}
          <div className="bg-white paper-texture rounded-lg shadow-sm p-8 mb-8">
            {/* Question Text */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {language === 'zh'
                  ? (currentQuestion.text?.zh || currentQuestion.textCN)
                  : (currentQuestion.text?.en || currentQuestion.textEN)}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options.map((option) => {
                const isSelected = currentAnswer?.selectedOption === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option.id)}
                    className={`w-full p-6 text-left border-2 rounded-lg transition-all duration-200
                      ${isSelected
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-400 hover:bg-orange-25'
                      }
                      active:scale-[0.98] active:shadow-inner
                      hover:shadow-md
                    `}
                  >
                    <p className={`${isSelected ? 'text-gray-900 font-medium' : 'text-gray-900'}`}>
                      {language === 'zh'
                        ? (option.text?.zh || option.textCN)
                        : (option.text?.en || option.textEN)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>←</span>
              {t('question.previousStep')}
            </button>

            {canSubmit && (
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center gap-2"
              >
                {t('question.submitTest')}
                <span>✓</span>
              </button>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span>ℹ️</span>
              {t('question.helpText')}
            </p>
          </div>

          {/* Progress Bar at Bottom */}
          <div className="mt-8">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-orange-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
