import gsap from 'gsap';
import React from 'react';

export interface HeaderRefs {
  logo: React.RefObject<HTMLAnchorElement | null>;
  linksContainer: React.RefObject<HTMLDivElement | null>;
  cart: React.RefObject<HTMLButtonElement | null>;
  menuButton: React.RefObject<HTMLButtonElement | null>;
  mobileMenu: React.RefObject<HTMLDivElement | null>;
}

export type LenisInstance = {
  scrollTo: (
    target: string | number | HTMLElement,
    options?: {
      duration?: number;
      lerp?: number;
      easing?: (t: number) => number;
      lock?: boolean;
      offset?: number;
    },
  ) => void;
  stop: () => void;
  start: () => void;
};

export const easing = (t: number): number => {
  return -(Math.cos(Math.PI * t) - 1) / 2;
};

export const scrollToSection = (lenis: LenisInstance | null | undefined, id: string) => {
  if (!lenis) return;

  lenis.scrollTo(id, {
    duration: 1.2,
    lerp: 0.08,
    easing,
    lock: true,
    offset: -100,
  });
};

export const initializeHeaderAnimations = (refs: HeaderRefs) => {
  gsap.set([refs.logo.current, refs.linksContainer.current, refs.cart.current], {
    y: -50,
    opacity: 0,
    scale: 0.8,
  });

  if (!refs.menuButton.current) return;
  gsap.set(refs.menuButton.current, {
    y: -50,
    opacity: 0,
    scale: 0.8,
  });
};

export const animateHeaderEntry = (refs: HeaderRefs) => {
  const timeline = gsap.timeline();

  timeline
    .to(
      [refs.menuButton.current, refs.logo.current, refs.linksContainer.current, refs.cart.current],
      {
        delay: 0.5,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.inOut',
      },
    )
    .from(
      refs.linksContainer.current?.querySelectorAll('.anim-link') || [],
      {
        y: -50,
        duration: 1.2,
        stagger: 0.02,
        ease: 'power2.inOut',
        offset: '-=0.8',
      },
      '-=0.5',
    );

  return timeline;
};

export const initializeMobileMenu = (refs: HeaderRefs) => {
  if (!refs.mobileMenu) return;

  gsap.set(refs.mobileMenu.current, {
    opacity: 0,
    pointerEvents: 'none',
  });

  gsap.set(refs.mobileMenu.current?.querySelectorAll('.anim-link') || [], {
    yPercent: 100,
  });
};

export const animateMobileMenuOpen = (refs: HeaderRefs) => {
  if (!refs.mobileMenu.current) return;

  const timeline = gsap.timeline();

  timeline
    .to(refs.mobileMenu.current, {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.4,
      ease: 'power2.out',
    })
    .to(
      refs.menuButton.current?.querySelectorAll('.anim-line:nth-child(1)') || [],
      {
        y: 7,
        scale: 1.3,
        rotate: 45,
        duration: 0.3,
        ease: 'power2.inOut',
      },
      '-=0.2',
    )
    .to(
      refs.menuButton.current?.querySelectorAll('.anim-line:nth-child(2)') || [],
      {
        opacity: 0,
        scale: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      },
      '<',
    )
    .to(
      refs.menuButton.current?.querySelectorAll('.anim-line:nth-child(3)') || [],
      {
        y: -9,
        scale: 1.3,
        rotate: -45,
        duration: 0.3,
        ease: 'power2.inOut',
      },
      '<',
    )
    .to(
      refs.mobileMenu.current?.querySelectorAll('.anim-link') || [],
      {
        yPercent: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: 'power2.out',
      },
      '<',
    );

  return timeline;
};

export const animateMobileMenuClose = (refs: HeaderRefs, onComplete?: () => void) => {
  if (!refs.mobileMenu.current) return;

  const timeline = gsap.timeline({
    onComplete,
  });

  timeline.to(refs.mobileMenu.current?.querySelectorAll('.anim-link') || [], {
    yPercent: 100,
    duration: 0.5,
    stagger: 0.03,
    ease: 'power2.in',
  });

  timeline.to(
    refs.menuButton.current?.querySelectorAll('.anim-line:nth-child(1)') || [],
    {
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    },
    '-=0.1',
  );

  timeline.to(
    refs.menuButton.current?.querySelectorAll('.anim-line:nth-child(3)') || [],
    {
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    },
    '-=0.3',
  );

  timeline.to(
    refs.menuButton.current?.querySelectorAll('.anim-line:nth-child(2)') || [],
    {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: 'power2.inOut',
    },
    '-=0.2',
  );

  timeline.to(
    refs.mobileMenu.current,
    {
      opacity: 0,
      pointerEvents: 'none',
      duration: 0.3,
      ease: 'power2.in',
    },
    '-=0.1',
  );

  return timeline;
};

export const toggleMobileMenu = (
  refs: HeaderRefs,
  isMobileMenuOpen: boolean,
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void,
) => {
  if (isMobileMenuOpen) {
    animateMobileMenuClose(refs);
    setIsMobileMenuOpen(false);
  } else {
    setIsMobileMenuOpen(true);
    animateMobileMenuOpen(refs);
  }
};

export const scrollToSectionWithMenuClose = (
  lenis: LenisInstance | null | undefined,
  refs: HeaderRefs,
  isMobileMenuOpen: boolean,
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void,
  id: string,
) => {
  if (isMobileMenuOpen) {
    animateMobileMenuClose(refs, () => {
      setIsMobileMenuOpen(false);
      requestAnimationFrame(() => {
        scrollToSection(lenis, id);
      });
    });
  } else {
    scrollToSection(lenis, id);
  }
};
