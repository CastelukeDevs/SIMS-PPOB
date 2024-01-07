import {IEndpointPool} from './APIUtils';

/**
 * This endpoint pool types accepts
 * @type IEndpointPool
 */

export const BASE_URL = 'https://take-home-test-api.nutech-integrasi.app';

const EndpointPool = [
  {
    endpoint: 'AUTH_REGISTER',
    url: '/registration',
    method: 'post',
    auth: false,
  },
  {
    endpoint: 'AUTH_LOGIN',
    url: '/login',
    method: 'post',
    auth: false,
  },
  {
    endpoint: 'USER_PROFILE',
    url: '/profile',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'USER_PROFILE_UPDATE',
    url: '/profile/update',
    method: 'put',
    auth: true,
  },
  {
    endpoint: 'USER_PROFILE_UPDATE_IMAGE',
    url: '/profile/image',
    method: 'put',
    auth: true,
  },
  {
    endpoint: 'BUSINESS_BANNER',
    url: '/banner',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'BUSINESS_SERVICES',
    url: '/services',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'BUSINESS_BALANCE',
    url: '/balance',
    method: 'get',
    auth: true,
  },
  {
    endpoint: 'BUSINESS_TOP_UP',
    url: '/topup',
    method: 'post',
    auth: true,
  },
  {
    endpoint: 'CREATE_TRANSACTION',
    url: '/transaction',
    method: 'post',
    auth: true,
  },
  {
    endpoint: 'GET_TRANSACTION',
    url: '/transaction/history',
    method: 'get',
    auth: true,
  },
] as const satisfies IEndpointPool[];

export default EndpointPool;
