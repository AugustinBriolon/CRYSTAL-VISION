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

export const animateInfluencerAnimations = (refs: InfluencerRefs) => {
  gsap.set([refs.title.one.current, refs.title.two.current], { yPercent: 100 });
  const cards = Object.values(refs.cards);

  cards.forEach((cardRef) => {
    const card = cardRef.current;
    if (!card) return;
    gsap.set(card, {
      xPercent: (Math.random() - 0.5) * 10,
      yPercent: (Math.random() - 0.5) * 10,
      rotation: (Math.random() - 0.5) * 20,
    });
  });
};

let currentPortion = 0;

export const zIndexes = [3, 2, 7, 1, 4, 5, 8, 6];

export const initializeCardsPosition = (refs: InfluencerRefs) => {
  const cards = Object.values(refs.cards);

  cards.forEach((cardRef) => {
    const card = cardRef.current;
    if (!card) return;
    gsap.set(card, {
      xPercent: (Math.random() - 0.5) * 10,
      yPercent: (Math.random() - 0.5) * 10,
      rotation: (Math.random() - 0.5) * 20,
    });
  });
};

const resetPortion = (index: number, cards: React.RefObject<HTMLDivElement | null>[]) => {
  const card = cards[index];
  if (!card) return;

  gsap.to(card, {
    xPercent: (Math.random() - 0.5) * 10,
    yPercent: (Math.random() - 0.5) * 10,
    rotation: (Math.random() - 0.5) * 20,
    scale: 1,
    duration: 0.8,
    ease: 'elastic.out(1, 0.75)',
  });
};

const newPortion = (
  i: number,
  cards: React.RefObject<HTMLDivElement | null>[],
  cardContent: (HTMLDivElement | null)[],
) => {
  const activeCard = cards[i];
  if (!activeCard) return;

  gsap.to(activeCard, {
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    duration: 0.8,
    scale: 1.1,
    ease: 'elastic.out(1, 0.75)',
  });

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
  const cardContent = Object.values(refs.cards).map((cardRef) => cardRef.current);
  const cardsLength = cards.length;

  const mouseX = e.clientX - container.getBoundingClientRect().left;
  const percentage = mouseX / containerW;
  const activePortion = Math.ceil(percentage * cardsLength);

  if (currentPortion !== activePortion && activePortion > 0 && activePortion <= cardsLength) {
    if (currentPortion !== 0) {
      resetPortion(currentPortion - 1, Object.values(refs.cards));
    }
    currentPortion = activePortion;
    newPortion(currentPortion - 1, Object.values(refs.cards), cardContent);
  }
};

export const handleMouseLeave = (refs: InfluencerRefs) => {
  const cardContent = Object.values(refs.cards).map((cardRef) => cardRef.current);

  if (currentPortion !== 0) {
    resetPortion(currentPortion - 1, Object.values(refs.cards));
  }

  currentPortion = 0;

  gsap.to(cardContent.filter(Boolean), {
    xPercent: 0,
    ease: 'elastic.out(1, 0.75)',
    duration: 0.8,
  });
};

export const resetCurrentPortion = () => {
  currentPortion = 0;
};

export const animateInfluencerEntry = (refs: InfluencerRefs) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: refs.container.current,
        start: 'top 75%',
      },
    })
    .to([refs.title.one.current, refs.title.two.current], {
      yPercent: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power4.out',
    });
};
