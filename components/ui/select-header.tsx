import { useRef, RefObject, useEffect } from 'react';
import { useActiveSectionIndicator } from '@/hooks/useActiveSectionIndicator';
import { useActiveSectionContext } from '@/providers/active-section.provider';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface SelectHeaderProps {
  linksRefs: Map<string, RefObject<HTMLAnchorElement | null>>;
}

export default function SelectHeader({ linksRefs }: SelectHeaderProps) {
  const position = useActiveSectionIndicator(linksRefs);
  const { activeSection } = useActiveSectionContext();
  const indicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!indicatorRef.current) return;

    gsap.killTweensOf(indicatorRef.current);

    if (activeSection === 'hero') {
      gsap.to(indicatorRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      return;
    }

    if (!position) {
      gsap.to(indicatorRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      return;
    }

    gsap.to(indicatorRef.current, {
      left: `${position.leftPercent}%`,
      scaleX: position.scaleX,
      scaleY: 1,
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
      xPercent: -50,
    });
  }, [position, activeSection]);

  return (
    <div
      ref={indicatorRef}
      className="absolute z-11 h-full w-24 origin-center rounded-[18px] bg-black/15 will-change-[left,transform]"
    />
  );
}
