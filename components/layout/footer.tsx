import { scrollToSection } from '@/services/layout/header.service';
import {
  FooterAnimationState,
  initializePath,
  animateIn,
  resetAnimation,
  manageMouseMove,
} from '@/services/layout/footer.service';
import { useLenis } from 'lenis/react';
import Link from 'next/link';
import FullWidthTitle from '../ui/full-width-title';
import { useEffect, useRef } from 'react';

const Footer = () => {
  const lenis = useLenis();
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(lenis, id);
  };

  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<number>(0);
  const xRef = useRef<number>(0.5);
  const reqIdRef = useRef<number | null>(null);
  const timeRef = useRef<number>(Math.PI / 2);

  const animationState: FooterAnimationState = {
    progress: progressRef,
    x: xRef,
    reqId: reqIdRef,
    time: timeRef,
    svgRef: svgRef,
    pathRef: pathRef,
  };

  useEffect(() => {
    initializePath(animationState);
  }, []);

  return (
    <div
      className="relative h-[650px] w-full bg-white md:h-[550px]"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <footer className="fixed bottom-0 left-1/2 mx-auto flex h-[650px] w-full max-w-7xl -translate-x-1/2 flex-col gap-y-10 bg-white p-6 text-black md:h-[550px] md:p-8">
        <div>
          <FullWidthTitle>CRYSTAL VISION</FullWidthTitle>
        </div>

        <div className="relative h-px w-full">
          <span
            className="relative -top-5 z-1 flex h-10 w-full"
            onMouseEnter={() => {
              animateIn(animationState);
            }}
            onMouseLeave={() => {
              resetAnimation(animationState);
            }}
            onMouseMove={(e) => {
              manageMouseMove(e, animationState);
            }}
          ></span>
          <svg ref={svgRef} className="absolute -top-12 h-24 w-full">
            <path ref={pathRef} fill="none" stroke="black" strokeWidth={1}></path>
          </svg>
        </div>

        <div className="flex flex-1 flex-col gap-8 md:grid md:grid-cols-4 md:gap-12">
          <div className="col-span-2 flex flex-col gap-2 text-sm leading-relaxed text-black/70 md:text-base">
            <p>© Concept project for demonstration purposes only.</p>
            <p>Not affiliated with any brand.</p>
            <p>All rights to original designs and trademarks belong to their respective owners.</p>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <Link
              className="group cursor-pointer text-sm md:text-base"
              href="#about"
              onClick={(e) => scrollTo(e, '#about')}
            >
              <span className="transition-all duration-300 ease-out group-hover:font-bold">
                About
              </span>
            </Link>
            <Link
              className="group cursor-pointer text-sm md:text-base"
              href="#catalog"
              onClick={(e) => scrollTo(e, '#catalog')}
            >
              <span className="transition-all duration-300 ease-out group-hover:font-bold">
                Catalog
              </span>
            </Link>
            <Link
              className="group cursor-pointer text-sm md:text-base"
              href="#limited-edition"
              onClick={(e) => scrollTo(e, '#limited-edition')}
            >
              <span className="transition-all duration-300 ease-out group-hover:font-bold">
                Limited Edition
              </span>
            </Link>
            <Link
              className="group cursor-pointer text-sm md:text-base"
              href="#influencer"
              onClick={(e) => scrollTo(e, '#influencer')}
            >
              <span className="transition-all duration-300 ease-out group-hover:font-bold">
                Influencer
              </span>
            </Link>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <a
              className="relative w-fit cursor-pointer text-sm transition-transform duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-500 after:ease-out hover:after:w-full md:text-base"
              href="https://www.instagram.com/paranthese.studio"
              rel="noopener noreferrer"
              target="_blank"
            >
              Instagram
            </a>
            <a
              className="relative w-fit cursor-pointer text-sm transition-transform duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-500 after:ease-out hover:after:w-full md:text-base"
              href="https://www.linkedin.com/company/paranthese-studio"
              rel="noopener noreferrer"
              target="_blank"
            >
              Linkedin
            </a>
            <div className="mt-2 flex flex-col gap-2 border-t border-black/10 pt-3 md:mt-4 md:pt-4">
              <p className="text-xs text-black/70 md:text-sm">
                Developed by{' '}
                <Link
                  className="relative cursor-pointer font-bold text-black transition-transform duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-500 after:ease-out hover:after:w-full"
                  href="https://www.paranthese.studio"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Paranthese Studio
                </Link>
              </p>
              <p className="text-xs text-black/70 md:text-sm">
                Design by{' '}
                <Link
                  className="relative cursor-pointer font-bold text-black transition-transform duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-500 after:ease-out hover:after:w-full"
                  href="https://www.behance.net/kmaksimova"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Karina Maksimova
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
