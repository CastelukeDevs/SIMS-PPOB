import React, {memo} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import AssetsManager from '@Assets/AssetsManager';

import Logo from './Logo';

const avatarDefaultS = AssetsManager('Profile-S');

type IDashboardHeaderProps = {
  avatar?: string;
};
const DashboardHeader = (props: IDashboardHeaderProps) => {
  const imageSource = props.avatar ? {uri: props.avatar} : avatarDefaultS;
  return (
    <View style={styles.RootContainer}>
      <Logo isSmall />
      <View style={styles.ImageContainer}>
        <Image
          source={imageSource}
          style={[StyleSheet.absoluteFill, styles.ImageStyle]}
        />
      </View>
    </View>
  );
};

export default memo(DashboardHeader);

const styles = StyleSheet.create({
  RootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ImageContainer: {width: 40, height: 40, borderRadius: 100},
  ImageStyle: {
    resizeMode: 'contain',
    height: undefined,
    width: undefined,
  },
});
