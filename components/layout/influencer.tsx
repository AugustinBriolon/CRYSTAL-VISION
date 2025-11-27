import { useFontReady } from '@/hooks/useFontReady';
import { InfluencerRefs, animateInfluencerAnimations } from '@/services/layout/influencer.service';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef } from 'react';
import Section from '../shared/sections';

export default function Influencer() {
  const isFontReady = useFontReady();
  const refs: InfluencerRefs = {
    sectionContainer: useRef<HTMLDivElement>(null),
    divContainer: useRef<HTMLDivElement>(null),
    title: useRef<HTMLHeadingElement>(null),
    cards: {
      card1: {
        image: useRef<HTMLImageElement>(null),
        description: useRef<HTMLParagraphElement>(null),
      },
      card2: {
        image: useRef<HTMLImageElement>(null),
        description: useRef<HTMLParagraphElement>(null),
      },
      card3: {
        image: useRef<HTMLImageElement>(null),
        description: useRef<HTMLParagraphElement>(null),
      },
    },
  };

  useGSAP(() => {
    if (isFontReady) return;
    animateInfluencerAnimations(refs);
  }, [isFontReady]);

  return (
    <Section
      ref={refs.sectionContainer}
      className="h-fit! min-h-fit! px-4"
      color="white"
      id="influencer"
    >
      <div
        ref={refs.divContainer}
        className="flex h-full w-full flex-col rounded-4xl bg-black px-8 py-8"
      >
        <h2 ref={refs.title} className="max-w-full text-pretty md:max-w-3/4">
          EXCLUSIVE DESIGNS CRAFTED IN LIMITED EDITIONS, COMBINING LUXURY, COMFORT, AND
          INDIVIDUALITY
        </h2>
        <div className="grid w-full grid-cols-1 items-end gap-8 pt-8 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-4">
            <Image
              ref={refs.cards.card1.image}
              alt="Influencer 1"
              className="aspect-square h-auto w-full rounded-4xl object-cover"
              height={847}
              src="/images/influencer/img1.webp"
              width={640}
            />
            <p ref={refs.cards.card1.description} className="h-12 text-left font-medium text-white">
              International quality standards.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Image
              ref={refs.cards.card2.image}
              alt="Influencer 1"
              className="h-auto w-full rounded-4xl"
              height={1200}
              src="/images/influencer/img2.webp"
              width={904}
            />
            <p ref={refs.cards.card2.description} className="h-12 text-left font-medium text-white">
              Eyewear that blends timeless aesthetics with modern innovation.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:col-span-2">
            <Image
              ref={refs.cards.card3.image}
              alt="Influencer 1"
              className="aspect-video h-auto w-full rounded-4xl object-cover contrast-100"
              height={1024}
              src="/images/influencer/img3.webp"
              width={682}
            />
            <p ref={refs.cards.card3.description} className="text-left font-medium text-white">
              Handcrafted frames made from premium materials with exceptional attention to detail.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
