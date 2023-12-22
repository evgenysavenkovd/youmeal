import { ICredentials } from '@common/interfaces';
import axios, { AxiosError, isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { cookiesKeys } from '../cookiesKeys';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const apiServerBase = axios.create({
  baseURL,
  transformRequest: [
    (data, headers) => {
      const token = cookies().get(cookiesKeys.accessToken)?.value;
      const basket = cookies().get(cookiesKeys.basket)?.value;
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (basket) headers['Cookie'] = `basket=${basket}`;
      return data;
    },
    ...(axios.defaults.transformRequest as [])
  ]
});

apiServerBase.interceptors.response.use(
  (res) => res,
  async (error: AxiosError | Error) => {
    if (!isAxiosError(error)) {
      console.error(error);
      return;
    }
    const originalRequest = error.config;
    if (originalRequest && error.status === 401) {
      const isRetry = (error.config as { _retry?: boolean })._retry;
      const refreshToken = cookies().get(cookiesKeys.refreshToken)?.value;
      if (!isRetry && refreshToken) {
        const response = await axios
          .post<ICredentials>(`${baseURL}/auth/refresh`, { refreshToken })
          .catch(() => null);
        if (response) {
          storeCredentials(response.data);
          (error.config as { _retry?: boolean })._retry = true;
          return apiServerBase(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

function storeCredentials({ accessToken, refreshToken }: ICredentials) {
  cookies().set(cookiesKeys.accessToken, accessToken);
  cookies().set(cookiesKeys.refreshToken, refreshToken);
}
