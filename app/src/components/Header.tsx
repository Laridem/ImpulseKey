import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-[#d8bfd1]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <span className="font-space-grotesk font-bold text-[18px] sm:text-headline-md text-[#a800aa] tracking-tight">
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
  );
};
