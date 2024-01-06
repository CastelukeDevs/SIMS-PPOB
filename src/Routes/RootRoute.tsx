import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {IRootNav} from './RouteTypes';

import SignInScreen from '@Screens/Pre-Auth/SignInScreen';
import SignUpScreen from '@Screens/Pre-Auth/SignUpScreen';
import DashboardScreen from '@Screens/Dashboard/DashboardScreen';

const Stack = createStackNavigator<IRootNav>();

const RootRoute = () => {
  const user = false;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="splashScreen" component={SplashScreen} /> */}
        {!user ? (
          <>
            <Stack.Screen name="authSignInScreen" component={SignInScreen} />
            <Stack.Screen name="authSignUpScreen" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="dashboardScreen" component={DashboardScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootRoute;
