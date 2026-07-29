import { useState } from 'react';
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

  const handleRoleClick = (roleId: string) => {
    setSelectedRoleId(roleId);
  };

  const handleContinue = () => {
    if (selectedRoleId) {
      setSelectedRole(selectedRoleId);
      navigate('/questions');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8fb] flex flex-col">
      <Header />

      <main className="flex-1 py-24 px-16">
        <div className="max-w-[1280px] mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="font-space-grotesk font-bold text-[48px] leading-[57.6px] tracking-[-0.96px] text-[#231821] text-shadow-kinetic mb-6">
              {t('roleSelection.title')}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="w-1 h-6 bg-[#a800aa]"></div>
              <p className="font-72-brand text-body-lg text-[#534150] leading-[29.25px]">
                {t('roleSelection.subtitle')}
              </p>
            </div>
          </div>

          {/* Role Cards Grid - 2x2 grid for 4 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto mb-12">
            {roleIds.map((roleId) => {
              const role = getRole(roleId);
              if (!role) return null;

              const isSelected = selectedRoleId === roleId;
              const categoryName = language === 'zh' ? role.nameZH : role.nameEN;
              const desc = language === 'zh' ? role.descZH : role.descEN;

              return (
                <button
                  key={roleId}
                  onClick={() => handleRoleClick(roleId)}
                  className={`bg-white p-8 text-left border-2 rounded-lg transition-all hover:shadow-soft ${
                    isSelected
                      ? 'border-[#a800aa] shadow-soft'
                      : 'border-[#e5e2e8]'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center text-3xl ${
                      isSelected ? 'bg-[#f7e3ef]' : 'bg-[#f5f3f7]'
                    }`}>
                      {role.icon}
                    </div>
                    <h3 className="font-hanken-grotesk font-bold text-[14px] leading-[18px] text-[#a800aa] uppercase tracking-wide">
                      {categoryName}
                    </h3>
                  </div>
                  <p className="font-72-brand text-[16px] text-[#534150] leading-[24px]">
                    {desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Footer Text */}
          <div className="text-center mb-10">
            <div className="inline-block border border-[#d8bfd1] rounded-lg px-6 py-4">
              <p className="font-72-brand text-body-sm text-[#534150]">
                {t('roleSelection.footer')}
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!selectedRoleId}
              className="px-12 py-4 bg-[#d946ef] text-white font-72-brand text-body-lg rounded-lg hover:bg-[#c026d3] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-soft"
            >
              {t('roleSelection.continueButton')}
              <span>→</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
