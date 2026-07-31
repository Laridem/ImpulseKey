import { useLanguage } from '../i18n';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 sm:px-4 py-2 text-[10px] sm:text-[12px] font-jetbrains-mono font-medium text-[#534150] border-2 border-[#867181] hover:border-[#a800aa] hover:text-[#a800aa] transition-colors flex items-center gap-2 uppercase tracking-wider rounded-full"
      aria-label="Switch Language"
    >
      <svg
        className="w-3 h-3 sm:w-4 sm:h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth={2.5}
      >
        <path
          strokeLinecap="square"
          strokeLinejoin="miter"
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      <span>{language === 'zh' ? 'English' : '中文'}</span>
    </button>
  );
};
