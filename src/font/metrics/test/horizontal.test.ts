import { hMeasure, makeMeasured } from '../../test/util';

describe('horizontal metrics', () => {
  const [measured1, measured2] = [makeMeasured(1), makeMeasured(2)],
    {
      advanceRight,
      text,
      width: width1,
      minX,
      maxX,
      advanceWidth,
    } = hMeasure(measured1),
    { width: width2 } = hMeasure(measured2);

  test('basic', () => expect(text).toBe(measured1.text));

  test('width ≥', () => expect(width1).toBeGreaterThan(0.4));

  test('width = Xₘₐₓ - Xₘᵢₙ', () => expect(width1).toBeCloseTo(maxX - minX, 5));

  test('text ≠ ø ⇒ Xₘₐₓ > Xₘᵢₙ', () => expect(maxX).toBeGreaterThan(minX));

  test('text ≠ ø ⇒ advanceWidth > width', () =>
    expect(advanceWidth).toBeGreaterThan(width1));

  test('bigger ⇒ wider', () => expect(width1).toBeLessThan(width2));

  test('appending text same font size ⇒ wider', () => {
    const { width: width3 } = hMeasure({
      ...measured1,
      text: measured1.text + '.',
    });
    expect(width3).toBeGreaterThan(width1);
  });

  test('appending to the right ⇒ no change in left edge', () => {
    const { minX: minX2 } = hMeasure({
      ...measured1,
      text: measured1.text + 'foo',
    });
    expect(minX).toBeCloseTo(minX2, 5);
  });

  test('appending to the left ⇒ no change in right edge', () => {
    const { advanceRight: advanceRight2 } = hMeasure({
      ...measured1,
      text: 'foo' + measured1.text,
    });
    expect(advanceRight).toBeCloseTo(advanceRight2, 5);
  });
});
