import { loadLocalFonts } from '../loader';
import { FontManager } from '../manager';
import { FetchedFont } from '../types';
import { fetchFont, fetchInterFont, load, makeMeasured } from './util';

const makeIut = (...fetched: FetchedFont[]) =>
  FontManager.from(load(), ...fetched);

describe('font manager', () => {
  const family = fetchFont.fontFamily;

  test('basic', () => expect(makeIut().families).toStrictEqual([family]));

  test('found', () => expect(makeIut().get(family).familyName).toBe(family));

  test('undefined font family', () =>
    expect(() => makeIut().get(undefined as any)).toThrowError(
      'Requested font but family name is undefined.',
    ));

  test('not found', () =>
    expect(() => makeIut().get('foo')).toThrowError(
      'No font found for family name “foo”. These families have been loaded: “Roboto”',
    ));

  test('not found and none loaded', () =>
    expect(() => FontManager.from().get('foo')).toThrowError(
      'No font found for family name “foo”. No font families have been loaded.',
    ));

  test('measure', () =>
    expect(makeIut().measure(makeMeasured(1)).fontFamily).toBe(family));

  describe('computeBaseline', () => {
    test('computeTypoBaseline', () =>
      expect(makeIut().computeBaseline('Roboto', 16, true)).toBeCloseTo(
        16.4,
        2,
      ));
    test('computeWinBaseline', () =>
      expect(makeIut().computeBaseline('Roboto', 16)).toBeCloseTo(17.6, 2));
  });

  test('load two fonts', () =>
    expect(loadLocalFonts([fetchFont, fetchInterFont]).families).toStrictEqual([
      'Roboto',
      'Inter',
    ]));
});
