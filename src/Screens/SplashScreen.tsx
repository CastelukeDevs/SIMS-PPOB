import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IMainNavProp} from '@Routes/RouteTypes';
import AssetsManager from '@Assets/AssetsManager';
import {ThemeText} from '@Utilities/Styles/GlobalStyles';

const logoAsset = AssetsManager('Logo-Logo');
const SplashScreen = ({navigation, route}: IMainNavProp<'splashScreen'>) => {
  console.log('route', navigation);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('authSignInScreen');
    }, 2000);
  }, []);

  return (
    <View style={styles.RootScreenContainer}>
      <Image source={logoAsset} style={styles.ImageStyle} />
      <View style={styles.TextGroup}>
        <Text style={[ThemeText.Hero_Bold]}>SIMS PPOB</Text>
        <Text style={[ThemeText.H2_Regular]}>Rizki Abdillah</Text>
        <Text style={[ThemeText.H3_Light]}>rizki.casteluke@gmail.com</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageStyle: {
    width: 120,
    height: 120,
    borderRadius: 200,
  },
  TextGroup: {
    marginTop: 12,
    alignItems: 'center',
  },
});
