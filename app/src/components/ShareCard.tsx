import { forwardRef } from 'react';
import { Result } from '../data/types';
import { getKeycapAsset } from '../utils/assets';

interface ShareCardProps {
  result: Result;
  language: 'en' | 'zh';
}

/**
 * ShareCard Component
 * Fixed 1080x1080px card for social media sharing
 */
export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ result, language }, ref) => {
    const isEnglish = language === 'en';
    const name = isEnglish ? result.name.en : result.name.zh;
    const motto = isEnglish ? result.motto.en : result.motto.zh;

    // Get glitch shadow colors (other 3 Impulse colors)
    const getGlitchColors = (currentColor: string) => {
      const impulseColors = ['#A100C2', '#FFC933', '#64EDD2', '#7858FF'];
      return impulseColors.filter(c => c !== currentColor);
    };

    const glitchColors = getGlitchColors(result.color);

    return (
      <div
        ref={ref}
        className="relative w-[1080px] h-[1080px] overflow-hidden"
        style={{ backgroundColor: result.color }}
      >
        {/* Anvils Logo - Top Left */}
        <div className="absolute top-12 left-12 z-10">
          <img
            src="/assets/anvils.png"
            alt="Anvils"
            className="h-16 w-auto"
          />
        </div>

        {/* Main Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-20">
          {/* Keycap Image */}
          <div
            className="mb-12"
            style={{
              filter: `drop-shadow(-4px -4px 12px ${glitchColors[0]}80)
                       drop-shadow(4px 4px 16px ${glitchColors[1]}60)
                       drop-shadow(0px 0px 24px ${glitchColors[2]}40)`
            }}
          >
            <img
              src={getKeycapAsset(result.key)}
              alt={name}
              className="w-[420px] h-[420px] object-contain"
            />
          </div>

          {/* Result Name */}
          <h1
            className="font-space-grotesk font-bold text-[56px] leading-tight text-center mb-6"
            style={{
              color: '#231821',
              textShadow: `
                2px 2px 0px ${glitchColors[0]}40,
                -2px -2px 0px ${glitchColors[1]}40,
                0px 4px 8px ${glitchColors[2]}20
              `
            }}
          >
            {name}
          </h1>

          {/* Motto */}
          <p
            className="font-72-brand text-[32px] leading-relaxed text-center max-w-[800px]"
            style={{
              color: '#231821',
              textShadow: `1px 1px 2px ${glitchColors[0]}30`
            }}
          >
            {motto}
          </p>
        </div>

        {/* Bottom Branding */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center">
          <div
            className="font-jetbrains-mono text-[24px] font-bold tracking-wider"
            style={{
              color: '#231821',
              textShadow: `1px 1px 2px ${glitchColors[0]}40`
            }}
          >
            IMPULSE26.KEYS
          </div>
        </div>

        {/* Decorative Corner Elements */}
        <div
          className="absolute top-0 right-0 w-48 h-48 opacity-10"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${glitchColors[0]} 50%)`
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-48 h-48 opacity-10"
          style={{
            background: `linear-gradient(315deg, transparent 50%, ${glitchColors[1]} 50%)`
          }}
        />
      </div>
    );
  }
);

ShareCard.displayName = 'ShareCard';
