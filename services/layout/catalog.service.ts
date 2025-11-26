import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    price: 420,
  },
  {
    id: 3,
    img: '/images/catalog/sunglass3.webp',
    title: 'Aviator Oversized Vision',
    price: 420,
  },
  {
    id: 4,
    img: '/images/catalog/sunglass4.webp',
    title: 'Techno Vision',
    price: 420,
  },
  {
    id: 5,
    img: '/images/catalog/sunglass5.webp',
    title: 'Parisian Vision',
    price: 420,
  },
  {
    id: 6,
    img: '/images/catalog/sunglass6.webp',
    title: 'Matrix Vision',
    price: 420,
  },
];

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
  cards: {
    [key: `card${number}`]: React.RefObject<HTMLDivElement | null>;
  };
}

export const initializeCatalogAnimations = (refs: CatalogRefs) => {
  gsap.set(refs.cardsContainer.current, {
    yPercent: '5',
    opacity: 0,
  });
};

export const animateCatalogEntry = (refs: CatalogRefs) => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: refs.sectionContainer.current,
      start: 'top 60%',
      end: 'bottom bottom',
    },
  });

  timeline.to(refs.cardsContainer.current, {
    yPercent: 0,
    opacity: 1,
    duration: 1,
    ease: 'power4.out',
  });
};

export const animateScrollHorizontal = (refs: CatalogRefs) => {
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
