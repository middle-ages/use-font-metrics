import { pipe } from 'fp-ts/lib/function';
import { loadFont } from '../../loader';
import { fetchFont } from '../../test/util';
import { computeTypoBaseLine, computeWinBaseLine } from '../vertical';

describe('vertical metrics', () => {
  const { font } = loadFont(fetchFont);

  test('Roboto win baseline value', () =>
    pipe(font, computeWinBaseLine, expect).toMatchInlineSnapshot(`2253`));

  test('Roboto typo baseline value', () =>
    pipe(font, computeTypoBaseLine, expect).toMatchInlineSnapshot(`2099`));
});
