// components/CTABanner.jsx
export default function CTABanner({ data }) {
  return (
    <section
      className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 bg-cover bg-center text-white text-left"
      style={{ backgroundImage: `url(${data.bg_image?.url || ''})` }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-12 items-center">
        <div><h2 className="text-5xl leading-snug font-normal">{data.heading}</h2>
        <div
          className="prose text-white mt-4 max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.short_description }}
        />
        {data.cta_url && (
          <a
            href={data.cta_url}
            className="inline-block border border-white mt-6 px-5 py-2 rounded hover:bg-white hover:text-blue-900 transition"
          >
            {data.cta_button}
          </a>
        )}</div>
        <div></div>
        
      </div>
    </section>
  );
}
