import React, { FC } from 'react';
import { View } from 'react-native';

interface SpacerProps {
  width?: number;
  height?: number;
}

const Spacer: FC<SpacerProps> = ({ width = 0, height = 0 }) => {
  return <View style={{ width, height }} />;
};

export default Spacer;
