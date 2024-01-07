import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from './Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeText} from '@Utilities/Styles/GlobalStyles';

type IHeaderProps = {
  label?: string;
};
const Header = (props: IHeaderProps) => {
  const inset = useSafeAreaInsets();

  return (
    <View style={[{paddingTop: inset.top}, styles.RootComponentContainer]}>
      <Text style={[ThemeText.H3_Bold, styles.TextCenter]}>{props.label}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  RootComponentContainer: {
    flexDirection: 'row',
    paddingBottom: 12,
  },
  TextCenter: {
    textAlign: 'center',
    flex: 1,
  },
});
