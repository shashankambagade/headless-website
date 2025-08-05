// components/CounterSection.jsx
import CountUp from '../../utils/Animations/CountUp';

export default function CounterSection({ data }) {
  return (
    <section
      className="relative w-full min-h-[100vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${data.bg_image?.url || ''})` }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-5 gap-2 items-center text-white">
        {/* Left spacer column (image side) */}
        <div className="hidden md:block md:col-span-3"></div>

        {/* Right content column */}
        <div className="md:col-span-2">
          {data.sub_heading && (
            <p className="text-sm font-semibold uppercase text-yellow-500 mb-2">
              {data.sub_heading}
            </p>
          )}
          {data.heading && (
            <h2 className="text-4xl md:text-4xl font-serif font-normal leading-tight mb-3">
              {data.heading}
            </h2>
          )}
          {data.short_description && (
            <div
              className="text-white text-base md:text-lg font-light max-w-2xl mb-10"
              dangerouslySetInnerHTML={{ __html: data.short_description }}
            />
          )}

          {/* Counters */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {data.cta_button?.map((counter, idx) => (
              <div key={idx} className="text-left">
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  <CountUp to={parseInt(counter.counter_number, 10)} />+
                </div>
                <p className="text-sm text-white/90">{counter.counter_text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
