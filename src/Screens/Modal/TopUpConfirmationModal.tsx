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

const asset = AssetsManager('Logo-Logo');

const TopUpConfirmationModal = ({
  navigation,
  route,
}: IMainNavProp<'topUpConfirmationModal'>) => {
  const dispatch = useDispatch<any>();
  const businessInfo = useSelector(
    (state: IRootStateType) => state.information,
  );

  const {width} = useWindowDimensions();
  const componentSize = width - Dimens.padding * 2;

  const amount = route.params.amount;
  const amountFormat = FormatCurrency(amount);

  const onCloseHandler = () => {
    navigation.goBack();
  };

  const onProceedTopUpHandler = () => {
    if (businessInfo.status === 'fetching') return;
    dispatch(topUpBalance({top_up_amount: +amount}))
      .unwrap()
      .then(() => {
        navigation.navigate('topUpSuccessModal', {amount});
      })
      .catch(() => {
        navigation.navigate('topUpFailedModal', {amount});
      });
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
            Anda yakin untuk Top Up sebesar
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
          Ya, lanjutkan Top Up
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

export default TopUpConfirmationModal;

const styles = StyleSheet.create({});
