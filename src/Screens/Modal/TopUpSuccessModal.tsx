import React from 'react';
import {Image, Text, View, useWindowDimensions} from 'react-native';

import {
  Color,
  DefaultStyle,
  Dimens,
  ThemeText,
} from '@Utilities/Styles/GlobalStyles';

import AssetsManager from '@Assets/AssetsManager';
import {IMainNavProp} from '@Routes/RouteTypes';
import FormatCurrency from '@Utilities/Tools/FormatCurrency';
import Icon from '@Components/Commons/Icon';

const TopUpSuccessModal = ({
  navigation,
  route,
}: IMainNavProp<'topUpSuccessModal'>) => {
  const amountFormat = FormatCurrency(route.params.amount);

  const {width} = useWindowDimensions();
  const componentSize = width - Dimens.padding * 2;

  const backPressHandler = () => {
    navigation.replace('dashboardRoute', {screen: 'homeScreen'});
  };

  return (
    <View style={DefaultStyle.ModalRootStyle}>
      <View
        style={[
          DefaultStyle.ModalViewStyle,
          {width: componentSize, height: componentSize},
        ]}>
        <View
          style={{
            backgroundColor: Color.success,
            borderRadius: 100,
            padding: 17,
          }}>
          <Icon name="checkmark" size={30} color={Color.light} />
        </View>
        <View>
          <Text style={[ThemeText.Title_Regular, {textAlign: 'center'}]}>
            Top Up sebesar
          </Text>
          <Text
            style={[
              ThemeText.H2_Bold,
              {textAlign: 'center', marginVertical: 12},
            ]}>
            {amountFormat.format}
          </Text>
          <Text style={[ThemeText.Title_Regular, {textAlign: 'center'}]}>
            berhasil
          </Text>
        </View>
        <Text
          onPress={backPressHandler}
          style={[
            ThemeText.Title_Bold,
            {color: Color.accent, textAlign: 'center'},
          ]}>
          Kembali ke Beranda
        </Text>
      </View>
    </View>
  );
};

export default TopUpSuccessModal;
