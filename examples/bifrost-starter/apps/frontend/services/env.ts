declare global {
  interface WindowWithEnv extends Window {
    __ENV: Record<string, string>;
  }
}

const isClientWithEnv = (window: Window): window is WindowWithEnv =>
  '__ENV' in window;

export const env = (key: string) => {
  if (key === '') {
    throw new Error('You must provide a key to get an environment variable');
  }

  if (typeof window === 'undefined' || !isClientWithEnv(window)) {
    return process.env[key];
  }

  if (!key.startsWith('NEXT_PUBLIC_')) {
    throw new Error(`Environment variable "${key}" is not public`);
  }

  return window.__ENV[key];
};
