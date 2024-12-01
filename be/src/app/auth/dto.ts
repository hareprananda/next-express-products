import { object, string } from 'yup';

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export const registerPayloadSchema = object({
  username: string()
    .matches(/^[^\s]+$/g, { message: "Pleaes don't include whitepace on username" })
    .required(),
  email: string().email().required(),
  password: string().min(8).required()
});

export type TokenPayload = {
  username: string;
  email: string;
  iat: number;
  exp: number;
};
