import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

import {ITabNavProp} from '@Routes/RouteTypes';
import {Color, Dimens, ThemeText} from '@Utilities/Styles/GlobalStyles';

import Header from '@Components/Commons/Header';
import BalanceCard from '@Components/BalanceCard';
import {IRootStateType} from '@Redux/Store';
import TextInput from '@Components/Commons/TextInput';
import FormatCurrency from '@Utilities/Tools/FormatCurrency';
import Button from '@Components/Commons/Button';

const nominalList = [
  [{nominal: 10_000}, {nominal: 20_000}, {nominal: 50_000}],
  [{nominal: 100_000}, {nominal: 250_000}, {nominal: 500_000}],
];

const TopUpScreen = ({navigation}: ITabNavProp<'topUpScreen'>) => {
  const [amount, setAmount] = useState('');

  const emptyCase = amount.length < 1 || +amount === 0;

  const onNominalPress = (nominal: number) => {
    const amountNumber = +amount + nominal;

    setAmount(amountNumber.toFixed(2).toString());
  };

  const onTopUpPressHandler = () => {
    // dispatch(topUpBalance({top_up_amount: +amount}));
    navigation.navigate('confirmationModal', {
      mode: 'TOPUP',
      data: {amount: +amount},
    });
  };

  return (
    <>
      <Header label="Top Up" />
      <View style={styles.RootScreenContainer}>
        <BalanceCard isSimple />
        <View>
          <Text style={ThemeText.H3_Regular}>Silahkan Masukkan</Text>
          <Text style={ThemeText.H2_Bold}>nominal Top Up</Text>
        </View>
        <View>
          <TextInput
            label="Nominal"
            value={amount}
            onChangeText={setAmount}
            isMoney
            iconLeading={{name: 'cash'}}
            style={ThemeText.Title_Regular}
          />
          <View>{renderNominalSelection(onNominalPress)}</View>
        </View>
        <Button
          label="Top Up"
          onPress={onTopUpPressHandler}
          disabled={emptyCase}
        />
      </View>
    </>
  );
};

const NominalItem = (
  item: {nominal: number},
  rowIndex: number,
  onPress: (nominal: number) => void,
) => {
  const middlePos = rowIndex === 1;
  const format = FormatCurrency(item.nominal);
  return (
    <TouchableOpacity
      onPress={() => onPress(item.nominal)}
      key={item.nominal}
      style={[
        styles.NominalItemStyle,
        middlePos && styles.NominalItemHorizontalSeparator,
      ]}>
      <Text style={[ThemeText.Title_Regular, {textAlign: 'center'}]}>
        {format.symbol}
        {format.whole}
      </Text>
    </TouchableOpacity>
  );
};

const renderNominalSelection = (onNominalPress: (nominal: number) => void) => {
  return (
    <>
      {nominalList.map((column, colIndex) => {
        const posBottom = (colIndex + 1) % 2 === 0;
        return (
          <View
            key={colIndex}
            style={[{flexDirection: 'row'}, posBottom && {marginTop: 24}]}>
            {column.map((item, index) =>
              NominalItem(item, index, onNominalPress),
            )}
          </View>
        );
      })}
    </>
  );
};

export default TopUpScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
    padding: Dimens.padding,
    justifyContent: 'space-between',
  },
  NominalItemStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Dimens.radius,
    paddingVertical: 14,
    borderColor: Color.inactive,
  },
  NominalItemHorizontalSeparator: {marginHorizontal: 6},
});
