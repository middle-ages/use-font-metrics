import { pipe } from 'fp-ts/lib/function';
import * as AR from 'fp-ts/lib/ReadonlyArray';
import { AtRule, Declaration, Expression, Parser } from 'shady-css-parser';
import { FetchFont } from '../types';

const parser = new Parser();

/**
 * CSS font face rule types are complex and difficult to mock. But we only use a
 * tiny fraction of this to read stylesheet font face definitions. These 4
 * interfaces include exactly what `sheetToFonts` requires. They are extracted
 * from the CSS types.
 */

export interface CssRule {
  cssText: string;
}

export interface CssFontFaceRule extends CssRule {
  type: number;
}

export interface CssRuleList {
  [Symbol.iterator](): IterableIterator<CssRule>;
}

export interface CssStyleSheet {
  rules: CssRuleList;
}

const parseExpressions = (cssText: string) =>
  (parser.parse(cssText).rules[0] as AtRule).rulelist?.rules as
    | Declaration[]
    | undefined;

const cleanUrl = (url: string) =>
    url.replace(/^url\("?/, '').replace(/"?\)$/, ''),
  cleanFamily = (url: string) => url.replaceAll('"', '');

const declarationToEntry = (d: Declaration) => [
  d.name === 'src' ? 'src' : 'fontFamily',
  pipe((d.value as Expression).text, d.name === 'src' ? cleanUrl : cleanFamily),
];

const ruleToFetchFont = ({ cssText }: CssFontFaceRule): FetchFont[] => {
  const declarations = parseExpressions(cssText);
  return declarations === undefined
    ? []
    : [pipe(declarations, AR.map(declarationToEntry), Object.fromEntries)];
};

const isFontFaceRule = (rule: CssRule): rule is CssFontFaceRule =>
  (rule as CssFontFaceRule).type === 5;

/** Parse all fonts to be fetched from a stylesheet. */
export const sheetToFonts = (styleSheet: CssStyleSheet): readonly FetchFont[] =>
  pipe(
    styleSheet.rules,
    Array.from,
    AR.filter(isFontFaceRule),
    AR.chain(ruleToFetchFont),
  );
