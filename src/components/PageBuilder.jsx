// /src/components/PageBuilder.jsx
import HeroSection from './sections/HeroSection';
import ContentBlock from './sections/ContentBlock';
import WhyChoose from './sections/WhyChoose';
import CTABanner from './sections/CTABanner';
import GridBlock from './sections/GridBlock';
import SliderSection from './sections/SliderSection';
import AccordionSection from './sections/AccordionSection';
import CounterSection from './sections/CounterSection';


export default function PageBuilder({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const layout = block.acf_fc_layout;

        switch (layout) {
          case 'hero_section':
            return <HeroSection key={index} data={block} />;

          case 'after_hero_section':
            return <ContentBlock key={index} data={block} />;

          case 'why_choose':
            return <WhyChoose key={index} data={block} />;

          case 'cta_banner':
            return <CTABanner key={index} data={block} />;

          case 'grid_block':
            return <GridBlock key={index} data={block} />;

          case 'slider_section':
            return <SliderSection key={index} data={block} />;

          case 'accordion_section':
            return <AccordionSection key={index} data={block} />;

          case 'counter_section':
            return <CounterSection key={index} data={block} />;

        
          default:
            console.warn(`⚠️ Unhandled layout: ${layout}`);
            return null;
        }
      })}
    </>
  );
}
