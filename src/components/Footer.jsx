// components/Footer.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Footer() {
  const [footerMenu, setFooterMenu] = useState([]);

  useEffect(() => {
    axios
      .get('https://gomowebb.com/headless-poc/wp-json/myroutes/menu?id=4') 
      .then((res) => setFooterMenu(res.data || []))
      .catch((err) => console.error('Footer menu load error:', err));
  }, []);

  return (
    <footer className="bg-[#0b3557] text-white px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo and Tagline */}
        <div className="col-span-1">
          <img src="/footer-FKAB-logo.png" alt="FKAB Logo" className="h-10 mb-4" />
          <p className="mb-6 leading-relaxed">
            Delivering sustainable marine design solutions with innovation and excellence since 1961.
          </p>
          <a
            href="/contact"
            className="inline-block border border-white px-5 py-2 rounded hover:bg-white hover:text-blue-900 transition"
          >
            CONTACT US ↗
          </a>
        </div>

        {/* Globe Image */}
        <div className="col-span-1 flex justify-center items-start">
          <img
            src="/FKAB-marin-design-white-logo.png"
            alt="Global presence"
            className="h-32 w-32 object-contain"
          />
        </div>

        {/* Important Links */}
        <div className="col-span-1">
          <h4 className="font-semibold text-lg mb-4">Important Links</h4>
          <ul className="space-y-2">
            {footerMenu.map((item) => {
              const hasUrl = item.url && item.url.trim() !== '';
              return (
                <li key={item.ID}>
                  {hasUrl ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">
                      {item.title}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="col-span-1">
          <h4 className="font-semibold text-lg mb-4">Contact</h4>
          <address className="not-italic text-sm leading-relaxed space-y-2">
            <p>FKAB Marine Design</p>
            <p>Gustaf Mattssons väg 2,<br />451 50 Uddevalla, Sweden</p>
            <p>+46 522 981 00</p>
            <p>
              <a href="mailto:info@fkab.se" className="hover:underline">
                info@fkab.se
              </a>
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-disabled="true"
                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-white hover:text-blue-900 transition"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-disabled="true"
                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-white hover:text-blue-900 transition"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </address>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto border-t border-white/20 mt-12 pt-6 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} | All Rights Reserved</p>
        <div className="flex gap-6">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            aria-disabled="true"
            className="hover:underline"
          >
            Privacy and Integrity Policy
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            aria-disabled="true"
            className="hover:underline"
          >
            Cookies Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
