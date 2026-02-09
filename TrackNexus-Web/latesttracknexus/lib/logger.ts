/**
 * Development logger utility
 * Logs only in development environment to keep production console clean
 */
export const devLog = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[DEV]', ...args);
    }
  },

  info: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.info('[DEV INFO]', ...args);
    }
  },

  warn: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[DEV WARN]', ...args);
    }
  },

  // Always log errors regardless of environment
  error: (...args: any[]) => {
    console.error('[ERROR]', ...args);
  }
};
