import { em, px } from 'csx';
import * as RE from 'fp-ts/Record';
import { Context, createContext, useContext } from 'react';
import { NestedCSSProperties as Style } from 'typestyle/lib/types';
import { FontManager } from './manager';
import { DefaultLineHeightEm } from './metrics';
import { HMetrics, Measure, Measured } from './types';

export const FontContext: Context<FontManager> = createContext(
  FontManager.from(),
);

export const useFontContext = () => useContext(FontContext);

/**
 * Compute vertical distance from line top to baseline
 *
 * Requires a `FontContext` in scope.
 *
 * Computed using: `½ × (lineHeight + ascent + lineGap - descent)`
 *
 * @param fontFamily must be loaded into the font manager
 * @param fontSize
 * @param fromTypoMetrics if true, use “TypoMetrics”. If false, uses
 * “WinMetrics” as does Chrome on windows. Default is false
 * @returns distance in pixels
 */

export const useFontBaseline = (
  fontFamily: string,
  fontSize: number,
  fromTypoMetrics = false,
  lineHeight = DefaultLineHeightEm,
): number =>
  useFontContext().computeBaseline(
    fontFamily,
    fontSize,
    fromTypoMetrics,
    lineHeight,
  );

export const useWinBaseline = (fontFamily: string, fontSize: number) =>
  useFontBaseline(fontFamily, fontSize, false);

export const useMacBaseline = (fontFamily: string, fontSize: number) =>
  useFontBaseline(fontFamily, fontSize, true);

export const useHMetrics = (measured: Measured): Measure => {
  const { text, fontFamily, fontSize, width, advanceLeft } =
    useFontContext().measure(measured);
  return {
    text,
    fontFamily,
    fontSize,
    width,
    textIndent: advanceLeft,
  };
};

export const useHMetricsStyle = (
  measured: Measured,
  lineHeightEm = DefaultLineHeightEm,
): [Style, HMetrics] => {
  const measure = useHMetrics(measured),
    { fontSize, fontFamily, width: width, textIndent } = measure;

  return [
    {
      fontFamily,
      height: em(lineHeightEm),
      lineHeight: em(lineHeightEm),
      ...RE.map(px)({ width, fontSize, textIndent }),
    },
    useFontContext().measure(measured),
  ];
};
