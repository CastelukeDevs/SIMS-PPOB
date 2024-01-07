import UserAction from '@Redux/Actions/UserAction';
import {createSlice} from '@reduxjs/toolkit';
import {IStatusState} from '@Types/CommonTypes';
import {IUser} from '@Types/UserTypes';
import {forgetToken} from '@Utilities/Tools/AsyncStorageUtils';

export type IUserState = {
  userData: IUser | null;
  token: string | null;
} & IStatusState;

export const userInitialState: IUserState = {
  status: 'idle',
  error: null,
  userData: null,
  token: null,
};

const DefaultReducer = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    resetUser: () => {
      forgetToken();
      return {...userInitialState};
    },
  },
  extraReducers: UserAction,
});

export const {resetUser} = DefaultReducer.actions;
export default DefaultReducer.reducer;
