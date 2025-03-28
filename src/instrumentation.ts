import type NodeCache from 'node-cache';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Cache = (await import('node-cache')).default;

    const config: NodeCache.Options = {};

    global.cacheAccessToken = new Cache(config);

    await import('pino');
    // @ts-expect-error no types
    await import('next-logger');
  }
}
