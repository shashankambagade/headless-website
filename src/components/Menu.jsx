'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { getMenuItems } from '../api/wp';
import { useLocation } from 'react-router-dom';

export default function Menu() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    getMenuItems().then(setMenuItems).catch(console.error);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
  const handleHover = (e) => {
    const targetId = e.target.getAttribute('data-tab');
    const allContents = document.querySelectorAll('.tab-content');
    const allTabs = document.querySelectorAll('.tab-btn');

    allContents.forEach((c) => c.classList.add('hidden'));
    allTabs.forEach((t) => t.classList.remove('text-blue-600'));

    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.classList.remove('hidden');
      e.target.classList.add('text-blue-600');
    }
  };

  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach((tab) => tab.addEventListener('mouseenter', handleHover));

  // Trigger first tab by default
  if (tabs[0]) tabs[0].dispatchEvent(new Event('mouseenter'));

  return () => {
    tabs.forEach((tab) => tab.removeEventListener('mouseenter', handleHover));
  };
}, [menuItems]);


  const isActive = (url) => {
    try {
      const absoluteUrl = new URL(url, window.location.origin);
      return location.pathname === absoluteUrl.pathname;
    } catch {
      return false;
    }
  };

  const topLevelItems = menuItems.filter((item) => item.parent === "0");
  const getChildren = (id) => menuItems.filter((item) => item.parent === String(id));

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/80 shadow' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
        <a href="/" className="text-white font-bold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="#1F2937" />
            <polygon points="60,80 100,60 140,80 100,100" fill="#FBBF24" />
            <polygon points="60,80 60,120 100,100 100,60" fill="#FCD34D" />
            <polygon points="140,80 140,120 100,100 100,60" fill="#FCD34D" />
            <text x="100" y="155" fontFamily="Segoe UI, Arial, sans-serif" fontSize="20" fill="#FFF" textAnchor="middle" fontWeight="600">
              Headless POC
            </text>
          </svg>
        </a>
      </div>
        {/* Mobile Toggle */}
        <div className="flex lg:hidden">
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"> <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:gap-x-10">
          {topLevelItems.map((item) => {
            const children = getChildren(item.ID);
            const hasChildren = children.length > 0;

            return (
              <div key={item.ID} className="relative group">
                <a
                  href={item.url}
                  className={`text-sm font-semibold transition ${
                    isActive(item.url) ? 'text-yellow-300' : 'text-white hover:text-yellow-300'
                  }`}
                >
                  {item.title}
                </a>
                {hasChildren && (
  <div
    className="absolute left-1/2 top-[10px] -translate-x-1/2 mt-4 hidden group-hover:flex w-[900px] bg-white text-black shadow-xl rounded-lg p-6 z-50"
    onMouseEnter={(e) => {
      const firstTab = e.currentTarget.querySelector('.tab-btn');
      if (firstTab) firstTab.dispatchEvent(new Event('mouseenter'));
    }}
  >
    {/* Tabs */}
    <div className="w-1/3 border-r pr-4">
      <ul className="space-y-2">
        {children.map((child) => (
          <li
            key={child.ID}
            className="tab-btn cursor-pointer font-semibold hover:text-blue-600"
            data-tab={`tab-${child.ID}`}
          >
            {child.title}
          </li>
        ))}
      </ul>
    </div>

    {/* Tab Content Area */}
    <div className="w-2/3 pl-6">
      {children.map((child, index) => {
        const grandChildren = getChildren(child.ID);
        return (
          <div
            key={`tab-${child.ID}`}
            className={`tab-content ${index === 0 ? '' : 'hidden'}`}
            id={`tab-${child.ID}`}
          >
            {grandChildren.length ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {grandChildren.map((gc) => (
    <li key={gc.ID} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
      <a href={gc.url} className="block">
        <h4 className="font-semibold text-blue-700 mb-1">{gc.title}</h4>
        {gc.description && (
          <p className="text-sm text-gray-600 line-clamp-3">{gc.description}</p>
        )}
      </a>
    </li>
  ))}
</ul>

            ) : (
              <p className="text-gray-600">No subpages found.</p>
            )}
          </div>
        );
      })}
    </div>
  </div>
)}

              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/contact"
            className="inline-block bg-white text-blue-900 font-semibold px-5 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Get in touch
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="#1F2937" />
                <polygon points="60,80 100,60 140,80 100,100" fill="#FBBF24" />
                <polygon points="60,80 60,120 100,100 100,60" fill="#FCD34D" />
                <polygon points="140,80 140,120 100,100 100,60" fill="#FCD34D" />
                <text x="100" y="155" fontFamily="Segoe UI, Arial, sans-serif" fontSize="20" fill="#FFF" textAnchor="middle" fontWeight="600">
                  Headless POC
                </text>
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 divide-y divide-gray-300/10">
            <div className="space-y-4 py-6">
              {topLevelItems.map((item) => {
                const children = getChildren(item.ID);
                return (
                  <div key={item.ID}>
                    <a href={item.url} className="block font-semibold text-gray-900 mb-2">
                      {item.title}
                    </a>
                    {children.length > 0 && (
                      <div className="ml-4 space-y-1">
                        {children.map((child) => (
                          <a key={child.ID} href={child.url} className="block text-sm text-gray-700 py-1">
                            {child.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="py-6">
              <a
                href="/contact"
                className="block rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-blue-800 text-center"
              >
                Get in touch
              </a>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
