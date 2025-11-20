export const useEnvironment = () => {
  const isClient = typeof window !== 'undefined';
  const hostname = isClient ? window.location.hostname : '';

  const isDev = hostname === 'localhost' || hostname === '127.0.0.1';
  const isProd =
    hostname === 'crystal-vision.paranthese.studio' ||
    hostname === 'www.crystal-vision.paranthese.studio';
  const environment = isDev ? 'development' : 'production';

  return {
    isProd,
    isDev,
    environment,
  };
};
