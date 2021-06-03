import useResizeObserver from '@react-hook/resize-observer';
import { useThrottle } from '@react-hook/throttle';
import { flow } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';
import { RefObject, useRef } from 'react';
export type Size = Record<'width' | 'height', number>;

const rectToSize = ({
  contentRect: { width, height },
}: ResizeObserverEntry): O.Option<Size> =>
  O.some({
    width,
    height,
  });

export const useThrottledSize = (): [
  RefObject<HTMLDivElement>,
  O.Option<Size>,
] => {
  const [size, setSize] = useThrottle<O.Option<Size>>(O.none),
    ref = useRef<HTMLDivElement>(null);

  useResizeObserver(ref, flow(rectToSize, setSize));

  return [ref, size];
};
