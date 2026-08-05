import { useState } from 'react';
import { RESULTS, getAllResultKeys } from '../data/results';
import { getColorGroupForResult } from '../data/colorGroups';
import { useLanguage } from '../i18n/LanguageContext';
import { getKeycapAsset, type KeycapType } from '../utils/assets';
import type { ResultKey } from '../data/types';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export const AdminPreview = () => {
  const allKeys = getAllResultKeys();
  const [selectedKey, setSelectedKey] = useState(allKeys[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { language } = useLanguage();

  if (!allKeys || allKeys.length === 0) {
    return <div className="p-8">{language === 'zh' ? '未找到结果' : 'No results found'}</div>;
  }

  const result = RESULTS[selectedKey];
  if (!result) {
    return <div className="p-8">{language === 'zh' ? `未找到结果: ${selectedKey}` : `Result not found: ${selectedKey}`}</div>;
  }

  const colorGroup = getColorGroupForResult(selectedKey as ResultKey);

  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Helper function to determine if we need dark text on light background
  const getTextColor = (bgColor: string): string => {
    // Convert hex to RGB
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);

    // Calculate relative luminance (WCAG formula)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // If background is light (luminance > 0.55), use dark text
    // Adjusted threshold from 0.5 to 0.55 to ensure purple (#7858FF) gets white text
    return luminance > 0.55 ? '#231821' : '#ffffff';
  };

  const punchlineTextColor = getTextColor(colorGroup.color);
  const punchlineLabelColor = punchlineTextColor === '#ffffff'
    ? 'rgba(255, 255, 255, 0.8)'
    : 'rgba(35, 24, 33, 0.6)';

  // Get contrasting Impulse colors for neon glitch effect
  const getGlitchColors = (currentColor: string) => {
    const impulseColors = ['#A100C2', '#FFC933', '#64EDD2', '#7858FF'];
    // Filter out the current color and return the other three
    return impulseColors.filter(c => c !== currentColor);
  };

  const glitchColors = getGlitchColors(colorGroup.color);

  return (
    <div className="min-h-screen bg-[#faf8fb] flex flex-col">
      {/* Top Header with Language Switcher - Mobile Friendly */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#e5e2e8] shadow-sm">
        <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden min-h-[44px] min-w-[44px] p-2 text-[#534150] hover:text-[#a800aa] transition-colors"
            aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth={2}
            >
              {isSidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Title */}
          <h1 className="font-space-grotesk font-bold text-[16px] sm:text-[20px] text-[#231821]">
            🔐 {language === 'zh' ? '管理员预览' : 'Admin Preview'}
          </h1>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Mobile: Drawer, Desktop: Fixed */}
        <div
          className={`
            fixed lg:static inset-y-0 left-0 z-40
            w-80 bg-white border-r border-[#e5e2e8]
            overflow-y-auto flex-shrink-0
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
          style={{ top: 'auto' }}
        >
          <div className="sticky top-0 bg-white border-b border-[#e5e2e8] p-4 sm:p-6 z-10">
            <p className="font-72-brand text-[12px] text-[#534150]">
              {language === 'zh' ? '检查所有 Result 的配色和文案' : 'Review all Result colors and content'}
            </p>
          </div>

        <div className="p-4 space-y-2">
          {allKeys.map((key) => {
            const cg = getColorGroupForResult(key as ResultKey);
            const isSelected = key === selectedKey;

            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedKey(key);
                  // Close sidebar on mobile after selection
                  if (window.innerWidth < 1024) {
                    setIsSidebarOpen(false);
                  }
                }}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  isSelected ? 'border-[#a800aa] bg-[#f7e3ef] shadow-sm' : 'border-[#e5e2e8] bg-white hover:border-[#d8bfd1]'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-sm shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]"
                    style={{ backgroundColor: cg.color }}
                  />
                  <div className="flex-1">
                    <div className="font-space-grotesk font-bold text-[12px] uppercase text-[#231821]">{key}</div>
                    <div className="font-jetbrains-mono text-[9px] text-[#867181]">{cg.color}</div>
                  </div>
                </div>
                <div className="font-72-brand text-[11px] text-[#534150]">
                  {RESULTS[key].nameCN}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Right Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-[1000px] mx-auto space-y-4 sm:space-y-6">
          {/* Header Card with Keycap */}
          <div className="bg-white rounded-lg border border-[#e5e2e8] shadow-sm p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              {/* Keycap Preview */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded border-2 p-2 flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer group relative"
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
                    src={getKeycapAsset(selectedKey as KeycapType)}
                    alt={result.nameEN}
                    className="w-32 h-32 sm:w-36 sm:h-36 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-space-grotesk font-bold text-[24px] sm:text-[28px] uppercase mb-2 text-[#231821]">
                  {result.nameEN}
                </h2>
                <h3 className="font-72-brand font-medium text-[18px] sm:text-[20px] text-[#a800aa] mb-4 sm:mb-6">
                  {result.nameCN}
                </h3>

                {/* Color Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 justify-center sm:justify-start">
                  <div>
                    <div className="font-jetbrains-mono text-[10px] text-[#867181] uppercase mb-1">
                      {language === 'zh' ? '颜色' : 'Color'}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" style={{ backgroundColor: colorGroup.color }} />
                      <span className="font-jetbrains-mono text-[12px] text-[#231821]">{colorGroup.color}</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-jetbrains-mono text-[10px] text-[#867181] uppercase mb-1">
                      {language === 'zh' ? '色系分组' : 'Color Group'}
                    </div>
                    <div className="font-jetbrains-mono text-[12px] text-[#231821] capitalize">{result.colorGroup}</div>
                  </div>
                </div>

                {/* Most Likely to Say */}
                {(result.mostLikelyToSayEN || result.mostLikelyToSayCN) && (
                  <div className="mt-4 pt-4 border-t border-[#e5e2e8]">
                    <div className="font-jetbrains-mono text-[10px] text-[#867181] uppercase mb-2">
                      {language === 'zh' ? '最可能说的话' : 'Most Likely to Say'}
                    </div>
                    <p className="font-space-grotesk text-[14px] sm:text-[16px] text-[#231821]">
                      {language === 'zh' ? result.mostLikelyToSayCN : result.mostLikelyToSayEN}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Motto */}
          <div
            className="rounded-lg border p-4 sm:p-6"
            style={{
              backgroundColor: hexToRgba(colorGroup.color, 0.05),
              borderColor: hexToRgba(colorGroup.color, 0.15)
            }}
          >
            <div className="font-jetbrains-mono text-[10px] uppercase mb-3" style={{ color: colorGroup.color }}>
              {language === 'zh' ? '座右铭' : 'Motto'}
            </div>
            <p className="font-space-grotesk text-[16px] sm:text-[18px] leading-relaxed text-[#231821]">
              "{language === 'zh' ? result.mottoCN : result.mottoEN}"
            </p>
            <p className="font-72-brand text-[13px] sm:text-[14px] leading-relaxed text-[#534150] mt-2 opacity-70">
              {language === 'zh' ? result.mottoEN : result.mottoCN}
            </p>
          </div>

          {/* Signal */}
          <div className="bg-white rounded-lg border border-[#e5e2e8] shadow-sm p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <img src="/assets/icons/Signal.svg" alt="" className="w-5 h-5 opacity-60" />
              <div className="font-jetbrains-mono text-[11px] text-[#867181] uppercase">
                {language === 'zh' ? '信号' : 'Signal'}
              </div>
            </div>
            <p className="font-space-grotesk text-[14px] sm:text-[15px] leading-relaxed text-[#231821]">
              {language === 'zh' ? result.signalCN : result.signalEN}
            </p>
          </div>

          {/* Pulse */}
          <div className="bg-white rounded-lg border border-[#e5e2e8] shadow-sm p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <img src="/assets/icons/Impulse.svg" alt="" className="w-5 h-5 opacity-60" />
              <div className="font-jetbrains-mono text-[11px] text-[#867181] uppercase">
                {language === 'zh' ? '脉冲' : 'Pulse'}
              </div>
            </div>
            <p className="font-72-brand text-[14px] sm:text-[15px] leading-relaxed text-[#231821] mb-4">
              {language === 'zh' ? result.pulseCN : result.pulseEN}
            </p>
            <div
              className="pl-4 py-3 border-l-4"
              style={{
                backgroundColor: hexToRgba(colorGroup.color, 0.15),
                borderColor: colorGroup.color
              }}
            >
              <p className="font-72-brand italic text-[13px] sm:text-[14px] leading-relaxed text-[#534150]">
                "{language === 'zh' ? result.pulseEN : result.pulseCN}"
              </p>
            </div>
          </div>

          {/* Risk */}
          <div className="bg-[rgba(255,218,214,0.1)] border border-[#ba1a1a] rounded-lg p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <img src="/assets/icons/Risk.svg" alt="" className="w-5 h-5" />
              <div className="font-jetbrains-mono text-[11px] text-[#ba1a1a] uppercase">
                {language === 'zh' ? '风险' : 'Risk'}
              </div>
            </div>
            <p className="font-72-brand text-[14px] sm:text-[15px] leading-relaxed text-[#231821]">
              {language === 'zh' ? result.riskCN : result.riskEN}
            </p>
          </div>

          {/* Punchline */}
          <div
            className="rounded-lg p-6 sm:p-8 shadow-lg"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%), ${colorGroup.color}`
            }}
          >
            <div className="font-jetbrains-mono text-[10px] uppercase mb-4" style={{ color: punchlineLabelColor }}>
              {language === 'zh' ? '点睛之笔' : 'Punchline'}
            </div>
            <p className="font-space-grotesk font-bold text-[18px] sm:text-[20px] leading-relaxed mb-3" style={{ color: punchlineTextColor }}>
              {language === 'zh' ? result.punchlineCN : result.punchlineEN}
            </p>
            <p className="font-72-brand italic text-[15px] sm:text-[16px] leading-relaxed" style={{
              color: punchlineTextColor,
              opacity: punchlineTextColor === '#ffffff' ? 0.9 : 0.7
            }}>
              "{language === 'zh' ? result.punchlineEN : result.punchlineCN}"
            </p>
          </div>

          {/* Meeting Behavior */}
          {(result.meetingBehaviorEN || result.meetingBehaviorCN) && (
            <div className="bg-white rounded-lg border border-[#e5e2e8] shadow-sm p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <img src="/assets/icons/Picto_Team.svg" alt="" className="w-5 h-5 opacity-60" />
                <div className="font-jetbrains-mono text-[11px] text-[#867181] uppercase">
                  {language === 'zh' ? '会议行为' : 'Meeting Behavior'}
                </div>
              </div>
              <p className="font-72-brand text-[14px] sm:text-[15px] leading-relaxed text-[#231821] whitespace-pre-line">
                {language === 'zh' ? result.meetingBehaviorCN : result.meetingBehaviorEN}
              </p>
            </div>
          )}

          {/* Content Status Indicators */}
          <div className="bg-white rounded-lg border border-[#e5e2e8] shadow-sm p-4 sm:p-6">
            <div className="font-jetbrains-mono text-[11px] text-[#867181] uppercase mb-4">
              {language === 'zh' ? '内容状态' : 'Content Status'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${result.mostLikelyToSayEN ? 'bg-green-500' : 'bg-red-400'}`}></span>
                <span className="font-jetbrains-mono text-[11px]">
                  {language === 'zh' ? '最可能说(英)' : 'Most Likely to Say EN'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${result.mostLikelyToSayCN ? 'bg-green-500' : 'bg-red-400'}`}></span>
                <span className="font-jetbrains-mono text-[11px]">
                  {language === 'zh' ? '最可能说(中)' : 'Most Likely to Say CN'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${result.meetingBehaviorEN ? 'bg-green-500' : 'bg-red-400'}`}></span>
                <span className="font-jetbrains-mono text-[11px]">
                  {language === 'zh' ? '会议行为(英)' : 'Meeting Behavior EN'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${result.meetingBehaviorCN ? 'bg-green-500' : 'bg-red-400'}`}></span>
                <span className="font-jetbrains-mono text-[11px]">
                  {language === 'zh' ? '会议行为(中)' : 'Meeting Behavior CN'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
