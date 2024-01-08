import TransactionAction from '@Redux/Actions/TransactionAction';
import {createSlice} from '@reduxjs/toolkit';
import {IStatusState} from '@Types/CommonTypes';
import {ITransaction} from '@Types/TransactionTypes';

export type ITransactionState = {
  transactionList: ITransaction[];
  limit: number;
  offset: number;
  isMax: boolean;
} & IStatusState;

export const transactionInitialState: ITransactionState = {
  error: null,
  status: 'idle',
  transactionList: [],
  limit: 10,
  offset: 0,
  isMax: false,
};

const TransactionReducer = createSlice({
  name: 'transaction',
  initialState: transactionInitialState,
  reducers: {
    resetTransaction: () => {
      return {...transactionInitialState};
    },
    resetOffset: state => {
      return {...state, offset: 0};
    },
  },
  extraReducers: TransactionAction,
});

export const {resetTransaction, resetOffset} = TransactionReducer.actions;
export default TransactionReducer.reducer;
