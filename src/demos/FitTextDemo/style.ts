import { style as css } from 'typestyle';

export const margin = '8px',
  border = '12px',
  divider = '14px';

export const fontFamily = 'Inter Medium';

export const outer = `calc(100% - 2 * ${border} - 2 * ${margin})`,
  inner = `calc(50% - ${divider} / 2)`;

export const outerClass = css({
    height: outer,
    border: `${border} solid magenta`,
    margin,
  }),
  dividerClass = css({ height: divider, background: 'magenta' }),
  textClass = css({ fontFamily }),
  topClass = css({ background: 'cyan' }),
  bottomClass = css({ background: 'black', color: 'yellow' });
