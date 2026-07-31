import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { useLanguage } from '../i18n';
import { Header } from '../components/Header';
import { useEffect } from 'react';

export const TestIntro = () => {
  const navigate = useNavigate();
  const { startTest } = useTest();
  const t = useTranslation();
  const { language } = useLanguage();

  // Update page title for accessibility
  useEffect(() => {
    document.title = `${t('testIntro.title')} - Impulse26 Key`;
  }, [t]);

  const handleStartTest = () => {
    startTest();
    navigate('/test');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-8 sm:py-16 md:py-24 pb-24 sm:pb-24 px-4 sm:px-8 md:px-16" id="main-content">
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
                <span
                  className="text-xl sm:text-2xl bg-[#f7e3ef] border-2 border-[#5d38e3] rounded p-2"
                  role="img"
                  aria-label={language === 'zh' ? '闪电 - 快速直觉反应' : 'Lightning bolt - Quick instinctive response'}
                >
                  ⚡
                </span>
                <div>
                  <h3 className="font-72-brand text-[13px] sm:text-body-md font-medium text-[#231821]">
                    {t('testIntro.tips.0')}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#d8bfd1] rounded-lg p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <span
                  className="text-xl sm:text-2xl bg-[#f7e3ef] border-2 border-[#00b098] rounded p-2"
                  role="img"
                  aria-label={language === 'zh' ? '禁止标志 - 不要过度思考' : 'No symbol - Don\'t overthink'}
                >
                  🚫
                </span>
                <div>
                  <h3 className="font-72-brand text-[13px] sm:text-body-md font-medium text-[#231821]">
                    {t('testIntro.tips.1')}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#d8bfd1] rounded-lg p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <span
                  className="text-xl sm:text-2xl bg-[#f7e3ef] border-2 border-[#a800aa] rounded p-2"
                  role="img"
                  aria-label={language === 'zh' ? '放大镜 - 探索发现' : 'Magnifying glass - Explore and discover'}
                >
                  🔍
                </span>
                <div>
                  <h3 className="font-72-brand text-[13px] sm:text-body-md font-medium text-[#231821]">
                    {t('testIntro.tips.2')}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#d8bfd1] rounded-lg p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <span
                  className="text-xl sm:text-2xl bg-[#f7e3ef] border-2 border-[#5d38e3] rounded p-2"
                  role="img"
                  aria-label={language === 'zh' ? '锁 - 隐私保护' : 'Lock - Privacy protected'}
                >
                  🔒
                </span>
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

          {/* Start Button - Hidden on mobile, visible on desktop */}
          <div className="hidden sm:flex justify-center">
            <button
              onClick={handleStartTest}
              className="relative w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-5 text-white font-72-brand text-[14px] sm:text-body-lg rounded-full overflow-hidden transition-all duration-300 hover:translate-y-[-2px] active:translate-y-[1px] flex items-center justify-center gap-2 group"
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
              <span className="relative z-10">{t('testIntro.startButton')}</span>
              <span className="relative z-10">→</span>
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Button - Only visible on mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#a800aa] px-4 py-4 z-50 shadow-[0px_-4px_8px_rgba(168,0,170,0.1)]">
        <button
          onClick={handleStartTest}
          className="relative w-full px-8 py-3 text-white font-72-brand text-[14px] rounded-full overflow-hidden flex items-center justify-center gap-2"
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
          <span className="relative z-10">{t('testIntro.startButton')}</span>
          <span className="relative z-10">→</span>
        </button>
      </div>
    </div>
  );
};
