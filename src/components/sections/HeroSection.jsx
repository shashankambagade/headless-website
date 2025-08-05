// components/HeroSection.jsx

export default function HeroSection({ data }) {
  const { hero_image, heading, short_description, cta_button, cta_url } = data;

  return (
    <section className="relative w-full min-h-[100vh] flex items-center justify-center lg:px-20 py-20 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero_image?.url || ''})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-5 gap-8 items-center px-6">
        {/* Left column: 60% (3/5) */}
        <div className="col-span-5 md:col-span-3">
          <h1 className="text-4xl md:text-6xl font-serif font-normal leading-tight">
           {heading}
          </h1>
          <div className="mt-4 text-lg md:text-xl font-light max-w-2xl prose prose-invert"
              dangerouslySetInnerHTML={{ __html: short_description }} />

          {cta_url && (
            <a
              href={cta_url}
              className="mt-8 inline-flex items-center gap-2 border border-white text-white px-6 py-3 rounded transition hover:bg-white hover:text-black text-sm font-medium"
            >
              {cta_button}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </div>

        {/* Right column: 40% (2/5) */}
        <div className="col-span-5 md:col-span-2"></div>
      </div>
    </section>
  );
}
