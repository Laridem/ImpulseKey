import { forwardRef } from 'react';
import { Result } from '../data/types';
import { getKeycapAsset } from '../utils/assets';
import { getColorGroupForResult } from '../data/colorGroups';

interface ShareCardProps {
  result: Result;
  language: 'en' | 'zh';
}

/**
 * ShareCard Component
 * Fixed 1080x1920px card for mobile sharing (9:16 ratio)
 * Layout based on design reference
 */
export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ result, language }, ref) => {
    const isEnglish = language === 'en';
    const nameEN = result.name.en;
    const nameCN = result.name.zh;
    const pulse = isEnglish ? result.pulse.en : result.pulse.zh; // Use pulse instead of motto
    const mostLikelyToSay = (isEnglish ? result.mostLikelyToSayEN : result.mostLikelyToSayCN) || pulse;

    // Get the Impulse color (magenta/yellow/cyan/purple) from color group
    const colorGroup = getColorGroupForResult(result.key);
    const impulseColor = colorGroup.color;

    // Get glitch shadow colors (other 3 Impulse colors)
    const getGlitchColors = (currentColor: string) => {
      const impulseColors = ['#A100C2', '#FFC933', '#64EDD2', '#7858FF'];
      return impulseColors.filter(c => c !== currentColor);
    };

    const glitchColors = getGlitchColors(impulseColor);

    return (
      <div
        ref={ref}
        className="relative w-[1080px] h-[1920px] bg-white overflow-hidden flex flex-col"
        style={{
          boxShadow: `
            0px 0px 40px 0px ${glitchColors[0]}60,
            0px 0px 80px 0px ${glitchColors[1]}40,
            0px 0px 120px 0px ${glitchColors[2]}30,
            -20px -20px 60px 0px ${impulseColor}40,
            20px 20px 60px 0px ${impulseColor}40
          `
        }}
      >
        {/* Top: Key Abbreviation */}
        <div className="pt-24 pb-16 flex flex-col items-center">
          <div className="font-jetbrains-mono font-medium text-[28px] leading-[36px] tracking-[0.1em] text-[#949494] uppercase">
            YOUR IMPULSE KEY:
          </div>
          <div className="font-jetbrains-mono font-bold text-[40px] leading-[48px] tracking-[0.15em] text-[#231821] uppercase">
            {result.key}
          </div>
        </div>

        {/* Middle: Keycap Image with Color Background */}
        <div className="flex justify-center px-16 pb-16">
          <div
            className="rounded-[40px] p-16 flex items-center justify-center"
            style={{ backgroundColor: impulseColor }}
          >
            <img
              src={getKeycapAsset(result.key)}
              alt={nameEN}
              className="w-[640px] h-[640px] object-contain"
            />
          </div>
        </div>

        {/* Quote: Most Likely to Say - Gray, Italic, No Quotes */}
        <div className="px-20 pb-16 flex justify-center">
          <div className="font-72-brand font-medium italic text-[44px] leading-[56px] text-center text-[#949494]">
            {mostLikelyToSay}
          </div>
        </div>

        {/* Result Name: English + Chinese */}
        <div className="px-20 pb-12 flex flex-col items-center gap-4">
          <h1 className="font-space-grotesk font-bold text-[72px] leading-[80px] text-[#231821] text-center">
            {nameEN}
          </h1>
          <h2
            className="font-72-brand font-medium text-[52px] leading-[64px] text-center"
            style={{ color: impulseColor }}
          >
            {nameCN}
          </h2>
        </div>

        {/* Divider */}
        <div className="px-20 pb-12">
          <div className="h-[2px] bg-[#d8bfd1]" />
        </div>

        {/* Bottom: Experience Pulse (longer text) */}
        <div className="flex-1 px-24 pb-12 flex items-start justify-center">
          <p className="font-72-brand text-[40px] leading-[56px] text-[#534150] text-center">
            {pulse}
          </p>
        </div>

        {/* Bottom Row: Logo (left) + QR Code (right) */}
        <div className="pb-20 px-20 flex justify-between items-center">
          {/* Anvils Logo - Bottom Left */}
          <div className="flex items-center">
            <img
              src="/assets/anvils.png"
              alt="Anvils"
              className="h-20 w-auto opacity-60"
            />
          </div>

          {/* QR Code - Bottom Right */}
          <div className="flex flex-col items-center gap-2">
            <img
              src="/assets/qr-code.png"
              alt="Scan QR Code"
              className="w-[154px] h-[154px] object-contain"
            />
            <p className="font-jetbrains-mono text-[16px] leading-[20px] text-[#949494] uppercase tracking-wider">
              Scan me
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ShareCard.displayName = 'ShareCard';

