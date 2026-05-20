import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = () => {
  const navigate = useNavigate();
  const { resetTest } = useTest();
  const t = useTranslation();

  const handleRetake = () => {
    resetTest();
    navigate('/');
  };

  return (
    <header className="bg-white paper-texture border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-orange-500">{t('common.designHub').split('.')[0]}</span>
          <span className="text-gray-800">.{t('common.designHub').split('.')[1]}</span>
        </div>

        {/* Right side: Language Switcher + Retake Test */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button
            onClick={handleRetake}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            {t('common.retakeTest')}
          </button>
        </div>
      </div>
    </header>
  );
};
