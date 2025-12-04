import { useState, useEffect } from 'react';
import { isLocalhost, isProduction } from '@/utils/localhost.utils';

export const useEnvironment = () => {
  const [isProd, setIsProd] = useState(true);
  const [isDev, setIsDev] = useState(true);
  const [environment, setEnvironment] = useState('production');

  useEffect(() => {
    const isLocalhostValue = isLocalhost();
    const isProdValue = isProduction();

    setIsDev(isLocalhostValue);
    setIsProd(isProdValue);
    setEnvironment(isLocalhostValue ? 'development' : 'production');
  }, []);

  return {
    isProd,
    isDev,
    environment,
  };
};
