import {StackScreenProps} from '@react-navigation/stack';

export type IRootNav = {
  splashScreen: undefined;
  authSignInScreen: undefined;
  authSignUpScreen: undefined;
  profileScreen: undefined;
  dashboardScreen: undefined;
};

export type IMainNavProp<T extends keyof IRootNav> = StackScreenProps<
  IRootNav,
  T
>;
