import React from 'react';
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon, {IIconProps} from './Icon';
import {Color, Dimens, ThemeText} from '@Utilities/Styles/GlobalStyles';

type IButtonPropTypes = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  mode?: 'contained' | 'text';
  icon?: IIconProps;
  disabled?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
};

//TODO: add disable button function

/**
 *
 * @param label string
 * @param onPress function
 * Simple button
 */
const Button = (props: IButtonPropTypes) => {
  const currentMode = props.mode || 'contained';

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      onLayout={props.onLayout}
      style={[
        styles.RootComponentContainer,
        currentMode === 'contained' && styles.ModeContained,
        props.style,
        props.disabled && styles.Disabled,
      ]}>
      {props.icon && (
        <Icon
          {...props.icon}
          color={currentMode === 'contained' ? Color.light : Color.accent}
        />
      )}
      {props.label && (
        <Text
          style={[
            ThemeText.SubTitle_Bold,
            styles.LabelText,
            {
              color: currentMode === 'contained' ? Color.light : Color.accent,
            },
            props.labelStyle,
          ]}>
          {props.label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  RootComponentContainer: {
    paddingHorizontal: 6,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModeContained: {
    backgroundColor: Color.accent,
    borderRadius: Dimens.radius,
  },
  LabelText: {textAlign: 'center', marginHorizontal: 8},
  Disabled: {
    backgroundColor: Color.dark,
    opacity: 0.5,
  },
});
