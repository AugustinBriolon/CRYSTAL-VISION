export const useTouchDevice = () => {
  const isClient = typeof window !== 'undefined';
  const isTouchDevice = isClient && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  return isTouchDevice;
};
