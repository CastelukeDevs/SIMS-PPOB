import React, {memo} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import AssetsManager from '@Assets/AssetsManager';

import Logo from './Logo';

const avatarDefaultS = AssetsManager('Profile-S');

type IDashboardHeaderProps = {
  avatar?: string;
  onAvatarPress: () => void;
};
const DashboardHeader = (props: IDashboardHeaderProps) => {
  const imageSource = props.avatar ? {uri: props.avatar} : avatarDefaultS;
  return (
    <View style={styles.RootContainer}>
      <Logo isSmall />
      <TouchableOpacity
        onPress={props.onAvatarPress}
        style={styles.ImageContainer}>
        <Image source={imageSource} style={styles.ImageStyle} />
      </TouchableOpacity>
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
  ImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    overflow: 'hidden',
  },
  ImageStyle: {
    // resizeMode: 'contain',
    ...StyleSheet.absoluteFillObject,
    height: undefined,
    width: undefined,
  },
});
