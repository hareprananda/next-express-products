import config from '@/config';
import axios, { AxiosError } from 'axios';
import { ErrorResponse, Response } from './index.d';
import LocalStorage from '@/helper/localstorage';
import { redirect } from 'next/navigation';

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

  if (withToken) {
    headers['Authorization'] = 'Bearer ' + LocalStorage.get('user')?.token || '';
  }

  return axios<Response<T>>({
    baseURL: config.API,
    headers,
    ...props
  })
    .then((res) => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) {
        LocalStorage.delete('user');
        redirect('/auth/login');
        // return {
        //   error: true,
        //   message: ['Session Expired'],
        //   statusCode: 401,
        //   data: undefined
        // } as ErrorResponse;
      }
      return {
        error: true,
        message: ((err.response?.data as any).message as any) || [err.message],
        statusCode: 500,
        data: undefined
      } as ErrorResponse;
    });
};

export default apiCall;
