import { pipe } from 'fp-ts/lib/function';
import * as AR from 'fp-ts/lib/ReadonlyArray';
import { FontManager } from '../manager';
import { loadFontAsync } from './loadRemote';
import { sheetToFonts } from './styleSheet';

export * from './loadLocal';

/** Loads async all fonts that appear in stylesheets, returns a promise of a
 * `FontManager` with all fonts loaded */
export const loadStyleSheetFonts = (): Promise<FontManager> => {
  const res = pipe(
    window.document.styleSheets,
    Array.from,
    AR.chain(sheetToFonts),
    AR.map(loadFontAsync),
    Promise.all.bind(Promise),
    FontManager.fromPromise,
  );
  return res;
};

/** Runs `f` async with a loaded font manager, created by loading
 *  all the font faces found in all loaded stylesheets */
export const withFontManager = <T>(
  f: (fontManager: FontManager) => T,
): Promise<T> => loadStyleSheetFonts().then(f);
