import { HMetrics, Measured } from './types';

const makeKey = ({ fontFamily, fontSize, text }: Measured): string =>
  fontFamily + '.' + fontSize + '.' + text;

/**
 * A fixed size horizontal font metrics cache. The key type is `Measured`.
 */
class Cache {
  private cache: Map<string, HMetrics> = new Map();

  private constructor(readonly maxSize = 10_000) {}

  get = (request: Measured): HMetrics | undefined => {
    const key = makeKey(request);
    return this.cache.has(key) ? this.cache.get(key) : undefined;
  };

  put = (metrics: HMetrics): this => {
    const request = metrics,
      key = makeKey(request);

    if (this.cache.size >= this.maxSize)
      this.cache.delete(this.cache.keys().next().value);

    this.cache.set(key, metrics);
    return this;
  };

  static from = (maxSize?: number) => new Cache(maxSize);
}

export const makeCache = Cache.from;

export type MetricsCache = Cache;
