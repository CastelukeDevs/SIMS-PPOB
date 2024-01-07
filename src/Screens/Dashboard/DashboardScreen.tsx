import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

import {resetUser} from '@Redux/Reducers/UserReducer';

import Button from '@Components/Commons/Button';

const DashboardScreen = () => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch<any>();
  return (
    <View style={[{paddingTop: inset.top}]}>
      <Text>DashboardScreen</Text>
      <Button label="reset" onPress={() => dispatch(resetUser())} />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
