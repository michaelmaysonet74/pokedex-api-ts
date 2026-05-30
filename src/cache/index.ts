import { LRUCache } from "lru-cache";

const MAX_CACHE_SIZE = 2050;
const ONE_HOUR = 1000 * 60 * 60;

const options = {
  max: MAX_CACHE_SIZE,
  ttl: ONE_HOUR,
};

export default new LRUCache(options);
