import TransactionAction from '@Redux/Actions/TransactionAction';
import {createSlice} from '@reduxjs/toolkit';
import {IStatusState} from '@Types/CommonTypes';
import {ITransaction} from '@Types/TransactionTypes';

export type ITransactionState = {
  transactionList: ITransaction[];
  limit: number;
  offset: number;
} & IStatusState;

export const transactionInitialState: ITransactionState = {
  error: null,
  status: 'idle',
  transactionList: [],
  limit: 5,
  offset: 0,
};

const TransactionReducer = createSlice({
  name: 'transaction',
  initialState: transactionInitialState,
  reducers: {},
  extraReducers: TransactionAction,
});

export const {} = TransactionReducer.actions;
export default TransactionReducer.reducer;
