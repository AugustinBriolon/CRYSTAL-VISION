import { ReactNode } from 'react';
import { PerformanceProvider } from './performance.provider';
import { SmoothScrollProvider } from './smooth-scroll.provider';
import { ActiveSectionProvider } from './active-section.provider';
import ScreenLoader from '@/components/layout/screen-loader';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const isScreenLoader = useIsScreenLoader();

  return (
    <PerformanceProvider>
      {isScreenLoader && <ScreenLoader />}
      <SmoothScrollProvider>
        <ActiveSectionProvider>{children}</ActiveSectionProvider>
      </SmoothScrollProvider>
    </PerformanceProvider>
  );
};
