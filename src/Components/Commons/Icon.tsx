import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
  IIconMode,
  IIconName,
  getIconName,
} from '../../Utilities/Tools/IconTools';

type IIconProps = {
  name?: IIconName;
  size?: number;
  color?: string;
  mode?: IIconMode;
  disabled?: boolean;
  onPress?: () => void;
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
const Icon = (props: IIconProps) => {
  const {name = 'home', size = 24, mode = 'outline'} = props; //default value

  const iconName = getIconName(name, mode);
  console.log('icon name', iconName);

  return (
    <IonIcon
      name={iconName}
      size={size}
      color={props.color}
      disabled={typeof props.onPress === 'undefined' || props.disabled}
      onPress={props.onPress}
    />
  );
};

export default Icon;
