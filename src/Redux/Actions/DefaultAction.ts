import {IInformationState} from '@Redux/Reducers/InformationReducer';
import {ActionReducerMapBuilder} from '@reduxjs/toolkit';

// const GetContactPrefix: IEndpoint = 'GET_USER';

// export const fetchUser = createAsyncThunk(GetContactPrefix, async () => {
//   const result = await APICall('GET_USER');

//   return result;
// });

export default (builder: ActionReducerMapBuilder<IInformationState>) => {
  // builder
  //   .addCase(fetchUser.pending, state => {
  //     state.error = null;
  //     state.isLoading = true;
  //   })
  //   .addCase(fetchUser.rejected, (state, action: any) => {
  //     state.error = {isError: true, message: action.payload.message};
  //     state.isLoading = false;
  //   })
  //   .addCase(fetchUser.fulfilled, (state, action) => {
  //     state.error = {isError: false, message: null};
  //     state.isLoading = false;
  //     state.userData = action.payload;
  //   });
};
