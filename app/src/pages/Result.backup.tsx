import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { useControls, Leva } from 'leva';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { useLanguage } from '../i18n/LanguageContext';
import { getKeycapAsset, getAllKeycaps } from '../utils/assets';
import { getColorGroupForResult, getTextColorForGroup } from '../data/colorGroups';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Result = () => {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const { result, dimensionScores, goToResult, resetTest } = useTest();
  const t = useTranslation();
  const { language } = useLanguage();
  const allKeycaps = getAllKeycaps();
  const resultRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // 🎛️ Leva Controls - Real-time visual adjustments
  const {
    keycapScale,
    keycapRotate,
    animationSpeed,
    primaryColor,
    showDebugPanel,
    glowIntensity,
    cardShadow
  } = useControls('🎨 Visual Controls', {
    keycapScale: { value: 1, min: 0.5, max: 2, step: 0.1, label: '键帽大小' },
    keycapRotate: { value: 0, min: -30, max: 30, step: 1, label: '键帽旋转°' },
    animationSpeed: { value: 300, min: 100, max: 1000, step: 50, label: '动画速度ms' },
    primaryColor: { value: '#f97316', label: '主题色' },
    glowIntensity: { value: 0, min: 0, max: 30, step: 1, label: '发光强度' },
    cardShadow: { value: 'sm', options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'], label: '卡片阴影' },
    showDebugPanel: { value: true, label: '显示控制面板' },
  });

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
      // Wait a bit for state to settle
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capture the entire result section as PNG
      const dataUrl = await toPng(resultRef.current, {
        cacheBust: true,
        pixelRatio: 2, // Higher quality (2x resolution)
        backgroundColor: '#f9fafb', // bg-gray-50
      });

      // Create a download link
      const link = document.createElement('a');
      link.download = `impulse-keys-${result.key}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      // Show success feedback (optional)
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading result...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Leva Control Panel */}
      <Leva collapsed={false} hidden={!showDebugPanel} />

      <Header />

      <main ref={resultRef} className="flex-1 max-w-[1280px] mx-auto px-16 py-24 w-full">
        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 mb-24 animate-fadeIn">

          {/* Left Column - Keycap & Title */}
          <div className="flex flex-col items-center lg:items-start animate-slideUp">
            {/* Keycap with colored background */}
            <div className="relative mb-8">
              {/* Colored background square */}
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  backgroundColor: getColorGroupForResult(result.key).color,
                  transform: `scale(${keycapScale}) rotate(${keycapRotate}deg)`,
                  transitionDuration: `${animationSpeed}ms`,
                }}
              />
              {/* Keycap image */}
              <div
                className="relative w-64 h-64 transition-all cursor-pointer"
                style={{
                  transform: `scale(${keycapScale}) rotate(${keycapRotate}deg)`,
                  transitionDuration: `${animationSpeed}ms`,
                  filter: glowIntensity > 0 ? `drop-shadow(0 0 ${glowIntensity}px ${primaryColor})` : 'none',
                }}
              >
                <img
                  src={getKeycapAsset(result.key)}
                  alt={result.name.en}
                  className="w-full h-full object-contain hover:scale-110 transition-transform relative z-10"
                />
              </div>
            </div>

            {/* Color Group Badge */}
            {(() => {
              const colorGroup = getColorGroupForResult(result.key);
              return (
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-72-brand text-body-sm text-[#534150]">
                    {t('result.colorGroup')}
                  </span>
                  <div
                    className="w-10 h-10 rounded border-2 border-[#d8bfd1] shadow-soft"
                    style={{
                      backgroundColor: colorGroup.color
                    }}
                  />
                </div>
              );
            })()}

            {/* Title */}
            <h1 className="font-space-grotesk font-bold text-[48px] leading-[57.6px] tracking-[-0.96px] text-[#231821] text-center lg:text-left mb-3">
              {result.name[language]}
            </h1>
            <h2 className="font-space-grotesk font-medium text-[24px] leading-[32px] tracking-[-0.6px] text-[#5d38e3] text-center lg:text-left mb-8">
              {language === 'zh' ? result.name.en : result.name.zh}
            </h2>

            {/* Motto */}
            <p className="font-hanken-grotesk text-body-lg text-[#534150] italic text-center lg:text-left mb-10 leading-[29.25px]">
              "{result.motto[language]}"
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col w-full gap-4">
              <button
                onClick={handleShare}
                disabled={isCapturing}
                className="w-full px-10 py-5 bg-[#a800aa] text-white font-72-brand text-body-lg rounded-lg border-b-4 border-[#800082] shadow-soft hover:shadow-soft-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCapturing ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    {t('result.capturingImage') || 'Capturing...'}
                  </>
                ) : (
                  <>
                    <span>📸</span>
                    {t('result.shareButton')}
                  </>
                )}
              </button>
              <button
                onClick={handleRetake}
                className="w-full px-10 py-5 bg-[#f7e3ef] text-[#231821] font-72-brand text-body-lg border border-[#867181] rounded-lg hover:border-[#a800aa] transition-all"
              >
                {t('result.retakeButton')}
              </button>
            </div>
          </div>

          {/* Right Column - Dimensions & Content */}
          <div className="space-y-8">

            {/* Dimension Bars Section */}
            {dimensionScores && (
              <div className="bg-[#ffeff8] border border-[#d8bfd1] rounded-lg p-8">
                <h3 className="font-hanken-grotesk font-bold text-headline-sm text-[#231821] mb-6 flex items-center gap-2">
                  <span>📊</span> {t('result.dimensions')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dimension 1: Signal vs Solution */}
                  <div>
                    <div className="flex justify-between font-jetbrains-mono text-[12px] font-medium mb-2">
                      <span className="text-[#a800aa] uppercase">{t('result.dimensionLabels.signal')}</span>
                      <span className="text-[#534150] uppercase">{t('result.dimensionLabels.solution')}</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-[#d8bfd1]">
                      <div
                        className="bg-[#a800aa]"
                        style={{ width: `${Math.round((dimensionScores.Signal / (dimensionScores.Signal + dimensionScores.Solution)) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between font-72-brand text-body-sm text-[#534150] mt-2">
                      <span>({Math.round((dimensionScores.Signal / (dimensionScores.Signal + dimensionScores.Solution)) * 100)}%)</span>
                      <span>({Math.round((dimensionScores.Solution / (dimensionScores.Signal + dimensionScores.Solution)) * 100)}%)</span>
                    </div>
                  </div>

                  {/* Dimension 2: Human vs Machine */}
                  <div>
                    <div className="flex justify-between font-jetbrains-mono text-[12px] font-medium mb-2">
                      <span className="text-[#5d38e3] uppercase">{t('result.dimensionLabels.human')}</span>
                      <span className="text-[#534150] uppercase">{t('result.dimensionLabels.machine')}</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-[#d8bfd1]">
                      <div
                        className="bg-[#5d38e3]"
                        style={{ width: `${Math.round((dimensionScores.Human / (dimensionScores.Human + dimensionScores.Machine)) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between font-72-brand text-body-sm text-[#534150] mt-2">
                      <span>({Math.round((dimensionScores.Human / (dimensionScores.Human + dimensionScores.Machine)) * 100)}%)</span>
                      <span>({Math.round((dimensionScores.Machine / (dimensionScores.Human + dimensionScores.Machine)) * 100)}%)</span>
                    </div>
                  </div>

                  {/* Dimension 3: Explore vs Align */}
                  <div>
                    <div className="flex justify-between font-jetbrains-mono text-[12px] font-medium mb-2">
                      <span className="text-[#f65af2] uppercase">{t('result.dimensionLabels.explore')}</span>
                      <span className="text-[#534150] uppercase">{t('result.dimensionLabels.align')}</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-[#d8bfd1]">
                      <div
                        className="bg-[#f65af2]"
                        style={{ width: `${Math.round((dimensionScores.Explore / (dimensionScores.Explore + dimensionScores.Align)) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between font-72-brand text-body-sm text-[#534150] mt-2">
                      <span>({Math.round((dimensionScores.Explore / (dimensionScores.Explore + dimensionScores.Align)) * 100)}%)</span>
                      <span>({Math.round((dimensionScores.Align / (dimensionScores.Explore + dimensionScores.Align)) * 100)}%)</span>
                    </div>
                  </div>

                  {/* Dimension 4: Spark vs Stabilize */}
                  <div>
                    <div className="flex justify-between font-jetbrains-mono text-[12px] font-medium mb-2">
                      <span className="text-[#00b098] uppercase">{t('result.dimensionLabels.spark')}</span>
                      <span className="text-[#534150] uppercase">{t('result.dimensionLabels.stabilize')}</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-[#d8bfd1]">
                      <div
                        className="bg-[#00b098]"
                        style={{ width: `${Math.round((dimensionScores.Spark / (dimensionScores.Spark + dimensionScores.Stabilize)) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between font-72-brand text-body-sm text-[#534150] mt-2">
                      <span>({Math.round((dimensionScores.Spark / (dimensionScores.Spark + dimensionScores.Stabilize)) * 100)}%)</span>
                      <span>({Math.round((dimensionScores.Stabilize / (dimensionScores.Spark + dimensionScores.Stabilize)) * 100)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Punchline */}
            <div className="bg-[#a800aa] rounded-lg p-8 text-white shadow-soft">
              <p className="font-hanken-grotesk font-bold text-body-lg mb-2 leading-[29.25px]">
                {result.punchline[language]}
              </p>
              <p className="font-72-brand text-body-md text-white/90">
                "{language === 'zh' ? result.punchline.en : result.punchline.zh}"
              </p>
            </div>

            {/* Signal Section */}
            <div className="bg-[#ffeff8] border border-[#d8bfd1] rounded-lg p-8">
              <h3 className="font-hanken-grotesk font-bold text-headline-sm text-[#231821] mb-4 flex items-center gap-2">
                <span>📡</span> {t('result.signalTitle')}
              </h3>
              <p className="font-72-brand text-body-lg text-[#534150] leading-[29.25px]">
                {result.signal[language]}
              </p>
            </div>

            {/* Pulse Section */}
            <div className="bg-[#ffeff8] border border-[#d8bfd1] rounded-lg p-8">
              <h3 className="font-hanken-grotesk font-bold text-headline-sm text-[#231821] mb-4 flex items-center gap-2">
                <span>💓</span> {t('result.pulseTitle')}
              </h3>
              <p className="font-72-brand text-body-lg text-[#534150] leading-[29.25px] mb-4">
                {result.pulse[language]}
              </p>
              <p className="font-72-brand text-body-md text-[#534150] italic">
                "{language === 'zh' ? result.pulse.en : result.pulse.zh}"
              </p>
            </div>

            {/* Hidden Risks Section */}
            <div className="bg-[#ffdad6] border-l-4 border-[#ba1a1a] rounded-lg p-8">
              <h3 className="font-hanken-grotesk font-bold text-headline-sm text-[#93000a] mb-4 flex items-center gap-2">
                <span>⚠️</span> {t('result.risksTitle')}
              </h3>
              <p className="font-72-brand text-body-lg text-[#93000a] leading-[29.25px]">
                {result.risk[language]}
              </p>
            </div>
          </div>
        </div>

        {/* IMPULSE LIBRARY Section */}
        <div className="bg-[#ffeff8] border border-[#d8bfd1] rounded-lg p-10">
          <h3 className="font-space-grotesk font-bold text-[32px] leading-[40px] tracking-tight text-[#231821] mb-10 flex items-center gap-3">
            <span>📚</span> {t('result.libraryTitle')}
          </h3>

          {/* Group by color */}
          {['magenta', 'yellow', 'cyan', 'purple'].map((colorKey) => {
            const colorGroup = getColorGroupForResult(
              allKeycaps.find(k => {
                const cg = getColorGroupForResult(k);
                return cg.key === colorKey;
              })!
            );
            const groupKeycaps = allKeycaps.filter(k => getColorGroupForResult(k).key === colorKey);
            const textColor = getTextColorForGroup(colorGroup.key);

            return (
              <div key={colorKey} className="mb-8 last:mb-0">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded border-2 border-[#d8bfd1] shadow-soft"
                    style={{ backgroundColor: colorGroup.color }}
                  />
                  <span className="font-hanken-grotesk font-bold text-headline-sm text-[#231821]">
                    {colorGroup.name}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                  {groupKeycaps.map((keycapKey) => (
                    <div
                      key={keycapKey}
                      className="aspect-square p-3 rounded-lg flex items-center justify-center transition-all cursor-pointer hover:scale-110 border"
                      style={{
                        backgroundColor: keycapKey === result.key ? colorGroup.color : '#ffffff',
                        color: keycapKey === result.key ? textColor : '#534150',
                        borderColor: keycapKey === result.key ? colorGroup.color : '#d8bfd1',
                        boxShadow: keycapKey === result.key ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)' : 'none',
                      }}
                      onClick={() => navigate(`/result/${keycapKey}`)}
                    >
                      <span className="font-jetbrains-mono font-medium text-[11px] uppercase">{keycapKey}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};
