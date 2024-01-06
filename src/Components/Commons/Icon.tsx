import {IIconMode, IIconName, getIconName} from '@Utilities/Tools/IconTools';
import React, {forwardRef} from 'react';
import {TextStyle} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

export type IIconProps = {
  name?: IIconName;
  size?: number;
  color?: string;
  mode?: IIconMode;
  disabled?: boolean;
  onPress?: () => void;
  style?: TextStyle;
};

/**
 * Icon components extends RN Vector icons using IonIcons
 *
 * @param name icon name
 * @param size icon size
 * @param color icon color
 * @param mode icon mode
 *
 * @default "home"
 * @default 24
 * @default black
 * @default "outline"
 * @returns
 */
const Icon = forwardRef<IonIcon, IIconProps>((props, ref) => {
  const {name = 'home', size = 24, mode = 'outline'} = props; //default value

  const iconName = getIconName(name, mode);

  return (
    <IonIcon
      ref={ref}
      name={iconName}
      size={size}
      color={props.color}
      disabled={typeof props.onPress === 'undefined' || props.disabled}
      onPress={props.onPress}
      style={props.style}
    />
  );
});

export default Icon;
