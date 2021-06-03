import { ReactNode } from 'react';
import { NestedCSSProperties as Style } from 'typestyle/lib/types';

export type Parent = { children: ReactNode };
export type Length = Style['width'];
