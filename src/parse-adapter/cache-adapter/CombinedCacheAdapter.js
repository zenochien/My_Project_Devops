const { get: _get, map: _map } = require('lodash');
const { InMemoryCacheAdapter, RedisCacheAdapter } = require('parse-server');

const IN_MEM_ADAPTER = 'mem';
const REDIS_ADAPTER = 'redis';
const SCHEMA_CACHE_PREFIX = '__SCHEMA';

const getAdapter = (combinedCacheAdapter, cacheKey) => {
  const keyAdapter = (cacheKey || '').indexOf(SCHEMA_CACHE_PREFIX) >= 0 ? IN_MEM_ADAPTER : REDIS_ADAPTER;
  return _get(combinedCacheAdapter, `__adapters.${keyAdapter}`);
};

/**
 * Combine InMemoryCacheAdapter & RedisCacheAdapter to decrease network traffic (in / out).
 * InMemoryCacheAdapter: cache schema.
 * RedisCacheAdapter: other cache.
 */
class CombinedCacheAdapter {
  constructor(redisCtx, redisTTL, { schemaCacheTTL, cacheMaxSize }) {
    this.__adapters = {};
    this.__adapters[REDIS_ADAPTER] = new RedisCacheAdapter(redisCtx, redisTTL);
    this.__adapters[IN_MEM_ADAPTER] = new InMemoryCacheAdapter({
      ttl: schemaCacheTTL,
      maxSize: cacheMaxSize,
    });
  }

  get(key) {
    const cacheAdapter = getAdapter(this, key);
    return cacheAdapter.get(key);
  }

  put(key, value) {
    const cacheAdapter = getAdapter(this, key);
    return cacheAdapter.put(key, value);
  }

  del(key) {
    const cacheAdapter = getAdapter(this, key);
    return cacheAdapter.del(key);
  }

  clear() {
    return Promise.all(
      _map(this.__adapters, (cacheAdapter) => {
        return cacheAdapter.clear();
      }),
    );
  }
}

module.exports.default = CombinedCacheAdapter;
module.exports.CombinedCacheAdapter = CombinedCacheAdapter;
