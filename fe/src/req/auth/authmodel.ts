export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginRes = {
  id: string;
  email: string;
  token: string;
};

export type RegisterRes = {
  username: string;
  email: string;
};
