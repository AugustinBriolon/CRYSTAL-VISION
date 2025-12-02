import { scrollToSection } from '@/services/layout/header.service';
import { useLenis } from 'lenis/react';
import Link from 'next/link';

const Footer = () => {
  const lenis = useLenis();
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(lenis, id);
  };

  return (
    <div
      className="relative h-[300px] md:h-[200px]"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <footer className="fixed bottom-0 mx-auto grid h-[300px] md:h-[200px] min-h-fit w-full max-w-screen-xl grid-cols-2 flex-col items-center gap-10 bg-white p-4 pb-10 text-black md:grid-cols-4">
        <div className="flex h-full flex-col items-start justify-start">
          <p>Showroom address</p>
          <p>Shipping information</p>
          <p>Customer service</p>
          <p>Return policy & warranty</p>
        </div>
        <div className="flex h-full flex-col items-start justify-start">
          <Link
            className="group cursor-pointer"
            href="#about"
            onClick={(e) => scrollTo(e, '#about')}
          >
            •{' '}
            <span className="transition-all duration-300 ease-out group-hover:font-bold">
              About
            </span>
          </Link>
          <Link
            className="group cursor-pointer"
            href="#catalog"
            onClick={(e) => scrollTo(e, '#catalog')}
          >
            •{' '}
            <span className="transition-all duration-300 ease-out group-hover:font-bold">
              Catalog
            </span>
          </Link>
          <Link
            className="group cursor-pointer"
            href="#limited-edition"
            onClick={(e) => scrollTo(e, '#limited-edition')}
          >
            •{' '}
            <span className="transition-all duration-300 ease-out group-hover:font-bold">
              Limited Edition
            </span>
          </Link>
          <Link
            className="group cursor-pointer"
            href="#influencer"
            onClick={(e) => scrollTo(e, '#influencer')}
          >
            •{' '}
            <span className="transition-all duration-300 ease-out group-hover:font-bold">
              Influencer
            </span>
          </Link>
        </div>
        <div className="flex h-full flex-col items-start justify-start">
          <a
            className="relative cursor-pointer transition-transform duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-500 after:ease-out hover:after:w-full"
            href="https://www.instagram.com/paranthese.studio"
            rel="noopener noreferrer"
            target="_blank"
          >
            Instagram
          </a>
          <a
            className="relative cursor-pointer transition-transform duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-500 after:ease-out hover:after:w-full"
            href="https://www.linkedin.com/company/paranthese-studio"
            rel="noopener noreferrer"
            target="_blank"
          >
            Linkedin
          </a>
        </div>

        <div className="flex h-full flex-col items-start justify-start">
          <p>
            Developed by{' '}
            <Link
              className="relative cursor-pointer font-bold transition-transform duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-500 after:ease-out hover:after:w-full"
              href="https://www.paranthese.studio"
              rel="noopener noreferrer"
              target="_blank"
            >
              Paranthese Studio
            </Link>
          </p>
          <p>
            Design by{' '}
            <Link
              className="relative cursor-pointer font-bold transition-transform duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-500 after:ease-out hover:after:w-full"
              href="https://www.behance.net/kmaksimova"
              rel="noopener noreferrer"
              target="_blank"
            >
              Karina Maksimova
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
