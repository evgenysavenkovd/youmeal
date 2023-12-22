import { ICredentials } from '@common/interfaces';
import axios, { AxiosError, isAxiosError } from 'axios';
import Cookies from 'js-cookie';
import { cookiesKeys } from '../cookiesKeys';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const apiClientBase = axios.create({
  baseURL,
  withCredentials: true,
  transformRequest: [
    (data, headers) => {
      const token = Cookies.get(cookiesKeys.accessToken);
      if (token) headers['Authorization'] = `Bearer ${token}`;
      return data;
    },
    ...(axios.defaults.transformRequest as [])
  ]
});

apiClientBase.interceptors.response.use(
  (res) => res,
  async (error: AxiosError | Error) => {
    if (!isAxiosError(error)) {
      console.error(error);
      return;
    }
    console.log({ status: error.response?.status, error });
    const originalRequest = error.config;
    if (originalRequest && error.response?.status === 401) {
      const isRetry = (error.config as { _retry?: boolean })._retry;
      const refreshToken = Cookies.get(cookiesKeys.refreshToken);
      console.log({ isRetry, refreshToken });
      if (!isRetry && refreshToken) {
        const response = await axios
          .post<ICredentials>(`${baseURL}/auth/refresh`, { refreshToken })
          .catch(() => null);
        if (response) {
          storeCredentials(response.data);
          (error.config as { _retry?: boolean })._retry = true;
          return apiClientBase(originalRequest);
        }
      } else {
        Cookies.remove(cookiesKeys.accessToken);
        Cookies.remove(cookiesKeys.refreshToken);
      }
    }
    return Promise.reject(error);
  }
);

export function storeCredentials({ accessToken, refreshToken }: ICredentials) {
  Cookies.set(cookiesKeys.accessToken, accessToken);
  Cookies.set(cookiesKeys.refreshToken, refreshToken);
}
