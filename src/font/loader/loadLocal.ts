import fontkit from '@pdf-lib/fontkit';
import { pipe } from 'fp-ts/lib/function';
import * as fs from 'fs';
import { FontManager } from '../manager';
import { FetchedFont, FetchFont } from '../types';

//const BASE_FONT_PATH = './src/demos';

export const loadFont = (fetchFont: FetchFont): FetchedFont => ({
  ...fetchFont,
  font: pipe(fetchFont.src, fs.readFileSync, fontkit.create),
});

/** Sync read filesystem fonts in Node.js */
export const loadLocalFonts = (families: FetchFont[]): FontManager =>
  FontManager.from(...families.map(loadFont));
