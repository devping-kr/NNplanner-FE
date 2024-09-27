import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { saveTokens } from '@/utils/saveTokens';
import { env } from './env';

const TIME_OUT = 1000 * 10;

const redirectToLogin = () => {
  if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
};

const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

const instance = axios.create({
  baseURL: env.BASE_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  withCredentials: true,
  timeout: TIME_OUT,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (typeof window !== 'undefined') {
        const refreshToken = Cookies.get('refreshToken');
        if (refreshToken) {
          try {
            const response = await instance.get('/api/auths/reissue', {
              withCredentials: true,
            });

            if (response.status === 200) {
              const { accessToken, refreshToken } = response.data.data;

              saveTokens({ accessToken, refreshToken });
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return await instance(originalRequest);
            }
          } catch (refreshError) {
            alert('로그인이 필요합니다.');
          }
        }
      }
      redirectToLogin();
    }
    return Promise.reject(error);
  },
);

// 디버깅 용 인터셉터
// instance.interceptors.response.use(
//   (response) => {
//     console.log('Response:', response);
//     return response;
//   },
//   async (error) => {
//     console.error('Error in response interceptor:', error);
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       originalRequest &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       console.log('401 error, retrying with refreshed token...');
//       if (typeof window !== 'undefined') {
//         const refreshToken = Cookies.get('refreshToken');
//         console.log('Refresh Token:', refreshToken);
//         if (refreshToken) {
//           try {
//             const response = await instance.get('/api/auths/reissue', {
//               withCredentials: true,
//             });
//             console.log('Reissue response:', response);

//             if (response.status === 200) {
//               const { accessToken, refreshToken } = response.data.data;
//               saveTokens({ accessToken, refreshToken });

//               originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//               return await instance(originalRequest);
//             }
//           } catch (refreshError) {
//             console.error('Refresh token failed', refreshError);
//           }
//         }
//       }
//       redirectToLogin();
//     }

//     return Promise.reject(error);
//   },
// );

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
