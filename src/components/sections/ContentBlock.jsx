// components/ContentBlock.jsx

export default function ContentBlock({ data }) {
  return (
    <section className="py-20 bg-gray-100">
      {data?.text_img_row?.map((row, index) => (
        <div
          key={index}
          className={`max-w-7xl px-6 mx-auto grid md:grid-cols-2 gap-10 items-center ${
            index % 2 !== 0 ? 'md:flex-row-reverse' : ''
          }`}
        >
          {/* Left Text Block */}
          <div>
            {row.sub_heading && (
              <p className="text-sm font-semibold uppercase text-yellow-500 mb-2">
                {row.sub_heading}
              </p>
            )}
            {row.heading && (
            <h2 className="mt-2 text-3xl md:text-4xl font-normal text-gray-900 mb-3">
                {row.heading}
              </h2>
            )}
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: row.left_text }}
            />
          </div>

          {/* Right Image Block */}
          {row.right_image?.url && (
            <div>
              <img
                src={row.right_image.url}
                alt={row.right_image.alt || ''}
                className=" shadow-lg w-full object-cover"
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
