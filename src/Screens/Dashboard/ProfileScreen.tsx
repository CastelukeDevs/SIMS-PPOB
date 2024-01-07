import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {resetUser} from '@Redux/Reducers/UserReducer';

import Button from '@Components/Commons/Button';

const ProfileScreen = () => {
  const dispatch = useDispatch<any>();
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button label="reset" onPress={() => dispatch(resetUser())} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
