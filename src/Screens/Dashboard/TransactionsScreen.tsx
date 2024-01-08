import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IRootStateType} from '@Redux/Store';
import {getTransactionList} from '@Redux/Actions/TransactionAction';

import {useIsFocused} from '@react-navigation/native';
import {ITabNavProp} from '@Routes/RouteTypes';

import {Color, Dimens, ThemeText} from '@Utilities/Styles/GlobalStyles';
import BalanceCard from '@Components/BalanceCard';
import Header from '@Components/Commons/Header';
import ItemSeparator from '@Components/Commons/ItemSeparator';
import TransactionCard from '@Components/TransactionCard';
import {resetTransaction} from '@Redux/Reducers/TransactionReducer';
import {toast} from '@backpackapp-io/react-native-toast';

const TransactionsScreen = ({navigation}: ITabNavProp<'transactionScreen'>) => {
  const dispatch = useDispatch<any>();
  const isFocused = useIsFocused();

  const transaction = useSelector((state: IRootStateType) => state.transaction);

  const [isError, setIsError] = useState(false);

  const transactionList = useMemo(
    () => transaction.transactionList,
    [transaction.transactionList],
  );

  const getNextTransaction = () => {
    dispatch(
      getTransactionList({
        limit: transaction.limit,
        offset: transactionList.length,
      }),
    )
      .unwrap()
      .then(() => {
        setIsError(false);
      })
      .catch(() => {
        toast.error('Gagal memuat transaksi, coba beberapa saat lagi');
        setIsError(true);
      });
  };

  useEffect(() => {
    if (isFocused) {
      getNextTransaction();
    }
    return () => {
      dispatch(resetTransaction());
    };
  }, [isFocused]);

  const onShowMorePressHandler = () => {
    if (transaction.isMax) return;
    getNextTransaction();
  };

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
          {transactionList.length >= 1 ? (
            <FlatList
              style={styles.FlatlistStyle}
              data={transactionList}
              keyExtractor={item => item.created_on.toString()}
              ItemSeparatorComponent={ItemSeparator}
              contentContainerStyle={styles.PaddedContainer}
              renderItem={({item}) => {
                return <TransactionCard transaction={item} />;
              }}
              ListFooterComponent={() =>
                FooterContent(onShowMorePressHandler, transaction.isMax)
              }
              ListEmptyComponent={EmptyListContent}
            />
          ) : (
            <>
              <EmptyListContent isError={isError} />
            </>
          )}
        </View>
      </View>
    </>
  );
};

const EmptyListContent = (props: {isError?: boolean}) => {
  return (
    <View style={styles.EmptyListContainer}>
      {
        <Text style={[ThemeText.SubTitle_Light, styles.EmptyListTextStyle]}>
          {props.isError
            ? 'Gagal memuat transaksi'
            : 'Maaf tidak ada histori transaksi saat ini'}
        </Text>
      }
    </View>
  );
};

const FooterContent = (onTextPress: () => void, hide?: boolean) => {
  return (
    <View style={styles.FooterContainerStyle}>
      {!hide && (
        <Text
          onPress={onTextPress}
          style={[ThemeText.SubTitle_Bold, styles.FooterTextStyle]}>
          Show more
        </Text>
      )}
    </View>
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
  FooterContainerStyle: {
    margin: Dimens.padding * 2,
  },
  FooterTextStyle: {
    color: Color.accent,
    textAlign: 'center',
  },
  EmptyListContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  EmptyListTextStyle: {
    color: Color.inactive,
  },
});
