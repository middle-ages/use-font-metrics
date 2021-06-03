import { FC } from 'react';
import { Mono } from './StyledText';

export const Description: FC = () => (
  <div style={{ maxWidth: '36em' }}>
    <h1 style={{ textAlign: 'center' }}>
      Precise Horizontal Text Control Using <Mono>use-font-metrics</Mono>
    </h1>
    <p>
      Below you can see a pair of <i>Lorem Ipsum</i> boxes for each font. The
      first is the default browser render, the second uses font metrics to
      tighten the box around the text.
    </p>
    <ul>
      <li>
        Note how the default render will add horizontal gaps around the text.
        This is the distance, defined per glyph, you must advance before placing
        the next glyph.
      </li>
      <li>
        The second box shows the text styled with the return value of{' '}
        <Mono>useTextBoxMetrics</Mono> - the box fits as tight as possible.
      </li>
    </ul>
  </div>
);
