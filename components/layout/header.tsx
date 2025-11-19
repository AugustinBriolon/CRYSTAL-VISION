import Link from 'next/link';
import { RefObject, useRef } from 'react';
import { HeaderButton } from '../ui/button';
import ProgressivBlur from '../ui/progressiv-blur';
import SelectHeader from '../ui/select-header';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const Header = () => {
  const { smoothScrollTo } = useSmoothScroll();

  const linksRefs = {
    hero: useRef<HTMLAnchorElement>(null),
    about: useRef<HTMLAnchorElement>(null),
    catalog: useRef<HTMLAnchorElement>(null),
    influencer: useRef<HTMLAnchorElement>(null),
    limitedEdition: useRef<HTMLAnchorElement>(null),
    contact: useRef<HTMLAnchorElement>(null),
  };

  const linksMap = new Map<string, RefObject<HTMLAnchorElement | null>>([
    ['hero', linksRefs.hero],
    ['about', linksRefs.about],
    ['catalog', linksRefs.catalog],
    ['influencer', linksRefs.influencer],
    ['limited-edition', linksRefs.limitedEdition],
    ['contact', linksRefs.contact],
  ]);

  return (
    <header className="fixed top-0 right-0 left-0 mx-auto w-full max-w-screen-2xl">
      <ProgressivBlur className="grid w-full grid-cols-[1fr_auto_1fr] items-center px-2 py-4">
        <HeaderButton
          ref={linksRefs.hero}
          className="font-bebas-neue text-lg"
          href="/"
          onClick={() => {
            smoothScrollTo(0, 1000);
          }}
        >
          CRYSTAL VISION
        </HeaderButton>
        <div className="bg-gray relative z-10 flex h-9 w-fit items-center overflow-hidden rounded-full text-black">
          <SelectHeader linksRefs={linksMap} />
          <Link
            ref={linksRefs.about}
            className="z-12 px-3"
            href="#about"
            onClick={() => {
              smoothScrollTo(1000, 1000);
            }}
          >
            About
          </Link>
          <Link
            ref={linksRefs.catalog}
            className="z-12 px-3"
            href="#catalog"
            onClick={() => {
              smoothScrollTo(2000, 1000);
            }}
          >
            Catalog
          </Link>
          <Link
            ref={linksRefs.influencer}
            className="z-12 px-3"
            href="#influencer"
            onClick={() => {
              smoothScrollTo(3000, 1000);
            }}
          >
            Influencer
          </Link>
          <Link
            ref={linksRefs.limitedEdition}
            className="z-12 px-3"
            href="#limited-edition"
            onClick={() => {
              smoothScrollTo(4000, 1000);
            }}
          >
            Limited Edition
          </Link>
          <Link
            ref={linksRefs.contact}
            className="z-12 px-3"
            href="#contact"
            onClick={() => {
              smoothScrollTo(5000, 1000);
            }}
          >
            Contact
          </Link>
        </div>
        <HeaderButton className="ml-auto" icon="shopping-bag" onClick={() => {}}>
          Cart (0)
        </HeaderButton>
      </ProgressivBlur>
    </header>
  );
};

export default Header;
