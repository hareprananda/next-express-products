import axios, { AxiosError } from 'axios';
import { ErrorResponse, Response } from './req/index.d';
import LocalStorage from '@/helper/localstorage';
import { getSession } from '@/lib';

interface Props {
  url: string;
  method: 'PUT' | 'POST' | 'PATCH' | 'GET' | 'DELETE';
  data?: Record<string, any>;
  params?: Record<string, number | string>;
  withToken?: boolean;
}

const serverApiCall = <T>({ withToken = true, ...props }: Props) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (withToken && typeof window !== 'undefined') {
    headers['Authorization'] = 'Bearer ' + (getSession()?.token || '');
  }

  return axios<Response<T>>({
    baseURL: `http://${process.env.BE_SERVICE_PORT || 'localhost:8080'}`,
    headers,
    ...props
  })
    .then((res) => {
      res.data['error'] = false;
      return res.data;
    })
    .catch((err: AxiosError<{ statusCode: number; message: string; status: 'error' }>) => {
      if (err.response?.status === 401) {
        if (typeof window !== 'undefined') {
          LocalStorage.delete('user');
          window?.location.replace('/auth/login');
        }
      }
      return {
        error: true,
        message: ((err.response?.data as any)?.message as any) || err.message,
        statusCode: err.response?.data.statusCode,
        data: undefined
      } as ErrorResponse;
    });
};

export default serverApiCall;
