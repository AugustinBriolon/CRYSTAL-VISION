import { useEffect, useState } from 'react';

export function useFontReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.fonts.load('1rem "Bebas Neue"').then(() => {
      document.fonts.load('1rem "Inter"').then(() => {
        setReady(true);
      });
    });
  }, []);

  return ready;
}
