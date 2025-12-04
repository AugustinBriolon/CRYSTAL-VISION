import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import Cursor from '@/components/ui/cursor';
import PerformanceIndicator from '@/components/ui/performance-indicator';
import SEO from '@/components/ui/SEO';
import { useEnvironment } from '@/hooks/useEnvironment';
import { useFontReady } from '@/hooks/useFontReady';
import { useScroll } from '@/hooks/useScroll';
import { usePerformance } from '@/providers/performance.provider';
import { useScreenLoader } from '@/providers/screen-loader.provider';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ReactNode, useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Layout = ({ children }: { children: ReactNode }) => {
  const hasRefreshedRef = useRef(false);
  const { isDev } = useEnvironment();
  const { isLoading } = usePerformance();
  const isFontReady = useFontReady();
  const { isComplete } = useScreenLoader();
  const { lockScroll } = useScroll();

  useEffect(() => {
    if (!isLoading && !hasRefreshedRef.current) {
      hasRefreshedRef.current = true;
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isComplete) {
      lockScroll(false);
    } else {
      lockScroll(true);
    }
  }, [isComplete, lockScroll]);

  return (
    <>
      <Cursor />
      <SEO />

      {isLoading || !isFontReady ? (
        <div className="bg-blue fixed inset-0 z-40" />
      ) : (
        <>
          <Header />
          <main className="min-h-screen w-screen">{children}</main>
          <Footer />
        </>
      )}

      {isDev && <PerformanceIndicator />}
    </>
  );
};

export default Layout;
