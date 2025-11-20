import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';
import Section from '../shared/sections';
import { useScreenLoader } from '@/providers/screen-loader.provider';

export default function Hero() {
  const tableRef = {
    container: useRef<HTMLDivElement>(null),
  };
  const { isComplete } = useScreenLoader();

  useGSAP(() => {
    gsap.set(tableRef.container.current, { yPercent: 100, scale: 0.8 });
    if (isComplete) {
      gsap.to(tableRef.container.current, {
        yPercent: 0,
        scale: 1,
        duration: 2.2,
        ease: 'power4.out',
      });
    }
  }, [isComplete]);

  return (
    <Section ref={tableRef.container} className="rounded-t-4xl" color="white">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1>Hero</h1>
        <p>
          This is the hero section This is the hero section This is the hero section This is the
          hero section This is the hero section This is the hero section This is the hero section
          This is the hero section This is the hero section{' '}
        </p>
      </div>
    </Section>
  );
}
