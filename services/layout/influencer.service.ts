import gsap from 'gsap';

export const influencerCards = [
  {
    name: 'Mike',
    role: 'Fashion Creator',
    quote: 'Sharp design and premium build. These shades instantly elevate every shoot I’m on.',
  },
  {
    name: 'Jenna',
    role: 'Lifestyle Influencer',
    quote: 'Featherlight and super photogenic. They add an instant premium vibe to all my content.',
  },
  {
    name: 'Sarah',
    role: 'Art Director',
    quote:
      'The lens color calibration is spot-on. Everything looks crisp without oversaturating tones.',
  },
  {
    name: 'Ravi',
    role: 'Travel Photographer',
    quote: 'Comfortable, durable, and stylish. They perform flawlessly in harsh sunlight.',
  },
  {
    name: 'Lucas',
    role: 'Streetwear Curator',
    quote: 'Modern without trying too hard. They fit perfectly with my minimalist outfits.',
  },
  {
    name: 'Kim',
    role: 'Outdoor Athlete',
    quote: 'Lightweight, stable, and zero distracting glare. Ideal for my long sunny runs.',
  },
];

export interface InfluencerRefs {
  container: React.RefObject<HTMLDivElement | null>;
  title: {
    one: React.RefObject<HTMLDivElement | null>;
    two: React.RefObject<HTMLDivElement | null>;
  };
  cardsContainer: React.RefObject<HTMLDivElement | null>;
  cards: React.RefObject<HTMLDivElement | null>[];
}

const getCards = (refs: InfluencerRefs): HTMLDivElement[] =>
  Object.values(refs.cards)
    .map((card) => card.current)
    .filter((card): card is HTMLDivElement => card !== null);

export const animateInfluencerEntry = (refs: InfluencerRefs) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: refs.container.current,
        start: 'top 70%',
      },
    })
    .to([refs.title.one.current, refs.title.two.current], {
      yPercent: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power4.out',
    })
    .from(
      getCards(refs),
      {
        opacity: 0,
        scale: 0.9,
        yPercent: 25,
        stagger: 0.02,
        duration: 0.8,
        ease: 'power4.out',
      },
      '-=0.4',
    );
};

export const animateInfluencerAnimations = (refs: InfluencerRefs) => {
  gsap.set([refs.title.one.current, refs.title.two.current], { yPercent: 100 });
  const cards = getCards(refs);

  cards.forEach((cardRef) => {
    const card = cardRef;
    if (!card) return;
    gsap.set(card, {
      xPercent: (Math.random() - 0.5) * 10,
      yPercent: (Math.random() - 0.5) * 10,
      rotation: (Math.random() - 0.5) * 20,
    });
  });
};

let currentPortion = 0;

const newPortion = (i: number, cardContent: HTMLDivElement[]) => {
  cardContent.forEach((content, index) => {
    if (!content) return;

    if (index !== i) {
      gsap.to(content, {
        xPercent: 80 / (index - i),
        ease: 'elastic.out(1, 0.75)',
        duration: 0.8,
      });
    } else {
      gsap.to(content, {
        xPercent: 0,
        ease: 'elastic.out(1, 0.75)',
        duration: 0.8,
      });
    }
  });
};

export const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, refs: InfluencerRefs) => {
  const container = refs.cardsContainer.current;
  if (!container) return;

  const containerW = container.clientWidth;
  if (containerW === 0) return;

  const cards = Object.values(refs.cards);
  const cardContent = getCards(refs);
  const cardsLength = cards.length;

  const mouseX = e.clientX - container.getBoundingClientRect().left;
  const percentage = mouseX / containerW;
  const activePortion = Math.ceil(percentage * cardsLength);

  if (currentPortion !== activePortion && activePortion > 0 && activePortion <= cardsLength) {
    currentPortion = activePortion;
    newPortion(currentPortion - 1, cardContent);
  }
};

export const handleMouseLeave = (refs: InfluencerRefs) => {
  const cardContent = getCards(refs);
  currentPortion = 0;
  gsap.to(cardContent, {
    xPercent: 0,
    ease: 'elastic.out(1, 0.75)',
    duration: 0.8,
  });
};
