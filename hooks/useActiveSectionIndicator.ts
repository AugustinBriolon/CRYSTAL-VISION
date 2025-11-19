import { useEffect, useState, RefObject } from 'react';
import { useActiveSectionContext } from '@/providers/active-section.provider';

interface IndicatorPosition {
  leftPercent: number;
  scaleX: number;
}

export const useActiveSectionIndicator = (
  linksRefs: Map<string, RefObject<HTMLAnchorElement | null>>,
): IndicatorPosition | null => {
  const { activeSection } = useActiveSectionContext();
  const [position, setPosition] = useState<IndicatorPosition | null>(null);

  useEffect(() => {
    if (!activeSection) {
      setPosition(null);
      return;
    }

    console.log(activeSection);

    if (activeSection === 'hero') {
      setPosition(null);
      return;
    }

    const linkRef = linksRefs.get(activeSection);
    if (!linkRef?.current) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      const linkElement = linkRef.current;
      if (!linkElement) return;

      const rect = linkElement.getBoundingClientRect();
      const parentRect = linkElement.parentElement?.getBoundingClientRect();

      if (!parentRect) return;

      const actualWidth = rect.width;
      const scaleX = actualWidth / 96;
      const linkLeft = rect.left - parentRect.left;
      const linkCenter = linkLeft + actualWidth / 2;
      const parentWidth = parentRect.width;
      const leftPercent = (linkCenter / parentWidth) * 100;

      setPosition({
        leftPercent,
        scaleX,
      });
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [activeSection, linksRefs]);

  return position;
};
