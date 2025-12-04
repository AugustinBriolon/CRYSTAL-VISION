import Section from '@/components/shared/sections';
import { usePerformance } from '@/providers/performance.provider';
import { catalogItems, CatalogRefs, catalogService } from '@/services/layout/catalog.service';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import CatalogCard from '../ui/catalog-card';

export default function Catalog() {
  const { performanceLevel } = usePerformance();
  const refs: CatalogRefs = {
    sectionContainer: useRef<HTMLDivElement>(null),
    divContainer: useRef<HTMLDivElement>(null),
    cardsContainer: useRef<HTMLDivElement>(null),
    cards: Array.from({ length: catalogItems.length }, () => useRef<HTMLDivElement>(null)),
  };

  useGSAP(() => {
    catalogService.initializeCatalogAnimations(refs, performanceLevel);
    catalogService.animateCatalogEntry(refs, performanceLevel);
    catalogService.animateScrollHorizontal(refs);
  }, []);

  return (
    <Section ref={refs.sectionContainer} className="h-auto! py-8" id="catalog">
      <div
        ref={refs.divContainer}
        className="before-after-blur relative h-full w-full overflow-hidden"
      >
        <div ref={refs.cardsContainer} className="flex h-fit items-start justify-start gap-0">
          {catalogItems.map((item, index) => (
            <CatalogCard
              key={item.id}
              ref={refs.cards[index]}
              img={item.img}
              price={item.price}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
