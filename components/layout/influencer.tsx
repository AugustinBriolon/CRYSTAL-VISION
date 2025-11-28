import {
  animateInfluencerAnimations,
  animateInfluencerEntry,
  influencerCards,
  InfluencerRefs,
  handleMouseLeave,
  handleMouseMove,
} from '@/services/layout/influencer.service';
import { useTouchDevice } from '@/hooks/useTouchDevice';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import Section from '../shared/sections';
import FullWidthTitle from '../ui/full-width-title';
import clsx from 'clsx';

export default function Influencer() {
  const isTouchDevice = useTouchDevice();
  const refs: InfluencerRefs = {
    container: useRef<HTMLDivElement>(null),
    title: {
      one: useRef<HTMLDivElement>(null),
      two: useRef<HTMLDivElement>(null),
    },
    cardsContainer: useRef<HTMLDivElement>(null),
    cards: Array.from({ length: 6 }, () => useRef<HTMLDivElement>(null)),
  };

  useGSAP(() => {
    animateInfluencerAnimations(refs);
    animateInfluencerEntry(refs);
  }, []);

  return (
    <Section
      ref={refs.container}
      className="no-scrollbar overflow-hidden"
      id="influencer"
    >
      <div className="flex h-full w-full flex-col items-center justify-start p-4 text-black md:p-8">
        <div className='w-full h-full'>
        <FullWidthTitle ref={refs.title.one}>A COLLECTION CHOOSEN</FullWidthTitle>
        <FullWidthTitle ref={refs.title.two}>BY PEOPLE WITH STYLE</FullWidthTitle>
        </div>

        <div
          ref={refs.cardsContainer}
          className="grid w-full grid-cols-2 gap-4 overflow-y-clip px-4 py-8 md:flex md:h-full md:justify-between md:overflow-x-visible md:px-8 md:py-16"
          onMouseLeave={!isTouchDevice ? () => handleMouseLeave(refs) : undefined}
          onMouseMove={
            !isTouchDevice
              ? (e: React.MouseEvent<HTMLDivElement>) => handleMouseMove(e, refs)
              : undefined
          }
        >
          {influencerCards.map((card, index) => {
            const zIndexes = [2, 3, 4, 3, 2, 1];
            return (
              <div
                key={card.name}
                ref={refs.cards[index]}
                style={{ zIndex: zIndexes[index] }}
                className={clsx(
                  'relative flex aspect-[0.8] h-fit flex-col justify-between overflow-hidden rounded-2xl border border-black p-3 md:rounded-4xl md:p-6',
                  'w-full md:w-[20vw]',
                  'md:not-first:ml-[-10vw]',
                  index % 2 === 0 ? 'bg-black text-white' : 'bg-white text-black',
                )}
              >
                <div className="flex flex-col gap-1 md:gap-2">
                  <h3 className="text-sm md:text-xl">{card.name}</h3>
                  <p className="text-[10px] tracking-wider uppercase opacity-70 md:text-sm">
                    {card.role}
                  </p>
                </div>
                <div className="mt-auto border-t border-current/20 pt-2 md:pt-4">
                  <p className="text-xs leading-relaxed md:text-base">{card.quote}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
