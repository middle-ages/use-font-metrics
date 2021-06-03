import { FC } from 'react';
import { useHMetricsStyle } from '../../font';
import { FontLine } from './FontLine';
import { css, fillClass, fontSize, renderClasses } from './style';

export const MeasuredBox: FC<{
  idx: number;
  fontFamily: string;
  text: string;
}> = ({ idx, fontFamily, text }) => {
  const [metricsStyle, metrics] = useHMetricsStyle({
      fontFamily,
      fontSize,
      text,
    }),
    { advanceLeft, advanceRight } = metrics,
    [noMetricsClass, withMetricsClass] = renderClasses(metricsStyle),
    [left, right] = [Math.abs(advanceLeft), advanceRight].map(
      s => 1 + s + 'px',
    );

  return (
    <div className={css.padTop}>
      <FontLine {...{ idx, ...metrics, left, right }} />
      <div className={css.padLeft}>
        <div className={noMetricsClass}>
          <div className={fillClass(left, right)} />
          {text}
        </div>
        <div className={withMetricsClass}>{text}</div>
      </div>
    </div>
  );
};
