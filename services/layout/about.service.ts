import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';

export interface AboutRefs {
  sectionContainer: React.RefObject<HTMLDivElement | null>;
  divContainer: React.RefObject<HTMLDivElement | null>;
  title1: React.RefObject<HTMLHeadingElement | null>;
  title2: React.RefObject<HTMLHeadingElement | null>;
  description: React.RefObject<HTMLParagraphElement | null>;
}

export const animateAboutEntry = (refs: AboutRefs) => {
  const isMobile = window.innerWidth <= 768;

  gsap.set(refs.divContainer.current, {
    scaleY: 0.5,
    scaleX: isMobile ? 0 : 0.25,
  });

  const splitTitle1Instance = SplitText.create(refs.title1.current, {
    type: 'lines, words',
    mask: 'lines',
  });
  gsap.set(splitTitle1Instance.lines, { yPercent: 100 });

  const splitTitle2Instance = SplitText.create(refs.title2.current, {
    type: 'lines, words',
    mask: 'lines',
  });
  gsap.set(splitTitle2Instance.lines, { yPercent: 100 });

  const splitTextInstance = SplitText.create(refs.description.current, {
    type: 'lines, words',
    mask: 'lines',
  });
  gsap.set(splitTextInstance.lines, { yPercent: 100 });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: refs.sectionContainer.current,
      start: isMobile ? 'top 60%' : 'top 80%',
      end: 'bottom top',
      markers: true,
    },
  });

  timeline
    .to(refs.divContainer.current, {
      scaleY: 1,
      scaleX: 1,
      duration: 1.2,
      ease: 'power4.out',
    })
    .to(
      [splitTitle1Instance.lines, splitTitle2Instance.lines],
      {
        yPercent: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
      },
      '-=0.4',
    )
    .to(
      splitTextInstance.lines,
      {
        yPercent: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.2',
    );
};
