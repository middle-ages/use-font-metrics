import { FC } from 'react';
import {
  bottomClass,
  dividerClass,
  inner,
  outerClass,
  textClass,
  topClass,
} from './style';
import { useFitCapsToHeight } from './useFitCapsToHeight';

const [topText, bottomText] = ['FONT', 'SIZE'];

const Divider = () => <div className={dividerClass} />;

export const Demo: FC = () => {
  const { ref, fontSize, lineHeight } = useFitCapsToHeight();

  const Text: FC = ({ children }) => (
    <div className={textClass} style={{ fontSize, lineHeight }}>
      {children}
    </div>
  );

  return (
    <>
      <div className={outerClass}>
        <div className={topClass} {...{ ref }} style={{ height: inner }}>
          <Text>{topText}</Text>
        </div>
        <Divider />
        <div className={bottomClass} style={{ height: inner }}>
          <Text>{bottomText}</Text>
        </div>
      </div>
    </>
  );
};
