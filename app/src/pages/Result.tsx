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

  // Load result if accessed directly via URL
  useEffect(() => {
    if (key && !result) {
      goToResult(key);
    }
  }, [key, result, goToResult]);

  const handleRetake = () => {
    resetTest();
    navigate('/');
  };

  const handleShare = async () => {
    if (!shareCardRef.current || !result) return;

    setIsCapturing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 100));

      const dataUrl = await toPng(shareCardRef.current, {
        cacheBust: true,
        pixelRatio: 1, // 1080x1920 already high-res
        backgroundColor: '#ffffff',
        width: 1080,
        height: 1920,
      });

      const link = document.createElement('a');
      link.download = `IMPULSE-${result.key}.png`;
      link.href = dataUrl;
      link.click();

      console.log('Image saved successfully!');
    } catch (error) {
      console.error('Failed to capture image:', error);
      alert('Failed to save image. Please try again.');
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
      <Header />

      <main ref={resultRef} className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 py-6 sm:py-8 md:py-12 w-full">
        {/* 12-Column Grid Layout */}
        <div className="grid grid-cols-12 gap-12">
          {/* Left Sidebar: 4 columns */}
          <div className="col-span-4 flex flex-col gap-6">
            {/* Character Card */}
            <div className="bg-white border border-[#d8bfd1] rounded drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-[33px] flex flex-col gap-6">
              {/* Keycap with color background */}
              <div className="flex justify-center">
                <div
                  className="w-64 h-64 rounded border-2 p-2 flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer group relative"
                  style={{
                    backgroundColor: colorGroup.color,
                    borderColor: '#f65af2',
                    boxShadow: `
                      0px 4px 0px 0px #d8bfd1,
                      0px 8px 15px 0px rgba(0,0,0,0.1),
                      -2px -2px 8px 0px ${glitchColors[0]}40,
                      2px 2px 8px 0px ${glitchColors[1]}40,
                      0px 0px 12px 0px ${glitchColors[2]}30
                    `
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `
                      0px 6px 0px 0px #d8bfd1,
                      0px 12px 20px 0px rgba(0,0,0,0.15),
                      -4px -4px 12px 0px ${glitchColors[0]}60,
                      4px 4px 12px 0px ${glitchColors[1]}60,
                      0px 0px 20px 0px ${glitchColors[2]}50,
                      -6px 0px 15px 0px ${glitchColors[0]}40,
                      6px 0px 15px 0px ${glitchColors[1]}40
                    `;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `
                      0px 4px 0px 0px #d8bfd1,
                      0px 8px 15px 0px rgba(0,0,0,0.1),
                      -2px -2px 8px 0px ${glitchColors[0]}40,
                      2px 2px 8px 0px ${glitchColors[1]}40,
                      0px 0px 12px 0px ${glitchColors[2]}30
                    `;
                  }}
                >
                  <img
                    src={getKeycapAsset(result.key)}
                    alt={result.name.en}
                    className="w-48 h-48 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Key Abbreviation Display */}
              <div className="flex justify-center -mt-2">
                <div
                  className="font-jetbrains-mono font-bold text-[32px] leading-[40px] tracking-widest uppercase"
                  style={{
                    color: impulseColor,
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
                <h2 className="font-space-grotesk font-normal text-[24px] leading-[30px] tracking-[-0.6px] text-[#231821] text-center uppercase">
                  {result.name.en}
                </h2>
                <h3 className="font-72-brand font-medium text-[18px] leading-[24px] text-[#a800aa] text-center">
                  {result.name.zh}
                </h3>
                {/* Dynamic Most Likely to Say or fallback to motto */}
                <p className="font-space-grotesk font-normal text-[18px] leading-[28px] text-[#534150] text-center pt-4">
                  {(language === 'zh' ? result.mostLikelyToSayCN : result.mostLikelyToSayEN) || `"${result.motto.en}"`}
                </p>
              </div>

              {/* Color Badge */}
              <div className="pt-2">
                <div
                  className="border rounded p-[9px] flex gap-4 items-center"
                  style={{
                    backgroundColor: hexToRgba(impulseColor, 0.08),
                    borderColor: hexToRgba(impulseColor, 0.3)
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-sm shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]"
                    style={{ backgroundColor: colorGroup.color }}
                  />
                  <div className="flex flex-col gap-2.5">
                    <p className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150] uppercase tracking-wider">
                      YOUR IMPULSE COLOR
                    </p>
                    <p
                      className="font-jetbrains-mono font-medium text-[14px] leading-[20px]"
                      style={{ color: impulseColor }}
                    >
                      {colorGroup.color.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 pt-6">
                <button
                  onClick={handleShare}
                  disabled={isCapturing}
                  className="w-full bg-[#a800aa] text-white font-space-grotesk font-bold text-[16px] leading-[24px] uppercase py-4 rounded shadow-[0px_4px_0px_0px_#800082,0px_8px_15px_0px_rgba(168,0,170,0.2)] hover:translate-y-0.5 transition-transform disabled:opacity-50"
                >
                  {isCapturing ? 'Capturing...' : 'SHARE RESULT / 分享结果'}
                </button>
                <button
                  onClick={handleRetake}
                  className="w-full border-2 border-[#d8bfd1] text-[#534150] font-space-grotesk font-bold text-[16px] leading-[24px] uppercase py-4 px-0.5 rounded hover:border-[#a800aa] transition-colors"
                >
                  RETAKE TEST / 重新测试
                </button>
              </div>
            </div>

            {/* Congratulations Card - Enhanced with animations and confetti */}
            <div
              className="bg-gradient-to-br from-white via-[#fef5fb] to-white border-2 border-[#a800aa] rounded drop-shadow-[0px_4px_12px_rgba(168,0,170,0.2)] p-[33px] flex flex-col gap-6 transition-all duration-300 hover:drop-shadow-[0px_8px_20px_rgba(168,0,170,0.4)] hover:scale-[1.02] animate-pulse-subtle"
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
                  You win a reward from Impulse26!<br />
                  <span className="font-bold text-[#a800aa]">Claim Reward</span> at Impulse26 Networking Party
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
                      Pvg03 C1.1, Digital School
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
          <div className="col-span-8 flex flex-col gap-12">
            {/* Dimensions Section */}
            <div
              className="rounded drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-[33px] flex flex-col gap-8 transition-all duration-300 hover:drop-shadow-[0px_4px_8px_rgba(0,0,0,0.1)]"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
                borderWidth: '1px',
                borderStyle: 'solid',
                transition: 'box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `
                  0px 0px 20px 0px ${glitchColors[0]}40,
                  0px 0px 40px 0px ${glitchColors[1]}30,
                  0px 0px 60px 0px ${glitchColors[2]}20
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/Dimension.svg" alt="" className="w-5 h-5" style={{ filter: `brightness(0) saturate(100%)`, opacity: 0.8 }} />
                <h4 className="font-space-grotesk font-bold text-[18px] leading-[26px] tracking-[-0.45px] uppercase" style={{ color: impulseColor }}>
                  {t('result.dimensions')}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                {/* Signal vs Solution */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#f65af2]">
                      SIGNAL ({Math.round((displayScores.Signal / (displayScores.Signal + displayScores.Solution)) * 100)}%)
                    </span>
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#534150]">
                      SOLUTION
                    </span>
                  </div>
                  <div className="h-5 bg-white border border-[rgba(0,0,0,0.08)] rounded-sm relative group cursor-pointer">
                    <div
                      className="absolute top-1 bottom-1 left-[1.25%] bg-[#f65af2] rounded-sm transition-all duration-300 group-hover:shadow-[0px_0px_12px_#f65af2]"
                      style={{ width: `${Math.round((displayScores.Signal / (displayScores.Signal + displayScores.Solution)) * 100) * 0.9825}%` }}
                    />
                  </div>
                </div>

                {/* Human vs Machine */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#00b5bd]">
                      HUMAN ({Math.round((displayScores.Human / (displayScores.Human + displayScores.Machine)) * 100)}%)
                    </span>
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#534150]">
                      MACHINE
                    </span>
                  </div>
                  <div className="h-5 bg-white border border-[rgba(0,0,0,0.08)] rounded-sm relative group cursor-pointer">
                    <div
                      className="absolute top-1 bottom-1 left-[1.25%] bg-[#00b5bd] rounded-sm transition-all duration-300 group-hover:shadow-[0px_0px_12px_#00b5bd]"
                      style={{ width: `${Math.round((displayScores.Human / (displayScores.Human + displayScores.Machine)) * 100) * 0.9825}%` }}
                    />
                  </div>
                </div>

                {/* Explore vs Align */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#8e5aff]">
                      EXPLORE ({Math.round((displayScores.Explore / (displayScores.Explore + displayScores.Align)) * 100)}%)
                    </span>
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#534150]">
                      ALIGN
                    </span>
                  </div>
                  <div className="h-5 bg-white border border-[rgba(0,0,0,0.08)] rounded-sm relative group cursor-pointer">
                    <div
                      className="absolute top-1 bottom-1 left-[1.25%] bg-[#8e5aff] rounded-sm transition-all duration-300 group-hover:shadow-[0px_0px_12px_#8e5aff]"
                      style={{ width: `${Math.round((displayScores.Explore / (displayScores.Explore + displayScores.Align)) * 100) * 0.9825}%` }}
                    />
                  </div>
                </div>

                {/* Spark vs Stabilize */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#f4bf28]">
                      SPARK ({Math.round((displayScores.Spark / (displayScores.Spark + displayScores.Stabilize)) * 100)}%)
                    </span>
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#534150]">
                      STABILIZE
                    </span>
                  </div>
                  <div className="h-5 bg-white border border-[rgba(0,0,0,0.08)] rounded-sm relative group cursor-pointer">
                    <div
                      className="absolute top-1 bottom-1 left-[1.25%] bg-[#f4bf28] rounded-sm transition-all duration-300 group-hover:shadow-[0px_0px_12px_#f4bf28]"
                      style={{ width: `${Math.round((displayScores.Spark / (displayScores.Spark + displayScores.Stabilize)) * 100) * 0.9825}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Signal Section */}
            <div
              className="rounded p-[33px] flex flex-col gap-6 transition-all duration-300"
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
                <img src="/assets/icons/Signal.svg" alt="" className="w-5 h-5" style={{ filter: `brightness(0) saturate(100%)`, opacity: 0.8 }} />
                <h4 className="font-space-grotesk font-bold text-[18px] leading-[26px] tracking-[-0.45px] text-[#231821] uppercase">
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
              className="rounded p-[33px] flex flex-col gap-6 transition-all duration-300"
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
                <img src="/assets/icons/Impulse.svg" alt="" className="w-5 h-5" style={{ filter: `brightness(0) saturate(100%)`, opacity: 0.8 }} />
                <h4 className="font-space-grotesk font-bold text-[18px] leading-[26px] tracking-[-0.45px] text-[#231821] uppercase">
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
                      ? `"${result.pulse.en}"`
                      : `「${result.pulse.zh}」`
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Risks Section */}
            <div
              className="bg-[rgba(255,218,214,0.1)] border border-[#ba1a1a] rounded p-[33px] flex flex-col gap-6 transition-all duration-300"
              style={{ transition: 'box-shadow 0.3s ease' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0px 0px 20px rgba(186, 26, 26, 0.3), 0px 0px 40px rgba(186, 26, 26, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <div className="flex gap-3 items-center mb-4">
                <img src="/assets/icons/Risk.svg" alt="" className="w-5 h-5" />
                <h4 className="font-space-grotesk font-bold text-[24px] leading-[32px] tracking-[-0.6px] text-[#ba1a1a] uppercase">
                  {t('result.risksTitle')}
                </h4>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-72-brand font-medium text-[16px] leading-[26px] text-[#231821]">
                  {result.risk[language]}
                </p>
              </div>
            </div>

            {/* Punchline Section - Gradient Card with dynamic color */}
            <div
              className="relative rounded shadow-[6px_6px_12px_0px_rgba(255,201,51,0.4),5px_8px_10px_0px_rgba(100,237,210,0.3)] p-12 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%), ${impulseColor}`,
                transition: 'box-shadow 0.3s ease, transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `
                  0px 0px 30px ${impulseColor}60,
                  0px 0px 60px ${impulseColor}40,
                  6px 6px 12px rgba(255,201,51,0.4),
                  5px 8px 10px rgba(100,237,210,0.3)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '6px 6px 12px rgba(255,201,51,0.4), 5px 8px 10px rgba(100,237,210,0.3)';
              }}
            >
              <div className="relative">
                <p
                  className="font-space-grotesk font-bold text-[24px] leading-[30px] tracking-[-0.6px] text-center uppercase mb-4"
                  style={{ color: punchlineTextColor }}
                >
                  {result.punchline[language]}
                </p>
                <p
                  className="font-72-brand font-medium text-[24px] leading-[30px] text-center"
                  style={{ color: punchlineTextColor }}
                >
                  {language === 'zh'
                    ? `"${result.punchline.en}"`
                    : `「${result.punchline.zh}」`
                  }
                </p>
              </div>
            </div>

            {/* Meeting Behavior Section */}
            {(language === 'zh' ? result.meetingBehaviorCN : result.meetingBehaviorEN) && (
              <div
                className="rounded p-[33px] flex flex-col gap-6 transition-all duration-300"
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
                    style={{ color: impulseColor }}
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
                <h4 className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#a800aa] uppercase">
                  THE IMPULSE LIBRARY
                </h4>
              </div>

              <div className="bg-[#ffeff8] border border-[#d8bfd1] rounded p-[33px] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]">
                <div className="grid grid-cols-8 gap-4">
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
                            aspect-square w-full rounded-sm flex items-center justify-center transition-all relative
                            ${isUnlocked
                              ? 'bg-[#a800aa] border border-[rgba(255,255,255,0.1)] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] hover:shadow-[0px_6px_8px_-1px_rgba(0,0,0,0.15)]'
                              : 'bg-white border border-[rgba(216,191,209,0.5)] drop-shadow-[0px_2px_0px_#d8bfd1] hover:border-[#d8bfd1]'
                            }
                          `}
                          style={{ cursor: isUnlocked ? 'pointer' : 'not-allowed' }}
                        >
                          {isUnlocked ? (
                            <span className="font-jetbrains-mono font-medium text-[14px] leading-[20px] text-white">
                              {key}
                            </span>
                          ) : (
                            <>
                              <span className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150] opacity-40">
                                {key}
                              </span>
                              {isHovered && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/95 rounded-sm z-20">
                                  <img
                                    src="/assets/icons/Locked.png"
                                    alt="Locked"
                                    className="w-10 h-10 object-contain"
                                  />
                                </div>
                              )}
                            </>
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
