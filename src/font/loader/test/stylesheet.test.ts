import {
  CssRule,
  CssRuleList,
  CssStyleSheet,
  sheetToFonts,
} from '../styleSheet';

const FONT = 'Foo',
  SRC = 'Bar',
  RULE = `@font-face{font-family:${FONT};src:url(${SRC})}`;

class MockFontFaceRule implements CssRule {
  readonly cssText = RULE;
  readonly type = 5;
}

const mockFontFaceRules: CssRule[] = [new MockFontFaceRule()];

class MockCSSRuleList implements CssRuleList {
  *[Symbol.iterator]() {
    for (const rule of mockFontFaceRules) yield rule;
  }
}

export class MockCSSStyleSheet implements CssStyleSheet {
  readonly rules: CssRuleList = new MockCSSRuleList();
}

describe('sheetToFonts', () => {
  const { fontFamily, src } = sheetToFonts(new MockCSSStyleSheet())[0];

  test('family', () => expect(fontFamily).toBe(FONT));
  test('src', () => expect(src).toBe(SRC));
});
