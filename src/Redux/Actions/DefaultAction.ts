import {IDefaultState} from '@Redux/Reducers/DefaultReducer';
import {resetBalance} from '@Redux/Reducers/InformationReducer';
import {resetTransaction} from '@Redux/Reducers/TransactionReducer';
import {resetUser} from '@Redux/Reducers/UserReducer';
import {ActionReducerMapBuilder, createAsyncThunk} from '@reduxjs/toolkit';

const logoutUserPrefix = 'LOGOUT_USER/RESET_ALL';

export const logoutUser = createAsyncThunk(
  logoutUserPrefix,
  async (_, {dispatch}) => {
    dispatch(resetUser());
    dispatch(resetBalance());
    dispatch(resetTransaction());
    return true;
  },
);

export default (builder: ActionReducerMapBuilder<IDefaultState>) => {
  builder
    .addCase(logoutUser.pending, () => {
      console.log('[>] => Logging out user');
    })
    .addCase(logoutUser.rejected, () => {
      console.log('[X] => Logging out user');
    })
    .addCase(logoutUser.fulfilled, () => {
      console.log('[O] => Logging out user');
    });
};
