import { em } from 'csx';
import { stylesheet } from 'typestyle';

export const fontFamily = 'PTSerif',
  text = 'Metrics',
  fontSize = 96,
  lineHeight = 2,
  border = 8;

const lineHeightEm = em(lineHeight);

export const css = stylesheet({
  parent: {
    width: '100%',
    background: 'grey',
  },
  child: {
    fontFamily,
    fontSize,
    background: 'magenta',
    position: 'relative',
    width: 'fit-content',
    height: lineHeightEm,
    lineHeight: lineHeightEm,
    border: `${border}px solid black`,
    paddingLeft: '0.5ex',
    paddingRight: '0.5ex',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  baseline: {
    background: 'cyan',
    position: 'absolute',
    top: 0,
    left: 0,
    width: `100%`,
  },
  xHeight: {
    background: 'yellow',
    position: 'absolute',
    left: 0,
    top: 0,
    width: `100%`,
  },
  textClass: { position: 'relative' },
});
