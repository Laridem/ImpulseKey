import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { useLanguage } from '../i18n/LanguageContext';
import { getKeycapAsset } from '../utils/assets';
import { getColorGroupForResult } from '../data/colorGroups';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ShareCard } from '../components/ShareCard';
import { getAccessibleTextColor } from '../utils/contrast';
import { getAllResultKeys } from '../data/results';
import { RESULT_HASHTAGS } from '../data/hashtags';

export const Result = () => {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const { result, dimensionScores, goToResult, resetTest } = useTest();
  const t = useTranslation();
  const { language } = useLanguage();
  const resultRef = useRef<HTMLDivElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [hoveredLockedKey, setHoveredLockedKey] = useState<string | null>(null);

  // Load result if accessed directly via URL or when key changes
  useEffect(() => {
    if (key) {
      goToResult(key);
    }
  }, [key, goToResult]);

  const handleRetake = () => {
    console.log('handleRetake called');
    console.log('Resetting test and going to landing...');
    resetTest();
    // Use setTimeout to ensure state is cleared before navigation
    setTimeout(() => {
      // Force full page reload to ensure clean state
      window.location.href = '/';
    }, 100);
  };

  const handleShare = async () => {
    console.log('handleShare called');
    console.log('shareCardRef.current:', shareCardRef.current);
    console.log('result:', result);

    if (!shareCardRef.current || !result) {
      console.error('Missing ref or result:', { ref: shareCardRef.current, result });
      alert('Unable to capture image. Please refresh and try again.');
      return;
    }

    setIsCapturing(true);

    try {
      console.log('Starting image capture...');

      // Pre-load all images before capture to ensure they're ready
      const imagesToPreload = [
        getKeycapAsset(result.key),
        '/assets/Anvils-1.png',
        '/assets/qr-code.png'
      ];

      console.log('Pre-loading images...');
      await Promise.all(
        imagesToPreload.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              console.log('Loaded:', src);
              resolve(src);
            };
            img.onerror = () => {
              console.error('Failed to load:', src);
              reject(new Error(`Failed to load image: ${src}`));
            };
            img.src = src;
          });
        })
      );

      console.log('All images pre-loaded successfully!');

      // Additional wait to ensure images are painted
      await new Promise(resolve => setTimeout(resolve, 800));

      // Use lower pixelRatio on mobile for faster generation and better reliability
      const isMobile = window.innerWidth < 1024;
      const pixelRatio = isMobile ? 1 : 2;

      console.log('Converting to PNG...');
      const dataUrl = await toPng(shareCardRef.current, {
        cacheBust: true,
        pixelRatio, // Dynamic based on device
        backgroundColor: '#ffffff',
        width: 1080,
        height: 1920,
        skipFonts: false,
        fetchRequestInit: {
          mode: 'cors',
          cache: 'no-cache'
        },
        // Add filter to include all images
        filter: (_node) => {
          // Include all nodes by default
          return true;
        }
      });

      console.log('Creating download link...');
      const link = document.createElement('a');
      link.download = `IMPULSE-${result.key}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Image saved successfully!');
    } catch (error) {
      console.error('Failed to capture image:', error);
      alert(`Failed to save image: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsCapturing(false);
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="font-72-brand text-body-lg text-[#534150]">Loading result...</p>
        </div>
      </div>
    );
  }

  const colorGroup = getColorGroupForResult(result.key);

  // Use actual dimension scores or fallback to default for demo purposes
  const displayScores = dimensionScores || {
    Signal: 80,
    Solution: 20,
    Human: 70,
    Machine: 30,
    Explore: 80,
    Align: 20,
    Spark: 60,
    Stabilize: 40
  };

  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Helper function to darken light colors for better readability
  const getDarkerImpulseColor = (hex: string): string => {
    // Yellow #FFC933 and Cyan #64EDD2 need darkening for readability on white
    const colorMap: { [key: string]: string } = {
      '#FFC933': '#CC9900', // Darker yellow with better contrast
      '#64EDD2': '#00A896', // Darker cyan/teal with better contrast
      '#A100C2': '#A100C2', // Purple is fine
      '#7858FF': '#7858FF', // Purple/blue is fine
    };
    return colorMap[hex.toUpperCase()] || hex;
  };

  // Helper function to get text color with proper WCAG contrast on colored background
  const getPunchlineTextColor = (bgColor: string): string => {
    // For solid color background, use WCAG-compliant text color
    return getAccessibleTextColor(bgColor);
  };

  // Helper function to determine text color for quote blocks (on semi-transparent bg)
  const getQuoteTextColor = (bgColor: string): string => {
    // For semi-transparent backgrounds over white, use WCAG-compliant color
    return getAccessibleTextColor(bgColor);
  };

  // Dynamic colors based on impulse color
  const impulseColor = colorGroup.color;
  const impulseColorText = getDarkerImpulseColor(impulseColor); // Darker version for text on white
  const cardBg = hexToRgba(impulseColor, 0.08);
  const cardBorder = hexToRgba(impulseColor, 0.20);
  const quoteBg = hexToRgba(impulseColor, 0.25); // Increased from 0.15 to 0.25
  const quoteTextColor = getQuoteTextColor(impulseColor); // Smart text color based on luminance
  const punchlineTextColor = getPunchlineTextColor(impulseColor); // WCAG-compliant text for punchline

  // Get contrasting Impulse colors for neon glitch effect
  const getGlitchColors = (currentColor: string) => {
    const impulseColors = ['#A100C2', '#FFC933', '#64EDD2', '#7858FF'];
    // Filter out the current color and return the other three
    return impulseColors.filter(c => c !== currentColor);
  };

  const glitchColors = getGlitchColors(colorGroup.color);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header showRetakeButton={true} onRetake={handleRetake} />

      <main ref={resultRef} className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 py-6 sm:py-8 md:py-12 pb-24 lg:pb-12 w-full">
        {/* Responsive Layout: Single column on mobile, 12-column grid on desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12">
          {/* Left Sidebar: Full width on mobile, 4 columns on desktop */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Character Card - Neo-Playful 3D Style */}
            <div
              className="relative bg-gradient-to-br from-white via-[#fffbfe] to-[#fef5fb] border-2 rounded-xl p-6 lg:p-4 lg:p-\[33px\] flex flex-col gap-6 transition-all duration-300 hover:translate-y-[-4px]"
              style={{
                borderColor: colorGroup.color,
                boxShadow: `
                  0 1px 0 0 rgba(255,255,255,0.5) inset,
                  0 -1px 0 0 rgba(0,0,0,0.05) inset,
                  0 4px 8px -2px rgba(168,0,170,0.2),
                  0 8px 16px -4px rgba(168,0,170,0.15),
                  0 16px 32px -8px rgba(168,0,170,0.1),
                  0 0 40px -10px ${hexToRgba(colorGroup.color, 0.3)}
                `,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 1px 0 0 rgba(255,255,255,0.6) inset,
                  0 -1px 0 0 rgba(0,0,0,0.05) inset,
                  0 8px 16px -2px rgba(168,0,170,0.25),
                  0 16px 32px -4px rgba(168,0,170,0.2),
                  0 24px 48px -8px rgba(168,0,170,0.15),
                  0 0 60px -5px ${hexToRgba(colorGroup.color, 0.5)}
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 1px 0 0 rgba(255,255,255,0.5) inset,
                  0 -1px 0 0 rgba(0,0,0,0.05) inset,
                  0 4px 8px -2px rgba(168,0,170,0.2),
                  0 8px 16px -4px rgba(168,0,170,0.15),
                  0 16px 32px -8px rgba(168,0,170,0.1),
                  0 0 40px -10px ${hexToRgba(colorGroup.color, 0.3)}
                `;
              }}
            >
              {/* Keycap with 3D volumetric lighting */}
              <div className="flex justify-center">
                <div
                  className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-2xl border-[3px] p-2 flex items-center justify-center transition-all duration-500 hover:scale-105 cursor-pointer group overflow-hidden"
                  style={{
                    background: colorGroup.color,
                    borderColor: '#f65af2',
                    boxShadow: `
                      0 1px 2px 0 rgba(255,255,255,0.8) inset,
                      0 6px 0px 0px rgba(216,191,209,0.8),
                      0 12px 20px -4px rgba(0,0,0,0.25),
                      -3px -3px 12px 0px ${glitchColors[0]}50,
                      3px 3px 12px 0px ${glitchColors[1]}50,
                      0px 0px 30px 0px ${glitchColors[2]}40,
                      0 0 80px -20px ${hexToRgba(colorGroup.color, 0.6)}
                    `
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) rotateX(5deg) rotateY(5deg)';
                    e.currentTarget.style.boxShadow = `
                      0 2px 4px 0 rgba(255,255,255,0.9) inset,
                      0 8px 0px 0px rgba(216,191,209,0.9),
                      0 16px 32px -4px rgba(0,0,0,0.35),
                      -5px -5px 20px 0px ${glitchColors[0]}70,
                      5px 5px 20px 0px ${glitchColors[1]}70,
                      0px 0px 50px 0px ${glitchColors[2]}60,
                      -8px 0px 25px 0px ${glitchColors[0]}50,
                      8px 0px 25px 0px ${glitchColors[1]}50,
                      0 0 120px -10px ${hexToRgba(colorGroup.color, 0.8)}
                    `;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = `
                      0 1px 2px 0 rgba(255,255,255,0.8) inset,
                      0 6px 0px 0px rgba(216,191,209,0.8),
                      0 12px 20px -4px rgba(0,0,0,0.25),
                      -3px -3px 12px 0px ${glitchColors[0]}50,
                      3px 3px 12px 0px ${glitchColors[1]}50,
                      0px 0px 30px 0px ${glitchColors[2]}40,
                      0 0 80px -20px ${hexToRgba(colorGroup.color, 0.6)}
                    `;
                  }}
                >
                  {/* Volumetric light overlay - reduced opacity */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                    style={{
                      background: `
                        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%),
                        radial-gradient(circle at 70% 70%, ${hexToRgba(colorGroup.color, 0.3)} 0%, transparent 60%)
                      `
                    }}
                  />
                  {/* Grain texture overlay - very subtle */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.06] mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      backgroundSize: '100px 100px'
                    }}
                  />
                  <img
                    key={result.key}
                    src={getKeycapAsset(result.key)}
                    alt={result.name.en}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Key Abbreviation Display */}
              <div className="flex justify-center -mt-2">
                <div
                  className="font-jetbrains-mono font-bold text-[32px] leading-[40px] tracking-widest uppercase"
                  style={{
                    color: impulseColorText,
                    textShadow: `
                      2px 2px 0px ${glitchColors[0]}40,
                      -2px -2px 0px ${glitchColors[1]}40,
                      0px 3px 6px ${glitchColors[2]}30
                    `
                  }}
                >
                  {result.key}
                </div>
              </div>

              {/* Titles */}
              <div className="flex flex-col items-center gap-3">
                <h2 className="font-space-grotesk font-normal text-[24px] lg:text-[24px] leading-[30px] tracking-[-0.6px] text-[#231821] text-center uppercase">
                  {result.name.en}
                </h2>
                <h3 className="font-72-brand font-medium text-[18px] lg:text-[18px] leading-[24px] text-[#a800aa] text-center">
                  {result.name.zh}
                </h3>
                {/* Dynamic Most Likely to Say or fallback to motto */}
                <p className="font-space-grotesk font-normal text-[18px] leading-[28px] text-[#534150] text-center pt-4">
                  {(language === 'zh' ? result.mostLikelyToSayCN : result.mostLikelyToSayEN) || `"${result.motto.en}"`}
                </p>
              </div>

              {/* Color Badge - 3D Pill Style */}
              <div className="pt-2">
                <div
                  className="relative border-2 rounded-full p-4 flex gap-4 items-center overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(145deg, ${hexToRgba(impulseColor, 0.12)} 0%, ${hexToRgba(impulseColor, 0.06)} 100%)`,
                    borderColor: hexToRgba(impulseColor, 0.4),
                    boxShadow: `
                      0 1px 0 0 rgba(255,255,255,0.6) inset,
                      0 2px 8px -2px ${hexToRgba(impulseColor, 0.3)},
                      0 4px 16px -4px ${hexToRgba(impulseColor, 0.2)}
                    `
                  }}
                >
                  {/* Subtle highlight overlay */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)'
                    }}
                  />
                  <div
                    className="relative w-10 h-10 rounded-lg flex-shrink-0"
                    style={{
                      background: `
                        radial-gradient(circle at 30% 30%, ${hexToRgba(colorGroup.color, 0.9)} 0%, ${colorGroup.color} 100%)
                      `,
                      boxShadow: `
                        0 1px 2px 0 rgba(255,255,255,0.5) inset,
                        0 2px 4px 0 rgba(0,0,0,0.15),
                        0 0 12px -2px ${hexToRgba(colorGroup.color, 0.6)}
                      `
                    }}
                  />
                  <div className="flex flex-col gap-2.5">
                    <p className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150] uppercase tracking-wider">
                      YOUR IMPULSE COLOR
                    </p>
                    <p
                      className="font-jetbrains-mono font-medium text-[14px] leading-[20px]"
                      style={{ color: impulseColorText }}
                    >
                      {colorGroup.color.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button - Save as Image only */}
              <div className="hidden lg:flex flex-col gap-4 pt-6">
                <button
                  onClick={handleShare}
                  disabled={isCapturing}
                  className="relative w-full text-white font-space-grotesk font-bold text-[16px] leading-[24px] uppercase py-4 rounded-full overflow-hidden transition-all duration-300 hover:translate-y-[-2px] active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed group"
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
                    if (!isCapturing) {
                      e.currentTarget.style.boxShadow = `
                        0 1px 0 0 rgba(255,255,255,0.4) inset,
                        0 -1px 0 0 rgba(0,0,0,0.2) inset,
                        0 8px 0 0 #800082,
                        0 14px 28px -4px rgba(168,0,170,0.5),
                        0 0 60px -5px rgba(246,90,242,0.7)
                      `;
                    }
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
                  {/* Top highlight */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[30%] pointer-events-none opacity-40"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)'
                    }}
                  />
                  <span className="relative z-10">
                    {isCapturing ? (language === 'zh' ? '生成中...' : 'Capturing...') : (language === 'zh' ? '保存为图片' : 'SAVE AS IMAGE')}
                  </span>
                </button>
              </div>
            </div>

            {/* Congratulations Card - Enhanced with animations and confetti */}
            <div
              className="bg-gradient-to-br from-white via-[#fef5fb] to-white border-2 border-[#a800aa] rounded drop-shadow-[0px_4px_12px_rgba(168,0,170,0.2)] p-4 lg:p-\[33px\] flex flex-col gap-6 transition-all duration-300 hover:drop-shadow-[0px_8px_20px_rgba(168,0,170,0.4)] hover:scale-[1.02] animate-pulse-subtle"
              style={{
                animation: 'pulse-glow 3s ease-in-out infinite'
              }}
              onMouseEnter={() => {
                // Trigger confetti effect
                const duration = 2000;
                const animationEnd = Date.now() + duration;

                const randomInRange = (min: number, max: number) => {
                  return Math.random() * (max - min) + min;
                };

                const interval = setInterval(() => {
                  const timeLeft = animationEnd - Date.now();

                  if (timeLeft <= 0) {
                    return clearInterval(interval);
                  }

                  const particleCount = 3;

                  confetti({
                    particleCount,
                    startVelocity: 30,
                    spread: 360,
                    origin: {
                      x: randomInRange(0.1, 0.3),
                      y: Math.random() - 0.2
                    },
                    colors: ['#A100C2', '#FFC933', '#64EDD2', '#7858FF', '#f65af2']
                  });

                  confetti({
                    particleCount,
                    startVelocity: 30,
                    spread: 360,
                    origin: {
                      x: randomInRange(0.7, 0.9),
                      y: Math.random() - 0.2
                    },
                    colors: ['#A100C2', '#FFC933', '#64EDD2', '#7858FF', '#f65af2']
                  });
                }, 250);
              }}
            >
              {/* Title */}
              <div className="flex flex-col items-center gap-3">
                <h2 className="font-space-grotesk font-normal text-[30px] leading-[36px] tracking-[-0.75px] text-center">
                  <span className="font-space-grotesk font-normal text-[36px]">🎁 </span>
                  <span className="text-[#a800aa] font-bold">Congratulations!</span>
                </h2>
                <p className="font-space-grotesk font-normal text-[18px] leading-[28px] text-[#534150] text-center pt-4">
                  You win a reward!<br />
                  <span className="font-bold text-[#a800aa]">Claim Reward</span> at Impulse26 China Networking Party at 15:05
                </p>
              </div>

              {/* Information Box */}
              <div className="pt-2">
                <div className="bg-gradient-to-br from-[#fbe3f4] to-[#f8d5f0] border-2 border-[#d8bfd1] rounded p-[9px] flex flex-col gap-4 shadow-inner">
                  {/* Where */}
                  <div className="flex flex-col gap-2.5">
                    <p className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150] uppercase tracking-wider">
                      Where?
                    </p>
                    <p className="font-jetbrains-mono font-bold text-[14px] leading-[20px] text-[#a800aa]">
                      Pvg03 C1.1, AI Engineering Hub
                    </p>
                  </div>

                  {/* When */}
                  <div className="flex flex-col gap-2.5">
                    <p className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150] uppercase tracking-wider">
                      When
                    </p>
                    <p className="font-jetbrains-mono font-bold text-[14px] leading-[20px] text-[#a800aa]">
                      15:05, September 3rd, 2026
                    </p>
                  </div>

                  {/* How */}
                  <div className="flex flex-col gap-2.5">
                    <p className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150] uppercase tracking-wider">
                      How
                    </p>
                    <p className="font-jetbrains-mono font-bold text-[14px] leading-[20px] text-[#a800aa]">
                      Show your screenshot of this result to Staffs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 8 columns */}
          {/* Right Content Area: Full width on mobile, 8 columns on desktop */}
          <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-12">
            {/* Dimensions Section */}
            <div
              className="rounded-3xl p-6 lg:p-8 flex flex-col gap-8 transition-all duration-300"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
                borderWidth: '1px',
                borderStyle: 'solid',
                boxShadow: '0 12px 40px -12px rgba(168,0,170,0.15), 0 8px 24px -8px rgba(168,0,170,0.1)',
                transition: 'box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 20px 60px -15px rgba(168,0,170,0.2),
                  0 12px 36px -12px rgba(168,0,170,0.15)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px -12px rgba(168,0,170,0.15), 0 8px 24px -8px rgba(168,0,170,0.1)';
              }}
            >
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/Dimension.svg" alt="" className="w-5 h-5" style={{ filter: `brightness(0) saturate(100%)`, opacity: 0.8 }} />
                <h4 className="font-poppins font-bold text-[20px] lg:text-[22px] leading-tight tracking-tight uppercase" style={{ color: impulseColorText }}>
                  {t('result.dimensions')}
                </h4>
              </div>

              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-x-12 lg:gap-y-8">
                {/* Signal vs Solution */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#f65af2]">
                      SIGNAL ({Math.round((displayScores.Signal / (displayScores.Signal + displayScores.Solution)) * 100)}%)
                    </span>
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#00b5bd]">
                      SOLUTION ({Math.round((displayScores.Solution / (displayScores.Signal + displayScores.Solution)) * 100)}%)
                    </span>
                  </div>
                  <div className="h-8 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg relative group cursor-pointer">
                    <div
                      className="absolute top-1 bottom-1 left-1 bg-[#f65af2] rounded-md transition-all duration-300 group-hover:shadow-[0px_0px_12px_#f65af2]"
                      style={{ width: `calc(${Math.round((displayScores.Signal / (displayScores.Signal + displayScores.Solution)) * 100)}% - 8px)` }}
                    />
                  </div>
                </div>

                {/* Human vs Machine */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#00b5bd]">
                      HUMAN ({Math.round((displayScores.Human / (displayScores.Human + displayScores.Machine)) * 100)}%)
                    </span>
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#8e5aff]">
                      MACHINE ({Math.round((displayScores.Machine / (displayScores.Human + displayScores.Machine)) * 100)}%)
                    </span>
                  </div>
                  <div className="h-8 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg relative group cursor-pointer">
                    <div
                      className="absolute top-1 bottom-1 left-1 bg-[#00b5bd] rounded-md transition-all duration-300 group-hover:shadow-[0px_0px_12px_#00b5bd]"
                      style={{ width: `calc(${Math.round((displayScores.Human / (displayScores.Human + displayScores.Machine)) * 100)}% - 8px)` }}
                    />
                  </div>
                </div>

                {/* Explore vs Align */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#8e5aff]">
                      EXPLORE ({Math.round((displayScores.Explore / (displayScores.Explore + displayScores.Align)) * 100)}%)
                    </span>
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#f4bf28]">
                      ALIGN ({Math.round((displayScores.Align / (displayScores.Explore + displayScores.Align)) * 100)}%)
                    </span>
                  </div>
                  <div className="h-8 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg relative group cursor-pointer">
                    <div
                      className="absolute top-1 bottom-1 left-1 bg-[#8e5aff] rounded-md transition-all duration-300 group-hover:shadow-[0px_0px_12px_#8e5aff]"
                      style={{ width: `calc(${Math.round((displayScores.Explore / (displayScores.Explore + displayScores.Align)) * 100)}% - 8px)` }}
                    />
                  </div>
                </div>

                {/* Spark vs Stabilize */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#f4bf28]">
                      SPARK ({Math.round((displayScores.Spark / (displayScores.Spark + displayScores.Stabilize)) * 100)}%)
                    </span>
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#f65af2]">
                      STABILIZE ({Math.round((displayScores.Stabilize / (displayScores.Spark + displayScores.Stabilize)) * 100)}%)
                    </span>
                  </div>
                  <div className="h-8 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg relative group cursor-pointer">
                    <div
                      className="absolute top-1 bottom-1 left-1 bg-[#f4bf28] rounded-md transition-all duration-300 group-hover:shadow-[0px_0px_12px_#f4bf28]"
                      style={{ width: `calc(${Math.round((displayScores.Spark / (displayScores.Spark + displayScores.Stabilize)) * 100)}% - 8px)` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Signal Section */}
            <div
              className="rounded-3xl p-6 lg:p-8 flex flex-col gap-6 transition-all duration-300"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
                borderWidth: '1px',
                borderStyle: 'solid',
                boxShadow: '0 12px 40px -12px rgba(168,0,170,0.15), 0 8px 24px -8px rgba(168,0,170,0.1)',
                transition: 'box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 60px -15px rgba(168,0,170,0.2), 0 12px 36px -12px rgba(168,0,170,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px -12px rgba(168,0,170,0.15), 0 8px 24px -8px rgba(168,0,170,0.1)';
              }}
            >
              <div className="flex gap-3 items-center">
                <img src="/assets/icons/Signal.svg" alt="" className="w-5 h-5" style={{ filter: `brightness(0) saturate(100%)`, opacity: 0.8 }} />
                <h4 className="font-poppins font-bold text-[20px] lg:text-[22px] leading-tight tracking-tight text-[#231821] uppercase">
                  {t('result.signalTitle')}
                </h4>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-space-grotesk font-normal text-[16px] leading-[26px] text-[#231821]">
                  {result.signal[language]}
                </p>
              </div>
            </div>

            {/* Pulse Section */}
            <div
              className="rounded-3xl p-6 lg:p-8 flex flex-col gap-6 transition-all duration-300"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
                borderWidth: '1px',
                borderStyle: 'solid',
                boxShadow: '0 12px 40px -12px rgba(168,0,170,0.15), 0 8px 24px -8px rgba(168,0,170,0.1)',
                transition: 'box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 60px -15px rgba(168,0,170,0.2), 0 12px 36px -12px rgba(168,0,170,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px -12px rgba(168,0,170,0.15), 0 8px 24px -8px rgba(168,0,170,0.1)';
              }}
            >
              <div className="flex gap-3 items-center">
                <img src="/assets/icons/Impulse.svg" alt="" className="w-5 h-5" style={{ filter: `brightness(0) saturate(100%)`, opacity: 0.8 }} />
                <h4 className="font-poppins font-bold text-[20px] lg:text-[22px] leading-tight tracking-tight text-[#231821] uppercase">
                  {t('result.pulseTitle')}
                </h4>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-72-brand font-medium text-[16px] leading-[26px] text-[#231821]">
                  {result.pulse[language]}
                </p>
                <div
                  className="pl-5 pr-4 py-4"
                  style={{
                    backgroundColor: quoteBg,
                    borderLeft: `4px solid ${impulseColor}`
                  }}
                >
                  <p
                    className="font-72-brand font-medium italic text-[16px] leading-[26px]"
                    style={{ color: quoteTextColor }}
                  >
                    {language === 'zh'
                      ? `「${result.pulse.zh}」`
                      : `"${result.pulse.en}"`
                    }
                  </p>
                </div>
                {/* Hashtags - Twitter Style */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {(RESULT_HASHTAGS[result.key]?.[language] || '').split(' ').map((tag, index) => (
                    <span
                      key={index}
                      className="font-jetbrains-mono text-[12px] lg:text-[13px] px-3 py-1 rounded-full transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: hexToRgba(impulseColor, 0.15),
                        color: impulseColorText,
                        border: `1px solid ${hexToRgba(impulseColor, 0.3)}`
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Risks Section */}
            <div
              className="bg-[rgba(255,218,214,0.1)] border border-[#ba1a1a] rounded-3xl p-6 lg:p-8 flex flex-col gap-6 transition-all duration-300"
              style={{
                boxShadow: '0 12px 40px -12px rgba(186,26,26,0.15), 0 8px 24px -8px rgba(186,26,26,0.1)',
                transition: 'box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 60px -15px rgba(186,26,26,0.25), 0 12px 36px -12px rgba(186,26,26,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px -12px rgba(186,26,26,0.15), 0 8px 24px -8px rgba(186,26,26,0.1)';
              }}
            >
              <div className="flex gap-3 items-center">
                <img src="/assets/icons/Risk.svg" alt="" className="w-5 h-5" />
                <h4 className="font-poppins font-bold text-[20px] lg:text-[22px] leading-tight tracking-tight text-[#ba1a1a] uppercase">
                  {t('result.risksTitle')}
                </h4>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-72-brand font-medium text-[16px] leading-[26px] text-[#231821]">
                  {result.risk[language]}
                </p>
              </div>
            </div>

            {/* Punchline Section - Consistent with AdminPreview */}
            <div
              className="rounded-3xl p-6 lg:p-8 shadow-lg"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%), ${impulseColor}`
              }}
            >
              <p
                className="font-space-grotesk font-bold text-[18px] lg:text-[24px] leading-[24px] lg:leading-[30px] text-center mb-3 lg:mb-4"
                style={{ color: punchlineTextColor }}
              >
                {result.punchline[language]}
              </p>
              <p
                className="font-72-brand font-medium italic text-[16px] lg:text-[20px] leading-[24px] lg:leading-[28px] text-center"
                style={{
                  color: punchlineTextColor,
                  opacity: punchlineTextColor === '#ffffff' ? 0.9 : 0.7
                }}
              >
                {language === 'zh'
                  ? `"${result.punchline.en}"`
                  : `「${result.punchline.zh}」`
                }
              </p>
            </div>

            {/* Meeting Behavior Section */}
            {(language === 'zh' ? result.meetingBehaviorCN : result.meetingBehaviorEN) && (
              <div
                className="rounded p-4 lg:p-\[33px\] flex flex-col gap-6 transition-all duration-300"
                style={{
                  backgroundColor: cardBg,
                  borderColor: cardBorder,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  transition: 'box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0px 0px 20px ${impulseColor}30, 0px 0px 40px ${impulseColor}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div className="flex gap-3 items-center mb-4">
                  <img src="/assets/icons/Picto_Team.svg" alt="" className="w-5 h-5" style={{ filter: `brightness(0) saturate(100%)`, opacity: 0.8 }} />
                  <h4
                    className="font-space-grotesk font-bold text-[24px] leading-[32px] tracking-[-0.6px] uppercase"
                    style={{ color: impulseColorText }}
                  >
                    {language === 'zh' ? '会议表现' : 'MEETING BEHAVIOR'}
                  </h4>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="font-72-brand font-medium text-[18px] leading-[28px] text-[#231821] whitespace-pre-line">
                    {language === 'zh' ? result.meetingBehaviorCN : result.meetingBehaviorEN}
                  </p>
                </div>
              </div>
            )}

            {/* Library Grid */}
            <div className="flex flex-col gap-8">
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/Library.svg" alt="" className="w-5 h-5" />
                <h4 className="font-poppins font-bold text-[20px] lg:text-[22px] leading-tight tracking-tight text-[#a800aa] uppercase">
                  THE IMPULSE LIBRARY
                </h4>
              </div>

              <div className="bg-white border border-[#e5e2e8] rounded-3xl p-6 lg:p-8 shadow-soft">
                <div className="grid grid-cols-4 gap-3 lg:gap-4">
                  {getAllResultKeys().map(key => {
                    const isUnlocked = key === result.key;
                    const isHovered = hoveredLockedKey === key;

                    return (
                      <div key={key} className="relative">
                        <button
                          onClick={() => isUnlocked && navigate(`/result/${key}`)}
                          onMouseEnter={() => {
                            if (!isUnlocked) {
                              console.log('Hovering locked key:', key);
                              setHoveredLockedKey(key);
                            }
                          }}
                          onMouseLeave={() => {
                            console.log('Leave key:', key);
                            setHoveredLockedKey(null);
                          }}
                          disabled={!isUnlocked}
                          className={`
                            aspect-square w-full rounded-lg overflow-hidden flex items-center justify-center transition-all relative
                            ${isUnlocked
                              ? 'shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] hover:shadow-[0px_6px_8px_-1px_rgba(0,0,0,0.15)] hover:scale-105'
                              : 'opacity-60 hover:opacity-80'
                            }
                          `}
                          style={{ cursor: isUnlocked ? 'pointer' : 'not-allowed' }}
                        >
                          {isUnlocked ? (
                            <img
                              key={`unlocked-${key}`}
                              src={`/assets/result-cards/${key}.png?v=20260805`}
                              alt={key}
                              className="w-full h-full object-cover"
                              style={{
                                filter: `drop-shadow(0 0 8px ${impulseColor}80) drop-shadow(0 0 16px ${impulseColor}60) drop-shadow(0 0 24px ${impulseColor}40)`
                              }}
                            />
                          ) : (
                            <div className="relative w-full h-full">
                              <img
                                key={`locked-${key}`}
                                src={`/assets/result-cards-locked/${key}.png?v=20260805`}
                                alt={`${key} Locked`}
                                className="w-full h-full object-cover"
                              />
                              {/* Key text overlay for locked states - No background */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-jetbrains-mono font-bold text-[14px] lg:text-[16px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                  {key}
                                </span>
                              </div>
                            </div>
                          )}
                        </button>

                        {/* Popover for locked items */}
                        {!isUnlocked && isHovered && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30">
                            <div className="bg-[#231821] text-white px-4 py-3 rounded shadow-xl whitespace-nowrap">
                              <p className="font-jetbrains-mono text-[11px] leading-[16px]">
                                Ask others for their results!
                              </p>
                              {/* Arrow */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2">
                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#231821]" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Button - Save Image Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#fff7f9] border-t-2 border-[#a800aa] px-4 py-4 z-50 drop-shadow-[0px_-4px_2px_#f1ddea]">
        <button
          onClick={handleShare}
          disabled={isCapturing}
          className="relative w-full text-white font-poppins font-semibold text-[16px] leading-[31.2px] uppercase py-3 rounded-full flex items-center justify-center gap-2 disabled:opacity-50 overflow-hidden"
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
          <span className="relative z-10 text-[18px]">↗</span>
          <span className="relative z-10">{isCapturing ? (language === 'zh' ? '生成中...' : 'Capturing...') : (language === 'zh' ? '保存为图片' : 'SAVE AS IMAGE')}</span>
        </button>
      </div>

      <Footer />

      {/* Hidden Share Card - for image generation only */}
      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none">
        {result && (
          <ShareCard
            ref={shareCardRef}
            result={result}
            language={language}
          />
        )}
      </div>
    </div>
  );
};
