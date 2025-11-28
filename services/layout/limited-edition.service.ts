import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';

export interface LimitedEditionRefs {
  sectionContainer: React.RefObject<HTMLDivElement | null>;
  divContainer: React.RefObject<HTMLDivElement | null>;
  title: React.RefObject<HTMLHeadingElement | null>;
  cards: {
    card1: {
      image: React.RefObject<HTMLImageElement | null>;
      description: React.RefObject<HTMLParagraphElement | null>;
    };
    card2: {
      image: React.RefObject<HTMLImageElement | null>;
      description: React.RefObject<HTMLParagraphElement | null>;
    };
    card3: {
      image: React.RefObject<HTMLImageElement | null>;
      description: React.RefObject<HTMLParagraphElement | null>;
    };
  };
}

export const animateLimitedEditionAnimations = (refs: LimitedEditionRefs) => {
  const splitTitle = SplitText.create(refs.title.current, {
    type: 'lines',
    mask: 'lines',
  });
  const splitCardDescription1 = SplitText.create(refs.cards.card1.description.current, {
    type: 'words, chars',
    mask: 'words',
  });
  const splitCardDescription2 = SplitText.create(refs.cards.card2.description.current, {
    type: 'words, chars',
    mask: 'words',
  });
  const splitCardDescription3 = SplitText.create(refs.cards.card3.description.current, {
    type: 'words, chars',
    mask: 'words',
  });

  gsap.set(refs.divContainer.current, {
    scaleX: 0.8,
    yPercent: 20,
  });
  gsap.set(splitTitle.lines, {
    yPercent: 100,
  });
  gsap.set(refs.cards.card1.image.current, {
    opacity: 0,
    filter: 'blur(10px)',
  });
  gsap.set(splitCardDescription1.words, {
    yPercent: 100,
  });
  gsap.set(refs.cards.card2.image.current, {
    opacity: 0,
    filter: 'blur(10px)',
  });
  gsap.set(splitCardDescription2.words, {
    yPercent: 100,
  });
  gsap.set(refs.cards.card3.image.current, {
    opacity: 0,
    filter: 'blur(10px)',
  });
  gsap.set(splitCardDescription3.words, {
    yPercent: 100,
  });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: refs.sectionContainer.current,
        start: 'top 90%',
      },
    })
    .to(refs.divContainer.current, {
      scaleX: 1,
      yPercent: 0,
      duration: 1,
      ease: 'power4.out',
    });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: refs.sectionContainer.current,
        start: 'top 60%',
      },
    })
    .to(splitTitle.lines, {
      yPercent: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: 'power3.out',
    });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: refs.cards.card1.image.current,
        start: 'top 100%',
      },
    })
    .to(refs.cards.card1.image.current, {
      filter: 'blur(0px)',
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    })
    .to(
      splitCardDescription1.words,
      {
        yPercent: 0,
        duration: 0.2,
        stagger: 0.001,
        ease: 'power1.out',
      },
      '-=0.4',
    );

  gsap
    .timeline({
      scrollTrigger: {
        trigger: refs.cards.card2.image.current,
        start: 'top 100%',
      },
    })
    .to(refs.cards.card2.image.current, {
      filter: 'blur(0px)',
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    })
    .to(
      splitCardDescription2.words,
      {
        yPercent: 0,
        duration: 0.2,
        stagger: 0.001,
        ease: 'power1.out',
      },
      '-=0.4',
    );

  gsap
    .timeline({
      scrollTrigger: {
        trigger: refs.cards.card3.image.current,
        start: 'top 100%',
      },
    })
    .to(refs.cards.card3.image.current, {
      filter: 'blur(0px)',
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    })
    .to(
      splitCardDescription3.words,
      {
        yPercent: 0,
        duration: 0.2,
        stagger: 0.001,
        ease: 'power1.out',
      },
      '-=0.4',
    );
};
