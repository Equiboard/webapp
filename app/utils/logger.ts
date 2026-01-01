import pino from 'pino';

const isBrowser = typeof window !== 'undefined';
const level = 'debug';

export const logger = isBrowser
    ? pino({
          level,
          browser: {
              asObject: true,
          },
      })
    : pino({
          level,
      });
