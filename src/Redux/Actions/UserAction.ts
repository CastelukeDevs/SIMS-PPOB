import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import {IUserState} from '@Redux/Reducers/UserReducer';

import APICall from '@Utilities/APIs/APICall';
import {IAPIResult, ICancelSignal, IEndpoint} from '@Utilities/APIs/APIUtils';
import {IUser, IUserAuth, IUserMain} from '@Types/UserTypes';
import ImagePathSanityCheck from '@Utilities/Tools/ImagePathSanityCheck';

const GetUserPrefix: IEndpoint = 'USER_PROFILE';
const AuthSignInPrefix: IEndpoint = 'AUTH_LOGIN';
const AuthSignUpPrefix: IEndpoint = 'AUTH_REGISTER';

export const fetchUser = createAsyncThunk(
  GetUserPrefix,
  async (props?: ICancelSignal) => {
    const data = await APICall(GetUserPrefix, {
      abortController: props?.abortController,
    });

    return data;
  },
);

export const authSignUpUser = createAsyncThunk(
  AuthSignUpPrefix,
  async (props: IUserAuth & IUserMain & ICancelSignal) => {
    const data = await APICall(AuthSignUpPrefix, {
      abortController: props?.abortController,
      data: props,
    });

    return data;
  },
);

export const authSignInUser = createAsyncThunk(
  AuthSignInPrefix,
  async (props: IUserAuth & ICancelSignal) => {
    const data = await APICall(AuthSignInPrefix, {
      abortController: props?.abortController,
      data: props,
    });

    return data;
  },
);

export default (builder: ActionReducerMapBuilder<IUserState>) => {
  builder
    .addCase(fetchUser.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      const data: IUser = action.payload.data;
      const imagePath = ImagePathSanityCheck(data.profile_image);
      data.profile_image = imagePath;
      console.log('newData', data);

      //   data.profile_image = data.profile_image;

      state.status = 'success';
      state.error = null;
      state.userData = data;
      //   state.userData = action.payload;
    })
    .addCase(authSignUpUser.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(authSignUpUser.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
    })
    .addCase(authSignUpUser.fulfilled, state => {
      state.status = 'success';
      state.error = null;
      //   state.userData = action.payload;
    })
    .addCase(authSignInUser.pending, state => {
      state.status = 'fetching';
      state.error = null;
    })
    .addCase(authSignInUser.rejected, (state, action) => {
      state.status = 'error';
      state.error = {message: action.error.message!, error: action.error};
    })
    .addCase(
      authSignInUser.fulfilled,
      (state, action: PayloadAction<IAPIResult<{token: string}>>) => {
        state.status = 'success';
        state.error = null;
        state.token = action.payload.data.token;
        //   state.userData = action.payload;
      },
    );
};
