import {LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from './Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Color, ThemeText} from '@Utilities/Styles/GlobalStyles';

type IHeaderProps = {
  label?: string;
};
const Header = (props: IHeaderProps) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();

  const [width, setWidth] = useState(0);

  const onLayoutHandler = useCallback((ev: LayoutChangeEvent) => {
    const componentWidth = ev.nativeEvent.layout.width;
    setWidth(componentWidth);
  }, []);

  const onBackHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={[{paddingTop: inset.top}, styles.RootComponentContainer]}>
      <Button
        label="Kembali"
        onPress={onBackHandler}
        icon={{name: 'arrow-back'}}
        onLayout={onLayoutHandler}
        mode="text"
      />
      <Text style={[ThemeText.H3_Bold, styles.TextCenter]}>{props.label}</Text>
      <View style={{width}} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  RootComponentContainer: {
    flexDirection: 'row',
    paddingBottom: 12,
    alignItems: 'center',
    backgroundColor: Color.light,
  },
  TextCenter: {
    textAlign: 'center',
    flex: 1,
  },
});
