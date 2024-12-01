import { Response } from 'express';

export const httpRes = (res: Response, statusCode: number, data: Record<string, any> | string) => {
  const returnedObj = {
    status: 'success',
    statusCode: statusCode
  } as Record<string, any>;

  if (typeof data === 'object') returnedObj['data'] = data;
  else {
    returnedObj['status'] = 'error';
    returnedObj['message'] = data;
  }

  res.status(statusCode).json(returnedObj);
};

export const serviceRes = <T extends number>(data: T extends 200 ? Record<string, any> : string, statusCode: T) => {
  return {
    data,
    statusCode
  };
};

export const formatMoney = (amount: number) => {
  return {
    amount,
    formattedAmount: '$' + amount.toLocaleString()
  };
};
