import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import Cursor from '@/components/ui/cursor';
import PerformanceIndicator from '@/components/ui/performance-indicator';
import SEO from '@/components/ui/SEO';
import { useEnvironment } from '@/hooks/useEnvironment';
import { usePerformance } from '@/providers/performance.provider';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ReactNode, useEffect } from 'react';
import { Bebas_Neue, Inter } from 'next/font/google';

gsap.registerPlugin(ScrollTrigger, SplitText);

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-bebas-neue',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const Layout = ({ children }: { children: ReactNode }) => {
  const { isProd } = useEnvironment();
  const { isLoading } = usePerformance();

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [isLoading]);

  return (
    <>
      <Cursor />
      <SEO />

      {isLoading ? (
        <div className="bg-blue fixed inset-0 z-9998" />
      ) : (
        <div className={`${bebasNeue.variable} ${inter.variable} mx-auto max-w-screen-2xl`}>
          <Header />
          <main className="mx-auto min-h-screen w-screen max-w-screen-xl overflow-hidden px-1">
            {children}
          </main>
          <Footer />
        </div>
      )}

      {!isProd && <PerformanceIndicator />}
    </>
  );
};

export default Layout;
