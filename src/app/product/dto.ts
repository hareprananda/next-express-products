import { number, object, string } from 'yup';

export const addProductPayloadSchema = object({
  name: string().required(),
  price: number().required(),
  type: string().required().oneOf(['new', 'second']),
  stock: number().required(),
  year: number().min(1000).max(new Date().getFullYear()).required()
});

export type Pagination = {
  limit: number;
  page: number;
};

export const updateProductPayloadSchema = object({
  name: string(),
  price: number(),
  type: string().oneOf(['new', 'second']),
  stock: number()
});

export const paginationSchema = object({
  limit: number(),
  page: number()
});

export const infographicProductSchema = object({
  type: string().oneOf(['year', 'type']).required()
});
