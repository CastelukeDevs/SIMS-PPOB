import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {IInformationState} from '@Redux/Reducers/InformationReducer';
import {IAPIResult, ICancelSignal, IEndpoint} from '@Utilities/APIs/APIUtils';
import APICall from '@Utilities/APIs/APICall';

const GetBalancePrefix: IEndpoint = 'BUSINESS_BALANCE';
const GetBannerPrefix: IEndpoint = 'BUSINESS_BANNER';
const GetServicesPrefix: IEndpoint = 'BUSINESS_SERVICES';
const TopUpPrefix: IEndpoint = 'BUSINESS_TOP_UP';

export const getBalance = createAsyncThunk(
  GetBalancePrefix,
  async (props?: ICancelSignal) => {
    const data = await APICall(GetBalancePrefix, {
      abortController: props?.abortController,
    });

    return data;
  },
);

export const getBanner = createAsyncThunk(
  GetBannerPrefix,
  async (props?: ICancelSignal) => {
    const data = await APICall(GetBannerPrefix, {
      abortController: props?.abortController,
    });

    return data;
  },
);

export const getServices = createAsyncThunk(
  GetServicesPrefix,
  async (props?: ICancelSignal) => {
    const data = await APICall(GetServicesPrefix, {
      abortController: props?.abortController,
    });

    return data;
  },
);

export const topUpBalance = createAsyncThunk(
  TopUpPrefix,
  async (props: ICancelSignal & {top_up_amount: number}) => {
    const data = await APICall(TopUpPrefix, {
      abortController: props?.abortController,
      data: {top_up_amount: props.top_up_amount},
    });

    return data;
  },
);

export default (builder: ActionReducerMapBuilder<IInformationState>) => {
  builder
    .addCase(getBalance.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(getBalance.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
    })
    .addCase(
      getBalance.fulfilled,
      (state, action: PayloadAction<IAPIResult<{balance: number}>>) => {
        state.status = 'success';
        state.error = null;
        state.balance = action.payload.data.balance;
      },
    )
    .addCase(getBanner.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(getBanner.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
    })
    .addCase(
      getBanner.fulfilled,
      (state, action: PayloadAction<IAPIResult>) => {
        state.status = 'success';
        state.error = null;
        state.banner = action.payload.data;
      },
    )
    .addCase(getServices.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(getServices.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
    })
    .addCase(
      getServices.fulfilled,
      (state, action: PayloadAction<IAPIResult>) => {
        state.status = 'success';
        state.error = null;
        state.services = action.payload.data;
      },
    )
    .addCase(topUpBalance.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(topUpBalance.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
    })
    .addCase(
      topUpBalance.fulfilled,
      (state, action: PayloadAction<IAPIResult<{balance: number}>>) => {
        state.status = 'success';
        state.error = null;
        state.balance = action.payload.data.balance;
      },
    );
};
