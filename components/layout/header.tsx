import { useScreenLoader } from '@/providers/screen-loader.provider';
import Link from 'next/link';
import { useRef } from 'react';
import { HeaderButton } from '../ui/button';
import ProgressivBlur from '../ui/progressiv-blur';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Header = () => {
  const { isComplete } = useScreenLoader();
  const tableRef = {
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
  };

  useGSAP(() => {
    gsap.set(tableRef.logo.current, { y: -20, opacity: 0, scale: 0.8 });
    gsap.set(tableRef.linksContainer.current, { y: -50, opacity: 0, scale: 0.8 });
    gsap.set(tableRef.cart.current, { y: -50, opacity: 0, scale: 0.8 });

    if (isComplete) {
      gsap
        .timeline()
        .to([tableRef.logo.current, tableRef.linksContainer.current, tableRef.cart.current], {
          delay: 0.5,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.inOut',
        })
        .from(
          [
            tableRef.links.about.current,
            tableRef.links.catalog.current,
            tableRef.links.influencer.current,
            tableRef.links.limitedEdition.current,
            tableRef.links.contact.current,
          ],
          {
            y: 50,
            duration: 1.2,
            stagger: 0.02,
            ease: 'power2.inOut',
          },
          '-=0.8',
        );
    }
  }, [isComplete]);

  return (
    <header className="fixed top-0 right-0 left-0 z-10 w-full">
      <ProgressivBlur className="mx-auto grid w-full max-w-screen-2xl grid-cols-[1fr_auto_1fr] items-center px-2 py-4">
        <HeaderButton ref={tableRef.logo} className="font-bebas-neue text-lg" href="/">
          CRYSTAL VISION
        </HeaderButton>
        <div
          ref={tableRef.linksContainer}
          className="bg-gray relative z-10 flex h-9 w-fit items-center gap-8 overflow-hidden rounded-full px-6 text-black"
        >
          <div className="overflow-hidden">
            <Link ref={tableRef.links.about} className="block" href="#about">
              About
            </Link>
          </div>
          <div className="overflow-hidden">
            <Link ref={tableRef.links.catalog} className="block" href="#catalog">
              Catalog
            </Link>
          </div>
          <div className="overflow-hidden">
            <Link ref={tableRef.links.influencer} className="block" href="#influencer">
              Influencer
            </Link>
          </div>
          <div className="overflow-hidden">
            <Link ref={tableRef.links.limitedEdition} className="block" href="#limited-edition">
              Limited Edition
            </Link>
          </div>
          <div className="overflow-hidden">
            <Link ref={tableRef.links.contact} className="block" href="#contact">
              Contact
            </Link>
          </div>
        </div>
        <HeaderButton
          ref={tableRef.cart}
          className="ml-auto"
          icon="shopping-bag"
          onClick={() => {}}
        >
          Cart (0)
        </HeaderButton>
      </ProgressivBlur>
    </header>
  );
};

export default Header;
