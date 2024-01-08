import InformationAction from '@Redux/Actions/InformationAction';
import {IBanner, IServices} from '@Types/BusinessInfoTypes';
import {IStatusState} from '@Types/CommonTypes';
import {createSlice} from '@reduxjs/toolkit';

export type IInformationState = {
  balance: number;
  banner: IBanner[];
  services: IServices[];
} & IStatusState;

export const informationInitialState: IInformationState = {
  error: null,
  status: 'idle',
  balance: 0,
  banner: [],
  services: [],
};

const InformationReducer = createSlice({
  name: 'utility',
  initialState: informationInitialState,
  reducers: {
    /**
     * Reset all Business Information state
     */
    resetBusiness: () => {
      return {...informationInitialState};
    },
    /**
     * Reset all Business Information except banner and services
     */
    resetBalance: state => {
      return {...state, error: null, status: 'idle', balance: 0};
    },
  },
  extraReducers: InformationAction,
});

export const {resetBusiness, resetBalance} = InformationReducer.actions;
export default InformationReducer.reducer;
