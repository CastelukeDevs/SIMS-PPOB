import DefaultAction from '@Redux/Actions/DefaultAction';
import {createSlice} from '@reduxjs/toolkit';

//Kept empty as template and other side effects needs
export type IDefaultState = {};
export const defaultInitialState: IDefaultState = {};

const DefaultReducer = createSlice({
  name: 'default',
  initialState: defaultInitialState,
  reducers: {},
  extraReducers: DefaultAction,
});

export const {} = DefaultReducer.actions;
export default DefaultReducer.reducer;
