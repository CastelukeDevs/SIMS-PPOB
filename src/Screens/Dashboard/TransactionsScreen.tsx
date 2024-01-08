import BalanceCard from '@Components/BalanceCard';
import Header from '@Components/Commons/Header';
import ItemSeparator from '@Components/Commons/ItemSeparator';
import TransactionCard from '@Components/TransactionCard';
import {getTransactionList} from '@Redux/Actions/TransactionAction';
import {IRootStateType} from '@Redux/Store';
import {Color, Dimens, ThemeText} from '@Utilities/Styles/GlobalStyles';
import React, {useEffect, useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const TransactionsScreen = () => {
  const dispatch = useDispatch<any>();

  const transaction = useSelector((state: IRootStateType) => state.transaction);

  const transactionList = useMemo(
    () => transaction.transactionList,
    [transaction.transactionList],
  );

  useEffect(() => {
    dispatch(getTransactionList());
  }, []);

  return (
    <>
      <Header label="Transaksi" />
      <View style={styles.RootScreenContainer}>
        <View style={[styles.PaddedContainer, {paddingTop: Dimens.padding}]}>
          <BalanceCard isSimple />
        </View>
        <View style={{flex: 1}}>
          <Text
            style={[
              ThemeText.H3_Bold,
              {marginTop: 24},
              styles.PaddedContainer,
            ]}>
            Transaksi
          </Text>
          <FlatList
            style={styles.FlatlistStyle}
            data={transactionList}
            keyExtractor={item => item.created_on.toString()}
            ItemSeparatorComponent={ItemSeparator}
            contentContainerStyle={styles.PaddedContainer}
            renderItem={({item}) => {
              return <TransactionCard transaction={item} />;
            }}
            ListFooterComponent={FooterContent}
          />
        </View>
      </View>
    </>
  );
};

const FooterContent = () => {
  return (
    <Text style={[ThemeText.SubTitle_Bold, styles.FooterTextStyle]}>
      Show more
    </Text>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    paddingBottom: 0,
    flex: 1,
  },
  PaddedContainer: {
    paddingHorizontal: Dimens.padding,
  },
  FlatlistStyle: {
    flex: 1,
    marginTop: 12,
    // backgroundColor: 'gold',
  },
  FooterTextStyle: {
    textAlign: 'center',
    color: Color.accent,
    margin: Dimens.padding * 2,
  },
});
