import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPageBySlug } from '../api/wp';
import Seo from '../components/Seo';
import LanguageSwitcher from '../components/LanguageSwitcher';
import PageBuilder from '../components/PageBuilder';

export default function Home() {
  const { lang } = useParams(); // 'sv', 'no', or undefined for English
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchHome() {
      setLoading(true);
      setNotFound(false);

      try {
        // Always fetch English home first
        const [enPage] = await getPageBySlug('home');

        let pageToUse = enPage;
        if (lang && lang !== 'en') {
          const translatedSlug = enPage.translations?.[lang];
          if (translatedSlug) {
            const [translatedPage] = await getPageBySlug(translatedSlug, lang);
            if (translatedPage) pageToUse = translatedPage;
            else setNotFound(true);
          } else {
            console.warn(`⚠️ No translation for lang="${lang}", using English fallback`);
          }
        }

        if (!pageToUse) {
          setNotFound(true);
          return;
        }

        setData({
          id: pageToUse.id,
          slug: pageToUse.slug,
          acf: pageToUse.acf || {},
          yoast: pageToUse.yoast_head_json || {},
          lang: pageToUse.lang,
          translations: pageToUse.translations || {},
        });
      } catch (err) {
        // console.error('❌ Error fetching home:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchHome();
  }, [lang]);

  if (loading) {
    return (
      <div className="relative w-full min-h-[100vh] flex items-center justify-center bg-black px-6 lg:px-16 py-16 md:py-32">
        <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="relative w-full min-h-[90vh] text-white flex items-center justify-center bg-black px-6 lg:px-16 py-16 md:py-32">
         <h2 className='text-5xl text-center mt-20'>Home Not Found</h2>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-[40px] right-[60px] z-50 flex items-center space-x-4">
        <Seo yoast={data.yoast} lang={data.lang} />
        <LanguageSwitcher
          slug=""
          lang={data.lang}
          translations={data.translations}
          type="home"
        />
      </div>
      <PageBuilder blocks={data.acf.page_builder} />
    </>
  );
}
