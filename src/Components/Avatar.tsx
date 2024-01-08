import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Color, Opacity} from '@Utilities/Styles/GlobalStyles';
import AssetsManager from '@Assets/AssetsManager';

import Icon from './Commons/Icon';

const avatarAssets = AssetsManager('Profile-L');

type IAvatarProps = {
  avatar?: string;
  onEditPress?: () => void;
};
const Avatar = (props: IAvatarProps) => {
  const userAvatar = props.avatar ? {uri: props.avatar} : avatarAssets;
  return (
    <View style={styles.RootComponentContainer}>
      <Image source={userAvatar} style={styles.ImageStyle} />
      <TouchableOpacity style={styles.ButtonStyle} onPress={props.onEditPress}>
        <Icon name="pencil" />
      </TouchableOpacity>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  RootComponentContainer: {
    height: 130,
    width: 130,
    borderRadius: 130,
    borderWidth: 1,
    borderColor: Color.dark + Opacity[15],
  },
  ImageStyle: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  ButtonStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 10,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Color.dark + Opacity[15],
    padding: 5,
    backgroundColor: Color.light,
  },
});
