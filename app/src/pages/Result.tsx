import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { useControls, Leva } from 'leva';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { useLanguage } from '../i18n/LanguageContext';
import { getKeycapAsset } from '../utils/assets';
import { getColorGroupForResult } from '../data/colorGroups';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Result = () => {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const { result, dimensionScores, goToResult, resetTest } = useTest();
  const t = useTranslation();
  const { language } = useLanguage();
  const resultRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

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
    if (!resultRef.current || !result) return;

    setIsCapturing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 100));

      const dataUrl = await toPng(resultRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = `impulse-keys-${result.key}-${Date.now()}.png`;
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

  // Helper function to darken color for better contrast on light backgrounds
  const darkenColor = (hex: string, amount: number = 0.3): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const darkenedR = Math.round(r * (1 - amount));
    const darkenedG = Math.round(g * (1 - amount));
    const darkenedB = Math.round(b * (1 - amount));

    return `rgb(${darkenedR}, ${darkenedG}, ${darkenedB})`;
  };

  // Dynamic colors based on impulse color
  const impulseColor = colorGroup.color;
  const cardBg = hexToRgba(impulseColor, 0.08);
  const cardBorder = hexToRgba(impulseColor, 0.20);
  const quoteBg = hexToRgba(impulseColor, 0.25); // Increased from 0.15 to 0.25
  const quoteTextColor = darkenColor(impulseColor, 0.3); // Darkened text for better contrast

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
                  className="w-64 h-64 rounded border-2 shadow-[0px_4px_0px_0px_#d8bfd1,0px_8px_15px_0px_rgba(0,0,0,0.1)] p-1 flex items-center justify-center"
                  style={{
                    backgroundColor: colorGroup.color,
                    borderColor: '#f65af2'
                  }}
                >
                  <img
                    src={getKeycapAsset(result.key)}
                    alt={result.name.en}
                    className="w-48 h-48 object-contain"
                  />
                </div>
              </div>

              {/* Titles */}
              <div className="flex flex-col items-center gap-3">
                <h2 className="font-space-grotesk font-normal text-[30px] leading-[36px] tracking-[-0.75px] text-[#231821] text-center uppercase">
                  {result.name.en}
                </h2>
                <h3 className="font-72-brand font-medium text-[20px] leading-[28px] text-[#a800aa] text-center">
                  {result.name.zh}
                </h3>
                <p className="font-space-grotesk font-normal text-[18px] leading-[28px] text-[#534150] text-center pt-4">
                  "{result.motto.en}"
                </p>
              </div>

              {/* Color Badge */}
              <div className="pt-2">
                <div className="bg-[#ffeff8] border border-[rgba(216,191,209,0.3)] rounded p-[9px] flex gap-4 items-center">
                  <div
                    className="w-10 h-10 rounded-sm shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]"
                    style={{ backgroundColor: colorGroup.color }}
                  />
                  <div className="flex flex-col gap-2.5">
                    <p className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150] uppercase tracking-wider">
                      YOUR IMPULSE COLOR
                    </p>
                    <p className="font-jetbrains-mono font-medium text-[14px] leading-[20px] text-[#a800aa]">
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

            {/* Congratulations Card */}
            <div className="bg-white border border-[#d8bfd1] rounded drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-[33px] flex flex-col gap-6">
              {/* Title */}
              <div className="flex flex-col items-center gap-3">
                <h2 className="font-space-grotesk font-normal text-[30px] leading-[36px] tracking-[-0.75px] text-center">
                  <span className="font-space-grotesk font-normal">🎁 </span>
                  <span className="text-[#a800aa]">Congratulations!</span>
                </h2>
                <p className="font-space-grotesk font-normal text-[18px] leading-[28px] text-[#534150] text-center pt-4">
                  You win a gift from Impulse26!<br />
                  <span className="font-bold">Claim</span> Your Gift at Networking Party
                </p>
              </div>

              {/* Information Box */}
              <div className="pt-2">
                <div className="bg-[#fbe3f4] border border-[rgba(216,191,209,0.3)] rounded p-[9px] flex flex-col gap-4">
                  {/* Where */}
                  <div className="flex flex-col gap-2.5">
                    <p className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150] uppercase tracking-wider">
                      Where?
                    </p>
                    <p className="font-jetbrains-mono font-medium text-[14px] leading-[20px] text-[#a800aa]">
                      Pvg03 C1.1, Digital School
                    </p>
                  </div>

                  {/* When */}
                  <div className="flex flex-col gap-2.5">
                    <p className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150] uppercase tracking-wider">
                      When
                    </p>
                    <p className="font-jetbrains-mono font-medium text-[14px] leading-[20px] text-[#a800aa]">
                      15:05, September 3rd, 2026
                    </p>
                  </div>

                  {/* How */}
                  <div className="flex flex-col gap-2.5">
                    <p className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150] uppercase tracking-wider">
                      How
                    </p>
                    <p className="font-jetbrains-mono font-medium text-[14px] leading-[20px] text-[#a800aa]">
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
              className="rounded drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] p-[33px] flex flex-col gap-8"
              style={{ backgroundColor: cardBg, borderColor: cardBorder, borderWidth: '1px', borderStyle: 'solid' }}
            >
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/Dimension.svg" alt="" className="w-5 h-5" style={{ filter: `brightness(0) saturate(100%)`, opacity: 0.8 }} />
                <h4 className="font-jetbrains-mono font-medium text-[12px] leading-[16px] uppercase" style={{ color: impulseColor }}>
                  CORE DIMENSIONS / 核心维度
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
                  <div className="h-5 bg-white border border-[rgba(0,0,0,0.08)] rounded-sm relative">
                    <div
                      className="absolute top-1 bottom-1 left-[1.25%] bg-[#f65af2]"
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
                  <div className="h-5 bg-white border border-[rgba(0,0,0,0.08)] rounded-sm relative">
                    <div
                      className="absolute top-1 bottom-1 left-[1.25%] bg-[#00b5bd]"
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
                  <div className="h-5 bg-white border border-[rgba(0,0,0,0.08)] rounded-sm relative">
                    <div
                      className="absolute top-1 bottom-1 left-[1.25%] bg-[#8e5aff]"
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
                  <div className="h-5 bg-white border border-[rgba(0,0,0,0.08)] rounded-sm relative">
                    <div
                      className="absolute top-1 bottom-1 left-[1.25%] bg-[#f4bf28]"
                      style={{ width: `${Math.round((displayScores.Spark / (displayScores.Spark + displayScores.Stabilize)) * 100) * 0.9825}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Signal Section */}
            <div
              className="rounded p-[33px] flex flex-col gap-6"
              style={{ backgroundColor: cardBg, borderColor: cardBorder, borderWidth: '1px', borderStyle: 'solid' }}
            >
              <div className="flex gap-3 items-center mb-4">
                <img src="/assets/icons/Signal.svg" alt="" className="w-5 h-5" style={{ filter: `brightness(0) saturate(100%)`, opacity: 0.8 }} />
                <h4 className="font-space-grotesk font-bold text-[24px] leading-[32px] tracking-[-0.6px] text-[#231821] uppercase">
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
              className="rounded p-[33px] flex flex-col gap-6"
              style={{ backgroundColor: cardBg, borderColor: cardBorder, borderWidth: '1px', borderStyle: 'solid' }}
            >
              <div className="flex gap-3 items-center mb-4">
                <img src="/assets/icons/Impulse.svg" alt="" className="w-5 h-5" style={{ filter: `brightness(0) saturate(100%)`, opacity: 0.8 }} />
                <h4 className="font-space-grotesk font-bold text-[24px] leading-[32px] tracking-[-0.6px] text-[#231821] uppercase">
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
                    "{language === 'zh' ? result.pulse.en : result.pulse.zh}"
                  </p>
                </div>
              </div>
            </div>

            {/* Risks Section */}
            <div className="bg-[rgba(255,218,214,0.1)] border border-[#ba1a1a] rounded p-[33px] flex flex-col gap-6">
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

            {/* Punchline Section - Gradient Card */}
            <div
              className="relative rounded shadow-[6px_6px_12px_0px_rgba(255,201,51,0.4),5px_8px_10px_0px_rgba(100,237,210,0.3)] p-12"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%), #f65af2`
              }}
            >
              <div className="relative">
                <p className="font-space-grotesk font-bold text-[24px] leading-[30px] tracking-[-0.6px] text-[#610062] text-center uppercase">
                  {result.punchline[language]}
                </p>
                <p className="font-72-brand font-medium text-[24px] leading-[30px] text-[rgba(97,0,98,0.8)] text-center">
                  "{language === 'zh' ? result.punchline.en : result.punchline.zh}"
                </p>
              </div>
            </div>

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
                  {/* Active key */}
                  <button
                    className="aspect-square bg-[#a800aa] border border-[rgba(255,255,255,0.1)] rounded-sm shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex items-center justify-center"
                  >
                    <span className="font-jetbrains-mono font-medium text-[14px] leading-[20px] text-white">
                      {result.key}
                    </span>
                  </button>

                  {/* Other keys - simplified for now */}
                  {['FIORI', 'PIXEL', 'A11Y', 'HEUR', 'COPY', 'DARK', 'EMO',
                    'FLOW', 'GRID', 'HICK', 'ICON', 'JOIN', 'KERN', 'LOGS', 'MODE'].map(key => (
                    <button
                      key={key}
                      onClick={() => navigate(`/result/${key}`)}
                      className="aspect-square bg-white border border-[rgba(216,191,209,0.5)] rounded-sm drop-shadow-[0px_2px_0px_#d8bfd1] flex items-center justify-center hover:border-[#a800aa] transition-colors"
                    >
                      <span className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150]">
                        {key}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
