import { flow, pipe } from 'fp-ts/lib/function';
import * as AR from 'fp-ts/ReadonlyArray';
import * as TU from 'fp-ts/Tuple';
import { square } from '../../util';
import { makeCache, MetricsCache } from '../metricsCache';
import { HMetrics, Measured } from '../types';
import { makeHMetrics, makeMeasured } from './util';

const check = (iut: MetricsCache, m: Measured, h: HMetrics | undefined) => {
  const res = pipe(m, iut.get, expect);
  if (h === undefined) return res.toBeUndefined();
  else return res.toStrictEqual(h);
};

const makeIut = (max?: number): MetricsCache => makeCache(max),
  makeFull = () => makeIut(2).put(makeHMetrics(1)).put(makeHMetrics(2));

describe('metricsCache', () => {
  const [[h1, m1], [h2, m2], [h3, m3]] = pipe(
    [1, 2, 3],
    AR.map(flow(square, TU.bimap(makeMeasured, makeHMetrics))),
  );

  test('basic hit', () => check(makeIut().put(h1), m1, h1));

  test('1st item hit', () => check(makeIut().put(h1).put(h2), m1, h1));
  test('2nd item hit', () => check(makeIut().put(h1).put(h2), m2, h2));

  test('miss when empty', () => check(makeIut(), m1, undefined));
  test('basic miss', () => check(makeIut().put(h1), m2, undefined));
  test('miss when full', () => check(makeIut().put(h1).put(h2), m3, undefined));

  test('eviction on full', () => check(makeFull().put(h3), m1, undefined));
  test('only one evicted', () => check(makeFull().put(h3), m2, h2));
  test('new replaces old', () => check(makeFull().put(h3), m3, h3));

  describe('cache key depends on all Measured fields', () => {
    test('text', () =>
      check(makeIut().put(h1), { ...m1, text: 'DOES NOT EXIST' }, undefined));

    test('fontFamily', () =>
      check(
        makeIut().put(h1),
        { ...m1, fontFamily: 'DOES NOT EXIST' },
        undefined,
      ));

    test('fontSize', () =>
      check(makeIut().put(h1), { ...m1, fontSize: 999_999 }, undefined));
  });
});
