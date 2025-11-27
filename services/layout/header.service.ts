import gsap from 'gsap';
import React from 'react';

export const easing = (t: number): number => {
  return -(Math.cos(Math.PI * t) - 1) / 2;
};

export interface HeaderRefs {
  logo: React.RefObject<HTMLAnchorElement | null>;
  linksContainer: React.RefObject<HTMLDivElement | null>;
  links: {
    about: React.RefObject<HTMLAnchorElement | null>;
    catalog: React.RefObject<HTMLAnchorElement | null>;
    influencer: React.RefObject<HTMLAnchorElement | null>;
    limitedEdition: React.RefObject<HTMLAnchorElement | null>;
    contact: React.RefObject<HTMLAnchorElement | null>;
  };
  cart: React.RefObject<HTMLButtonElement | null>;
  menuButton: React.RefObject<HTMLButtonElement | null>;
  menuLine: {
    line1: React.RefObject<HTMLSpanElement | null>;
    line2: React.RefObject<HTMLSpanElement | null>;
    line3: React.RefObject<HTMLSpanElement | null>;
  };
  mobileMenu: React.RefObject<HTMLDivElement | null>;
  mobileMenuLinks: {
    about: React.RefObject<HTMLAnchorElement | null>;
    catalog: React.RefObject<HTMLAnchorElement | null>;
    influencer: React.RefObject<HTMLAnchorElement | null>;
    limitedEdition: React.RefObject<HTMLAnchorElement | null>;
    contact: React.RefObject<HTMLAnchorElement | null>;
  };
}

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
      [
        refs.links.about.current,
        refs.links.catalog.current,
        refs.links.influencer.current,
        refs.links.limitedEdition.current,
        refs.links.contact.current,
      ],
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

export const initializeMobileMenu = (refs: HeaderRefs) => {
  if (!refs.mobileMenu) return;

  gsap.set(refs.mobileMenu.current, {
    opacity: 0,
    y: -20,
    pointerEvents: 'none',
  });

  gsap.set(
    [
      refs.mobileMenuLinks.about.current,
      refs.mobileMenuLinks.catalog.current,
      refs.mobileMenuLinks.influencer.current,
      refs.mobileMenuLinks.limitedEdition.current,
      refs.mobileMenuLinks.contact.current,
    ],
    {
      opacity: 0,
      y: 20,
    },
  );
};

export const animateMobileMenuOpen = (refs: HeaderRefs) => {
  if (!refs.mobileMenu.current) return;

  const timeline = gsap.timeline();

  timeline
    .to(refs.mobileMenu.current, {
      opacity: 1,
      y: 0,
      pointerEvents: 'auto',
      duration: 0.4,
      ease: 'power2.out',
    })
    .to(
      refs.menuLine.line1.current,
      {
        y: 7,
        rotate: 45,
        duration: 0.3,
        ease: 'power2.inOut',
      },
      '-=0.2',
    )
    .to(
      refs.menuLine.line2.current,
      {
        opacity: 0,
        scale: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      },
      '-=0.3',
    )
    .to(
      refs.menuLine.line3.current,
      {
        y: -9,
        rotate: -45,
        duration: 0.3,
        ease: 'power2.inOut',
      },
      '-=0.3',
    )
    .to(
      [
        refs.mobileMenuLinks.about.current,
        refs.mobileMenuLinks.catalog.current,
        refs.mobileMenuLinks.influencer.current,
        refs.mobileMenuLinks.limitedEdition.current,
        refs.mobileMenuLinks.contact.current,
      ],
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.inOut',
      },
      '-=0.2',
    );

  return timeline;
};

export const animateMobileMenuClose = (refs: HeaderRefs) => {
  if (!refs.mobileMenu.current) return;

  const timeline = gsap.timeline();

  timeline.to(
    [
      refs.mobileMenuLinks.about.current,
      refs.mobileMenuLinks.catalog.current,
      refs.mobileMenuLinks.influencer.current,
      refs.mobileMenuLinks.limitedEdition.current,
      refs.mobileMenuLinks.contact.current,
    ],
    {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.03,
      ease: 'power2.in',
    },
  );

  timeline.to(
    refs.menuLine.line1.current,
    {
      y: 0,
      rotate: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    },
    '-=0.1',
  );

  timeline.to(
    refs.menuLine.line3.current,
    {
      y: 0,
      rotate: 0,
      duration: 0.3,
      ease: 'power2.inOut',
    },
    '-=0.3',
  );

  timeline.to(
    refs.menuLine.line2.current,
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
      y: -20,
      pointerEvents: 'none',
      duration: 0.3,
      ease: 'power2.in',
    },
    '-=0.1',
  );

  return timeline;
};
