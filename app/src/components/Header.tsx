import { useNavigate } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = () => {
  const navigate = useNavigate();

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
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-4 cursor-pointer" onClick={() => navigate('/')}>
            <span className="font-poppins font-bold text-[18px] sm:text-headline-md text-[#a800aa] tracking-tight">
              Impulse26 Key
            </span>
            <img
              src="/assets/anvils.png"
              alt="Anvils"
              className="w-[40px] sm:w-[59.2px] h-[22px] sm:h-8 object-contain"
            />
          </div>

          {/* Right side: Language Switcher only */}
          <div className="flex items-center">
            <LanguageSwitcher />
          </div>
        </div>
      </header>
    </>
  );
};
