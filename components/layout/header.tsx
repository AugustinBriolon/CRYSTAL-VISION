import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { HeaderButton } from '../ui/button';
import ProgressivBlur from '../ui/progressiv-blur';
import { useGSAP } from '@gsap/react';
import { useLenis } from 'lenis/react';
import { useScreenLoader } from '@/providers/screen-loader.provider';
import {
  HeaderRefs,
  initializeHeaderAnimations,
  animateHeaderEntry,
  scrollToSectionWithMenuClose,
  initializeMobileMenu,
  toggleMobileMenu,
} from '@/services/layout/header.service';

const Header = () => {
  const { isComplete } = useScreenLoader();
  const lenis = useLenis();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const refs: HeaderRefs = {
    logo: useRef<HTMLAnchorElement>(null),
    linksContainer: useRef<HTMLDivElement>(null),
    links: {
      about: useRef<HTMLAnchorElement>(null),
      catalog: useRef<HTMLAnchorElement>(null),
      influencer: useRef<HTMLAnchorElement>(null),
      limitedEdition: useRef<HTMLAnchorElement>(null),
      contact: useRef<HTMLAnchorElement>(null),
    },
    cart: useRef<HTMLButtonElement>(null),
    menuButton: useRef<HTMLButtonElement>(null),
    menuLine: {
      line1: useRef<HTMLSpanElement>(null),
      line2: useRef<HTMLSpanElement>(null),
      line3: useRef<HTMLSpanElement>(null),
    },
    mobileMenu: useRef<HTMLDivElement>(null),
    mobileMenuLinks: {
      about: useRef<HTMLAnchorElement>(null),
      catalog: useRef<HTMLAnchorElement>(null),
      influencer: useRef<HTMLAnchorElement>(null),
      limitedEdition: useRef<HTMLAnchorElement>(null),
      contact: useRef<HTMLAnchorElement>(null),
    },
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSectionWithMenuClose(lenis, refs, isMobileMenuOpen, setIsMobileMenuOpen, id);
  };

  useGSAP(() => {
    initializeHeaderAnimations(refs);
    initializeMobileMenu(refs);

    if (isComplete) {
      animateHeaderEntry(refs);
    }
  }, [isComplete]);

  useEffect(() => {
    if (!lenis) return;

    if (isMobileMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isMobileMenuOpen, lenis]);

  return (
    <header className="fixed top-0 right-0 left-0 z-10 w-full">
      {/* Menu Mobile */}
      <div ref={refs.mobileMenu} className="fixed inset-0 bg-white md:hidden">
        <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
          <div className="overflow-hidden">
            <Link
              ref={refs.mobileMenuLinks.about}
              className="block cursor-pointer text-4xl font-medium text-black uppercase"
              href="#about"
              onClick={(e) => scrollTo(e, '#about')}
            >
              About
            </Link>
          </div>
          <div className="overflow-hidden">
            <Link
              ref={refs.mobileMenuLinks.catalog}
              className="block cursor-pointer text-4xl font-medium text-black uppercase"
              href="#catalog"
              onClick={(e) => scrollTo(e, '#catalog')}
            >
              Catalog
            </Link>
          </div>
          <div className="overflow-hidden">
            <Link
              ref={refs.mobileMenuLinks.limitedEdition}
              className="block cursor-pointer text-4xl font-medium text-black uppercase"
              href="#limited-edition"
              onClick={(e) => scrollTo(e, '#limited-edition')}
            >
              Limited Edition
            </Link>
          </div>
          <div className="overflow-hidden">
            <Link
              ref={refs.mobileMenuLinks.influencer}
              className="block cursor-pointer text-4xl font-medium text-black uppercase"
              href="#influencer"
              onClick={(e) => scrollTo(e, '#influencer')}
            >
              Influencer
            </Link>
          </div>
          <div className="overflow-hidden">
            <Link
              ref={refs.mobileMenuLinks.contact}
              className="block cursor-pointer text-4xl font-medium text-black uppercase"
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Menu Desktop */}
      <ProgressivBlur className="mx-auto grid w-full max-w-screen-2xl grid-cols-[1fr_auto_1fr] items-center px-2 py-4">
        <HeaderButton
          ref={refs.menuButton}
          className="flex w-12! flex-col items-center justify-center gap-[6px] p-1 px-0! md:hidden"
          onClick={() => toggleMobileMenu(refs, isMobileMenuOpen, setIsMobileMenuOpen)}
        >
          <span ref={refs.menuLine.line1} className="block h-0.5 w-6 rounded-full bg-black"></span>
          <span ref={refs.menuLine.line2} className="block h-0.5 w-6 rounded-full bg-black"></span>
          <span ref={refs.menuLine.line3} className="block h-0.5 w-6 rounded-full bg-black"></span>
        </HeaderButton>
        <HeaderButton
          ref={refs.logo}
          className="font-bebas-neue text-2xl md:text-lg"
          href="/"
          onClick={(e) => {
            e?.preventDefault();
            scrollToSectionWithMenuClose(
              lenis,
              refs,
              isMobileMenuOpen,
              setIsMobileMenuOpen,
              '#hero',
            );
          }}
        >
          CRYSTAL VISION
        </HeaderButton>
        <div
          ref={refs.linksContainer}
          className="bg-gray relative z-10 hidden h-9 w-fit items-center gap-8 overflow-hidden rounded-full px-6 text-black md:flex"
        >
          <div className="overflow-hidden">
            <Link
              ref={refs.links.about}
              className="block cursor-pointer font-medium"
              href="#about"
              onClick={(e) => scrollTo(e, '#about')}
            >
              About
            </Link>
          </div>
          <div className="overflow-hidden">
            <Link
              ref={refs.links.catalog}
              className="block cursor-pointer font-medium"
              href="#catalog"
              onClick={(e) => scrollTo(e, '#catalog')}
            >
              Catalog
            </Link>
          </div>
          <div className="overflow-hidden">
            <Link
              ref={refs.links.limitedEdition}
              className="block cursor-pointer font-medium"
              href="#limited-edition"
              onClick={(e) => scrollTo(e, '#limited-edition')}
            >
              Limited Edition
            </Link>
          </div>
          <div className="overflow-hidden">
            <Link
              ref={refs.links.influencer}
              className="block cursor-pointer font-medium"
              href="#influencer"
              onClick={(e) => scrollTo(e, '#influencer')}
            >
              Influencer
            </Link>
          </div>
          <div className="overflow-hidden">
            <Link
              ref={refs.links.contact}
              className="block cursor-pointer font-medium"
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
            >
              Contact
            </Link>
          </div>
        </div>
        <HeaderButton
          ref={refs.cart}
          className="ml-auto w-12! justify-center px-0! font-medium md:w-fit! md:px-6!"
          icon="shopping-bag"
          onClick={() => {}}
        >
          <span className="hidden lg:inline">Cart (0)</span>
        </HeaderButton>
      </ProgressivBlur>
    </header>
  );
};

export default Header;
