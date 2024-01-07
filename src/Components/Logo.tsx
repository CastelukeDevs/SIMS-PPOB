import React from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {ThemeText} from '@Utilities/Styles/GlobalStyles';
import Assets from '@Assets/AssetsManager';

const LogoSize = 32;
const asset = Assets('Logo-Logo');

type ILogoProps = {
  style?: ViewStyle;
};
const Logo = (props: ILogoProps) => (
  <View style={[styles.RootComponent, props.style]}>
    <Image source={asset} style={styles.ImageStyle} />
    <Text style={ThemeText.H2_Bold}>SIMS PPOB</Text>
  </View>
);

export default Logo;

const styles = StyleSheet.create({
  RootComponent: {flexDirection: 'row', justifyContent: 'center'},
  ImageStyle: {width: LogoSize, height: LogoSize, marginRight: 10},
});
