import { Helmet } from 'react-helmet-async';

export default function Seo({ yoast, lang = 'en' }) {
  if (!yoast) return null;

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{yoast.title}</title>
      <meta name="description" content={yoast.description} />
      <meta property="og:title" content={yoast.og_title} />
      <meta property="og:description" content={yoast.og_description} />
      <meta property="og:image" content={yoast.og_image?.[0]?.url} />
      <meta property="og:type" content={yoast.og_type} />
      <meta name="twitter:title" content={yoast.twitter_title} />
      <meta name="twitter:description" content={yoast.twitter_description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content={yoast.robots} />
    </Helmet>
  );
}
