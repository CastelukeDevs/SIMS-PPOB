import {Color, Dimens, ThemeText} from '@Utilities/Styles/GlobalStyles';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from './Commons/Icon';
import FormatCurrency from '@Utilities/Tools/FormatCurrency';
import {useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';

const secureString = (str: string) =>
  str.replace('.', '').replace(',', '').replace(/./g, '•');

type IBalanceCardProps = {
  isSimple?: boolean;
};
const BalanceCard = (props: IBalanceCardProps) => {
  const balance = useSelector(
    (state: IRootStateType) => state.information.balance,
  );
  // const balance = props.balance;
  const format = FormatCurrency(balance);
  const symbol = format.symbol;

  const [balanceSecured, setBalanceSecured] = useState(true);

  const displayBalance =
    balanceSecured && !props.isSimple
      ? secureString(format.whole)
      : format.whole;

  const displayDecimal =
    balanceSecured && !props.isSimple
      ? secureString(format.decimal)
      : format.decimal;

  return (
    <View style={styles.RootComponentContainer}>
      <Text style={[ThemeText.H3_Regular, styles.TextColor]}>Saldo anda</Text>
      <Text
        numberOfLines={1}
        style={[ThemeText.H1_Bold, styles.TextColor, styles.TopSpace]}>
        <Text style={styles.TextDim}>{symbol + ' '}</Text>
        <Text>{displayBalance}</Text>
        <Text style={(!balanceSecured || props.isSimple) && styles.TextDim}>
          {displayDecimal}
        </Text>
      </Text>
      {!props.isSimple && (
        <View
          style={[
            {flexDirection: 'row', alignItems: 'center'},
            styles.TopSpace,
          ]}>
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
      )}
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  RootComponentContainer: {
    width: '100%',
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
  TopSpace: {
    marginTop: 20,
  },
});
