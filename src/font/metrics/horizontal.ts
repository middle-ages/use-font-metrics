import { Font } from '@pdf-lib/fontkit';
import { divide, multiply } from 'fp-ts-std/Number';
import { flow, pipe } from 'fp-ts/lib/function';
import * as RE from 'fp-ts/ReadonlyRecord';
import { HMetrics, Measured } from '../types';

export const measureText =
  (font: Font) =>
  (measured: Measured): HMetrics => {
    const [{ fontSize, text }, { unitsPerEm }] = [measured, font],
      { advanceWidth, bbox } = font.layout(text),
      { minX, maxX } = bbox,
      uemToPx = flow(multiply(fontSize), divide(unitsPerEm)),
      width = bbox.width,
      advanceLeft = -1 * minX,
      advanceRight = advanceWidth - width - minX;

    return {
      ...measured,
      ...pipe(
        { advanceWidth, width, minX, maxX, advanceLeft, advanceRight },
        RE.map(uemToPx),
      ),
    };
  };
