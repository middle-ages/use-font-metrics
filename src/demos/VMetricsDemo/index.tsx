import { Lazy } from 'fp-ts/lib/function';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { useFontBaseline, useFontContext, withFontManager } from '../../font';
import { FontProvider } from '../../font/FontProvider';
import '../style/fonts.css';
import { css, fontFamily, fontSize, lineHeight } from './style';

const isWin: Lazy<boolean> = () => navigator.appVersion.indexOf('Win') != -1;

withFontManager(
  fontManager =>
    void ReactDOM.render(
      <StrictMode>
        <FontProvider {...{ fontManager }}>
          <App />
        </FontProvider>
      </StrictMode>,
      document.getElementById('root'),
    ),
);

function App() {
  const baselinePx =
      useFontBaseline(fontFamily, fontSize, !isWin, lineHeight) + 'px',
    { xHeight, unitsPerEm } = useFontContext().get(fontFamily),
    xHeightPx = fontSize * (xHeight / unitsPerEm) + 'px';

  return (
    <div className={css.parent}>
      <div className={css.child}>
        <div className={css.baseline} style={{ height: baselinePx }} />
        <div
          className={css.xHeight}
          style={{
            top: `calc(${baselinePx} - ${xHeightPx})`,
            height: xHeightPx,
          }}
        />
        <div className={css.textClass}>Metrics</div>
      </div>
    </div>
  );
}
