import fontkit from '@pdf-lib/fontkit';
import { Buffer } from 'buffer';
import { pipe } from 'fp-ts/lib/function';
import * as AR from 'fp-ts/lib/ReadonlyArray';
import { FontManager } from '../manager';
import { FetchedFont, FetchFont } from '../types';

export const readArrayBuffer = async (blob: Blob): Promise<Buffer> =>
  new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = (): void =>
      resolve(Buffer.from(reader.result as ArrayBuffer));
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });

export const loadFontAsync = async (
  request: FetchFont,
): Promise<FetchedFont> => {
  const raw = await fetch(request.src),
    blob = await raw.blob(),
    buffer = await readArrayBuffer(blob),
    font = fontkit.create(buffer);

  return { ...request, font };
};

export const loadFontsAsync = async (
  ...fonts: FetchFont[]
): Promise<FontManager> =>
  pipe(
    fonts,
    AR.map(loadFontAsync),
    Promise.all.bind(Promise),
    FontManager.fromPromise,
  );
