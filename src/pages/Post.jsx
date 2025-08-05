// src/pages/PostList.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostsWithThumbs } from '../api/wp';

const PER_PAGE = 3;

export default function PostList() {
  const { lang } = useParams();                       // 'sv', 'no' or undefined
  const [postsWithThumbs, setPostsWithThumbs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // fetch posts for the given page & language
  const loadPosts = async (pageNum) => {
    setLoading(true);
    try {
      const { posts, totalPages: tp } = await getPostsWithThumbs(
        pageNum,
        PER_PAGE,
        lang
      );
      setTotalPages(tp);
      setPostsWithThumbs((prev) => {
        // dedupe by post.id
        const map = new Map(prev.map((item) => [item.post.id, item]));
        posts.forEach((item) => map.set(item.post.id, item));
        return Array.from(map.values());
      });
    } catch (e) {
      console.error('Error loading posts:', e);
    } finally {
      setLoading(false);
    }
  };

  // initial load and whenever language changes
  useEffect(() => {
    setPostsWithThumbs([]);
    setPage(1);
    loadPosts(1);
  }, [lang]);

  const loadMore = () => {
    if (page < totalPages) {
      const next = page + 1;
      setPage(next);
      loadPosts(next);
    }
  };

  // prefix links with /sv or /no when lang is set
  const prefix = lang && lang !== 'en' ? `/${lang}` : '';

  return (
    <div className="">
       <section className="relative w-full min-h-[5vh] flex flex-col items-center justify-center bg-black text-center px-6 lg:px-16 py-16 md:py-32"> </section>
         <h2 className='text-5xl text-center mt-20'>Post Pagination</h2>
       <div className="max-w-screen-xl mx-auto p-4">
      <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsWithThumbs.map(({ post, thumbnail }) => (
          <article
            key={post.id}
            className="bg-white border rounded-lg shadow-sm dark:bg-gray-800"
          >
            <Link to={`${prefix}/post/${post.slug}`}>
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={thumbnail ?? '/placeholder.jpg'}
                alt={post.title.rendered}
              />
            </Link>
            <div className="p-5">
              <Link to={`${prefix}/post/${post.slug}`}>
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {post.title.rendered}
                </h2>
              </Link>
              <div
                className="mb-3 text-gray-700 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered }}
              />
              <Link
                to={`${prefix}/post/${post.slug}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded hover:bg-blue-800 transition"
              >
                Read more
                <svg
                  className="w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {page < totalPages && (
        <div className="text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Load More'}
          </button>
        </div>
      )}
    </div>
    </div>
  );
}
