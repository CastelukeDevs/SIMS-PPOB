import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {IMainNavProp} from '@Routes/RouteTypes';

import Icon from '@Components/Commons/Icon';

const SignInScreen = ({navigation}: IMainNavProp<'authSignInScreen'>) => {
  return (
    <View>
      <Icon />
      <Text>SignInScreen</Text>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
