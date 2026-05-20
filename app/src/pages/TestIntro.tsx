import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { Header } from '../components/Header';

export const TestIntro = () => {
  const navigate = useNavigate();
  const { startTest } = useTest();
  const t = useTranslation();

  const handleStartTest = () => {
    startTest();
    navigate('/test');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-3xl w-full bg-white paper-texture rounded-lg shadow-sm p-12">
          {/* Tag */}
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 text-sm font-medium rounded">
              {t('testIntro.tag')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {t('testIntro.title')}
          </h1>

          {/* Introduction Text */}
          <div className="border-l-4 border-orange-500 pl-6 mb-12">
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('testIntro.intro1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('testIntro.intro2')}
            </p>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="bg-gray-50 paper-texture rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    {t('testIntro.tips.0')}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 paper-texture rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚫</span>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    {t('testIntro.tips.1')}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 paper-texture rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔍</span>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    {t('testIntro.tips.2')}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 paper-texture rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    {t('testIntro.tips.3')}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center text-gray-600 mb-8">
            {t('testIntro.footer')}
          </p>

          {/* Start Button */}
          <div className="flex justify-center">
            <button
              onClick={handleStartTest}
              className="px-12 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-lg flex items-center gap-2"
            >
              {t('testIntro.startButton')}
              <span>→</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
