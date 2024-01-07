import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from '../Components/Commons/Icon';
import {useDispatch} from 'react-redux';
import {fetchUser} from '@Redux/Actions/UserAction';
import {IMainNavProp} from '@Routes/RouteTypes';
// import Icon from 'react-native-vector-icons/Ionicons';

const SplashScreen = ({navigation}: IMainNavProp<'splashScreen'>) => {
  return (
    <View>
      <Icon name="card" />
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
