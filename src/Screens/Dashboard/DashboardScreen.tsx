import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';

import {resetUser} from '@Redux/Reducers/UserReducer';

import Button from '@Components/Commons/Button';
import {ThemeText} from '@Utilities/Styles/GlobalStyles';
import DashboardHeader from '@Components/DashboardHeader';
import BalanceCard from '@Components/BalanceCard';

// const profile = AssetsManager('Profile-S');

const DashboardScreen = () => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch<any>();

  const user = useSelector((state: IRootStateType) => state.user.userData);

  return (
    <View style={[{paddingTop: inset.top, flex: 1, paddingHorizontal: 18}]}>
      <DashboardHeader />
      <View style={styles.TextGroupContainer}>
        <Text style={[ThemeText.H2_Regular, {opacity: 0.7}]}>
          Selamat datang,
        </Text>
        <Text style={ThemeText.H1_Bold}>
          {user?.first_name} {user?.last_name}
        </Text>
      </View>
      <BalanceCard />
      {/* <Button label="reset" onPress={() => dispatch(resetUser())} /> */}
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  TextGroupContainer: {
    marginVertical: 20,
  },
});
