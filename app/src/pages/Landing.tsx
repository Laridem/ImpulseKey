import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { useLanguage } from '../i18n/LanguageContext';
import { Header } from '../components/Header';
import { useEffect, useState } from 'react';

export const Landing = () => {
  const navigate = useNavigate();
  const { startTest } = useTest();
  const t = useTranslation();
  const { language } = useLanguage();
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('impulse-test');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Carousel images - cycling through 8 different key card layouts
  const carouselImages = [
    '/assets/Key Cards -0.png',
    '/assets/Key Cards -1.png',
    '/assets/Key Cards -2.png',
    '/assets/Key Cards -3.png',
    '/assets/Key Cards -5.png',
    '/assets/Key Cards -4.png',
    '/assets/Key Cards -6.png',
    '/assets/Key Cards -7.png',
    '/assets/Key Cards -8.png'
  ];

  // Update page title for accessibility
  useEffect(() => {
    document.title = 'Impulse Key - Impulse Design Festival';
  }, []);

  // Auto-play carousel - switch image every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 1500); // 1.5 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['impulse-test', 'about'];
      const scrollPosition = window.scrollY + 200; // Offset for header + nav

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartTest = () => {
    startTest();
    navigate('/role-selection');
  };

  // Booth data
  const booths = [
    {
      id: 'sensory',
      name: 'Sensory Booth',
      subtitleEN: 'Experience design with all your senses',
      subtitleCN: '调动感官，发现设计的另一面',
      taglineEN: 'Experience design with all your senses.',
      taglineCN: '调动感官，发现设计的另一面。',
      color: '#A100C2',
      gradient: 'linear-gradient(135deg, #A100C2 0%, #c026d3 100%)',
      textColor: '#ffffff',
      icon: '/assets/booth-icons/Sensory Booth.png'
    },
    {
      id: 'maker',
      name: 'Maker Booth',
      subtitleEN: 'Texture of Life',
      subtitleCN: '生活的纹理',
      taglineEN: 'Texture of Life: Weaving new stories from old fabrics.',
      taglineCN: '生活的纹理：用旧布料编织新的故事。',
      color: '#FFC933',
      gradient: 'linear-gradient(135deg, #FFC933 0%, #ffd666 100%)',
      textColor: '#231821',
      icon: '/assets/booth-icons/Maker Booth.png'
    },
    {
      id: 'huddle',
      name: 'Huddle Booth',
      subtitleEN: 'Spot the AI imposter',
      subtitleCN: '谁是卧底',
      taglineEN: 'Humans, AI, and a secret identity. Can you spot the imposter?',
      taglineCN: '设计师版《谁是卧底》，人类与 AI 同场较量。',
      color: '#64EDD2',
      gradient: 'linear-gradient(135deg, #64EDD2 0%, #7ff5e0 100%)',
      textColor: '#231821',
      icon: '/assets/booth-icons/Huddle Booth.png'
    },
    {
      id: 'game',
      name: 'Game Booth',
      subtitleEN: 'Play and create',
      subtitleCN: '边玩边创作',
      taglineEN: 'Play, sketch, guess, and challenge your creativity.',
      taglineCN: '边玩边创作，在挑战中激发灵感。',
      color: '#7858FF',
      gradient: 'linear-gradient(135deg, #7858FF 0%, #9575ff 100%)',
      textColor: '#ffffff',
      icon: '/assets/booth-icons/Game Booth.png'
    },
    {
      id: 'figma',
      name: 'Figma Booth',
      subtitleEN: 'Design tools and collaboration',
      subtitleCN: '设计工具与协作',
      taglineEN: 'Explore the tools behind great design.',
      taglineCN: '探索设计工具，解锁高效协作。',
      color: '#FF6730',
      gradient: 'linear-gradient(135deg, #FF6730 0%, #ff8555 100%)',
      textColor: '#ffffff',
      icon: '/assets/booth-icons/Figma Booth.png'
    },
    {
      id: 'networking',
      name: 'Networking Bingo',
      subtitleEN: 'Connect and collaborate',
      subtitleCN: '连接与合作',
      taglineEN: 'Meet people. Share ideas. Spark collaborations.',
      taglineCN: '结识新伙伴，碰撞新想法，开启新合作。',
      color: '#f65af2',
      gradient: 'linear-gradient(135deg, #f65af2 0%, #ff7ef5 100%)',
      textColor: '#ffffff',
      icon: '/assets/booth-icons/Networking Corner.png'
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Combined sticky header with navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <Header />

        {/* Anchor Navigation */}
        <nav className="border-t border-[#d8bfd1]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-3">
            <div className="flex items-center justify-center gap-6 sm:gap-8 overflow-x-auto">
              <a
                href="#impulse-test"
                className={`relative font-space-grotesk font-medium text-[14px] sm:text-[18px] transition-colors whitespace-nowrap pb-2 ${
                  activeSection === 'impulse-test' ? 'text-[#800082]' : 'text-[#534150] hover:text-[#800082] active:text-[#800082]'
                }`}
              >
                ImpulseKey
                {activeSection === 'impulse-test' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#800082] rounded-full" />
                )}
              </a>
              <a
                href="#about"
                className={`relative font-space-grotesk font-medium text-[14px] sm:text-[18px] transition-colors whitespace-nowrap pb-2 ${
                  activeSection === 'about' ? 'text-[#800082]' : 'text-[#534150] hover:text-[#800082] active:text-[#800082]'
                }`}
              >
                About
                {activeSection === 'about' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#800082] rounded-full" />
                )}
              </a>
            </div>
          </div>
        </nav>
      </div>

      <main className="flex-1 px-6 sm:px-10 md:px-16 lg:px-20 py-8 sm:py-16 md:py-24 pb-36 sm:pb-24 w-full" id="main-content">
        {/* Hero Section */}
        <div id="impulse-test" className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6 sm:gap-6 mb-8 sm:mb-12 md:mb-16 lg:items-start scroll-mt-32">
          {/* Left Column - Text Content */}
          <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8 lg:max-w-[600px]">
            {/* Tag Badge */}
            <div className="inline-block px-3 py-1 bg-[#f7e3ef] border border-[#800082] rounded-sm">
              <span className="font-jetbrains-mono font-medium text-[10px] sm:text-[12px] leading-[16px] sm:leading-[18px] text-[#800082] uppercase">
                FUN PROJECT by SAP Design Hub China
              </span>
            </div>

            {/* Main Title with Text Shadow */}
            <h1 className="font-space-grotesk font-bold text-[36px] sm:text-[56px] md:text-[72px] leading-[1.1] tracking-[-1.6px] sm:tracking-[-2.4px] md:tracking-[-3.0px] text-[#231821] text-shadow-kinetic">
              Impulse.Key
            </h1>

            {/* Subtitle */}
            <h2 className="font-72-brand text-[20px] sm:text-[28px] md:text-[36px] text-[#5d38e3] leading-[1.3]">
              {t('landing.subtitle')}
            </h2>

            {/* Description - Slightly smaller font */}
            <div className="max-w-full lg:max-w-[600px]">
              <p className="font-72-brand text-[15px] sm:text-[17px] text-[#534150] leading-[1.6]">
                {t('landing.description1')}
              </p>
            </div>

            {/* CTA Buttons - Hidden on mobile (sticky bottom buttons show instead), visible on tablet+ */}
            <div className="hidden sm:flex flex-row gap-4 pt-2 sm:pt-4">
              <button
                onClick={handleStartTest}
                className="relative w-auto px-6 sm:px-10 py-3 sm:py-5 text-white font-72-brand text-[15px] sm:text-[18px] font-bold rounded-full overflow-hidden transition-all duration-300 hover:translate-y-[-2px] active:translate-y-[1px] group"
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
                <span className="relative z-10">{t('landing.startButton')}</span>
              </button>
              <button
                onClick={() => navigate('/intro')}
                className="relative w-auto px-6 sm:px-10 py-3 sm:py-5 text-[#534150] font-72-brand text-[15px] sm:text-[18px] font-bold rounded-full transition-all duration-300 hover:translate-y-[-1px] hover:border-[#800082] hover:text-[#800082] active:translate-y-[0px] active:border-[#800082] active:text-[#800082] overflow-hidden group"
                style={{
                  borderWidth: '3px',
                  borderColor: '#d8bfd1',
                  background: 'linear-gradient(145deg, #ffffff 0%, #fef5fb 100%)',
                  boxShadow: `
                    0 1px 0 0 rgba(255,255,255,0.8) inset,
                    0 2px 8px -2px rgba(168,0,170,0.15)
                  `
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none opacity-30"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)'
                  }}
                />
                <span className="relative z-10">{t('landing.howToPlayButton')}</span>
              </button>
            </div>
          </div>

          {/* Right Column - Hero Visual (Full width, bigger) */}
          <div className="flex-shrink-0 flex flex-col items-start justify-start w-full lg:flex-1 relative mt-6 lg:mt-0">
            {/* Key Visual Container */}
            <div className="relative w-full">
              {/* Simple white container with proper padding */}
              <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8">
                {/* Key Cards Carousel */}
                <div className="relative w-full h-auto overflow-hidden">
                  {carouselImages.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt={`Impulse Key Cards ${index + 1}`}
                      className={`w-full h-auto object-contain transition-opacity duration-500 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Section - For ImpulseKey Test */}
        <div className="max-w-[1400px] mx-auto border-t border-[#d8bfd1] pt-8 sm:pt-12 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-2">
              <p className="font-jetbrains-mono font-medium text-[10px] sm:text-[12px] leading-[16px] sm:leading-[18px] text-[#800082] uppercase">
                DISCLAIMER / 免责声明
              </p>
              <p className="font-72-brand text-[14px] sm:text-body-sm text-[#534150]">
                {t('landing.description3')}
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-jetbrains-mono font-medium text-[10px] sm:text-[12px] leading-[16px] sm:leading-[18px] text-[#800082] uppercase">
                PRIVACY / 隐私声明
              </p>
              <p className="font-72-brand text-[14px] sm:text-body-sm text-[#534150]">
                {t('landing.description4')}
              </p>
            </div>
          </div>
        </div>

        {/* About Section - Unified */}
        <div id="about" className="max-w-[1400px] mx-auto border-t border-[#d8bfd1] pt-6 sm:pt-24 pb-16 scroll-mt-32">
          {/* Main About Title */}
          <h2 className="font-space-grotesk font-bold text-[36px] sm:text-[48px] text-[#231821] mb-12 sm:mb-16">
            About
          </h2>

          {/* Subsection 1: Impulse.Key Fun Test */}
          <div className="mb-12 sm:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left: About Text */}
              <div className="space-y-6">
                <h3 className="font-space-grotesk font-bold text-[28px] sm:text-[36px] text-[#231821]">
                  Impulse.Key Fun Test
                </h3>
                <div className="space-y-4">
                  <p className="font-hanken-grotesk text-[14px] sm:text-[16px] text-[#534150] leading-[1.6]">
                    Built with vibes, curiosity, and probably a little too much coffee. ☕✨
                  </p>
                  <p className="font-hanken-grotesk text-[14px] sm:text-[16px] text-[#534150] leading-[1.6]">
                    This project was dreamed up and designed by Larissa Deng (SAP UX Designer), with AI-powered illustrations crafted by Mark Wan (SAP UX Designer).
                  </p>
                  <p className="font-hanken-grotesk text-[14px] sm:text-[16px] text-[#534150] leading-[1.6]">
                    A huge shout-out to the amazing people at SAP Design Hub China. Your support, feedback, and enthusiasm helped bring this little project to life.
                  </p>
                  <p className="font-hanken-grotesk text-[14px] sm:text-[16px] text-[#534150] leading-[1.6]">
                    SAP colleagues: Come say hi at our upcoming events and activities. We'd love to meet you, swap ideas, and create more fun things together! 🚀
                  </p>
                  <div className="space-y-2 pl-4">
                    <p className="font-hanken-grotesk text-[14px] sm:text-[16px] text-[#534150] leading-[1.6]">
                      Internal Sharepoint: <a href="https://sap.sharepoint.com/sites/209182/SitePages/Design-Hub-China.aspx?isSPOFile=1&xsdata=MDV8MDJ8fDY3MTZmZDY0YmUyZjQwZGQ5MDhkMDhkZTlhYTJhMjkzfDQyZjc2NzZjZjQ1NTQyM2M4MmY2ZGMyZDk5NzkxYWY3fDB8MHw2MzkxMTgyMjA0MzYxNDgzNjV8VW5rbm93bnxWR1ZoYlhOVFpXTjFjbWwwZVZObGNuWnBZMlY4ZXlKRFFTSTZJbFJsWVcxelgwRlVVRk5sY25acFkyVmZVMUJQVEU5R0lpd2lWaUk2SWpBdU1DNHdNREF3SWl3aVVDSTZJbGRwYmpNeUlpd2lRVTRpT2lKUGRHaGxjaUlzSWxkVUlqb3hNWDA9fDF8TDJOb1lYUnpMekU1T2pReU56azNNRGMzT0RobVl6UXlPR0poWVdFd1lqSmxNV014TXpjMll6a3lRSFJvY21WaFpDNTJNaTl0WlhOellXZGxjeTh4TnpjMk1qSTFNalEzTmpRd3xiNWFhYzIyZTRjMjk0NTNlOTA4ZDA4ZGU5YWEyYTI5M3wwZGI1MDE0MjI2ZjE0ZjFjOTgxMzRlMzQ5NDFjN2NlNg%3D%3D&sdata=QUZDbWZHQXZQdFZpeFdXZkRhNXYrbGtsZ3RUZGxPSmh0V3hxeGtOU1NiST0%3D&ovuser=42f7676c-f455-423c-82f6-dc2d99791af7%2Clarissa.deng%40sap.com&OR=Teams-HL&CT=1776226560704&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI1MC8yNjAzMTIyMzAyMCJ9" target="_blank" rel="noopener noreferrer" className="text-[#800082] underline hover:text-[#a100c2] active:text-[#a100c2]">Link</a>
                    </p>
                    <p className="font-hanken-grotesk text-[14px] sm:text-[16px] text-[#534150] leading-[1.6]">
                      Join SAP Design Hub China Distribution List: <a href="https://profiles.wdf.sap.corp/groups/5c85d9385462d20285416a22/users" target="_blank" rel="noopener noreferrer" className="text-[#800082] underline hover:text-[#a100c2] active:text-[#a100c2]">Link</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Banner Image - Maintain aspect ratio, max 1:1 width */}
              <div className="flex items-center justify-center">
                <img
                  src="/assets/banner.png"
                  alt="Impulse Key Banner"
                  className="w-full max-w-[500px] h-auto object-contain rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Subsection 3: Event Team */}
          <div>
            <div className="space-y-8">
              <div>
                <h3 className="font-space-grotesk font-bold text-[28px] sm:text-[36px] text-[#231821] mb-3">
                  Event Team
                </h3>
                <p className="font-hanken-grotesk text-[14px] sm:text-[16px] text-[#534150] mb-2">
                  Meet the team behind Impulse China and our ImpulseKey results!
                </p>
                <p className="font-hanken-grotesk text-[14px] sm:text-[16px] text-[#534150]">
                  Is your key the same or different from ours? Find us at Impulse — we'd love to exchange thoughts and hear about your result!
                  <span className="inline-block ml-1">✨</span>
                </p>
              </div>

              {/* Team Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 sm:gap-8">
                {/* Row 1 */}
                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    {/* Floating particles on hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#A100C2] animate-float-slow" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-2 right-0 w-1.5 h-1.5 rounded-full bg-[#FFC933] animate-float-slower" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-0 left-2 w-1 h-1 rounded-full bg-[#64EDD2] animate-float-slow" style={{ animationDelay: '0.6s' }} />
                      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#7858FF] animate-float-slower" style={{ animationDelay: '0.9s' }} />
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-[#f65af2] animate-float-slow" style={{ animationDelay: '0.2s' }} />
                      <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-[#A100C2] animate-float-slower" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#A100C2] flex items-center justify-center text-3xl sm:text-4xl border-2 border-[#A100C2] transition-all duration-300 group-hover:scale-110 group-hover:border-[#A100C2]">
                      🦋
                    </div>
                  </div>
                  <p className="font-hanken-grotesk font-medium text-[13px] sm:text-[14px] text-[#231821] text-center">
                    Yang, Debbie
                  </p>
                  <p className="font-hanken-grotesk text-[11px] sm:text-[12px] text-[#A100C2] font-semibold italic text-center mt-1">
                    VOC
                  </p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#FFC933] animate-float-slow" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-2 right-0 w-1.5 h-1.5 rounded-full bg-[#64EDD2] animate-float-slower" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-0 left-2 w-1 h-1 rounded-full bg-[#7858FF] animate-float-slow" style={{ animationDelay: '0.6s' }} />
                      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#A100C2] animate-float-slower" style={{ animationDelay: '0.9s' }} />
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-[#f65af2] animate-float-slow" style={{ animationDelay: '0.2s' }} />
                      <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-[#FFC933] animate-float-slower" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFC933] flex items-center justify-center text-3xl sm:text-4xl border-2 border-[#FFC933] transition-all duration-300 group-hover:scale-110 group-hover:border-[#FFC933]">
                      🦊
                    </div>
                  </div>
                  <p className="font-hanken-grotesk font-medium text-[13px] sm:text-[14px] text-[#231821] text-center">
                    Wan, Mark
                  </p>
                  <p className="font-hanken-grotesk text-[11px] sm:text-[12px] text-[#FFC933] font-semibold italic text-center mt-1">
                    PIXEL
                  </p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#64EDD2] animate-float-slow" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-2 right-0 w-1.5 h-1.5 rounded-full bg-[#7858FF] animate-float-slower" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-0 left-2 w-1 h-1 rounded-full bg-[#A100C2] animate-float-slow" style={{ animationDelay: '0.6s' }} />
                      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#FFC933] animate-float-slower" style={{ animationDelay: '0.9s' }} />
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-[#f65af2] animate-float-slow" style={{ animationDelay: '0.2s' }} />
                      <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-[#64EDD2] animate-float-slower" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#A100C2] flex items-center justify-center text-3xl sm:text-4xl border-2 border-[#A100C2] transition-all duration-300 group-hover:scale-110 group-hover:border-[#A100C2]">
                      🌸
                    </div>
                  </div>
                  <p className="font-hanken-grotesk font-medium text-[13px] sm:text-[14px] text-[#231821] text-center">
                    Deng, Larissa
                  </p>
                  <p className="font-hanken-grotesk text-[11px] sm:text-[12px] text-[#A100C2] font-semibold italic text-center mt-1">
                    VOC
                  </p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#7858FF] animate-float-slow" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-2 right-0 w-1.5 h-1.5 rounded-full bg-[#A100C2] animate-float-slower" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-0 left-2 w-1 h-1 rounded-full bg-[#FFC933] animate-float-slow" style={{ animationDelay: '0.6s' }} />
                      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#64EDD2] animate-float-slower" style={{ animationDelay: '0.9s' }} />
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-[#f65af2] animate-float-slow" style={{ animationDelay: '0.2s' }} />
                      <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-[#7858FF] animate-float-slower" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#7858FF] flex items-center justify-center text-3xl sm:text-4xl border-2 border-[#7858FF] transition-all duration-300 group-hover:scale-110 group-hover:border-[#7858FF]">
                      🐨
                    </div>
                  </div>
                  <p className="font-hanken-grotesk font-medium text-[13px] sm:text-[14px] text-[#231821] text-center">
                    Bu, Heather
                  </p>
                  <p className="font-hanken-grotesk text-[11px] sm:text-[12px] text-[#7858FF] font-semibold italic text-center mt-1">
                    LOGS
                  </p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#A100C2] animate-float-slow" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-2 right-0 w-1.5 h-1.5 rounded-full bg-[#FFC933] animate-float-slower" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-0 left-2 w-1 h-1 rounded-full bg-[#64EDD2] animate-float-slow" style={{ animationDelay: '0.6s' }} />
                      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#7858FF] animate-float-slower" style={{ animationDelay: '0.9s' }} />
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-[#f65af2] animate-float-slow" style={{ animationDelay: '0.2s' }} />
                      <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-[#A100C2] animate-float-slower" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#A100C2] flex items-center justify-center text-3xl sm:text-4xl border-2 border-[#A100C2] transition-all duration-300 group-hover:scale-110 group-hover:border-[#A100C2]">
                      🌻
                    </div>
                  </div>
                  <p className="font-hanken-grotesk font-medium text-[13px] sm:text-[14px] text-[#231821] text-center">
                    Chen, Joy
                  </p>
                  <p className="font-hanken-grotesk text-[11px] sm:text-[12px] text-[#A100C2] font-semibold italic text-center mt-1">
                    VOC
                  </p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#FFC933] animate-float-slow" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-2 right-0 w-1.5 h-1.5 rounded-full bg-[#64EDD2] animate-float-slower" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-0 left-2 w-1 h-1 rounded-full bg-[#7858FF] animate-float-slow" style={{ animationDelay: '0.6s' }} />
                      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#A100C2] animate-float-slower" style={{ animationDelay: '0.9s' }} />
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-[#f65af2] animate-float-slow" style={{ animationDelay: '0.2s' }} />
                      <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-[#FFC933] animate-float-slower" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#A100C2] flex items-center justify-center text-3xl sm:text-4xl border-2 border-[#A100C2] transition-all duration-300 group-hover:scale-110 group-hover:border-[#A100C2]">
                      🦄
                    </div>
                  </div>
                  <p className="font-hanken-grotesk font-medium text-[13px] sm:text-[14px] text-[#231821] text-center">
                    Zhang, Xueer
                  </p>
                  <p className="font-hanken-grotesk text-[11px] sm:text-[12px] text-[#A100C2] font-semibold italic text-center mt-1">
                    VOC
                  </p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#64EDD2] animate-float-slow" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-2 right-0 w-1.5 h-1.5 rounded-full bg-[#7858FF] animate-float-slower" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-0 left-2 w-1 h-1 rounded-full bg-[#A100C2] animate-float-slow" style={{ animationDelay: '0.6s' }} />
                      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#FFC933] animate-float-slower" style={{ animationDelay: '0.9s' }} />
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-[#f65af2] animate-float-slow" style={{ animationDelay: '0.2s' }} />
                      <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-[#64EDD2] animate-float-slower" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#f7e3ef] to-[#e5d4f0] flex items-center justify-center text-3xl sm:text-4xl border-2 border-[#d8bfd1] transition-all duration-300 group-hover:scale-110 group-hover:border-[#A100C2]">
                      🌵
                    </div>
                  </div>
                  <p className="font-hanken-grotesk font-medium text-[13px] sm:text-[14px] text-[#231821] text-center">
                    Huang, Zoie
                  </p>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#7858FF] animate-float-slow" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-2 right-0 w-1.5 h-1.5 rounded-full bg-[#A100C2] animate-float-slower" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-0 left-2 w-1 h-1 rounded-full bg-[#FFC933] animate-float-slow" style={{ animationDelay: '0.6s' }} />
                      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#64EDD2] animate-float-slower" style={{ animationDelay: '0.9s' }} />
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-[#f65af2] animate-float-slow" style={{ animationDelay: '0.2s' }} />
                      <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-[#7858FF] animate-float-slower" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#f7e3ef] to-[#e5d4f0] flex items-center justify-center text-3xl sm:text-4xl border-2 border-[#d8bfd1] transition-all duration-300 group-hover:scale-110 group-hover:border-[#A100C2]">
                      🐳
                    </div>
                  </div>
                  <p className="font-hanken-grotesk font-medium text-[13px] sm:text-[14px] text-[#231821] text-center">
                    Fu, Shuang
                  </p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#64EDD2] animate-float-slow" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-2 right-0 w-1.5 h-1.5 rounded-full bg-[#7858FF] animate-float-slower" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-0 left-2 w-1 h-1 rounded-full bg-[#A100C2] animate-float-slow" style={{ animationDelay: '0.6s' }} />
                      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#FFC933] animate-float-slower" style={{ animationDelay: '0.9s' }} />
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-[#f65af2] animate-float-slow" style={{ animationDelay: '0.2s' }} />
                      <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-[#64EDD2] animate-float-slower" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#f7e3ef] to-[#e5d4f0] flex items-center justify-center text-3xl sm:text-4xl border-2 border-[#d8bfd1] transition-all duration-300 group-hover:scale-110 group-hover:border-[#A100C2]">
                      🌺
                    </div>
                  </div>
                  <p className="font-hanken-grotesk font-medium text-[13px] sm:text-[14px] text-[#231821] text-center">
                    Jin, Liqin
                  </p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#A100C2] animate-float-slow" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-2 right-0 w-1.5 h-1.5 rounded-full bg-[#FFC933] animate-float-slower" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-0 left-2 w-1 h-1 rounded-full bg-[#64EDD2] animate-float-slow" style={{ animationDelay: '0.6s' }} />
                      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#7858FF] animate-float-slower" style={{ animationDelay: '0.9s' }} />
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-[#f65af2] animate-float-slow" style={{ animationDelay: '0.2s' }} />
                      <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-[#A100C2] animate-float-slower" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#A100C2] flex items-center justify-center text-3xl sm:text-4xl border-2 border-[#A100C2] transition-all duration-300 group-hover:scale-110 group-hover:border-[#A100C2]">
                      🦁
                    </div>
                  </div>
                  <p className="font-hanken-grotesk font-medium text-[13px] sm:text-[14px] text-[#231821] text-center">
                    Zhou, Rowan
                  </p>
                  <p className="font-hanken-grotesk text-[11px] sm:text-[12px] text-[#A100C2] font-semibold italic text-center mt-1">
                    VOC
                  </p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#FFC933] animate-float-slow" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-2 right-0 w-1.5 h-1.5 rounded-full bg-[#64EDD2] animate-float-slower" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-0 left-2 w-1 h-1 rounded-full bg-[#7858FF] animate-float-slow" style={{ animationDelay: '0.6s' }} />
                      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#A100C2] animate-float-slower" style={{ animationDelay: '0.9s' }} />
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-[#f65af2] animate-float-slow" style={{ animationDelay: '0.2s' }} />
                      <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-[#FFC933] animate-float-slower" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#f7e3ef] to-[#e5d4f0] flex items-center justify-center text-3xl sm:text-4xl border-2 border-[#d8bfd1] transition-all duration-300 group-hover:scale-110 group-hover:border-[#A100C2]">
                      🌷
                    </div>
                  </div>
                  <p className="font-hanken-grotesk font-medium text-[13px] sm:text-[14px] text-[#231821] text-center">
                    Huang, Lijiao
                  </p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#64EDD2] animate-float-slow" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-2 right-0 w-1.5 h-1.5 rounded-full bg-[#7858FF] animate-float-slower" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-0 left-2 w-1 h-1 rounded-full bg-[#A100C2] animate-float-slow" style={{ animationDelay: '0.6s' }} />
                      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#FFC933] animate-float-slower" style={{ animationDelay: '0.9s' }} />
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-[#f65af2] animate-float-slow" style={{ animationDelay: '0.2s' }} />
                      <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-[#64EDD2] animate-float-slower" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#64EDD2] flex items-center justify-center text-3xl sm:text-4xl border-2 border-[#64EDD2] transition-all duration-300 group-hover:scale-110 group-hover:border-[#64EDD2]">
                      🐼
                    </div>
                  </div>
                  <p className="font-hanken-grotesk font-medium text-[13px] sm:text-[14px] text-[#231821] text-center">
                    Wang, Zhicheng
                  </p>
                  <p className="font-hanken-grotesk text-[11px] sm:text-[12px] text-[#64EDD2] font-semibold italic text-center mt-1">
                    QAQ
                  </p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#7858FF] animate-float-slow" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-2 right-0 w-1.5 h-1.5 rounded-full bg-[#A100C2] animate-float-slower" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-0 left-2 w-1 h-1 rounded-full bg-[#FFC933] animate-float-slow" style={{ animationDelay: '0.6s' }} />
                      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#64EDD2] animate-float-slower" style={{ animationDelay: '0.9s' }} />
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-[#f65af2] animate-float-slow" style={{ animationDelay: '0.2s' }} />
                      <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-[#7858FF] animate-float-slower" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#A100C2] flex items-center justify-center text-3xl sm:text-4xl border-2 border-[#A100C2] transition-all duration-300 group-hover:scale-110 group-hover:border-[#A100C2]">
                      🌹
                    </div>
                  </div>
                  <p className="font-hanken-grotesk font-medium text-[13px] sm:text-[14px] text-[#231821] text-center">
                    Wang, Wei
                  </p>
                  <p className="font-hanken-grotesk text-[11px] sm:text-[12px] text-[#A100C2] font-semibold italic text-center mt-1">
                    VOC
                  </p>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3">
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-[#A100C2] animate-float-slow" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-2 right-0 w-1.5 h-1.5 rounded-full bg-[#FFC933] animate-float-slower" style={{ animationDelay: '0.3s' }} />
                      <div className="absolute bottom-0 left-2 w-1 h-1 rounded-full bg-[#64EDD2] animate-float-slow" style={{ animationDelay: '0.6s' }} />
                      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#7858FF] animate-float-slower" style={{ animationDelay: '0.9s' }} />
                      <div className="absolute top-1/2 left-0 w-1.5 h-1.5 rounded-full bg-[#f65af2] animate-float-slow" style={{ animationDelay: '0.2s' }} />
                      <div className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-[#A100C2] animate-float-slower" style={{ animationDelay: '0.5s' }} />
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#f7e3ef] to-[#e5d4f0] flex items-center justify-center text-3xl sm:text-4xl border-2 border-[#d8bfd1] transition-all duration-300 group-hover:scale-110 group-hover:border-[#A100C2]">
                      🦉
                    </div>
                  </div>
                  <p className="font-hanken-grotesk font-medium text-[13px] sm:text-[14px] text-[#231821] text-center">
                    Wu, Yifan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Buttons - Only visible on mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#800082] px-4 py-3 z-50 shadow-[0px_-4px_8px_rgba(128,0,130,0.1)]">
        <div className="flex gap-3 max-w-[1400px] mx-auto">
          <button
            onClick={() => navigate('/intro')}
            className="relative flex-1 px-4 py-2.5 text-[#534150] font-72-brand text-[13px] rounded-full overflow-hidden"
            style={{
              borderWidth: '2px',
              borderColor: '#d8bfd1',
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
            <span className="relative z-10">{t('landing.howToPlayButton')}</span>
          </button>
          <button
            onClick={handleStartTest}
            className="relative flex-1 px-4 py-2.5 text-white font-72-brand text-[13px] rounded-full overflow-hidden"
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
            <span className="relative z-10">{t('landing.startButton')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
