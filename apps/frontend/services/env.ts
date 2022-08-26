declare global {
  interface Window {
    __ENV: Record<string, string>;
  }
}

const isServer = () => typeof window === "undefined" || !window.__ENV;

export const env = (key: string) => {
  if (!key) {
    throw new Error("You must provide a key to get an environment variable");
  }
  if (isServer()) {
    return process.env[key];
  }

  if (!key.startsWith("NEXT_PUBLIC_")) {
    throw new Error(`Environment variable "${key}" is not public`);
  }

  return window.__ENV[key];
};
