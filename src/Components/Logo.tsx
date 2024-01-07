import React from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {ThemeText} from '@Utilities/Styles/GlobalStyles';
import AssetsManager from '@Assets/AssetsManager';

const asset = AssetsManager('Logo-Logo');

type ILogoProps = {
  style?: ViewStyle;
  isSmall?: boolean;
};
const Logo = (props: ILogoProps) => {
  return (
    <View style={[styles.RootComponent, props.style]}>
      <Image
        source={asset}
        style={[
          props.isSmall ? styles.ImageStyleSmall : styles.ImageStyleLarge,
        ]}
      />
      <Text
        style={[
          props.isSmall ? ThemeText.Title_Bold : ThemeText.H2_Bold,
          styles.TextAdjustment,
        ]}>
        SIMS PPOB
      </Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  RootComponent: {flexDirection: 'row', justifyContent: 'center'},
  ImageStyleLarge: {marginRight: 10, width: 32, height: 32},
  ImageStyleSmall: {marginRight: 5, width: 24, height: 24},
  TextAdjustment: {bottom: -2},
});
