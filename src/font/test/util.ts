import { pipe } from 'fp-ts/lib/function';
import * as RA from 'fp-ts/ReadonlyArray';
import { loadFont } from '../loader';
import { measureText } from '../metrics';
import { FetchFont, HMetricKeys, HMetrics, Measured } from '../types';

const BASE = 'src/demos/style/fonts';

export const makeMeasured = (i: number): Measured => ({
    text: RA.replicate(i, 'x').join(''),
    fontSize: i,
    fontFamily: 'Roboto',
  }),
  makeHMetrics = (i: number): HMetrics => ({
    ...makeMeasured(i),
    ...pipe(
      HMetricKeys,
      RA.map(k => [k, i]),
      Object.fromEntries,
    ),
  }),
  fetchFont: FetchFont = {
    fontFamily: 'Roboto',
    src: BASE + '/Roboto-Regular.ttf',
  },
  fetchInterFont: FetchFont = {
    fontFamily: 'Inter',
    src: BASE + '/Inter-Regular.otf',
  },
  load = () => loadFont(fetchFont);

export type HMeasure = (measured: Measured) => HMetrics;

export const hMeasure: HMeasure = measureText(load().font);
