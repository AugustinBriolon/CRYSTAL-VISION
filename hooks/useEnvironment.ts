import { useState } from 'react';

export const useEnvironment = () => {
  const getIsLocalhost = () => {
    if (typeof window === 'undefined') return false;
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  };

  const getIsProd = () => {
    if (typeof window === 'undefined') return true;
    return window.location.hostname.includes('crystal-vision.paranthese.studio');
  };

  const getEnvironment = () => {
    const isLocalhost = getIsLocalhost();
    return isLocalhost ? 'development' : 'production';
  };

  const [isProd] = useState(() => getIsProd());
  const [isDev] = useState(() => getIsLocalhost());
  const [environment] = useState(() => getEnvironment());

  return {
    isProd,
    isDev,
    environment,
  };
};
