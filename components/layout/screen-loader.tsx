import { usePerformance } from '@/providers/performance.provider';
import { useScreenLoader } from '@/providers/screen-loader.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import { useRef, useState } from 'react';

const ScreenLoader = () => {
  const screenLoaderRef = useRef(null);
  const { contextSafe } = useGSAP();
  const lenis = useLenis();
  const { isLoading } = usePerformance();
  const { setIsComplete } = useScreenLoader();
  const counterRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const [counterComplete, setCounterComplete] = useState(false);

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
        lenis?.start();
      },
    });
  });

  const revealAnimation = contextSafe(() => {
    gsap.set(counterRef.current, {
      top: 'calc(100% - 100px)',
      opacity: 1,
    });

    const timeline = gsap.timeline();

    timeline.to(counterRef.current, {
      top: 'calc(0% + 100px)',
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
    if (!lenis) return;
    lenis.stop();
    revealAnimation();
  }, [lenis]);

  return (
    <div
      ref={screenLoaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <h1
        ref={counterRef}
        className="opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-8xl font-bold text-white"
      >
        {counter}
      </h1>
      {counterComplete && isLoading && (
        <div className="mt-4 text-sm text-white opacity-50">Analyzing performance...</div>
      )}
    </div>
  );
};

export default ScreenLoader;
