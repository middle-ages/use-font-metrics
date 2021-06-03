import { Font } from '@pdf-lib/fontkit';

/** * A request to fetch some font, local or remote */
export interface FetchFont {
  fontFamily: string;
  src: string;
}

/** A fetched font */
export interface FetchedFont extends FetchFont {
  font: Font;
}

/**
 * A string of text and its font size/family. Members of this type can be
 * measured for their font metrics by a font manager, assuming it has loaded
 * the given font family.
 */
export interface Measured {
  fontFamily: string;
  fontSize: number;
  text: string;
}

export type MeasuredKey = keyof Measured;

/** The result of the “measure text” operation */
export interface Measure extends Measured {
  width: number;
  textIndent: number;
}

export const HMetricKeys = [
  'width',
  'minX',
  'maxX',
  'advanceLeft',
  'advanceRight',
  'advanceWidth',
] as const;

export type HMetricKey = typeof HMetricKeys[number];

/** Horizontal font metrics of the measured text */
export type HMetrics = Measured & Record<HMetricKey, number>;
