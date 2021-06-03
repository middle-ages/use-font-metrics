import { pipe } from 'fp-ts/lib/function';
import * as RA from 'fp-ts/ReadonlyArray';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { FontContext, withFontManager } from '../../font';
import '../style/fonts.css';
import { Description } from './Description';
import { GitHubIcon } from './GitHubIcon';
import { MeasuredBox } from './MeasuredBox';

const text = 'Lorem Ipsum';

withFontManager(
  fontManager =>
    void ReactDOM.render(
      <StrictMode>
        <FontContext.Provider value={fontManager}>
          <App />
        </FontContext.Provider>
      </StrictMode>,
      document.getElementById('root'),
    ),
);

function App() {
  return (
    <div style={{ fontFamily: 'Roboto' }}>
      <div style={{ maxWidth: '45em' }}>
        <GitHubIcon />
        <Description />
      </div>
      {pipe(
        ['FiraCode Retina', 'Inter', 'PTSerif', 'Go', 'Roboto'],
        RA.mapWithIndex((idx, fontFamily) => (
          <MeasuredBox {...{ fontFamily, idx, text }} key={fontFamily} />
        )),
      )}
    </div>
  );
}
