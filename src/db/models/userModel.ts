import BaseModel from './baseModel';

export type User = {
  id: string;
  email: string;
  password: string;
  token: string;
};

class UserModel extends BaseModel<User> {
  protected key: string = 'users';
}

export default new UserModel();
