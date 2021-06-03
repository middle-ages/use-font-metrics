import { fetchFont } from '../../test/util';
import { loadFont } from '../loadLocal';

describe('loadLocal', () => {
  const fetchedFont = loadFont(fetchFont);

  test('basic', () => expect(fetchedFont.font.familyName).toBe('Roboto'));
});
