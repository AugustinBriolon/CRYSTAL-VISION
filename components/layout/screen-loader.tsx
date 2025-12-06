import { usePerformance } from '@/providers/performance.provider';
import { useScreenLoader } from '@/providers/screen-loader.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';

const ScreenLoader = () => {
  const screenLoaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLHeadingElement>(null);
  const [counterComplete, setCounterComplete] = useState(false);
  const [counter, setCounter] = useState(0);
  const { contextSafe } = useGSAP();
  const { isLoading } = usePerformance();
  const { setIsComplete } = useScreenLoader();

  const hideAnimation = contextSafe(() => {
    gsap.to(counterRef.current, {
      top: '-100%',
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        if (screenLoaderRef.current) {
          gsap.set(screenLoaderRef.current, { display: 'none' });
        }
        setIsComplete(true);
      },
    });
  });

  const revealAnimation = contextSafe(() => {
    if (!counterRef.current) return;

    gsap.set(counterRef.current, {
      top: `calc(100% - ${counterRef.current.getBoundingClientRect().height || 0}px)`,
      opacity: 1,
    });

    const timeline = gsap.timeline();

    timeline.to(counterRef.current, {
      top: '0%',
      duration: 2,
      ease: 'power2.inOut',
    });

    gsap.to(
      { value: 0 },
      {
        value: 100,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: function () {
          setCounter(Math.round(this.targets()[0].value));
        },
        onComplete: () => {
          setCounterComplete(true);
          hideAnimation();
        },
      },
    );
  });

  useGSAP(() => {
    revealAnimation();
  }, []);

  return (
    <div
      ref={screenLoaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="relative my-auto h-[95vh] w-full">
        <h1
          ref={counterRef}
          className="absolute left-1/2 -translate-x-1/2 text-center text-[25vw]! leading-none font-bold text-white opacity-0"
        >
          {counter}
        </h1>
      </div>
      {counterComplete && isLoading && (
        <div className="mt-4 text-sm text-white opacity-50">Analyzing performance...</div>
      )}
    </div>
  );
};

export default ScreenLoader;
