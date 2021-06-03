import { pipe } from 'fp-ts/lib/function';
import * as AR from 'fp-ts/ReadonlyArray';
import { FC } from 'react';
import { css, fontSize } from './style';
import { Bold, Mono, Serif } from './StyledText';
import { Length } from './types';

const formatLength = (value: Length): string =>
  pipe((value ?? 0).toString(), Number.parseFloat, Math.abs).toFixed(1);

interface FontLine {
  idx: number;
  fontFamily: string;
  width: number;
  left: string;
  right: string;
}

export const FontLine: FC<FontLine> = ({
  idx,
  fontFamily,
  width,
  left,
  right,
}) => (
  <>
    <Serif>{idx + 1}</Serif>. <Bold>{fontFamily}</Bold>
    <span className={css.details}>
      {pipe(
        [
          ['fontSize', fontSize],
          ['width', width],
          ['advanceLeft', left],
          ['advanceRight', right],
        ] as const,
        AR.mapWithIndex((idx, [name, value]) => (
          <span key={idx} className={css.padLeft}>
            {name}: <Mono>{formatLength(value)}</Mono>px
          </span>
        )),
      )}
    </span>
  </>
);
