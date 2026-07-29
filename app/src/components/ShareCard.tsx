import { forwardRef } from 'react';
import { Result } from '../data/types';
import { getKeycapAsset } from '../utils/assets';

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
    const motto = isEnglish ? result.motto.en : result.motto.zh;
    const mostLikelyToSay = (isEnglish ? result.mostLikelyToSayEN : result.mostLikelyToSayCN) || motto;

    return (
      <div
        ref={ref}
        className="relative w-[1080px] h-[1920px] bg-white overflow-hidden flex flex-col"
      >
        {/* Top: Key Abbreviation */}
        <div className="pt-24 pb-16 flex justify-center">
          <div className="font-jetbrains-mono font-medium text-[48px] leading-[60px] tracking-[0.2em] text-[#534150] uppercase">
            YOUR IMPULSE KEY: {result.key}
          </div>
        </div>

        {/* Middle: Keycap Image with Color Background */}
        <div className="flex justify-center px-16 pb-16">
          <div
            className="rounded-[40px] p-16 flex items-center justify-center"
            style={{ backgroundColor: result.color }}
          >
            <img
              src={getKeycapAsset(result.key)}
              alt={nameEN}
              className="w-[640px] h-[640px] object-contain"
            />
          </div>
        </div>

        {/* Quote: Most Likely to Say */}
        <div className="px-20 pb-16 flex justify-center">
          <div
            className="font-space-grotesk font-bold text-[44px] leading-[56px] text-center"
            style={{ color: result.color }}
          >
            "{mostLikelyToSay}"
          </div>
        </div>

        {/* Result Name: English + Chinese */}
        <div className="px-20 pb-12 flex flex-col items-center gap-4">
          <h1 className="font-space-grotesk font-bold text-[72px] leading-[80px] text-[#231821] text-center">
            {nameEN}
          </h1>
          <h2
            className="font-72-brand font-medium text-[52px] leading-[64px] text-center"
            style={{ color: result.color }}
          >
            {nameCN}
          </h2>
        </div>

        {/* Divider */}
        <div className="px-20 pb-12">
          <div className="h-[2px] bg-[#d8bfd1]" />
        </div>

        {/* Bottom: Motto */}
        <div className="flex-1 px-24 pb-24 flex items-start justify-center">
          <p className="font-72-brand text-[40px] leading-[56px] text-[#534150] text-center">
            {motto}
          </p>
        </div>
      </div>
    );
  }
);

ShareCard.displayName = 'ShareCard';

