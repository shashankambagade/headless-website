// src/router/index.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Home from '../pages/Home';
import Page from '../pages/Page';
import SinglePost from '../pages/SinglePost';
import PostList from '../pages/Post';
import PostListPagination from '../pages/Postpagination';
import Layout from '../components/Layout'; // ✅ Add Layout here
import ContactUs from '../pages/ContactUs';
import ThankYou from '../pages/ThankYou';
import RedirectManager from '../components/RedirectManager'; // ✅ Import RedirectManager

export default function Router() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Layout> {/* ✅ Moved inside <BrowserRouter> */}
          <RedirectManager />
          <Routes>
            {/* Language-prefixed routes FIRST */}
             {/* Multilingual: Catch only non-English */}
              <Route path="/:lang/post/:slug" element={<SinglePost />} />
              <Route path="/:lang/:slug" element={<Page />} />
              <Route path="/:lang" element={<Home />} />
              <Route path="/contactpage" element={<ContactUs /> } />
              <Route path="/thank-you" element={<ThankYou />} />

              {/* English (no lang param) */}
              <Route path="/post/:slug" element={<SinglePost />} />
              <Route path="/:slug" element={<Page />} />
              <Route path="/" element={<Home />} />

            {/* Other */}
            <Route path="/posts" element={<PostList />} />
            <Route path="/postslist" element={<PostListPagination />} />
          </Routes>

        </Layout>
      </HelmetProvider>
    </BrowserRouter>
  );
}
