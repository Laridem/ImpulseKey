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

      <main className="flex-1 flex items-center justify-center py-24 px-16">
        <div className="max-w-3xl w-full bg-[#ffeff8] border border-[#d8bfd1] rounded-lg p-12 shadow-soft-lg">
          {/* Tag */}
          <div className="mb-10">
            <div className="inline-block px-3 py-1 bg-[#f7e3ef] border border-[#a800aa] rounded-sm">
              <span className="font-jetbrains-mono font-medium text-[12px] leading-[18px] text-[#a800aa] uppercase">
                {t('testIntro.tag')}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-space-grotesk font-bold text-display-lg text-[#231821] text-shadow-kinetic mb-10">
            {t('testIntro.title')}
          </h1>

          {/* Introduction Text */}
          <div className="border-l-4 border-[#a800aa] pl-8 mb-12">
            <p className="font-72-brand text-body-lg text-[#231821] leading-[29.25px] mb-6">
              {t('testIntro.intro1')}
            </p>
            <p className="font-72-brand text-body-lg text-[#231821] leading-[29.25px]">
              {t('testIntro.intro2')}
            </p>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="bg-white border border-[#d8bfd1] rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl bg-[#f7e3ef] border-2 border-[#5d38e3] rounded p-2">⚡</span>
                <div>
                  <h3 className="font-72-brand text-body-md font-medium text-[#231821]">
                    {t('testIntro.tips.0')}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#d8bfd1] rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl bg-[#f7e3ef] border-2 border-[#00b098] rounded p-2">🚫</span>
                <div>
                  <h3 className="font-72-brand text-body-md font-medium text-[#231821]">
                    {t('testIntro.tips.1')}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#d8bfd1] rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl bg-[#f7e3ef] border-2 border-[#a800aa] rounded p-2">🔍</span>
                <div>
                  <h3 className="font-72-brand text-body-md font-medium text-[#231821]">
                    {t('testIntro.tips.2')}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#d8bfd1] rounded-lg p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl bg-[#f7e3ef] border-2 border-[#5d38e3] rounded p-2">🔒</span>
                <div>
                  <h3 className="font-72-brand text-body-md font-medium text-[#231821]">
                    {t('testIntro.tips.3')}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center font-72-brand text-body-md text-[#534150] mb-10 border-t border-[#d8bfd1] pt-8">
            {t('testIntro.footer')}
          </p>

          {/* Start Button */}
          <div className="flex justify-center">
            <button
              onClick={handleStartTest}
              className="px-12 py-5 bg-[#a800aa] text-white font-72-brand text-body-lg rounded-lg border-b-4 border-[#800082] shadow-soft hover:shadow-soft-lg transition-all flex items-center gap-2"
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
