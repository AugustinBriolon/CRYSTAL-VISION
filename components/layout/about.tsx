import Section from '@/components/shared/sections';
import { AboutRefs, animateAboutEntry } from '@/services/layout/about.service';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

export default function About() {
  const refs: AboutRefs = {
    sectionContainer: useRef<HTMLDivElement>(null),
    divContainer: useRef<HTMLDivElement>(null),
    title1: useRef<HTMLHeadingElement>(null),
    title2: useRef<HTMLHeadingElement>(null),
    description: useRef<HTMLParagraphElement>(null),
  };

  useGSAP(() => {
    animateAboutEntry(refs);
  }, []);

  return (
    <Section
      ref={refs.sectionContainer}
      className="h-fit! min-h-fit! px-4"
      color="white"
      id="about"
    >
      <div
        ref={refs.divContainer}
        className="flex h-full w-full origin-center flex-col items-center justify-center gap-8 rounded-4xl bg-black px-8 py-12 md:gap-16 md:py-24"
      >
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <h2 ref={refs.title1} className="w-full text-center">
            IT'S NOT JUST AN ACCESSORY.
          </h2>
          <h2 ref={refs.title2} className="w-full text-center">
            IT'S PART OF YOUR IMAGE.
          </h2>
        </div>
        <p
          ref={refs.description}
          aria-label="About the brand"
          className="text-center text-balance text-white md:max-w-1/2"
        >
          Our brand was born from the idea of combining aesthetics, comfort, and modern design. Each
          pair of glasses is the result of meticulous work by designers and craftsmen who believe
          that details define personality.
        </p>
      </div>
    </Section>
  );
}
