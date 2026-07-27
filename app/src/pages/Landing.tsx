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
    navigate('/role');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 py-8 sm:py-16 md:py-24 w-full">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-24">
          {/* Left Column - Text Content */}
          <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Tag Badge */}
            <div className="inline-block px-3 py-1 bg-[#f7e3ef] border border-[#a800aa] rounded-sm">
              <span className="font-jetbrains-mono font-medium text-[10px] sm:text-[12px] leading-[16px] sm:leading-[18px] text-[#a800aa] uppercase">
                FUN PROJECT by SAP Design Hub China
              </span>
            </div>

            {/* Main Title with Text Shadow */}
            <h1 className="font-space-grotesk font-bold text-[40px] sm:text-[56px] md:text-[80px] leading-[1.1] sm:leading-[1.1] md:leading-[80px] tracking-[-1.6px] sm:tracking-[-2.4px] md:tracking-[-3.2px] text-[#231821] text-shadow-kinetic">
              Impulse26.Key
            </h1>

            {/* Subtitle */}
            <h2 className="font-72-brand text-[24px] sm:text-[32px] md:text-display-lg text-[#5d38e3] leading-[1.2]">
              {t('landing.subtitle')}
            </h2>

            {/* Description */}
            <div className="max-w-full lg:max-w-[576px]">
              <p className="font-72-brand text-[16px] sm:text-body-lg text-[#534150] leading-[1.6] sm:leading-[29.25px]">
                {t('landing.description1')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button
                onClick={handleStartTest}
                className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-[#a800aa] text-white font-72-brand text-[16px] sm:text-body-lg rounded-lg border-b-4 border-[#800082] shadow-soft hover:shadow-soft-lg transition-all"
              >
                {t('landing.startButton')}
              </button>
              <button
                onClick={() => navigate('/intro')}
                className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-[#f7e3ef] text-[#231821] font-72-brand text-[16px] sm:text-body-lg border border-[#867181] rounded-lg hover:border-[#a800aa] transition-all"
              >
                {t('landing.howToPlayButton')}
              </button>
            </div>

            {/* Disclaimer Section */}
            <div className="border-t border-[#d8bfd1] pt-8 sm:pt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-full lg:max-w-[652px]">
              <div className="space-y-2">
                <p className="font-jetbrains-mono font-medium text-[10px] sm:text-[12px] leading-[16px] sm:leading-[18px] text-[#a800aa] uppercase">
                  DISCLAIMER / 免责声明
                </p>
                <p className="font-72-brand text-[14px] sm:text-body-sm text-[#534150]">
                  {t('landing.description3')}
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-jetbrains-mono font-medium text-[10px] sm:text-[12px] leading-[16px] sm:leading-[18px] text-[#a800aa] uppercase">
                  PRIVACY / 隐私提示
                </p>
                <p className="font-72-brand text-[14px] sm:text-body-sm text-[#534150]">
                  请勿分享到公开社交媒体。这个测试只适合在内部快乐传播，外面的互联网已经够乱了。
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Visual */}
          <div className="flex-shrink-0 flex items-start justify-center w-full lg:w-[452px] relative mt-8 lg:mt-0">
            {/* Key Visual Container */}
            <div className="relative w-full max-w-[376px] aspect-[376/361] lg:w-[376px] lg:h-[361px]">
              {/* Main Container with Decorative Borders */}
              <div className="absolute inset-0 bg-white border-2 border-[#a800aa] rounded-lg shadow-soft-lg p-7">
                {/* Corner Decorations */}
                <div className="absolute -left-4 -top-4 w-12 h-12 border-l-4 border-t-4 border-[#00b098]" />
                <div className="absolute -right-4 -bottom-4 w-12 h-12 border-r-4 border-b-4 border-[#a800aa]" />

                {/* Decorative Background Elements */}
                <div className="absolute top-4 right-6 w-28 h-4 bg-white" />
                <div className="absolute bottom-4 left-6 w-36 h-4 bg-white" />

                {/* Inner Frame */}
                <div className="relative w-full h-full border border-[#d8bfd1] rounded flex items-center justify-center p-4">
                  <img
                    src="/assets/impulse-key-visual.png"
                    alt="Impulse Key Visual"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Gradient Overlay (decorative) */}
                <div className="absolute inset-0 rounded-lg pointer-events-none opacity-20"
                     style={{
                       background: 'radial-gradient(circle at 50% 50%, rgba(246,90,242,1) 0%, rgba(246,90,242,0) 5%)'
                     }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* About the Project Section */}
        <div className="border-t border-[#d8bfd1] pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: About Text */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-space-grotesk font-bold text-display-lg text-[#231821]">
                About the Project
              </h3>
              <div className="space-y-4">
                <p className="font-hanken-grotesk text-body-lg text-[#534150] leading-[29.25px]">
                  This is a fun project powered by vibe coding—don't take it too seriously! Content planned and designed by larissa.deng@sap.com and its creation is supported by folks from Design Hub China.
                </p>
                <p className="font-hanken-grotesk text-body-lg text-[#534150] leading-[29.25px]">
                  You're welcome to join our future events and activities (SAP employees only):
                </p>
                <div className="space-y-2 pl-4">
                  <p className="font-hanken-grotesk text-body-lg text-[#534150] leading-[29.25px]">
                    Internal Sharepoint: <a href="https://sap.sharepoint.com/sites/209182/SitePages/Design-Hub-China.aspx?isSPOFile=1&xsdata=MDV8MDJ8fDY3MTZmZDY0YmUyZjQwZGQ5MDhkMDhkZTlhYTJhMjkzfDQyZjc2NzZjZjQ1NTQyM2M4MmY2ZGMyZDk5NzkxYWY3fDB8MHw2MzkxMTgyMjA0MzYxNDgzNjV8VW5rbm93bnxWR1ZoYlhOVFpXTjFjbWwwZVZObGNuWnBZMlY4ZXlKRFFTSTZJbFJsWVcxelgwRlVVRk5sY25acFkyVmZVMUJQVEU5R0lpd2lWaUk2SWpBdU1DNHdNREF3SWl3aVVDSTZJbGRwYmpNeUlpd2lRVTRpT2lKUGRHaGxjaUlzSWxkVUlqb3hNWDA9fDF8TDJOb1lYUnpMekU1T2pReU56azNNRGMzT0RobVl6UXlPR0poWVdFd1lqSmxNV014TXpjMll6a3lRSFJvY21WaFpDNTJNaTl0WlhOellXZGxjeTh4TnpjMk1qSTFNalEzTmpRd3xiNWFhYzIyZTRjMjk0NTNlOTA4ZDA4ZGU5YWEyYTI5M3wwZGI1MDE0MjI2ZjE0ZjFjOTgxMzRlMzQ5NDFjN2NlNg%3D%3D&sdata=QUZDbWZHQXZQdFZpeFdXZkRhNXYrbGtsZ3RUZGxPSmh0V3hxeGtOU1NiST0%3D&ovuser=42f7676c-f455-423c-82f6-dc2d99791af7%2Clarissa.deng%40sap.com&OR=Teams-HL&CT=1776226560704&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI1MC8yNjAzMTIyMzAyMCJ9" target="_blank" rel="noopener noreferrer" className="text-[#a800aa] underline hover:text-[#800082]">Link</a>
                  </p>
                  <p className="font-hanken-grotesk text-body-lg text-[#534150] leading-[29.25px]">
                    Join SAP Design Hub China Distribution List: <a href="https://profiles.wdf.sap.corp/groups/5c85d9385462d20285416a22/users" target="_blank" rel="noopener noreferrer" className="text-[#a800aa] underline hover:text-[#800082]">Link</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Info Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-6">
              <div className="bg-[#ffeff8] border border-[#d8bfd1] rounded-lg p-6 space-y-2">
                <h4 className="font-hanken-grotesk font-bold text-headline-sm text-[#231821]">
                  {t('landing.aboutItems.distribution.title')}
                </h4>
                <p className="font-72-brand text-body-sm text-[#534150]">
                  {t('landing.aboutItems.distribution.desc')}
                </p>
              </div>

              <div className="bg-[#ffeff8] border border-[#d8bfd1] rounded-lg p-6 space-y-2">
                <h4 className="font-hanken-grotesk font-bold text-headline-sm text-[#231821]">
                  {t('landing.aboutItems.engagement.title')}
                </h4>
                <p className="font-72-brand text-body-sm text-[#534150]">
                  {t('landing.aboutItems.engagement.desc')}
                </p>
              </div>

              <div className="bg-[#ffeff8] border border-[#d8bfd1] rounded-lg p-6 space-y-2">
                <h4 className="font-hanken-grotesk font-bold text-headline-sm text-[#231821]">
                  {t('landing.aboutItems.agenda.title')}
                </h4>
                <p className="font-72-brand text-body-sm text-[#534150]">
                  {t('landing.aboutItems.agenda.desc')}
                </p>
              </div>

              <div className="bg-[#ffeff8] border border-[#d8bfd1] rounded-lg p-6 space-y-2">
                <h4 className="font-hanken-grotesk font-bold text-headline-sm text-[#231821]">
                  {t('landing.aboutItems.contribution.title')}
                </h4>
                <p className="font-72-brand text-body-sm text-[#534150]">
                  {t('landing.aboutItems.contribution.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
