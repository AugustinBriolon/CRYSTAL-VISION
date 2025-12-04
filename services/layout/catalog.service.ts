import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

export interface CatalogItem {
  id: number;
  img: string;
  title: string;
  price: number;
}

export interface CatalogRefs {
  sectionContainer: React.RefObject<HTMLDivElement | null>;
  divContainer: React.RefObject<HTMLDivElement | null>;
  cardsContainer: React.RefObject<HTMLDivElement | null>;
  cards: React.RefObject<HTMLDivElement | null>[];
}

export const catalogItems: CatalogItem[] = [
  {
    id: 1,
    img: '/images/catalog/sunglass1.webp',
    title: 'Red Vision',
    price: 420,
  },
  {
    id: 2,
    img: '/images/catalog/sunglass2.webp',
    title: 'Futuristic Vision',
    price: 540,
  },
  {
    id: 3,
    img: '/images/catalog/sunglass3.webp',
    title: 'Aviator Oversized Vision',
    price: 310,
  },
  {
    id: 4,
    img: '/images/catalog/sunglass4.webp',
    title: 'Techno Vision',
    price: 650,
  },
  {
    id: 5,
    img: '/images/catalog/sunglass5.webp',
    title: 'Parisian Vision',
    price: 380,
  },
  {
    id: 6,
    img: '/images/catalog/sunglass6.webp',
    title: 'Matrix Vision',
    price: 290,
  },
];

const getCards = (refs: CatalogRefs): HTMLDivElement[] =>
  Object.values(refs.cards)
    .map((card) => card.current)
    .filter((card): card is HTMLDivElement => card !== null);

const initializeCatalogAnimations = (refs: CatalogRefs, performanceLevel: PERFORMANCE_LEVEL) => {
  const cards = getCards(refs);
  if (cards.length === 0) return;

  cards.forEach((card) => {
    gsap.set(card, {
      opacity: 0,
      ...(performanceLevel === PERFORMANCE_LEVEL.HIGH && {
        filter: 'blur(10px)',
      }),
      yPercent: 25,
    });
  });
};

const animateCatalogEntry = (refs: CatalogRefs, performanceLevel: PERFORMANCE_LEVEL) => {
  const cards = getCards(refs);
  if (cards.length === 0) return;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: refs.cardsContainer.current,
      start: 'top 60%',
      once: true,
    },
  });

  timeline.to(
    cards,
    {
      opacity: 1,
      ...(performanceLevel === PERFORMANCE_LEVEL.HIGH && {
        filter: 'blur(0px)',
      }),
      yPercent: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: 'power4.out',
    },
    '-=0.2',
  );
};

const animateScrollHorizontal = (refs: CatalogRefs) => {
  if (!refs.divContainer.current || !refs.cardsContainer.current) return;

  const slider = refs.cardsContainer.current;
  const container = refs.divContainer.current;

  if (!slider || !container) return;

  const calculateTotalWidth = () =>
    Object.values(refs.cards).reduce((totalWidth, cardRef) => {
      if (!cardRef.current) return totalWidth;
      return totalWidth + cardRef.current.getBoundingClientRect().width;
    }, 0);

  const getScrollAmount = () => {
    const sliderWidth = slider.scrollWidth || calculateTotalWidth();
    const { offsetWidth: containerWidth } = container;
    return sliderWidth > containerWidth ? -(sliderWidth - containerWidth) : 0;
  };

  gsap.to(slider, {
    x: () => getScrollAmount(),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top 10%',
      end: () => `+=${Math.abs(getScrollAmount())}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });
};

export const catalogService = {
  initializeCatalogAnimations,
  animateCatalogEntry,
  animateScrollHorizontal,
};
