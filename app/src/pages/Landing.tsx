import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { Header } from '../components/Header';

export const Landing = () => {
  const navigate = useNavigate();
  const { startTest } = useTest();
  const t = useTranslation();

  const handleStartTest = () => {
    startTest();
    navigate('/role'); // Navigate to role selection first
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-8 py-16 w-full">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 animate-fadeIn">
          {/* Left Column - Text Content */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">
              {t('landing.title')}
            </h1>
            <h2 className="text-3xl text-orange-500 mb-8">
              {t('landing.subtitle')}
            </h2>

            <div className="space-y-4 text-gray-700 mb-8">
              <p>{t('landing.description1')}</p>
              <p>{t('landing.description2')}</p>
              <p className="text-sm text-gray-600">
                {t('landing.description3')}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleStartTest}
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all font-medium"
              >
                {t('landing.startButton')}
              </button>
              <button
                onClick={() => navigate('/intro')}
                className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:shadow-md transition-all font-medium"
              >
                {t('landing.howToPlayButton')}
              </button>
            </div>
          </div>

          {/* Right Column - Key Illustration */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg">
              <img
                src="/impulse-key-visual.svg"
                alt="Impulse Key Visual"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* About the Project Section */}
        <div className="bg-white paper-texture rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">{t('landing.aboutTitle')}</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3">{t('landing.aboutItems.placard.title')}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('landing.aboutItems.placard.desc')}
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3">{t('landing.aboutItems.library.title')}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('landing.aboutItems.library.desc')}
              </p>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3">{t('landing.aboutItems.therapist.title')}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('landing.aboutItems.therapist.desc')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Column 4 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3">{t('landing.aboutItems.contribution.title')}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('landing.aboutItems.contribution.desc')}
              </p>
            </div>

            {/* Column 5 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3">{t('landing.aboutItems.feedback.title')}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('landing.aboutItems.feedback.desc')}
              </p>
            </div>

            {/* Column 6 */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3">{t('landing.aboutItems.internal.title')}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t('landing.aboutItems.internal.desc')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
