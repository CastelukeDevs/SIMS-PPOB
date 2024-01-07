import EndpointPool from './EndpointPool';

enum EndpointMethod {
  get,
  post,
  delete,
  put,
}

export type IEndpointMethod = keyof typeof EndpointMethod;

export type IEndpointPool = {
  endpoint: string;
  url: string;
  method: IEndpointMethod;
  auth?: boolean;
};

export type IEndpoint = (typeof EndpointPool)[number]['endpoint'];

export type ICancelSignal = {
  abortController?: AbortController;
};

export type IAPIsCallOption = {
  params?: any;
  data?: any;
  auth?: boolean;
  form?: boolean;
  token?: string;
} & ICancelSignal;

export type IAPIResult<T = never> = {
  message: string;
  status: number;
  data: T;
};

/**
 * Get endpoint from endpoint pools
 * @param endpoint
 * @returns IEndpointPool type object
 */
export const getEndpoint = (endpoint: IEndpoint): IEndpointPool | undefined => {
  return EndpointPool.find(item => item.endpoint === endpoint);
};

/**
 * Transform ANY JSON Payload to form data
 * This prove useful when the JSON Payload includes array
 */
export const TransformObjectToForm = (object: any): FormData => {
  if (object === null || object === undefined) return object;
  const formData = new FormData();
  Object.keys(object).forEach(key => {
    const value = object[key];
    if (Array.isArray(value)) {
      value.forEach(v => {
        formData.append(`${key}[]`, JSON.stringify(v));
      });
    } else {
      formData.append(key, object[key]);
    }
  });
  return formData;
};
