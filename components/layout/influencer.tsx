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
    cards: Array.from({ length: influencerCards.length }, () => useRef<HTMLDivElement>(null)),
  };

  useGSAP(() => {
    animateInfluencerAnimations(refs);
    animateInfluencerEntry(refs);
  }, []);

  return (
    <div
      ref={refs.container}
      className="no-scrollbar block h-fit min-h-dvh w-full overflow-hidden bg-white"
      id="influencer"
    >
      <div className="mx-auto h-fit max-w-screen-xl">
        <div className="flex h-fit w-full flex-col items-center justify-start gap-16 px-4 py-8 text-black md:px-8">
          <div className="h-full w-full">
            <FullWidthTitle ref={refs.title.one}>A COLLECTION CHOOSEN</FullWidthTitle>
            <FullWidthTitle ref={refs.title.two}>BY PEOPLE WITH STYLE</FullWidthTitle>
          </div>

          <div
            ref={refs.cardsContainer}
            className="z-1 grid w-full grid-cols-2 px-4 py-8 md:flex md:justify-between"
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
                    'relative h-fit min-h-full overflow-hidden rounded-2xl border border-black md:aspect-[0.8] md:rounded-4xl',
                    'w-full md:w-[20vw]',
                    'md:not-first:ml-[-10vw]',
                    index % 2 === 0 ? 'bg-black text-white' : 'bg-white text-black',
                  )}
                >
                  <div className="flex h-full w-full flex-col justify-between p-6">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm md:text-xl">{card.name}</h3>
                      <p className="text-[10px] tracking-wider uppercase opacity-70 md:text-sm">
                        {card.role}
                      </p>
                    </div>
                    <div className="mt-auto border-t border-current/20 pt-2 md:pt-4">
                      <p className="text-xs leading-relaxed md:text-base">{card.quote}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
