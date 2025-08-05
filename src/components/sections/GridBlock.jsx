// components/GridBlock.jsx
export default function GridBlock({ data }) {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <p className="text-sm text-gray-500">{data.subtitle}</p>
        <h2 className="text-3xl font-bold">{data.main_title}</h2>
        <p className="text-gray-600 mt-2">{data.long_description}</p>
        {data.button_url && (
          <a href={data.button_url} className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded">
            {data.button_name}
          </a>
        )}
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {data.cards?.map((card, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded shadow">
            {card.card_img?.url && <img src={card.card_img.url} alt="" className="mb-4 w-full h-40 object-cover rounded" />}
            <h3 className="font-bold text-lg mb-2">{card.card_title}</h3>
            <p>{card.card_description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
