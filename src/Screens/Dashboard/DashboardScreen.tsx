import React, {useEffect, useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';

import {Dimens, ThemeText} from '@Utilities/Styles/GlobalStyles';
import DashboardHeader from '@Components/DashboardHeader';
import BalanceCard from '@Components/BalanceCard';
import {
  getBalance,
  getBanner,
  getServices,
} from '@Redux/Actions/InformationAction';
import ServicesIcon from '@Components/ServicesIcon';
import BannerCard from '@Components/BannerCard';
import {ITabNavProp} from '@Routes/RouteTypes';
import {IBanner, IServices} from '@Types/BusinessInfoTypes';
import ItemSeparator from '@Components/Commons/ItemSeparator';

// const profile = AssetsManager('Profile-S');

const DashboardScreen = ({navigation}: ITabNavProp<'homeScreen'>) => {
  const inset = useSafeAreaInsets();
  const dispatch = useDispatch<any>();

  const columnNumber = 6;

  const user = useSelector((state: IRootStateType) => state.user.userData);

  const businessInfo = useSelector(
    (state: IRootStateType) => state.information,
  );

  const servicesList = useMemo(
    () => businessInfo.services,
    [businessInfo.services],
  );
  const bannerList = useMemo(() => businessInfo.banner, [businessInfo.banner]);

  useEffect(() => {
    dispatch(getBalance());
    dispatch(getBanner());
    dispatch(getServices());
  }, []);

  const onAvatarPressHandler = () => {
    navigation.navigate('dashboardRoute', {screen: 'profileScreen'});
  };

  const onServicePressHandler = (service: IServices) => {
    navigation.navigate('createTransactionScreen', {service});
  };
  const onBannerPressHandler = (banner: IBanner) => {};

  return (
    <View style={[{paddingTop: inset.top}, styles.RootScreenContainer]}>
      <View style={styles.SectionContainer}>
        <DashboardHeader
          avatar={user?.profile_image}
          onAvatarPress={onAvatarPressHandler}
        />
      </View>
      <View style={[styles.SectionContainer]}>
        <Text style={[ThemeText.H2_Regular, {opacity: 0.7}]}>
          Selamat datang,
        </Text>
        <Text numberOfLines={1} style={ThemeText.H1_Bold}>
          {user?.first_name} {user?.last_name}
        </Text>
      </View>
      <View style={styles.SectionContainer}>
        <BalanceCard />
      </View>

      <FlatList
        data={servicesList}
        keyExtractor={item => item.service_code}
        renderItem={({item}) => (
          <ServicesIcon
            item={item}
            onPress={() => onServicePressHandler(item)}
          />
        )}
        numColumns={columnNumber}
        columnWrapperStyle={styles.FlatlistColumnStyle}
        ItemSeparatorComponent={ItemSeparator}
        style={[styles.FlatlistNormalize, styles.SectionContainer]}
        bounces={false}
      />

      <View>
        <Text
          style={[
            styles.SectionContainer,
            styles.PromoSection,
            ThemeText.SubTitle_Bold,
          ]}>
          Temukan promo menarik
        </Text>
        <FlatList
          data={bannerList}
          keyExtractor={item => item.banner_name}
          renderItem={({item}) => (
            <BannerCard
              item={item}
              onPress={() => onBannerPressHandler(item)}
            />
          )}
          horizontal
          style={styles.FlatlistNormalize}
          contentContainerStyle={{
            paddingHorizontal: Dimens.padding,
          }}
          ItemSeparatorComponent={ItemSeparator}
          showsHorizontalScrollIndicator={false}
          // bounces={false}
        />
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Dimens.padding,
  },
  SectionContainer: {paddingHorizontal: Dimens.padding},

  FlatlistNormalize: {
    flexGrow: 0,
  },
  FlatlistColumnStyle: {
    // marginTop: 30,
    justifyContent: 'space-between',
    width: '100%',
    height: 'auto',
  },
  PromoSection: {
    marginBottom: 12,
  },
});
