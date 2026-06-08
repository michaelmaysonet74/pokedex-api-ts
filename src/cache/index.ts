import { LRUCache } from "lru-cache";

const MAX_CACHE_SIZE = 2050;
const ONE_HOUR = 1000 * 60 * 60;

const options = {
  max: MAX_CACHE_SIZE,
  ttl: ONE_HOUR,
};

const cache = new LRUCache(options);

export const cacheResult = async <KeyT extends {}, ResultT>(
  key: KeyT,
  cb: () => Promise<ResultT>,
) => {
  console.log({ key, cacheSize: cache.size });
  if (cache.has(key)) {
    return cache.get(key) as ResultT;
  }

  const result = (await cb()) ?? undefined;
  cache.set(key, result);
  return result;
};
