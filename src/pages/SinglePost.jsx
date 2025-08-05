// src/pages/SinglePost.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug } from '../api/wp';
import axios from 'axios';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Seo from '../components/Seo';

export default function SinglePost() {
  const { slug, lang } = useParams();    // slug = post slug, lang = 'sv'|'no'|undefined
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      try {
        // Fetch the post in the correct language
        const [fetched] = await getPostBySlug(slug, lang);
        if (!fetched) {
          setPost(false);
          return;
        }

        // get featured image if present
        let thumbnail = null;
        if (fetched.featured_media) {
          try {
            const media = await axios.get(
              `https://gomowebb.com/headless-poc/wp-json/wp/v2/media/${fetched.featured_media}`
            );
            thumbnail = media.data.source_url;
          } catch {
          }
        }

        setPost({
          ...fetched,
          thumbnail,
        });
        console.log('Fetched post:', fetched);
        console.log('Post translations:', fetched.translations);

      } catch (err) {
        console.error('Error loading post:', err);
        setPost(false);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug, lang]);

  if (loading) {
    return <div className="p-8 text-center">Loading…</div>;
  }
  if (post === false) {
    return <div className="p-8 text-center">Post not found</div>;
  }

  // prefix links with /sv or /no when in those languages
  const prefix = lang && lang !== 'en' ? `/${lang}` : '';

  return (
    <>
    <div className="fixed top-[40px] right-[60px] z-50 flex items-center space-x-4">
      <LanguageSwitcher
        slug={slug}
        lang={post.lang}
        translations={post.translations}
        type="post"
      />

    </div>
    <section className="relative w-full min-h-[5vh] flex flex-col items-center justify-center bg-black text-center px-6 lg:px-16 py-16 md:py-32"> </section>
    <article className="max-w-3xl mx-auto p-4">
      {/* header with SEO & language flags */}
      <div className="flex justify-between items-center mb-6">
        <Seo
        yoast={{
          title: post.title.rendered,
          description: post.excerpt?.rendered.replace(/<[^>]+>/g, ''),
          og_title: post.title.rendered,
          og_description: post.excerpt?.rendered.replace(/<[^>]+>/g, ''),
          og_image: post.thumbnail ? [{ url: post.thumbnail }] : [],
          og_type: 'article',
          twitter_title: post.title.rendered,
          twitter_description: post.excerpt?.rendered.replace(/<[^>]+>/g, ''),
          robots: 'index,follow'
        }}
        lang={post.lang}
      />
      
      </div>

      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title.rendered}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        {post.title.rendered}
      </h1>

      <div
        className="prose prose-lg dark:prose-dark max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      <Link
        to={`${prefix}/posts`}
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
      >
        ← Back to all posts
      </Link>
    </article>
    </>
  );
}
