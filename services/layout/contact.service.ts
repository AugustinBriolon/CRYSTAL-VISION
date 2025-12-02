import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';

export interface ContactRefs {
  sectionContainer: React.RefObject<HTMLDivElement | null>;
  title: React.RefObject<HTMLHeadingElement | null>;
  button: React.RefObject<HTMLButtonElement | null>;
}

export const animateContactAnimations = (refs: ContactRefs) => {
  if (!refs.title.current) return;

  const splitTitle = SplitText.create(refs.title.current, {
    type: 'lines',
    mask: 'lines',
  });

  gsap.set(splitTitle.lines, {
    yPercent: 100,
  });

  gsap.set(refs.button.current, {
    scale: 0.8,
    opacity: 0,
  });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: refs.sectionContainer.current,
        start: 'top 60%',
        markers: false,
      },
    })
    .to(splitTitle.lines, {
      yPercent: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.05,
    })
    .to(
      refs.button.current,
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
      },
      '<0.5',
    );
};
