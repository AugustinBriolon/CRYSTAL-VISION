export const isLocalhost = () => {
  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.includes('192.168')
  );
};

export const isProduction = () => {
  return window.location.hostname.includes('crystal-vision.paranthese.studio');
};
