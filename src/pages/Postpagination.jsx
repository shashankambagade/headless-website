// src/pages/PostListPagination.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostsWithThumbs } from '../api/wp';

const PER_PAGE = 3;

export default function PostListPagination() {
  const { lang } = useParams();
  const [postsWithThumbs, setPostsWithThumbs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const prefix = lang && lang !== 'en' ? `/${lang}` : '';

  const loadPosts = async (pageNum) => {
    setLoading(true);
    try {
      const { posts, totalPages: tp } = await getPostsWithThumbs(
        pageNum,
        PER_PAGE,
        lang
      );
      setPostsWithThumbs(posts);
      setTotalPages(tp);
      setPage(pageNum);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(1);
  }, [lang]);

  const goToPage = (p) => {
    if (p >= 1 && p <= totalPages && p !== page) {
      loadPosts(p);
    }
  };

  // render either skeleton cards or real posts
  const cards = loading && postsWithThumbs.length === 0
    ? Array.from({ length: PER_PAGE }, (_, i) => (
        <div key={i} className="bg-white rounded-lg shadow animate-pulse">
          <div className="h-48 bg-gray-200 rounded-t-lg"></div>
          <div className="p-5 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ))
    : postsWithThumbs.map(({ post, thumbnail }) => (
        <article
          key={post.id}
          className="bg-white border rounded-lg shadow-sm"
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
              <h2 className="mb-2 text-2xl font-bold">
                {post.title.rendered}
              </h2>
            </Link>
            <div
              className="mb-3 text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered }}
            />
            <Link
              to={`${prefix}/post/${post.slug}`}
              className="inline-block px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded hover:bg-blue-800 transition"
            >
              Read more →
            </Link>
          </div>
        </article>
      ));

  return (<>

       <section className="relative w-full min-h-[3vh] flex flex-col items-center justify-center bg-black text-center px-6 lg:px-16 py-16 md:py-32"> </section>
      <h2 className='text-5xl text-center mt-20'>Post Pagination</h2>

    <div className="max-w-screen-xl mx-auto p-4">
      <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards}
      </div>

      <nav className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1 || loading}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            disabled={p === page || loading}
            className={`
              px-3 py-1 border rounded
              ${p === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
            `}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages || loading}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </nav>
        
    </div>
    </>
  );
}
