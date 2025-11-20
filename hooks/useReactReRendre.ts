import { scan } from 'react-scan';

export const useReactReRender = (enabled: boolean) => {
  return () => {
    scan({
      enabled,
    });
  };
};
