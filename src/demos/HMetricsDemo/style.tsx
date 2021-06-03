import { classes, style, stylesheet } from 'typestyle';
import { NestedCSSProperties as Style } from 'typestyle/lib/types';
import { Length } from './types';

export const fontSize = 48;

const noMetricsClass = style({
    position: 'relative',
    whiteSpace: 'nowrap',
    borderLeft: '1px solid red',
    borderRight: '1px solid blue',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    background: '#f0f0f0',
    marginTop: '1rem',
    marginBottom: '3rem',
    marginRight: '1ex',
    display: 'inline-block',
    lineHeight: '1.5em',
    fontSize,
    $nest: {
      '&:after': {
        content: `'Default browser render'`,
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'Roboto',
        fontSize: '1rem',
        lineHeight: '1.5rem',
      },
    },
  }),
  withMetricsClass = classes(
    noMetricsClass,
    style({
      $nest: {
        '&:after': { content: `'Width+indent set from font metrics'` },
      },
    }),
  );

export const css = stylesheet({
  details: { color: '#666', padding: '1ex' },
  padLeft: { paddingLeft: '1ex' },
  padTop: { paddingTop: '1rem' },
  fill: {
    display: 'inline-block',
    $nest: {
      '&::before': {
        content: `''`,
        position: 'absolute',
        top: 0,
        left: '-1px',
        background: '#ff000070',
        height: '100%',
      },
      '&:after': {
        content: `''`,
        position: 'absolute',
        top: 0,
        background: '#0000ff70',
        height: '100%',
      },
    },
  },
});

export const renderClasses = ({ fontSize, fontFamily, ...rest }: Style) => {
  const common = style({ fontSize, fontFamily });
  return [
    classes(noMetricsClass, common),
    classes(withMetricsClass, common, style(rest)),
  ];
};

export const fillClass = (advanceLeft: string, advanceRight: string) =>
  classes(
    css.fill,
    style({
      $nest: {
        '&:before': { width: advanceLeft },
        '&:after': {
          left: `calc(100% - ${advanceRight} + 1px)`,
          width: `calc(${advanceRight} - 1px)`,
        },
      },
    }),
  );

export const leftIndentMark = (width: Length = 0): Style => ({
  $nest: { '&:before': { width } },
});

export const textStyles: [string, string, Style | undefined][] = [
  ['Mono', 'FiraCode Retina', { color: 'black', paddingLeft: '0.1ex' }],
  ['Serif', 'PTSerif', undefined],
  ['Bold', 'Roboto', { color: 'black', fontWeight: 600 }],
];
