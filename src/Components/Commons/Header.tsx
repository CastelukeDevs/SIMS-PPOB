import {LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from './Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeText} from '@Utilities/Styles/GlobalStyles';

type IHeaderProps = {
  label?: string;
  onBackPress?: () => void;
};
const Header = (props: IHeaderProps) => {
  const inset = useSafeAreaInsets();
  const canBack = typeof props.onBackPress !== 'undefined';

  const [width, setWidth] = useState(0);

  const onLayoutHandler = useCallback((ev: LayoutChangeEvent) => {
    const componentWidth = ev.nativeEvent.layout.width;
    setWidth(componentWidth);
  }, []);

  return (
    <View style={[{paddingTop: inset.top}, styles.RootComponentContainer]}>
      {canBack && (
        <Button
          label="Kembali"
          onPress={() => props.onBackPress?.()}
          icon={{name: 'arrow-back'}}
          onLayout={onLayoutHandler}
          mode="text"
        />
      )}
      <Text style={[ThemeText.H3_Bold, styles.TextCenter]}>{props.label}</Text>
      {canBack && <View style={{width}} />}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  RootComponentContainer: {
    flexDirection: 'row',
    paddingBottom: 12,
    alignItems: 'center',
  },
  TextCenter: {
    textAlign: 'center',
    flex: 1,
  },
});
