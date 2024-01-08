import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {IMainNavProp} from '@Routes/RouteTypes';
import Header from '@Components/Commons/Header';
import BalanceCard from '@Components/BalanceCard';
import {Dimens, ThemeText} from '@Utilities/Styles/GlobalStyles';
import Button from '@Components/Commons/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextInput from '@Components/Commons/TextInput';
import FormatCurrency from '@Utilities/Tools/FormatCurrency';

const CreateTransactionScreen = ({
  navigation,
  route,
}: IMainNavProp<'createTransactionScreen'>) => {
  const inset = useSafeAreaInsets();
  const service = route.params.service;

  const price = FormatCurrency(+service.service_tariff).format;

  const onBackPressHandler = () => {
    navigation.goBack();
  };
  const onPayPressHandler = () => {
    navigation.navigate('confirmationModal', {mode: 'PAYMENT', data: service});
  };
  return (
    <>
      <Header label="Pembayaran" onBackPress={onBackPressHandler} />
      <View style={[{paddingBottom: inset.bottom}, styles.RootScreenContainer]}>
        <View style={styles.PaddedContainer}>
          <BalanceCard isSimple />
        </View>
        <View style={[styles.PaddedContainer, styles.ContentContainer]}>
          <Text style={ThemeText.Title_Regular}>Pembayaran</Text>
          <View style={styles.TextContainer}>
            <Image
              source={{uri: service.service_icon}}
              style={{height: 30, width: 30, marginRight: 8}}
            />
            <Text style={ThemeText.H3_Bold}>{service.service_name}</Text>
          </View>
          <View>
            <TextInput
              label="Price"
              value={price}
              onChangeText={() => {}}
              editable={false}
              iconLeading={{name: 'logo-usd', mode: 'filled'}}
              style={ThemeText.Title_Bold}
            />
          </View>
        </View>
        <View style={[styles.PaddedContainer, styles.FooterContainer]}>
          <Button label="Bayar" onPress={onPayPressHandler} />
        </View>
      </View>
    </>
  );
};

export default CreateTransactionScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {flex: 1},
  PaddedContainer: {paddingHorizontal: Dimens.padding},
  ContentContainer: {flex: 1, justifyContent: 'flex-end'},
  TextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 36,
  },
  FooterContainer: {flex: 1.5, justifyContent: 'flex-end'},
});
