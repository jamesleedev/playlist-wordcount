import type NodeCache from 'node-cache';

declare global {
  // eslint-disable-next-line no-var
  var cacheAccessToken: NodeCache;
}
