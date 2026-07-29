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
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-8 sm:py-16 md:py-24 px-4 sm:px-8 md:px-16">
        <div className="max-w-3xl w-full bg-[#ffeff8] border border-[#d8bfd1] rounded-lg p-6 sm:p-8 md:p-12 shadow-soft-lg">
          {/* Tag */}
          <div className="mb-6 sm:mb-10">
            <div className="inline-block px-3 py-1 bg-[#f7e3ef] border border-[#a800aa] rounded-sm">
              <span className="font-jetbrains-mono font-medium text-[10px] sm:text-[12px] leading-[16px] sm:leading-[18px] text-[#a800aa] uppercase">
                {t('testIntro.tag')}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-space-grotesk font-bold text-[24px] sm:text-[32px] md:text-display-lg text-[#231821] text-shadow-kinetic-sm sm:text-shadow-kinetic mb-6 sm:mb-10">
            {t('testIntro.title')}
          </h1>

          {/* Introduction Text */}
          <div className="border-l-4 border-[#a800aa] pl-4 sm:pl-8 mb-8 sm:mb-12">
            <p className="font-72-brand text-[14px] sm:text-body-lg text-[#231821] leading-[1.6] sm:leading-[29.25px] mb-4 sm:mb-6">
              {t('testIntro.intro1')}
            </p>
            <p className="font-72-brand text-[14px] sm:text-body-lg text-[#231821] leading-[1.6] sm:leading-[29.25px]">
              {t('testIntro.intro2')}
            </p>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12">
            <div className="bg-white border border-[#d8bfd1] rounded-lg p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="text-xl sm:text-2xl bg-[#f7e3ef] border-2 border-[#5d38e3] rounded p-2">⚡</span>
                <div>
                  <h3 className="font-72-brand text-[13px] sm:text-body-md font-medium text-[#231821]">
                    {t('testIntro.tips.0')}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#d8bfd1] rounded-lg p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="text-xl sm:text-2xl bg-[#f7e3ef] border-2 border-[#00b098] rounded p-2">🚫</span>
                <div>
                  <h3 className="font-72-brand text-[13px] sm:text-body-md font-medium text-[#231821]">
                    {t('testIntro.tips.1')}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#d8bfd1] rounded-lg p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="text-xl sm:text-2xl bg-[#f7e3ef] border-2 border-[#a800aa] rounded p-2">🔍</span>
                <div>
                  <h3 className="font-72-brand text-[13px] sm:text-body-md font-medium text-[#231821]">
                    {t('testIntro.tips.2')}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#d8bfd1] rounded-lg p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="text-xl sm:text-2xl bg-[#f7e3ef] border-2 border-[#5d38e3] rounded p-2">🔒</span>
                <div>
                  <h3 className="font-72-brand text-[13px] sm:text-body-md font-medium text-[#231821]">
                    {t('testIntro.tips.3')}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center font-72-brand text-[13px] sm:text-body-md text-[#534150] mb-6 sm:mb-10 border-t border-[#d8bfd1] pt-6 sm:pt-8">
            {t('testIntro.footer')}
          </p>

          {/* Start Button */}
          <div className="flex justify-center">
            <button
              onClick={handleStartTest}
              className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-5 bg-[#a800aa] text-white font-72-brand text-[14px] sm:text-body-lg rounded-lg border-b-4 border-[#800082] shadow-soft hover:shadow-soft-lg transition-all flex items-center justify-center gap-2"
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
