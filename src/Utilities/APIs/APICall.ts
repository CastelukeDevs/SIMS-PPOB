import axios, {AxiosError, AxiosResponse} from 'axios';
import {
  IAPIResult,
  IAPIsCallOption,
  IEndpoint,
  TransformObjectToForm,
  getEndpoint,
} from './APIUtils';
import {BASE_URL} from './EndpointPool';

const APICall = async (endpoint: IEndpoint, options?: IAPIsCallOption) => {
  axios.defaults.baseURL = BASE_URL;

  const selectEndpoint = getEndpoint(endpoint)!;

  // const requestHeader = selectEndpoint.auth
  //   ? {Authorization: `Bearer ${token}`}
  //   : {};

  const payloadForm = TransformObjectToForm(options?.data);
  console.log(`=> New API Call ${endpoint} with detail:`, {
    options,
    payloadData: payloadForm,
  });

  return await axios({
    method: selectEndpoint.method,
    url: selectEndpoint.url,
    data: options?.form ? payloadForm : options?.data,
    params: options?.params,
    signal: options?.abortController?.signal,
    headers: {
      'Content-Type': options?.form
        ? 'multipart/form-data'
        : 'application/json',
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
      console.error(
        `=> [X] axios request ${endpoint} error with code: ${errorPayload.code} //message: ${errorPayload.message}`,
      );
      console.error('=> [X] axios error:', error);

      throw errorPayload;
    });
};

export default APICall;
