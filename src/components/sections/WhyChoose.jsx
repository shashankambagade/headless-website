// components/WhyChoose.jsx
export default function WhyChoose({ data }) {
  return (
    <section className="py-20 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {data.why_choose_section?.map((section, index) => (
          <div key={index} className="md:col-span-2 grid md:grid-cols-2 gap-12">
            {/* Left Content */}
            <div>
              <span className="text-sm font-semibold tracking-wide uppercase text-yellow-500">
                {section.sub_heading}
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-normal text-gray-900">
                {section.heading}
              </h2>
              <div
                className="mt-4 text-gray-700 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: section.left_text }}
              />
              {section.cta_button?.url && (
                <a
                  href={section.cta_button.url}
                  target={section.cta_button.target || '_self'}
                  className="mt-6 inline-flex items-center gap-2 border border-gray-800 px-5 py-2 text-sm font-medium rounded hover:bg-gray-100 transition"
                >
                  {section.cta_button.title}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
            </div>

            {/* Right Icon Boxes */}
            <div className="grid sm:grid-cols-2 gap-6">
              {section.icon_box?.map((box, idx) => (
                <div
                  key={idx}
                  className="bg-[#003B73] text-white p-6 flex flex-col justify-between h-full"
                >
                  {box.select_icon?.url && (
                    <img
                      src={box.select_icon.url}
                      alt={box.select_icon.alt || ''}
                      className="w-10 h-10 mb-4"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{box.heading}</h3>
                    <p className="text-sm">{box.short_description}</p>
                  </div>
                  {box.cta_link?.url && (
                    <a
                      href={box.cta_link.url}
                      className="mt-4 inline-block text-yellow-400 text-sm underline"
                      target={box.cta_link.target || '_self'}
                    >
                      {box.cta_link.title}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
