import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ITransaction} from '@Types/TransactionTypes';
import {Color, Dimens, ThemeText} from '@Utilities/Styles/GlobalStyles';
import FormatCurrency from '@Utilities/Tools/FormatCurrency';
import moment from 'moment';

type ITransactionCardProp = {
  transaction: ITransaction;
};
const TransactionCard = (props: ITransactionCardProp) => {
  const {transaction} = props;
  const formatNumber = FormatCurrency(transaction.total_amount);
  const isSpending = transaction.transaction_type === 'PAYMENT';

  const transactionDate = moment(transaction.created_on).format(
    'DD MMMM YYYY  hh:mm',
  );

  return (
    <View style={styles.RootComponentContainer}>
      <View style={{flex: 1}}>
        <Text
          style={[
            ThemeText.H3_Bold,
            {color: isSpending ? Color.error : Color.success},
          ]}>
          <Text>{isSpending ? '-' : '+'}</Text>
          <Text>{' ' + formatNumber.format}</Text>
        </Text>
        <Text style={ThemeText.Content_Light}>{transactionDate} WIB</Text>
      </View>
      <Text style={[ThemeText.SubTitle_Regular]}>
        {transaction.description}
      </Text>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  RootComponentContainer: {
    borderWidth: 1,
    borderColor: Color.inactive,
    borderRadius: Dimens.padding / 2,
    padding: Dimens.padding,
    flexDirection: 'row',
  },
});
