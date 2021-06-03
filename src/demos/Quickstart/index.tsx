import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { useHMetrics, withFontManager } from '../../font';
import { FontProvider } from '../../font/FontProvider';
import '../style/fonts.css';

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
  const { width } = useHMetrics({
    fontFamily: 'Roboto',
    fontSize: 16,
    text: 'Hello World',
  });
  return <div>Hello World 16px width: {width.toFixed(1)}px</div>;
}
