import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';

import {IServices} from '@Types/BusinessInfoTypes';

import {ThemeText} from '@Utilities/Styles/GlobalStyles';
import ServiceNameSanitize from '@Utilities/Tools/ServiceNameSanitize';

/**
 * Services Icon Props
 */
type IServicesIconProps = {
  item: IServices;
  onPress: () => void;
};
const ServicesIcon = ({item: services, onPress}: IServicesIconProps) => {
  const width = useWindowDimensions().width;

  const itemSize = (width - 32) / 6 - 5;
  const label = ServiceNameSanitize(services.service_name);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: itemSize,
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: itemSize,
          height: itemSize,
          borderRadius: 4,
        }}>
        <Image
          source={{uri: services.service_icon}}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <Text style={[ThemeText.Content_Regular, {textAlign: 'center'}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ServicesIcon;
