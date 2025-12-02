import ScreenLoader from '@/components/layout/screen-loader';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { ReactNode } from 'react';
import { PerformanceProvider } from './performance.provider';
import { ScreenLoaderProvider } from './screen-loader.provider';
import { SmoothScrollProvider } from './smooth-scroll.provider';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const isScreenLoader = useIsScreenLoader();

  return (
    <PerformanceProvider>
      <ScreenLoaderProvider>
        {isScreenLoader && <ScreenLoader />}
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </ScreenLoaderProvider>
    </PerformanceProvider>
  );
};
