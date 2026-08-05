import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../i18n/LanguageContext';
import { useState, useRef } from 'react';

interface HeaderProps {
  showRetakeButton?: boolean;
  onRetake?: () => void;
}

export const Header = ({ showRetakeButton = false, onRetake }: HeaderProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    // Prevent default navigation if we're tracking clicks
    if (clickCount > 0) {
      e.stopPropagation();
    }

    // Increment click count
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Clear existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // If 5 clicks reached, navigate to admin preview (secret entrance)
    if (newCount >= 5) {
      console.log('🎉 Secret entrance unlocked!');
      setClickCount(0);
      // Use window.location for reliable navigation
      window.location.href = '/admin/preview';
      return;
    }

    // If first click, allow normal navigation to home
    if (newCount === 1) {
      // Let the click through for home navigation
      return;
    }

    // Reset click count after 2 seconds of inactivity
    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 2000);
  };

  return (
    <>
      {/* Skip to main content link - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#a800aa] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-poppins focus:font-semibold focus:text-[14px]"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#d8bfd1] shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo - Secret Entrance: Click 5 times */}
          <div
            className="flex items-center gap-2 sm:gap-4 cursor-pointer transition-transform duration-200 active:scale-95"
            onClick={handleLogoClick}
            style={{
              // Subtle visual feedback when clicking
              filter: clickCount > 0 ? `hue-rotate(${clickCount * 30}deg)` : 'none'
            }}
          >
            <span className="font-poppins font-bold text-[18px] sm:text-headline-md text-[#a800aa] tracking-tight">
              Impulse26 Key
            </span>
            <img
              src="/assets/anvils.png"
              alt="Anvils"
              className="w-[40px] sm:w-[59.2px] h-[22px] sm:h-8 object-contain"
            />
          </div>

          {/* Right side: Retake button (optional) + Language Switcher */}
          <div className="flex items-center gap-3">
            {showRetakeButton && onRetake && (
              <button
                onClick={onRetake}
                className="px-4 py-2 text-[#a800aa] font-space-grotesk font-bold text-[14px] leading-[20px] uppercase rounded-full border-2 border-[#a800aa] transition-all duration-300 hover:bg-[#a800aa] hover:text-white active:scale-95"
              >
                {language === 'zh' ? '重新测试' : 'RETAKE TEST'}
              </button>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      </header>
    </>
  );
};
