import gsap from 'gsap';

export interface HeroRefs {
  container: React.RefObject<HTMLDivElement | null>;
  title: React.RefObject<HTMLHeadingElement | null>;
  image: React.RefObject<HTMLDivElement | null>;
  extraTextContainer: React.RefObject<HTMLDivElement | null>;
  titleImage: React.RefObject<HTMLDivElement | null>;
}

export const initializeHeroAnimations = (refs: HeroRefs) => {
  gsap.set(refs.container.current, { yPercent: 100 });
  gsap.set(refs.titleImage.current, { yPercent: 100, scale: 0.9 });
  gsap.set(refs.image.current, { yPercent: -100 });
  gsap.set(
    [refs.title.current, refs.extraTextContainer.current?.querySelectorAll('.anim-extra-text') || []],
    { yPercent: 100 },
  );
};

export const animateHeroEntry = (refs: HeroRefs) => {
  const timeline = gsap.timeline();

  timeline
    .to(refs.container.current, {
      yPercent: 0,
      scale: 1,
      duration: 1.8,
      ease: 'power4.out',
    })
    .to(
      refs.titleImage.current,
      {
        yPercent: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.inOut',
      },
      '-=1.2',
    )
    .to(
      refs.container.current,
      {
        borderRadius: 0,
        duration: 1,
      },
      '<',
    )
    .to(
      refs.title.current,
      {
        yPercent: 0,
        duration: 0.8,
        ease: 'power3.inOut',
      },
      '<',
    )
    .to(
      refs.image.current,
      {
        yPercent: 0,
        duration: 0.8,
        ease: 'power3.inOut',
      },
      '<',
    )
    .to(
      [refs.extraTextContainer.current?.querySelectorAll('.anim-extra-text') || []],
      {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.inOut',
      },
      '-=0.4',
    );
};
