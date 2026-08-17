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
    document.title = 'Impulse26 Key - Impulse26 Design Festival';
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
      const sections = ['impulse-test', 'networking-party', 'about', 'agenda'];
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
    navigate('/role');
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
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 py-3">
            <div className="flex items-center justify-center gap-6 sm:gap-8 overflow-x-auto">
              <a
                href="#impulse-test"
                className={`relative font-space-grotesk font-medium text-[13px] sm:text-[14px] transition-colors whitespace-nowrap pb-2 ${
                  activeSection === 'impulse-test' ? 'text-[#800082]' : 'text-[#534150] hover:text-[#800082] active:text-[#800082]'
                }`}
              >
                ImpulseKey
                {activeSection === 'impulse-test' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#800082] rounded-full" />
                )}
              </a>
              <a
                href="#networking-party"
                className={`relative font-space-grotesk font-medium text-[13px] sm:text-[14px] transition-colors whitespace-nowrap pb-2 ${
                  activeSection === 'networking-party' ? 'text-[#800082]' : 'text-[#534150] hover:text-[#800082] active:text-[#800082]'
                }`}
              >
                Networking Party
                {activeSection === 'networking-party' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#800082] rounded-full" />
                )}
              </a>
              <a
                href="#about"
                className={`relative font-space-grotesk font-medium text-[13px] sm:text-[14px] transition-colors whitespace-nowrap pb-2 ${
                  activeSection === 'about' ? 'text-[#800082]' : 'text-[#534150] hover:text-[#800082] active:text-[#800082]'
                }`}
              >
                About
                {activeSection === 'about' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#800082] rounded-full" />
                )}
              </a>
              <a
                href="#agenda"
                className={`relative font-space-grotesk font-medium text-[13px] sm:text-[14px] transition-colors whitespace-nowrap pb-2 ${
                  activeSection === 'agenda' ? 'text-[#800082]' : 'text-[#534150] hover:text-[#800082] active:text-[#800082]'
                }`}
              >
                Agenda
                {activeSection === 'agenda' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#800082] rounded-full" />
                )}
              </a>
            </div>
          </div>
        </nav>
      </div>

      <main className="flex-1 px-4 sm:px-8 md:px-16 py-8 sm:py-16 md:py-24 pb-36 sm:pb-24 w-full" id="main-content">
        {/* Hero Section */}
        <div id="impulse-test" className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-24 lg:items-start scroll-mt-32">
          {/* Left Column - Text Content */}
          <div className="flex-1 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Tag Badge */}
            <div className="inline-block px-3 py-1 bg-[#f7e3ef] border border-[#800082] rounded-sm">
              <span className="font-jetbrains-mono font-medium text-[10px] sm:text-[12px] leading-[16px] sm:leading-[18px] text-[#800082] uppercase">
                FUN PROJECT by SAP Design Hub China
              </span>
            </div>

            {/* Main Title with Text Shadow */}
            <h1 className="font-space-grotesk font-bold text-[36px] sm:text-[56px] md:text-[72px] leading-[1.1] tracking-[-1.6px] sm:tracking-[-2.4px] md:tracking-[-3.0px] text-[#231821] text-shadow-kinetic">
              Impulse26.Key
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
          <div className="flex-shrink-0 flex flex-col items-start justify-start w-full lg:flex-1 relative mt-6 lg:mt-0 lg:ml-12">
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

        {/* Disclaimer Section - Add back */}
        <div className="max-w-[1280px] mx-auto border-t border-[#d8bfd1] pt-8 sm:pt-12 pb-12 sm:pb-16">
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

        {/* Networking Party Section - Reduced sizes */}
        <div id="networking-party" className="max-w-[1280px] mx-auto border-t border-[#d8bfd1] pt-12 pb-12 scroll-mt-32">
          <div className="">
            {/* Title & Info */}
            <div className="text-center mb-8">
              <h2 className="font-space-grotesk font-bold text-[28px] sm:text-[36px] text-[#231821] mb-3">
                🎉 Join Our Networking Party
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center font-space-grotesk text-[16px] sm:text-[18px] text-[#534150]">
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span className="font-bold text-[#800082]">Sep 3rd, 15:05</span>
                </div>
                <div className="hidden sm:block text-[#d8bfd1]">|</div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Pvg03 C1.1, Lecturing Studio (aka Digital School)</span>
                </div>
              </div>
            </div>

            {/* Booth Cards Grid - Flip on Click - Smaller cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {booths.map((booth) => (
                <div
                  key={booth.id}
                  className="perspective-1000 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlippedCard(flippedCard === booth.id ? null : booth.id);
                  }}
                >
                  <div
                    className={`relative aspect-[4/3] transition-all duration-700 ${
                      flippedCard === booth.id ? '[transform:rotateY(180deg)]' : ''
                    }`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front Side - Poster/Name */}
                    <div
                      className={`absolute inset-0 rounded-lg border-2 overflow-hidden transition-all duration-300 group ${
                        flippedCard === booth.id ? '' : 'hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-rotate-1'
                      }`}
                      style={{
                        background: booth.gradient,
                        borderColor: flippedCard === booth.id ? booth.color : '#e5e2e8',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                      }}
                    >
                      {/* Content with Icon and Text - 2/3 of previous size */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-3 gap-2">
                        {/* Icon - 2/3 size (was w-24/w-32, now w-16/w-20) */}
                        <img
                          src={booth.icon}
                          alt={`${booth.name} icon`}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg"
                        />
                        {/* Text - Smaller */}
                        <div className="text-center">
                          <div
                            className="font-space-grotesk font-black text-[14px] sm:text-[18px] mb-1 uppercase tracking-tight"
                            style={{ color: booth.textColor }}
                          >
                            {booth.name}
                          </div>
                          <div
                            className="font-space-grotesk font-medium text-[10px] sm:text-[12px]"
                            style={{ color: booth.textColor, opacity: 0.9 }}
                          >
                            {language === 'zh' ? booth.subtitleCN : booth.subtitleEN}
                          </div>
                        </div>
                      </div>
                      {/* Cute corner indicator */}
                      {flippedCard !== booth.id && (
                        <div className="absolute bottom-1.5 right-1.5 bg-white/20 backdrop-blur-sm rounded-full p-1.5 animate-bounce">
                          <span className="text-[10px]">👆</span>
                        </div>
                      )}
                    </div>

                    {/* Back Side - Tagline with Bubbles on Hover */}
                    <div
                      className="absolute inset-0 rounded-lg border-2 overflow-hidden flex items-center justify-center p-4 group/back"
                      style={{
                        background: booth.gradient,
                        borderColor: booth.color,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      {/* Floating bubbles on hover */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/back:opacity-100 transition-opacity duration-500">
                        <div
                          className="absolute top-[10%] left-[15%] w-8 h-8 rounded-full animate-float-slow"
                          style={{ background: `${booth.textColor}20`, animationDelay: '0s' }}
                        />
                        <div
                          className="absolute top-[60%] right-[20%] w-12 h-12 rounded-full animate-float-slower"
                          style={{ background: `${booth.textColor}15`, animationDelay: '0.5s' }}
                        />
                        <div
                          className="absolute bottom-[20%] left-[25%] w-6 h-6 rounded-full animate-float-slow"
                          style={{ background: `${booth.textColor}25`, animationDelay: '1s' }}
                        />
                        <div
                          className="absolute top-[30%] right-[10%] w-10 h-10 rounded-full animate-float-slower"
                          style={{ background: `${booth.textColor}20`, animationDelay: '1.5s' }}
                        />
                      </div>

                      <div className="text-center relative z-10">
                        {/* Decorative quotes - Smaller */}
                        <div className="absolute -top-4 -left-3 text-[40px] font-space-grotesk font-black opacity-20" style={{ color: booth.textColor }}>
                          "
                        </div>
                        <p
                          className="font-space-grotesk font-bold text-[12px] sm:text-[14px] leading-relaxed relative"
                          style={{ color: booth.textColor }}
                        >
                          {language === 'zh' ? booth.taglineCN : booth.taglineEN}
                        </p>
                        <div className="absolute -bottom-4 -right-3 text-[40px] font-space-grotesk font-black opacity-20" style={{ color: booth.textColor }}>
                          "
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Message - 3D Pill Style - Smaller */}
            <div
              className="relative text-center rounded-full p-5 sm:p-6 border-2 overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_16px_48px_rgba(168,0,170,0.25)]"
              style={{
                background: 'linear-gradient(145deg, #ffffff 0%, #fef5fb 100%)',
                borderColor: '#800082',
                boxShadow: `
                  0 1px 0 0 rgba(255,255,255,0.8) inset,
                  0 -1px 0 0 rgba(168,0,170,0.08) inset,
                  0 6px 0 0 #d8bfd1,
                  0 12px 30px -8px rgba(168,0,170,0.3)
                `
              }}
            >
              {/* Top highlight */}
              <div
                className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none opacity-30"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)'
                }}
              />
              <p className="font-space-grotesk font-bold text-[16px] sm:text-[18px] text-[#534150] mb-2 relative z-10">
                ✨ Complete the <span className="text-[#800082]">Impulse Key Test</span> & Claim Your Prize!
              </p>
              <p className="font-space-grotesk text-[13px] sm:text-[14px] text-[#867181] relative z-10">
                Show your result screenshot at the party to receive your prize
              </p>
            </div>
          </div>
        </div>

        {/* About the Project Section */}
        <div id="about" className="max-w-[1280px] mx-auto border-t border-[#d8bfd1] pt-24 pb-16 scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: About Text */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-space-grotesk font-bold text-[32px] sm:text-[40px] text-[#231821]">
                About the Project
              </h3>
              <div className="space-y-4">
                <p className="font-hanken-grotesk text-[14px] sm:text-[16px] text-[#534150] leading-[1.6]">
                  Built with vibe coding. Created for fun.
                </p>
                <p className="font-hanken-grotesk text-[14px] sm:text-[16px] text-[#534150] leading-[1.6]">
                  This project was conceived and designed by Larissa Deng (SAP UX Designer), with AI-assisted illustrations created by Mark Wan (SAP UX Designer). It would not have been possible without the support of the wonderful people at SAP Design Hub China.
                </p>
                <p className="font-hanken-grotesk text-[14px] sm:text-[16px] text-[#534150] leading-[1.6]">
                  SAP employees only: We'd love to see you at our future events and activities!
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

            {/* Right: Banner Image */}
            <div className="lg:col-span-7">
              <img
                src="/assets/banner.png"
                alt="Impulse26 Key Banner"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Impulse26 CN Agenda Section */}
        <div id="agenda" className="max-w-[1280px] mx-auto border-t border-[#d8bfd1] pt-24 pb-12 scroll-mt-32">
          <h2 className="font-space-grotesk font-bold text-[32px] sm:text-[40px] text-[#231821] mb-8 text-center">
            Impulse26 CN Agenda
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Keynote Card */}
            <div
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #7858FF 0%, #5d38e3 100%)'
              }}
            >
              <div className="flex flex-col items-center gap-2 mb-6">
                <h3 className="font-space-grotesk font-bold text-[32px] text-white">
                  Keynote
                </h3>
                <span className="font-space-grotesk font-medium text-[18px] text-white/90">
                  10:00-11:00
                </span>
              </div>

              <div className="space-y-4">
                {/* Opening */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-space-grotesk font-medium text-[16px] text-white">
                      Opening
                    </span>
                    <span className="font-space-grotesk text-[14px] text-white/80">
                      10:00
                    </span>
                  </div>
                  <p className="font-hanken-grotesk text-[14px] text-white/90">
                    Arin Bhowmick
                  </p>
                  <p className="font-hanken-grotesk text-[12px] text-white/70">
                    SAP Chief Design Officer
                  </p>
                </div>

                {/* Executive Talk */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-space-grotesk font-medium text-[16px] text-white">
                      Executive Talk
                    </span>
                    <span className="font-space-grotesk text-[14px] text-white/80">
                      10:05
                    </span>
                  </div>
                  <p className="font-hanken-grotesk text-[14px] text-white/90">
                    Sophia Levens
                  </p>
                  <p className="font-hanken-grotesk text-[12px] text-white/70">
                    SAP Head of Design System
                  </p>
                </div>

                {/* Be a Person Talk */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-space-grotesk font-medium text-[16px] text-white">
                      Be a Person, Then Ship
                    </span>
                    <span className="font-space-grotesk text-[14px] text-white/80">
                      10:30
                    </span>
                  </div>
                  <p className="font-hanken-grotesk text-[14px] text-white/90">
                    Laura Fehre
                  </p>
                  <p className="font-hanken-grotesk text-[12px] text-white/70">
                    Figma Design Advocate
                  </p>
                </div>
              </div>
            </div>

            {/* Expert Talk Card */}
            <div
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #5d38e3 0%, #4527a0 100%)'
              }}
            >
              <div className="flex flex-col items-center gap-2 mb-6">
                <h3 className="font-space-grotesk font-bold text-[32px] text-white">
                  Expert Talk
                </h3>
                <span className="font-space-grotesk font-medium text-[18px] text-white/90">
                  11:00-12:00
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Speaker 1 - Vera Jia */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-space-grotesk font-medium text-[16px] text-white mb-1">
                    Vera Jia
                  </p>
                  <p className="font-hanken-grotesk text-[12px] text-white/70 mb-2">
                    SAP Design Manager
                  </p>
                  <p className="font-hanken-grotesk text-[13px] text-white/90 leading-relaxed">
                    From App-Centric to Intent-Centric: Next-Gen Enterprise AI Experience
                  </p>
                </div>

                {/* Speaker 2 - Xiaofei Ma */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-space-grotesk font-medium text-[16px] text-white mb-1">
                    Xiaofei Ma
                  </p>
                  <p className="font-hanken-grotesk text-[12px] text-white/70 mb-2">
                    Octave Living Head of Sustainability CN
                  </p>
                  <p className="font-hanken-grotesk text-[13px] text-white/90 leading-relaxed">
                    Sustainability user experience design
                  </p>
                </div>

                {/* Speaker 3 - Billie Zhao */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-space-grotesk font-medium text-[16px] text-white mb-1">
                    Billie Zhao
                  </p>
                  <p className="font-hanken-grotesk text-[12px] text-white/70 mb-2">
                    SAP UX Designer
                  </p>
                  <p className="font-hanken-grotesk text-[13px] text-white/90 leading-relaxed">
                    From Transparency to Recommendation: Designing AI-Powered User Experiences
                  </p>
                </div>

                {/* Speaker 4 - Ya Lin */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-space-grotesk font-medium text-[16px] text-white mb-1">
                    Ya Lin
                  </p>
                  <p className="font-hanken-grotesk text-[12px] text-white/70 mb-2">
                    Microsoft Sr. UX Designer
                  </p>
                  <p className="font-hanken-grotesk text-[13px] text-white/90 leading-relaxed">
                    Designing Human-AI Collaboration
                  </p>
                </div>
              </div>
            </div>

            {/* Workshop Card */}
            <div
              className="relative rounded-2xl p-8 overflow-hidden md:col-span-2"
              style={{
                background: 'linear-gradient(135deg, #4527a0 0%, #311b92 100%)'
              }}
            >
              <div className="flex flex-col items-center gap-2 mb-6">
                <h3 className="font-space-grotesk font-bold text-[32px] text-white">
                  Workshop
                </h3>
                <span className="font-space-grotesk font-medium text-[18px] text-white/90">
                  13:00-15:00
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Workshop 1 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full font-jetbrains-mono text-[11px] text-white mb-3">
                      PVG03 D1.1
                    </span>
                  </div>
                  <h4 className="font-space-grotesk font-bold text-[20px] text-white mb-2">
                    BUILD FIGMA AROUND YOU
                  </h4>
                  <p className="font-hanken-grotesk text-[14px] text-white/80">
                    Laura Fehre & Stefan Mehrer, Figma
                  </p>
                </div>

                {/* Workshop 2 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full font-jetbrains-mono text-[11px] text-white mb-3">
                      PVG03 C5.2
                    </span>
                  </div>
                  <h4 className="font-space-grotesk font-bold text-[20px] text-white mb-2">
                    DESIGN FOR SUSTAINABILITY
                  </h4>
                  <p className="font-hanken-grotesk text-[14px] text-white/80">
                    Xiaolei Ma, Octaveliving
                  </p>
                </div>
              </div>
            </div>

            {/* Afternoon Session Card - After 15:00 */}
            <div
              className="relative rounded-2xl p-8 overflow-hidden md:col-span-2"
              style={{
                background: 'linear-gradient(135deg, #FFC933 0%, #f4a800 50%, #7858FF 100%)'
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="md:flex-1">
                  <h3 className="font-space-grotesk font-bold text-[48px] md:text-[56px] text-[#5d38e3] leading-tight mb-2">
                    Intuition is our original operating system
                  </h3>
                  <p className="font-space-grotesk font-medium text-[18px] text-[#5d38e3]">
                    Register to join our booths after 15:00
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:w-[420px]">
                  {/* Figma */}
                  <div className="bg-[#f065f3] rounded-lg p-5 flex flex-col items-center justify-center">
                    <span className="font-space-grotesk font-bold text-[18px] text-black">Figma</span>
                  </div>

                  {/* Maker Booth */}
                  <div className="bg-[#FFC933] rounded-lg p-5 flex flex-col items-center justify-center">
                    <span className="font-space-grotesk font-bold text-[18px] text-black text-center">Maker Booth</span>
                  </div>

                  {/* Huddle Booth */}
                  <div className="bg-[#7858FF] rounded-lg p-5 flex flex-col items-center justify-center">
                    <span className="font-space-grotesk font-bold text-[18px] text-white text-center">Huddle Booth</span>
                  </div>

                  {/* Sensory Booth */}
                  <div className="bg-[#64EDD2] rounded-lg p-5 flex flex-col items-center justify-center">
                    <span className="font-space-grotesk font-bold text-[18px] text-black text-center">Sensory Booth</span>
                  </div>

                  {/* Game Booth - Full width */}
                  <div className="bg-black rounded-lg p-5 flex items-center justify-center col-span-2">
                    <span className="font-space-grotesk font-bold text-[18px] text-white">Game Booth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Buttons - Only visible on mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#800082] px-4 py-4 z-50 shadow-[0px_-4px_8px_rgba(128,0,130,0.1)]">
        <div className="flex flex-col gap-3 max-w-[1280px] mx-auto">
          <button
            onClick={handleStartTest}
            className="relative w-full px-6 py-3 text-white font-72-brand text-[14px] rounded-full overflow-hidden"
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
          <button
            onClick={() => navigate('/intro')}
            className="relative w-full px-6 py-3 text-[#534150] font-72-brand text-[14px] rounded-full overflow-hidden"
            style={{
              borderWidth: '3px',
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
        </div>
      </div>
    </div>
  );
};
