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
      navigate('/intro');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-5xl w-full">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {t('roleSelection.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('roleSelection.subtitle')}
            </p>
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {roleIds.map((roleId) => {
              const role = getRole(roleId);
              if (!role) return null;

              const isSelected = selectedRoleId === roleId;
              const name = language === 'zh' ? role.nameZH : role.nameEN;
              const desc = language === 'zh' ? role.descZH : role.descEN;

              return (
                <button
                  key={roleId}
                  onClick={() => handleRoleClick(roleId)}
                  className={`bg-white paper-texture rounded-lg p-6 text-left border-2 transition-all ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 shadow-lg'
                      : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl flex-shrink-0">{role.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        {name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-500 mb-6">
            {t('roleSelection.footer')}
          </p>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!selectedRoleId}
              className="px-12 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
