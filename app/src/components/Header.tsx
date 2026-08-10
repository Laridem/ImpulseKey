import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../i18n/LanguageContext';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  showRetakeButton?: boolean;
  onRetake?: () => void;
  showHomeButton?: boolean;
}

export const Header = ({ showRetakeButton = false, onRetake, showHomeButton = false }: HeaderProps) => {
  const { language } = useLanguage();
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [menuOpen]);

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

          {/* Right side: Actions + Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop: Show all buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {showHomeButton && (
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-4 py-2 text-[#a800aa] font-space-grotesk font-bold text-[14px] leading-[20px] rounded-full border-2 border-[#a800aa] transition-all duration-300 hover:bg-[#a800aa] hover:text-white active:scale-95 flex items-center gap-2"
                  aria-label={language === 'zh' ? '回到首页' : 'Go to Home'}
                >
                  <span className="text-[16px]">🏠</span>
                  <span>{language === 'zh' ? '首页' : 'HOME'}</span>
                </button>
              )}
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

            {/* Mobile: Overflow menu */}
            {(showHomeButton || showRetakeButton) && (
              <div className="sm:hidden relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 text-[#a800aa] rounded-full border-2 border-[#a800aa] transition-all duration-300 hover:bg-[#a800aa] hover:text-white active:scale-95"
                  aria-label="Menu"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="4" r="1.5" fill="currentColor"/>
                    <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                    <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
                  </svg>
                </button>

                {/* Dropdown menu */}
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg border-2 border-[#a800aa] shadow-lg overflow-hidden z-[100]">
                    {showHomeButton && (
                      <button
                        onClick={() => {
                          window.location.href = '/';
                        }}
                        className="w-full px-4 py-3 text-left text-[#a800aa] font-space-grotesk font-bold text-[14px] hover:bg-[#fef5fb] transition-colors flex items-center gap-2 border-b border-[#f1ddea]"
                      >
                        <span className="text-[16px]">🏠</span>
                        {language === 'zh' ? '首页' : 'HOME'}
                      </button>
                    )}
                    {showRetakeButton && onRetake && (
                      <button
                        onClick={() => {
                          onRetake();
                          setMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-[#a800aa] font-space-grotesk font-bold text-[14px] hover:bg-[#fef5fb] transition-colors uppercase"
                      >
                        {language === 'zh' ? '重新测试' : 'RETAKE TEST'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Language switcher always visible */}
            <div className="sm:hidden">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
