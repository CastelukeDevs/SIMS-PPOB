import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {IAPIResult, ICancelSignal, IEndpoint} from '@Utilities/APIs/APIUtils';
import APICall from '@Utilities/APIs/APICall';
import {ITransactionState} from '@Redux/Reducers/TransactionReducer';
import {ITransaction} from '@Types/TransactionTypes';

import {getBalance} from './InformationAction';

const GetTransactionPrefix: IEndpoint = 'GET_TRANSACTION';
const CreateTransactionPrefix: IEndpoint = 'CREATE_TRANSACTION';

export const getTransactionList = createAsyncThunk(
  GetTransactionPrefix,
  async (props?: ICancelSignal) => {
    const data = await APICall(GetTransactionPrefix, {
      abortController: props?.abortController,
    });

    return data;
  },
);

export const createNewTransaction = createAsyncThunk<
  IAPIResult,
  ICancelSignal & {service_code: string},
  {dispatch: any}
>(CreateTransactionPrefix, async (props, {dispatch}) => {
  const data = await APICall(CreateTransactionPrefix, {
    abortController: props?.abortController,
    data: {...props},
  });

  dispatch(getBalance());

  return data;
});

export default (builder: ActionReducerMapBuilder<ITransactionState>) => {
  builder
    .addCase(getTransactionList.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(getTransactionList.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
    })
    .addCase(
      getTransactionList.fulfilled,
      (
        state,
        action: PayloadAction<
          IAPIResult<{limit: number; offset: number; records: ITransaction[]}>
        >,
      ) => {
        state.status = 'success';
        state.error = null;
        state.transactionList = action.payload.data.records;
        state.limit = action.payload.data.limit;
        state.offset = action.payload.data.offset;
      },
    )
    .addCase(createNewTransaction.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(createNewTransaction.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
    })
    .addCase(createNewTransaction.fulfilled, state => {
      state.status = 'success';
      state.error = null;
    });
};
