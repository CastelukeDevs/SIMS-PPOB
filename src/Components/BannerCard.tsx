import {IBanner} from '@Types/BusinessInfoTypes';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

type IBannerCardProps = {
  item: IBanner;
  onPress: () => void;
};
const BannerCard = ({item, onPress}: IBannerCardProps) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={{uri: item.banner_image}} style={styles.ImageStyle} />
  </TouchableOpacity>
);

export default BannerCard;

const styles = StyleSheet.create({
  ImageStyle: {
    resizeMode: 'contain',
    height: 121,
    width: 270,
    borderRadius: 6,
  },
});
