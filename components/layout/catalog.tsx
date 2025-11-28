import Section from '@/components/shared/sections';
import CatalogCard from '../ui/catalog-card';
import {
  animateCatalogEntry,
  animateScrollHorizontal,
  catalogItems,
  CatalogRefs,
  initializeCatalogAnimations,
} from '@/services/layout/catalog.service';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

export default function Catalog() {
  const refs: CatalogRefs = {
    sectionContainer: useRef<HTMLDivElement>(null),
    divContainer: useRef<HTMLDivElement>(null),
    cardsContainer: useRef<HTMLDivElement>(null),
    cards: Object.fromEntries(
      catalogItems.map((item) => [`card${item.id}`, useRef<HTMLDivElement>(null)]),
    ),
  };

  useGSAP(() => {
    initializeCatalogAnimations(refs);
    animateCatalogEntry(refs);
    animateScrollHorizontal(refs);
  }, []);

  return (
    <Section ref={refs.sectionContainer} className="h-auto! py-8" id="catalog">
      <div ref={refs.divContainer} className="relative h-full w-full overflow-hidden">
        <div ref={refs.cardsContainer} className="flex h-full items-start justify-start gap-0">
          {catalogItems.map((item) => (
            <CatalogCard
              key={item.id}
              ref={refs.cards[`card${item.id}` as keyof typeof refs.cards]}
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
