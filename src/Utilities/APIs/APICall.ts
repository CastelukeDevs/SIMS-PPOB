import axios, {AxiosError, AxiosResponse} from 'axios';
import {
  IAPIResult,
  IAPIsCallOption,
  IEndpoint,
  TransformObjectToForm,
  getEndpoint,
} from './APIUtils';
import {BASE_URL} from './EndpointPool';
import {retrieveToken} from '@Utilities/Tools/AsyncStorageUtils';

const APICall = async (endpoint: IEndpoint, options?: IAPIsCallOption) => {
  axios.defaults.baseURL = BASE_URL;

  const selectEndpoint = getEndpoint(endpoint)!;

  const token = await retrieveToken();

  console.log('TOKEEEN', token);

  const requestHeader = selectEndpoint.auth
    ? {Authorization: `Bearer ${token}`}
    : {};

  const payloadForm = TransformObjectToForm(options?.data);
  console.log(`=> New API Call ${endpoint} with detail:`, {
    options,
    payloadData: payloadForm,
    requestHeader,
  });

  return await axios({
    method: selectEndpoint.method,
    url: selectEndpoint.url,
    data: options?.form ? payloadForm : options?.data,
    params: options?.params,
    signal: options?.abortController?.signal,
    headers: {
      ...requestHeader,
      'Content-Type': 'application/json',
    },
  })
    .then((result: AxiosResponse<IAPIResult>) => {
      console.log(`=> [O] axios request ${endpoint} success`, result);

      return result.data;
    })
    .catch((error: AxiosError<IAPIResult>) => {
      const errorPayload = {
        message: error.response?.data?.message || error.message,
        code: `${error.response?.data.status}`,
        status: error.response?.data.status,
        response: error.response?.data || error.response,
      };
      console.log(
        `=> [X] axios request ${endpoint} error with code: ${errorPayload.code} //message: ${errorPayload.message}`,
      );
      console.log('=> [X] axios error:', error);

      throw errorPayload;
    });
};

export default APICall;
