import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { FontContext, withFontManager } from '../../font';
import '../style/fonts.css';
import { Demo } from './Demo';

withFontManager(fontManager => {
  ReactDOM.render(
    <StrictMode>
      <FontContext.Provider value={fontManager}>
        <Demo />
      </FontContext.Provider>
    </StrictMode>,
    document.getElementById('root'),
  );
});
