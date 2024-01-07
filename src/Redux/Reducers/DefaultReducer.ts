import {createSlice} from '@reduxjs/toolkit';

export type IDefaultState = {};

export const defaultInitialState: IDefaultState = {
  // isLoading: false,
  // error: null,
  // userData: null,
};

const DefaultReducer = createSlice({
  name: 'default',
  initialState: defaultInitialState,
  reducers: {},
  // extraReducers: DefaultAction,
});

export const {} = DefaultReducer.actions;
export default DefaultReducer.reducer;
