import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

export type IRootNav = {
  splashScreen: undefined;
  authSignInScreen: undefined;
  authSignUpScreen: undefined;
  profileScreen: undefined;
  dashboardRoute: NavigatorScreenParams<IDashboardTabNav>;
};

export type IDashboardTabNav = {
  homeScreen: undefined;
  topUpScreen: undefined;
  transactionScreen: undefined;
  profileScreen: undefined;
};

export type IMainNavProp<T extends keyof IRootNav> = StackScreenProps<
  IRootNav,
  T
>;

export type ITabNavProp<T extends keyof IDashboardTabNav> =
  CompositeScreenProps<
    BottomTabScreenProps<IDashboardTabNav, T>,
    IMainNavProp<keyof IRootNav>
  >;
