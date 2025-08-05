import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function SliderSection({ data }) {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-left"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold uppercase text-yellow-500 mb-2">
            {data.sub_heading}
          </p>
          <h2 className="text-4xl md:text-4xl font-serif font-normal leading-tight mb-3">
            {data.heading}
          </h2>
        </motion.div>

        {/* Description & CTA */}
        <div
          dangerouslySetInnerHTML={{ __html: data.short_description }}
          className="text-base text-gray-700 mb-6 max-w-2xl"
        />
        {data.cta_url && (
          <a
            href={data.cta_url}
            className="mb-12 inline-flex items-center gap-2 border border-gray-800 px-5 py-2 text-sm font-medium rounded hover:bg-gray-100 transition"
          >
            {data.cta_button}
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
      </div>

      {/* Full-width Swiper */}
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2.5 },
          1280: { slidesPerView: 2.5 },
        }}
        loop
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="px-6"
      >
        {data.slider?.map((item, idx) => (
          <SwiperSlide key={idx} className="h-full">
            <div className="h-full flex flex-col bg-[#003B73] text-white shadow-md  overflow-hidden">
              <div className="grid grid-cols-2 h-full">
                {/* Image Section */}
                <div className="relative h-full">
                  {item.image?.url && (
                    <img
                      src={item.image.url}
                      alt={item.image.alt || ''}
                      className="w-full h-[325px] object-cover"
                    />
                  )}
                </div>

                {/* Text Section */}
                <div className="flex flex-col justify-between p-6 h-full">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {item.heading}
                    </h3>
                    <motion.p
                      className="text-sm leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      {item.short_description_}
                    </motion.p>
                  </div>
                  {item.url && (
                    <a
                      href={item.url}
                      className="mt-4 inline-flex items-center justify-center w-10 h-10 border border-white rounded-full text-white hover:bg-white hover:text-black transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}
