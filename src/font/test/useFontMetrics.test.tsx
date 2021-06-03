/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { curry2 } from 'fp-ts-std/Function';
import { Lazy } from 'fp-ts/lib/function';
import { FC, ReactNode } from 'react';
import {} from '..';
import { FontManager } from '../manager';
import {
  FontContext,
  useFontContext,
  useMacBaseline,
  useHMetricsStyle,
  useWinBaseline,
} from '../useFontMetrics';
import { load } from './util';

const Provider: FC = ({ children }) => (
  <FontContext.Provider value={FontManager.from(load())}>
    {children}
  </FontContext.Provider>
);

const Component: FC<{ f: Lazy<ReactNode> }> = ({ f }) => <>{f()}</>;

test('useFontContext', () => {
  render(
    <Provider>
      <Component f={() => useFontContext().families.join(',')} />
    </Provider>,
  );
  expect(screen.getByText('Roboto')).toBeTruthy();
});

const useRobotoBaseline = curry2(useMacBaseline)('Roboto');

describe('useFontBaseline', () => {
  test('useWinBasline', () => {
    render(
      <Provider>
        <Component f={() => useWinBaseline('Roboto', 16).toFixed(1)} />
      </Provider>,
    );
    expect(screen.getByText('17.6')).toBeTruthy();
  });

  const extractBaselines = () =>
    (document.body.firstElementChild?.innerHTML ?? '-1:-1')
      .split(':')
      .map(parseFloat);

  test('Roboto Win baseline ≠ Mac baseline', () => {
    render(
      <Provider>
        <Component f={() => useWinBaseline('Roboto', 16).toFixed(1)} />
        :
        <Component f={() => useMacBaseline('Roboto', 16).toFixed(1)} />
      </Provider>,
    );
    const [a, b] = extractBaselines();
    expect(a).not.toBe(b);
  });

  test('bigger font ⇒ taller baseline', () => {
    render(
      <Provider>
        <Component f={() => useRobotoBaseline(16).toFixed(1)} />
        :
        <Component f={() => useRobotoBaseline(18).toFixed(1)} />
      </Provider>,
    );

    const [a, b] = extractBaselines();
    expect(b).toBeGreaterThan(a);
  });
});

test('useTextBoxMetrics', () => {
  render(
    <Provider>
      <Component
        f={() => {
          const [style, metrics] = useHMetricsStyle({
            fontFamily: 'Roboto',
            fontSize: 16,
            text: 'foo',
          });
          return style.fontSize + ':' + metrics.fontSize;
        }}
      />
    </Provider>,
  );
  expect(screen.getByText('16px:16')).toBeTruthy();
});
