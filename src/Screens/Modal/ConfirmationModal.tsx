import React from 'react';
import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';
import {topUpBalance} from '@Redux/Actions/InformationAction';

import {IMainNavProp} from '@Routes/RouteTypes';

import {
  Color,
  DefaultStyle,
  Dimens,
  ThemeText,
} from '@Utilities/Styles/GlobalStyles';

import AssetsManager from '@Assets/AssetsManager';
import FormatCurrency from '@Utilities/Tools/FormatCurrency';
import {createNewTransaction} from '@Redux/Actions/TransactionAction';

const asset = AssetsManager('Logo-Logo');

const ConfirmationModal = ({
  navigation,
  route,
}: IMainNavProp<'confirmationModal'>) => {
  const payload = route.params;
  const isTopUp = payload.mode === 'TOPUP';
  const amount = payload.data.amount || payload.data.service_tariff || 0;
  const amountFormat = FormatCurrency(amount);

  const dispatch = useDispatch<any>();
  const {width} = useWindowDimensions();

  const businessInfo = useSelector(
    (state: IRootStateType) => state.information,
  );

  const componentSize = width - Dimens.padding * 2;

  const onCloseHandler = () => {
    navigation.goBack();
  };

  const onProceedTopUpHandler = async () => {
    if (businessInfo.status === 'fetching') return;

    try {
      if (isTopUp) {
        dispatch(topUpBalance({top_up_amount: +amount}))
          .unwrap()
          .then(() => {
            navigation.navigate('successModal', {...payload});
          });
      } else {
        dispatch(
          createNewTransaction({service_code: payload.data.service_code!}),
        )
          .unwrap()
          .then(() => {
            navigation.navigate('successModal', {...payload});
          });
      }
    } catch (_) {
      navigation.navigate('failedModal', {...payload});
    }
  };

  return (
    <View style={[DefaultStyle.ModalRootStyle]}>
      <View
        style={[
          DefaultStyle.ModalViewStyle,
          {width: componentSize, height: componentSize},
        ]}>
        <Image source={asset} style={DefaultStyle.ModalIconStyle} />
        <View>
          <Text style={[ThemeText.Title_Regular, {textAlign: 'center'}]}>
            {isTopUp ? 'Anda yakin untuk Top-Up' : 'Bayar'}{' '}
            {payload.data.service_name} sebesar
          </Text>
          <Text style={[ThemeText.H2_Bold, {textAlign: 'center'}]}>
            {amountFormat.format} ?
          </Text>
        </View>
        <Text
          onPress={onProceedTopUpHandler}
          style={[
            ThemeText.Title_Bold,
            {color: Color.accent, textAlign: 'center'},
          ]}>
          Ya, lanjutkan {isTopUp ? 'Top Up' : 'Pembayaran'}
        </Text>
        <Text
          onPress={onCloseHandler}
          style={[
            ThemeText.Title_Bold,
            {color: Color.dark, opacity: 0.7, textAlign: 'center'},
          ]}>
          Batalkan
        </Text>
      </View>
    </View>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({});
