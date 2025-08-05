import AccordionItem from './partials/AccordionItem';

export default function AccordionSection({ data }) {
  const main = data.accordion_section?.[0];

  return (
    <section className="bg-[#f8f8f8] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Full-width Top Content */}
        {main && (
          <>
            {main.sub_heading && (
              <p className="text-sm font-semibold uppercase text-yellow-500 mb-2">
                {main.sub_heading}
              </p>
            )}
            {main.heading && (
              <h2 className="mt-2 text-3xl md:text-4xl font-normal text-gray-900 mb-3">
                {main.heading}
              </h2>
            )}
            <div
              className="text-base text-gray-700 mb-6"
              dangerouslySetInnerHTML={{
                __html: main.left_text,
              }}
            />
            {main.cta_button?.url && (
              <a
                href={main.cta_button.url}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded hover:bg-gray-100 transition mb-10"
              >
                {main.cta_button.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            )}
          </>
        )}

        {/* Two-column Grid: Image + Accordions */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Image */}
          {main?.section_image?.url && (
            <img
              src={main.section_image.url}
              alt={main.section_image.alt || ''}
              className="w-full object-cover rounded"
            />
          )}

          {/* Right: Accordions */}
          <div>
            {data.accordion_section?.map((section, idx) => (
              <div key={idx} className=" pb-6 mb-6">
               
                <div className="space-y-4">
                  {section.accordion_block?.map((item, i) => (
                    <AccordionItem key={i} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
