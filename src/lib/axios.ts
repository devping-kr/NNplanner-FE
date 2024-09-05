import axios, { AxiosResponse } from 'axios';
import { env } from './env';

const instance = axios.create({
  baseURL: env.BASE_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  withCredentials: true,
  timeout: 10000,
});

instance.interceptors.request.use(
  function fullfilledRequestInterceptor(config) {
    return config;
  },
  function rejectedRequestInterceptor(error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function fullfilledResponseInterceptor(response) {
    return response;
  },
  function rejectedResponseInterceptor(error) {
    return Promise.reject(error);
  },
);

export const get = <T>(...args: Parameters<typeof instance.get>) => {
  return instance.get<T, AxiosResponse<T>>(...args);
};

export const post = <T>(...args: Parameters<typeof instance.post>) => {
  return instance.post<T, AxiosResponse<T>>(...args);
};

export const put = <T>(...args: Parameters<typeof instance.put>) => {
  return instance.put<T, AxiosResponse<T>>(...args);
};

export const patch = <T>(...args: Parameters<typeof instance.patch>) => {
  return instance.patch<T, AxiosResponse<T>>(...args);
};

export const del = <T>(...args: Parameters<typeof instance.delete>) => {
  return instance.delete<T, AxiosResponse<T>>(...args);
};
