import { useScreenLoader } from '@/providers/screen-loader.provider';
import {
  animateHeroEntry,
  HeroRefs,
  initializeHeroAnimations,
} from '@/services/layout/hero.service';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import Section from '../shared/sections';
import Image from 'next/image';
import { Button } from '../ui/button';
import FullWidthTitle from '../ui/full-width-title';

export default function Hero() {
  const { isComplete } = useScreenLoader();
  const refs: HeroRefs = {
    container: useRef<HTMLDivElement>(null),
    title: useRef<HTMLHeadingElement>(null),
    image: useRef<HTMLDivElement>(null),
    extraText: {
      first: useRef<HTMLParagraphElement>(null),
      second: useRef<HTMLParagraphElement>(null),
      third: useRef<HTMLParagraphElement>(null),
      fourth: useRef<HTMLParagraphElement>(null),
    },
    titleImage: useRef<HTMLDivElement>(null),
  };

  useGSAP(() => {
    initializeHeroAnimations(refs);

    if (isComplete) {
      animateHeroEntry(refs);
    }
  }, [isComplete]);

  return (
    <Section
      ref={refs.container}
      className="h-fit min-h-fit rounded-t-4xl md:h-dvh md:min-h-dvh"
      color="white"
      id="hero"
    >
      <div className="py-y-default relative grid h-full w-full grid-cols-[1fr_50vw_1fr] grid-rows-[auto_1fr] gap-3 text-black md:grid-cols-[1fr_auto_1fr] md:gap-5">
        <div className="col-start-2 overflow-hidden md:col-start-2 md:col-end-2">
          <h2 ref={refs.title} className="text-center whitespace-nowrap">
            EYEWEAR THAT <br /> DEFINES STYLE
          </h2>
        </div>
        <div className="col-start-2 col-end-3 row-start-2 row-end-2 flex min-h-[40vh] items-start justify-center overflow-hidden">
          <div ref={refs.image} className="relative h-full overflow-hidden rounded-4xl">
            <Image
              alt="Hero Image"
              className="h-full w-auto object-cover md:h-full xl:max-w-[25vw] max-h-[60vh]"
              height={1000}
              src="/images/hero/img1.webp"
              width={1000}
            />
            <div className="absolute right-0 bottom-4 w-full px-4">
              <Button className="bg-orange w-full justify-center px-6 py-3 text-xs font-medium whitespace-nowrap text-white md:text-base">
                Show now
              </Button>
            </div>
          </div>
        </div>
        <div className="col-start-3 row-start-2 row-end-2 flex flex-col items-start justify-center">
          <div className="overflow-hidden">
            <p ref={refs.extraText.first} className="text-sm font-medium md:text-lg">
              Exclusive
            </p>
          </div>
          <div className="overflow-hidden">
            <p ref={refs.extraText.second} className="text-sm font-medium md:text-lg">
              design
            </p>
          </div>
          <div className="overflow-hidden">
            <p ref={refs.extraText.third} className="text-sm font-medium md:text-lg">
              without
            </p>
          </div>
          <div className="overflow-hidden">
            <p ref={refs.extraText.fourth} className="text-sm font-medium md:text-lg">
              compromise.
            </p>
          </div>
        </div>
        <div className="absolute right-0 bottom-25 -z-1 h-fit w-full overflow-hidden px-4 md:bottom-8">
          <FullWidthTitle ref={refs.titleImage}>CRYSTAL VISION</FullWidthTitle>
        </div>
      </div>
    </Section>
  );
}
