import { Link } from 'react-router-dom';

const flags = {
  en: '/gb.svg',
  sv: '/se.svg',
  no: '/da.png',
};

export default function LanguageSwitcher({ slug = '', lang, translations = {}, type = 'page' }) {
  return (
    <div className="flex items-center space-x-2">
      {Object.entries(translations).map(([code, translatedSlug]) => {
        // Skip current language or missing slug
        if (!translatedSlug || code === lang) return null;

        let href = '/';

        if (type === 'home') {
          href = code === 'en' ? '/' : `/${code}`;
        } else if (type === 'page') {
          href = code === 'en' ? `/${translatedSlug}` : `/${code}/${translatedSlug}`;          
        } else if (type === 'post') {
          href = code === 'en' ? `/post/${translatedSlug}` : `/${code}/post/${translatedSlug}`;
        }

        return (
          <Link key={code} to={href} title={code.toUpperCase()}>
            <img src={flags[code]} alt={code} className="h-5 w-auto" />
          </Link>
        );
      })}
    </div>
  );
}
