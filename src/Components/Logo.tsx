import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ThemeText} from '@Utilities/Styles/GlobalStyles';
import Assets from '@Assets/Assets';

const LogoSize = 32;
const asset = Assets('Logo-Logo');

const Logo = () => (
  <View style={styles.RootComponent}>
    <Image source={asset} style={styles.ImageStyle} />
    <Text style={ThemeText.H2_Bold}>SIMS PPOB</Text>
  </View>
);

export default Logo;

const styles = StyleSheet.create({
  RootComponent: {flexDirection: 'row', justifyContent: 'center'},
  ImageStyle: {width: LogoSize, height: LogoSize, marginRight: 10},
});
