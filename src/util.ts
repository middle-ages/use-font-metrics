export type HasTotalKey<K extends string, V> = { [k in K]: V };
export type HasPartialKey<K extends string, V> = { [k in K]?: V };

export type HasKey<K extends string, V> =
  | HasTotalKey<K, V>
  | HasPartialKey<K, V>;

export const pluck =
  <K extends string>(k: K) =>
  <T extends HasKey<K, T[K]>>(o: T): T[K] =>
    o[k];

export const square = <T>(o: T): [T, T] => [o, o];
