import config from '@/config';
import axios, { AxiosError } from 'axios';
import { ErrorResponse, Response } from './index.d';
import Cookies from 'js-cookie';

interface Props {
  url: string;
  method: 'PUT' | 'POST' | 'PATCH' | 'GET' | 'DELETE';
  data?: Record<string, any>;
  params?: Record<string, number | string>;
  withToken?: boolean;
}

const apiCall = <T>({ withToken = true, ...props }: Props) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (withToken && typeof window !== 'undefined') {
    const token = JSON.parse(Cookies.get('session') || '{}')['token'] || '';
    headers['Authorization'] = 'Bearer ' + token;
  }

  return axios<Response<T>>({
    baseURL: config.API,
    headers,
    ...props
  })
    .then((res) => {
      res.data['error'] = false;
      return res.data;
    })
    .catch((err: AxiosError<{ statusCode: number; message: string; status: 'error' }>) => {
      if (err.response?.status === 401) {
        Cookies.remove('session');
        window?.location.replace('/auth/login');
      }
      return {
        error: true,
        message: ((err.response?.data as any)?.message as any) || err.message,
        statusCode: err.response?.data.statusCode,
        data: undefined
      } as ErrorResponse;
    });
};

export default apiCall;
