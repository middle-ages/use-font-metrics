# use-font-metrics - React hooks for font metrics

## Features

- Measure text width, font baseline, and other font metrics, for [Win or Typo](https://vertical-metrics.netlify.app/) metrics on node.js and in the browser
- Metrics extracted from font files using [@pdf-lib/fontkit](https://www.npmjs.com/package/@pdf-lib/fontkit). Does not use the HTML5 [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

## Install

```
npm install use-font-metrics
```

## Quickstart

Lets write a React component that measures the width of `Hello World` rendered in `Inter 16px`:

1. Place a stylesheet referencing the font at `src/fonts.css`:
   ```
   @font-face {
     font-family: Inter;
     src: url(./fonts/Inter-Regular.otf);
   }
   ```
1. Add the font file to your bundle - place the `otf` font file at `src/fonts/Inter-Regular.otf`. You can download it from [google fonts](https://fonts.google.com/specimen/Inter). You could also set the font source to some cloud font provider. Metrics will be available for every font found in a `@font-face` rule.
1. Wrap your component with a `FontManager` context. Using the top-level `src/index.tsx` for example:
   ```
   import { withFontManager, FontProvider } from 'use-font-metrics';
   import './fonts.css'; // @font-face fonts will be loaded

   withFontManager(
     fm => void ReactDOM.render(
       <FontProvider fontManager={fm}>
         <App />
       </FontProvider>
     ),
     document.getElementById('root'),
   );
   ```
1. With a font manager in context, any component under `<FontProvider>` can use the font metric hooks:

```
import { useHMetrics } from 'use-font-metrics';

export const MyComponent = () => {
  const { width } = useHMetrics({
    fontFamily: 'Inter',
    fontSize: 16, // px
    text: 'Hello World',
  });
  return <div>“Hello World” width: {width}px</div>;
}

```

![Demo screenshots](img/demos.png)

## Demos

1. [Quickstart](http://github.com/middle-ages/use-font-metrics/src/demos/Quickstart.html) - the Quickstart example ([source](tree/main/src/demos/Quickstart/index.tsx]))
1. [Horizontal Metrics](http://github.com/middle-ages/use-font-metrics/src/demos/HMetricsDemo.html) - measure text width and chop off `advanceWidth` ([source](tree/main/src/demos/HMetricsDemo/MeasuredBox.tsx]))
1. [Vertical Metrics](http://github.com/middle-ages/use-font-metrics/src/demos/VMetricsDemo.html) - display font `baseline` and `xHeight` ([source](tree/main/src/demos/VMetricsDemo/index.tsx]))
1. [Fit Text Height](http://github.com/middle-ages/use-font-metrics/src/demos/FitTextDemo.html) - Resize the browser window to see text `capHeight` sizing to DOM element height ([source](tree/main/src/demos/FitTextHeight]))

## Motivation

Some HTML layout problems require font metrics. For example:

- Fit text to an area
- Align text horizontally despite the tiny `advanceLeft`/`advanceRight` browsers add around glyphs
- Resize multi-font text, required because equal `fontSize` does not imply equal `capHeight`

There are hacks for doing this with no font metrics, and without hurting accuracy much, but there are also hacks that allow you to scratch your upper back with your foot. These are all highly sub-optimal, so W3C added [text metrics](https://www.w3.org/TR/2dcontext2/#textmetrics) to the Canvas API.

[Support](https://caniuse.com/?search=textmetrics) as of 2021 AD is still incomplete, and there are some other issues:

- Requires Canvas. Would be nice to get these directly from the font file. Should not cost anything because we are surely loading the font if we need its metrics
- API encapsulates away the distinction between [the two sets of metrics browsers use](https://vertical-metrics.netlify.app/), as explained [here](https://glyphsapp.com/learn/vertical-metrics)
- Sometime you need _all_ the metrics

This is a stopgap until browsers do this.

## How It Works

A tiny React/Typescript wrapper around [this](https://www.npmjs.com/package/@pdf-lib/fontkit) fork of the [fontkit](https://github.com/foliojs/fontkit) library, wired to load remote fonts, and pass their metrics to any inquiring hooks.

## Usage

### Loading Fonts

The hooks expect a `FontContext` in scope, holding a `FontManager`. The font manager caches loaded fonts.

The easiest way to load the fonts and provide the context is shown in the Quickstart above: add your fonts to a stylesheet, use `withFontManager` to create a font manager, and `<FontProvider>` to inject it into the context. For other use cases you may want to create your own font manager and explicitly set loaded fonts.

#### Node
In Node you can load local fonts:
```
import { FetchFont, FontManager, loadLocalFonts } from 'use-font-metrics';

const fonts: FetchFont[] = [
  {
    fontFamily: 'myfont',
    src: 'path/to/font.ttf',
  },
];
const fontManager: FontManager = loadLocalFonts(...fonts);
```
#### Browser
In the browser you can load remote fonts using `loadFontsAsync`:
```
import { FontManager, loadFontsAsync } from 'use-font-metrics';

const fonts: FetchFont[] = [
  {
    fontFamily: 'myfont',
    src: 'http://url/of/font.ttf',
  },
];
const fontManager: Promise<FontManager> = loadFontsAsync(...fonts);
```
If your fonts are already defined in the `@font-face` rules of some loaded stylesheet, you can create a font manager from all the rules of all loaded stylesheets using:
```
import { FontManager, loadStyleSheetFonts } from 'use-font-metrics';

const fontManager: FontManager = loadStyleSheetFonts();
```

### Hooks

You can access the loaded fonts and their metrics directly from the font manager, as in this [demo](tree/main/src/demos/FitTextHeight]), or you can use one of the hooks:

* `useWinBaseline/useMacBaseline(fontFamily: string, fontSize: number, lineHeight: number = 1)` - distance between top of text line and font baseline
* `useHMertics({fontFamily: string; fontSize: number, text: string})` - returns text horizontal measurement in a record with numeric `width` and `textIndent` keys in pixel
* `useHMerticsStyle({fontFamily: string; fontSize: number; text: string;})` - same as `useHMetrics` but returns a CSS Style object that you can use for the element of the measured text

### See Also

* [fontkit](https://github.com/foliojs/fontkit)
