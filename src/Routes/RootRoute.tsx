import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {IRootNav} from './RouteTypes';
import SplashScreen from '../Screens/SplashScreen';

const Stack = createStackNavigator<IRootNav>();

const RootRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name="splashScreen" component={SplashScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootRoute;
