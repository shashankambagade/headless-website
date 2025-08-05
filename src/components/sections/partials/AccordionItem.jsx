import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccordionItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 pb-4">
      {/* Accordion header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left text-lg font-medium text-gray-900 transition"
      >
        <span>{item.heading}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${open ? 'rotate-180' : ''
            }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Accordion content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="mt-4 text-sm text-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.short_description && (
              <p className="mb-2">{item.short_description}</p>
            )}
            {item.cta_link && (
            <a
              href={item.cta_link}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.cta_text}
            </a>
          )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
