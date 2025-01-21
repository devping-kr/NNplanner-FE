import { env } from '@/lib/env';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { parseCookies } from 'nookies';
import { destroyTokens } from '@/utils/destroyTokens';
import { saveTokens } from '@/utils/saveTokens';
import { AUTH_API } from '@/constants/_apiPath';
import { AUTH_LINKS } from '@/constants/_auth';

const TIME_OUT = 1000 * 10;

const redirectToLogin = () => {
  if (
    typeof window !== 'undefined' &&
    window.location.pathname !== AUTH_LINKS.login
  ) {
    window.location.href = AUTH_LINKS.login;
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
    'Content-Type': 'application/json',
    _retry: '0',
  },
  timeout: TIME_OUT,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

type RefreshQueueItem = {
  config: AxiosRequestConfig;
  resolve: (value: AxiosResponse) => void;
  reject: (reason?: AxiosError) => void;
};

let isRefreshed = false;
let refreshAndRetryQueue: RefreshQueueItem[] = [];

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      headers: Record<string, string>;
    };

    if (error.response?.status === 400) {
      return Promise.resolve();
    }

    if (
      !originalRequest ||
      error.response?.status !== 410 ||
      originalRequest.headers._retry === '1'
    ) {
      return Promise.reject(error);
    }

    originalRequest.headers._retry = '1';

    const refreshToken = parseCookies().refreshToken;
    if (!refreshToken) {
      redirectToLogin();
      destroyTokens();
      return Promise.reject(error);
    }

    if (isRefreshed) {
      return new Promise((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    isRefreshed = true;

    try {
      const response = await axios.get(
        `${env.BASE_API_URL}${AUTH_API.REISSUE}`,
        {
          headers: { Refreshtoken: `${refreshToken}` },
        },
      );

      if (response.status === 200) {
        const { accessToken, refreshToken: newRefreshToken } =
          response.data.data;
        saveTokens({ accessToken, refreshToken: newRefreshToken });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          };
          instance.request(config).then(resolve).catch(reject);
        });

        refreshAndRetryQueue = [];

        return instance(originalRequest);
      }
    } catch (refreshError) {
      destroyTokens();
      redirectToLogin();
      refreshAndRetryQueue.forEach(({ reject }) => reject(error as AxiosError));
      refreshAndRetryQueue = [];
      return Promise.reject(refreshError);
    } finally {
      isRefreshed = false;
    }
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
