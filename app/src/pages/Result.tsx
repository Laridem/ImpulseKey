import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { getKeycapAsset, getAllKeycaps } from '../utils/assets';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Result = () => {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const { result, dimensionScores, goToResult, resetTest } = useTest();
  const t = useTranslation();
  const allKeycaps = getAllKeycaps();
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main ref={resultRef} className="flex-1 max-w-7xl mx-auto px-8 py-12 w-full">
        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 mb-12">

          {/* Left Column - Keycap & Title */}
          <div className="flex flex-col items-center lg:items-start">
            {/* Keycap */}
            <div className="w-56 h-56 mb-6">
              <img
                src={getKeycapAsset(result.key)}
                alt={result.name.en}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 text-center lg:text-left mb-2">
              {result.name.en}
            </h1>
            <h2 className="text-2xl text-orange-500 text-center lg:text-left mb-6">
              {result.name.zh}
            </h2>

            {/* Motto */}
            <p className="text-gray-600 italic text-center lg:text-left mb-8">
              "{result.motto.en}"
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col w-full gap-3">
              <button
                onClick={handleShare}
                disabled={isCapturing}
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                className="w-full px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium"
              >
                {t('result.retakeButton')}
              </button>
            </div>
          </div>

          {/* Right Column - Dimensions & Content */}
          <div className="space-y-8">

            {/* Dimension Bars Section */}
            {dimensionScores && (
              <div className="bg-white paper-texture rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-600 mb-4 flex items-center gap-2">
                  <span>📊</span> {t('result.dimensions')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Dimension 1: Signal vs Solution */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-orange-500">{t('result.dimensionLabels.signal')}</span>
                      <span className="text-gray-500">{t('result.dimensionLabels.solution')}</span>
                    </div>
                    <div className="flex h-6 rounded-full overflow-hidden">
                      <div
                        className="bg-orange-500"
                        style={{ width: `${Math.round((dimensionScores.Signal / (dimensionScores.Signal + dimensionScores.Solution)) * 100)}%` }}
                      ></div>
                      <div
                        className="bg-gray-300"
                        style={{ width: `${Math.round((dimensionScores.Solution / (dimensionScores.Signal + dimensionScores.Solution)) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>({Math.round((dimensionScores.Signal / (dimensionScores.Signal + dimensionScores.Solution)) * 100)}%)</span>
                      <span>({Math.round((dimensionScores.Solution / (dimensionScores.Signal + dimensionScores.Solution)) * 100)}%)</span>
                    </div>
                  </div>

                  {/* Dimension 2: Human vs Machine */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-blue-500">{t('result.dimensionLabels.human')}</span>
                      <span className="text-gray-500">{t('result.dimensionLabels.machine')}</span>
                    </div>
                    <div className="flex h-6 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-500"
                        style={{ width: `${Math.round((dimensionScores.Human / (dimensionScores.Human + dimensionScores.Machine)) * 100)}%` }}
                      ></div>
                      <div
                        className="bg-gray-300"
                        style={{ width: `${Math.round((dimensionScores.Machine / (dimensionScores.Human + dimensionScores.Machine)) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>({Math.round((dimensionScores.Human / (dimensionScores.Human + dimensionScores.Machine)) * 100)}%)</span>
                      <span>({Math.round((dimensionScores.Machine / (dimensionScores.Human + dimensionScores.Machine)) * 100)}%)</span>
                    </div>
                  </div>

                  {/* Dimension 3: Explore vs Align */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-purple-500">{t('result.dimensionLabels.explore')}</span>
                      <span className="text-gray-500">{t('result.dimensionLabels.align')}</span>
                    </div>
                    <div className="flex h-6 rounded-full overflow-hidden">
                      <div
                        className="bg-purple-500"
                        style={{ width: `${Math.round((dimensionScores.Explore / (dimensionScores.Explore + dimensionScores.Align)) * 100)}%` }}
                      ></div>
                      <div
                        className="bg-gray-300"
                        style={{ width: `${Math.round((dimensionScores.Align / (dimensionScores.Explore + dimensionScores.Align)) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>({Math.round((dimensionScores.Explore / (dimensionScores.Explore + dimensionScores.Align)) * 100)}%)</span>
                      <span>({Math.round((dimensionScores.Align / (dimensionScores.Explore + dimensionScores.Align)) * 100)}%)</span>
                    </div>
                  </div>

                  {/* Dimension 4: Spark vs Stabilize */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-pink-500">{t('result.dimensionLabels.spark')}</span>
                      <span className="text-gray-500">{t('result.dimensionLabels.stabilize')}</span>
                    </div>
                    <div className="flex h-6 rounded-full overflow-hidden">
                      <div
                        className="bg-pink-500"
                        style={{ width: `${Math.round((dimensionScores.Spark / (dimensionScores.Spark + dimensionScores.Stabilize)) * 100)}%` }}
                      ></div>
                      <div
                        className="bg-gray-300"
                        style={{ width: `${Math.round((dimensionScores.Stabilize / (dimensionScores.Spark + dimensionScores.Stabilize)) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>({Math.round((dimensionScores.Spark / (dimensionScores.Spark + dimensionScores.Stabilize)) * 100)}%)</span>
                      <span>({Math.round((dimensionScores.Stabilize / (dimensionScores.Spark + dimensionScores.Stabilize)) * 100)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Punchline */}
            <div className="bg-orange-500 rounded-lg p-6 text-white">
              <p className="text-lg font-medium mb-2">{result.punchline.en}</p>
              <p className="text-white/90">{result.punchline.zh}</p>
            </div>

            {/* Signal Section */}
            <div className="bg-white paper-texture rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>📡</span> {t('result.signalTitle')}
              </h3>
              <p className="text-gray-700 leading-relaxed">{result.signal.en}</p>
            </div>

            {/* Pulse Section */}
            <div className="bg-white paper-texture rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span>💓</span> {t('result.pulseTitle')}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">{result.pulse.en}</p>
              <p className="text-gray-600 italic">"{result.pulse.zh}"</p>
            </div>

            {/* Hidden Risks Section */}
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
                <span>⚠️</span> {t('result.risksTitle')}
              </h3>
              <p className="text-gray-700 leading-relaxed">{result.risk.en}</p>
            </div>
          </div>
        </div>

        {/* IMPULSE LIBRARY Section */}
        <div className="bg-white paper-texture rounded-lg p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>📚</span> {t('result.libraryTitle')}
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {allKeycaps.map((keycapKey) => (
              <div
                key={keycapKey}
                className={`aspect-square p-3 rounded-lg flex items-center justify-center ${
                  keycapKey === result.key
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <span className="text-xs font-medium">{keycapKey}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
