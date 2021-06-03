import { FC } from 'react';
import { FontManager } from './manager';
import { FontContext } from './useFontMetrics';

export const FontProvider: FC<{ fontManager: FontManager }> = ({
  children,
  fontManager,
}) => {
  return (
    <FontContext.Provider value={fontManager}>{children}</FontContext.Provider>
  );
};
