import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { useLanguage } from '../i18n';
import { getAllRoleIds, getRole } from '../data/roles';
import { Header } from '../components/Header';

export const RoleSelection = () => {
  const navigate = useNavigate();
  const { setSelectedRole } = useTest();
  const t = useTranslation();
  const { language } = useLanguage();
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const roleIds = getAllRoleIds();

  // Update page title for accessibility
  useEffect(() => {
    document.title = `${t('roleSelection.title')} - Impulse26 Key`;
  }, [t]);

  const handleRoleClick = (roleId: string) => {
    setSelectedRoleId(roleId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, roleId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRoleClick(roleId);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const currentIndex = roleIds.indexOf(roleId);
      const nextIndex = (currentIndex + 1) % roleIds.length;
      const nextElement = document.querySelector(`[data-role-id="${roleIds[nextIndex]}"]`) as HTMLElement;
      nextElement?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const currentIndex = roleIds.indexOf(roleId);
      const prevIndex = (currentIndex - 1 + roleIds.length) % roleIds.length;
      const prevElement = document.querySelector(`[data-role-id="${roleIds[prevIndex]}"]`) as HTMLElement;
      prevElement?.focus();
    }
  };

  const handleContinue = () => {
    if (selectedRoleId) {
      setSelectedRole(selectedRoleId);
      navigate('/questions');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8fb] flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <Header showHomeButton={true} />
      </div>

      <main className="flex-1 py-8 sm:py-16 md:py-24 pb-24 sm:pb-24 px-4 sm:px-8 md:px-16" id="main-content">
        <div className="max-w-[1280px] mx-auto">
          {/* Title */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="font-space-grotesk font-bold text-[24px] sm:text-[36px] md:text-[48px] leading-[1.2] tracking-[-0.96px] text-[#231821] text-shadow-kinetic-sm sm:text-shadow-kinetic mb-4 sm:mb-6">
              {t('roleSelection.title')}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="w-1 h-4 sm:h-6 bg-[#a800aa]"></div>
              <p className="font-72-brand text-[14px] sm:text-body-lg text-[#534150] leading-[1.6]">
                {t('roleSelection.subtitle')}
              </p>
            </div>
          </div>

          {/* Role Cards Grid - 2x2 grid for 4 items */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-[900px] mx-auto mb-8 sm:mb-12"
            role="radiogroup"
            aria-label={t('roleSelection.title')}
          >
            {roleIds.map((roleId) => {
              const role = getRole(roleId);
              if (!role) return null;

              const isSelected = selectedRoleId === roleId;
              const categoryName = language === 'zh' ? role.nameZH : role.nameEN;

              return (
                <div
                  key={roleId}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  data-role-id={roleId}
                  onClick={() => handleRoleClick(roleId)}
                  onKeyDown={(e) => handleKeyDown(e, roleId)}
                  className={`bg-white p-5 sm:p-8 text-left border-2 rounded-lg transition-all hover:shadow-soft cursor-pointer ${
                    isSelected
                      ? 'border-[#a800aa] shadow-soft'
                      : 'border-[#e5e2e8]'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-2xl sm:text-3xl ${
                      isSelected ? 'bg-[#f7e3ef]' : 'bg-[#f5f3f7]'
                    }`}>
                      {role.icon}
                    </div>
                    <h3 className="font-hanken-grotesk font-bold text-[12px] sm:text-[14px] leading-[16px] sm:leading-[18px] text-[#a800aa] uppercase tracking-wide">
                      {categoryName}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Text */}
          <div className="text-center mb-6 sm:mb-10">
            <div className="inline-block border border-[#d8bfd1] rounded-lg px-4 sm:px-6 py-3 sm:py-4">
              <p className="font-72-brand text-[14px] sm:text-body-sm text-[#534150]">
                {t('roleSelection.footer')}
              </p>
            </div>
          </div>

          {/* Continue Button - Hidden on mobile, visible on desktop */}
          <div className="hidden sm:flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!selectedRoleId}
              className="relative w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-white font-72-brand text-[14px] sm:text-body-lg rounded-full overflow-hidden transition-all duration-300 hover:translate-y-[-2px] active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-3 group"
              style={{
                background: 'linear-gradient(145deg, #c026d3 0%, #a800aa 50%, #800082 100%)',
                boxShadow: `
                  0 1px 0 0 rgba(255,255,255,0.3) inset,
                  0 -1px 0 0 rgba(0,0,0,0.2) inset,
                  0 6px 0 0 #800082,
                  0 10px 20px -4px rgba(168,0,170,0.4),
                  0 0 40px -10px rgba(246,90,242,0.5)
                `
              }}
              onMouseEnter={(e) => {
                if (!selectedRoleId) return;
                e.currentTarget.style.boxShadow = `
                  0 1px 0 0 rgba(255,255,255,0.4) inset,
                  0 -1px 0 0 rgba(0,0,0,0.2) inset,
                  0 8px 0 0 #800082,
                  0 14px 28px -4px rgba(168,0,170,0.5),
                  0 0 60px -5px rgba(246,90,242,0.7)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 1px 0 0 rgba(255,255,255,0.3) inset,
                  0 -1px 0 0 rgba(0,0,0,0.2) inset,
                  0 6px 0 0 #800082,
                  0 10px 20px -4px rgba(168,0,170,0.4),
                  0 0 40px -10px rgba(246,90,242,0.5)
                `;
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[30%] pointer-events-none opacity-40"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)'
                }}
              />
              <span className="relative z-10">{t('roleSelection.continueButton')}</span>
              <span className="relative z-10">→</span>
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Button - Only visible on mobile */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#faf8fb] border-t-2 border-[#d946ef] px-4 py-4 z-50 shadow-[0px_-4px_8px_rgba(217,70,239,0.1)]">
        <button
          onClick={handleContinue}
          disabled={!selectedRoleId}
          className="relative w-full px-8 py-3 text-white font-72-brand text-[14px] rounded-full overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          style={{
            background: 'linear-gradient(145deg, #c026d3 0%, #a800aa 50%, #800082 100%)',
            boxShadow: `
              0 1px 0 0 rgba(255,255,255,0.3) inset,
              0 4px 0 0 #800082,
              0 8px 16px -4px rgba(168,0,170,0.4)
            `
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[30%] pointer-events-none opacity-40"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)'
            }}
          />
          <span className="relative z-10">{t('roleSelection.continueButton')}</span>
          <span className="relative z-10">→</span>
        </button>
      </div>
    </div>
  );
};
