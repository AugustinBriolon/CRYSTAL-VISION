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
    <footer className="mx-auto grid min-h-fit w-full max-w-screen-xl grid-cols-2 flex-col items-center gap-10 bg-black p-4 pb-10 text-white md:grid-cols-4">
      <div className="flex h-full flex-col items-start justify-start">
        <p>Showroom address</p>
        <p>Shipping information</p>
        <p>Customer service</p>
        <p>Return policy & warranty</p>
      </div>
      <div className="flex h-full flex-col items-start justify-start">
        <Link className="cursor-pointer" href="#about" onClick={(e) => scrollTo(e, '#about')}>
          • About
        </Link>
        <Link className="cursor-pointer" href="#catalog" onClick={(e) => scrollTo(e, '#catalog')}>
          • Catalog
        </Link>
        <Link
          className="cursor-pointer"
          href="#limited-edition"
          onClick={(e) => scrollTo(e, '#limited-edition')}
        >
          • Limited Edition
        </Link>
        <Link
          className="cursor-pointer"
          href="#influencer"
          onClick={(e) => scrollTo(e, '#influencer')}
        >
          • Influencer
        </Link>
      </div>
      <div className="flex h-full flex-col items-start justify-start">
        <a
          className="relative cursor-pointer transition-transform duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-500 after:ease-out hover:scale-[1.02] hover:after:w-full"
          href="https://www.instagram.com/paranthese.studio"
          rel="noopener noreferrer"
          target="_blank"
        >
          Instagram
        </a>
        <a
          className="relative cursor-pointer transition-transform duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-500 after:ease-out hover:scale-[1.02] hover:after:w-full"
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
            className="relative cursor-pointer font-bold transition-transform duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-500 after:ease-out hover:scale-[1.02] hover:after:w-full"
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
            className="relative cursor-pointer font-bold transition-transform duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-500 after:ease-out hover:scale-[1.02] hover:after:w-full"
            href="https://www.behance.net/kmaksimova"
            rel="noopener noreferrer"
            target="_blank"
          >
            Karina Maksimova
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
