import { pipe } from 'fp-ts/lib/function';
import * as RA from 'fp-ts/ReadonlyArray';
import { FC } from 'react';
import { style } from 'typestyle';
import { textStyles } from './style';
import { Parent } from './types';

export const [Mono, Serif, Bold] = pipe(
  textStyles,
  RA.map(([name, fontFamily, css = {}]) => {
    const className = style({ fontFamily, ...css });
    const Text: FC<Parent> = ({ children }) => (
      <span {...{ className }}>{children}</span>
    );
    Text.displayName = name;
    return Text;
  }),
);
