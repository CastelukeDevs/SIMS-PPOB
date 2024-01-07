import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import Button from '@Components/Commons/Button';
import {resetUser} from '@Redux/Reducers/UserReducer';

const DashboardScreen = () => {
  const dispatch = useDispatch<any>();
  return (
    <View>
      <Text>DashboardScreen</Text>
      <Button label="reset" onPress={() => dispatch(resetUser())} />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
