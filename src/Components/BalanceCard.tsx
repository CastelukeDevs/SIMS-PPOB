import {Color, Dimens, ThemeText} from '@Utilities/Styles/GlobalStyles';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from './Commons/Icon';
import FormatCurrency from '@Utilities/Tools/FormatCurrency';

const secureString = (str: string) =>
  str.replace('.', '').replace(',', '').replace(/./g, '•');

type IBalanceCardProps = {
  balance: number;
};
const BalanceCard = (props: IBalanceCardProps) => {
  const balance = props.balance;
  const format = FormatCurrency(balance);
  const symbol = format.symbol;

  const [balanceSecured, setBalanceSecured] = useState(true);

  const displayBalance = balanceSecured
    ? secureString(format.whole)
    : format.whole;

  const displayDecimal = balanceSecured
    ? secureString(format.decimal)
    : format.decimal;

  return (
    <View style={styles.RootComponentContainer}>
      <Text style={[ThemeText.H3_Regular, styles.TextColor]}>Saldo anda</Text>
      <Text style={[ThemeText.Hero_Bold, styles.TextColor]}>
        <Text style={styles.TextDim}>{symbol + ' '}</Text>
        <Text>{displayBalance}</Text>
        <Text style={!balanceSecured && styles.TextDim}>{displayDecimal}</Text>
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={[
            ThemeText.Title_Regular,
            styles.TextColor,
            {marginRight: 10},
          ]}>
          Lihat Saldo
        </Text>
        <Icon
          name={balanceSecured ? 'eye' : 'eye-off'}
          color={Color.light}
          onPress={() => setBalanceSecured(!balanceSecured)}
        />
      </View>
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  RootComponentContainer: {
    width: '100%',
    aspectRatio: 4 / 2,
    backgroundColor: Color.accent,
    padding: Dimens.padding * 1.4,
    borderRadius: Dimens.padding,
    justifyContent: 'space-between',
  },
  TextColor: {
    color: Color.light,
  },
  TextDim: {
    opacity: 0.75,
  },
});
