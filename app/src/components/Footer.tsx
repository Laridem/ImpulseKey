import { useTranslation } from '../i18n';

export const Footer = () => {
  const t = useTranslation();

  return (
    <footer className="bg-white paper-texture border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 text-sm">{t('footer.copyright')}</p>
          <div className="flex items-center gap-6 text-sm">
            <span className="text-gray-600">{t('footer.internalOnly')}</span>
            <a
              href="#"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              {t('footer.designHub')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
