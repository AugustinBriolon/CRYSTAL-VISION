import { useEffect, useState } from 'react';

export function useFontReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      const bebasLoaded = document.fonts.check('1rem "Bebas Neue"');
      const interLoaded = document.fonts.check('1rem "Inter"');

      if (bebasLoaded && interLoaded) {
        setReady(true);
      } else {
        Promise.all([
          document.fonts.load('1rem "Bebas Neue"'),
          document.fonts.load('1rem "Inter"'),
        ]).then(() => {
          setReady(true);
        });
      }
    });
  }, []);

  return ready;
}
