import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPageBySlug } from '../api/wp';
import Seo from '../components/Seo';
import LanguageSwitcher from '../components/LanguageSwitcher';
import PageBuilder from '../components/PageBuilder';

export default function Page() {
  const params = useParams();
  const slug = params.slug;
  const lang = params.lang || 'en'; // Fallback to 'en'

  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setData(null);
    setNotFound(false);
    getPageBySlug(slug, lang)
      .then(pages => {
        if (!pages || pages.length === 0) {
          setNotFound(true);
          return;
        }

        const page = pages[0];

        setData({
          id: page.id,
          slug: page.slug,
          title: page.title.rendered,
          content: page.content.rendered,
          acf: page.acf || {},
          yoast: page.yoast_head_json || {},
          lang: page.lang,
          translations: page.translations || {}
        });
      })
      .catch(err => {
        console.error('Error loading page:', err);
        setNotFound(true);
      });
  }, [slug, lang]);

  if (notFound) return <div className="relative w-full min-h-[90vh] text-white flex items-center justify-center bg-black px-6 lg:px-16 py-16 md:py-32"> <h2 className='text-5xl text-center mt-20'>Page Not Found</h2></div>;
  if (!data) return <div className="relative w-full min-h-[90vh] flex items-center justify-center bg-black px-6 lg:px-16 py-16 md:py-32">
         <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
    </div>;

  return (
    <>
      <div className="fixed top-[40px] right-[60px] z-50 flex items-center space-x-4">
        <Seo yoast={data.yoast} lang={data.lang} />
        <LanguageSwitcher slug={slug} lang={data.lang} translations={data.translations} type="page" />
      </div>
      <PageBuilder blocks={data.acf.page_builder || []} />
    </>
  );
}
