import UserAction from '@Redux/Actions/UserAction';
import {createSlice} from '@reduxjs/toolkit';
import {IStatusState} from '@Types/CommonTypes';
import {IUserMain} from '@Types/UserTypes';

export type IUserState = {
  userData: IUserMain | null;
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
      return {...userInitialState};
    },
  },
  extraReducers: UserAction,
});

export const {resetUser} = DefaultReducer.actions;
export default DefaultReducer.reducer;
