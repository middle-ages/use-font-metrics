import { constant, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import * as TU from 'fp-ts/Tuple';
import { useFontContext } from '../../font';
import { fontFamily } from './style';
import { useThrottledSize } from './useThrottledSize';

export const useFitCapsToHeight = () => {
  const [ref, { height }] = pipe(
    useThrottledSize(),
    pipe({ width: 0, height: 0 }, constant, O.getOrElse, TU.mapSnd),
  );

  const { capHeight, unitsPerEm } = useFontContext().get(fontFamily),
    fontSize = height / (capHeight / unitsPerEm) + 'px',
    lineHeight = height + 'px';

  return { ref, fontSize, lineHeight } as const;
};
