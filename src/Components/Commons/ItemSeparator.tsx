import React from 'react';
import {View} from 'react-native';
import {Dimens} from '@Utilities/Styles/GlobalStyles';

export default () => {
  const componentSize = Dimens.padding / 2;
  return (
    <View
      style={{
        width: componentSize,
        height: componentSize * 3,
      }}
    />
  );
};
