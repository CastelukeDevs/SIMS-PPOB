import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Toasts} from '@backpackapp-io/react-native-toast';

import {IDashboardTabNav, IRootNav} from './RouteTypes';

import useAuth from '@Utilities/Hooks/useAuth';

import SignInScreen from '@Screens/Pre-Auth/SignInScreen';
import SignUpScreen from '@Screens/Pre-Auth/SignUpScreen';
import DashboardScreen from '@Screens/Dashboard/DashboardScreen';
import SplashScreen from '@Screens/SplashScreen';
import TopUpScreen from '@Screens/Dashboard/TopUpScreen';
import TransactionsScreen from '@Screens/Dashboard/TransactionsScreen';
import ProfileScreen from '@Screens/Dashboard/ProfileScreen';
import Icon from '@Components/Commons/Icon';
import {IIconName} from '@Utilities/Tools/IconTools';
import TopUpConfirmationModal from '@Screens/Modal/TopUpConfirmationModal';
import TopUpSuccessModal from '@Screens/Modal/TopUpSuccessModal';
import TopUpFailedModal from '@Screens/Modal/TopUpFailedModal';

const Stack = createStackNavigator<IRootNav>();
const Tab = createBottomTabNavigator<IDashboardTabNav>();

const RootRoute = () => {
  const {auth} = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="splashScreen" component={SplashScreen} /> */}
        {!auth ? (
          <>
            <Stack.Screen name="authSignInScreen" component={SignInScreen} />
            <Stack.Screen name="authSignUpScreen" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="dashboardRoute" component={DashboardRoute} />
          </>
        )}
        <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
          <Stack.Screen
            name="topUpConfirmationModal"
            component={TopUpConfirmationModal}
          />
          <Stack.Screen
            name="topUpSuccessModal"
            component={TopUpSuccessModal}
          />
          <Stack.Screen name="topUpFailedModal" component={TopUpFailedModal} />
        </Stack.Group>
      </Stack.Navigator>
      <Toasts />
    </NavigationContainer>
  );
};

type ITabBarIconProps = {focused: boolean; color: string; size: number};
const tabBarIcon = (name: IIconName, props: ITabBarIconProps) => {
  return (
    <Icon
      name={name}
      color={props.color}
      mode={props.focused ? 'filled' : 'outline'}
    />
  );
};

const DashboardRoute = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="homeScreen"
        component={DashboardScreen}
        options={{
          title: 'Home',
          tabBarIcon: props => tabBarIcon('home', props),
        }}
      />
      <Tab.Screen
        name="topUpScreen"
        component={TopUpScreen}
        options={{
          title: 'Top Up',
          tabBarIcon: props => tabBarIcon('cash', props),
        }}
      />
      <Tab.Screen
        name="transactionScreen"
        component={TransactionsScreen}
        options={{
          title: 'Transaction',
          tabBarIcon: props => tabBarIcon('card', props),
        }}
      />
      <Tab.Screen
        name="profileScreen"
        component={ProfileScreen}
        options={{
          title: 'Akun',
          tabBarIcon: props => tabBarIcon('person', props),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootRoute;
