import userModel, { User } from '@/db/models/userModel';
import { LoginPayload, RegisterPayload } from './dto';
import { compare, hash } from 'bcrypt';
import { serviceRes } from '@/utils/utils';
import jwt from 'jsonwebtoken';

class AuthService {
  createToken = (tokenContent: User) => {
    const secretKey = process.env.JWT_SECRET;
    const payload = { username: tokenContent.id, email: tokenContent.email };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h', algorithm: 'HS256' });
    return token;
  };

  registerService = async (payload: RegisterPayload) => {
    const password = await hash(payload.password, 10);

    const newUser = await userModel.add({
      id: payload.username,
      email: payload.email,
      password,
      token: ''
    });

    if (newUser) {
      delete payload.password;
      return serviceRes(payload, 200);
    } else {
      return serviceRes('Username already exist', 400);
    }
  };

  loginService = async (payload: LoginPayload) => {
    const user = await userModel.get(payload.username);

    if (user && compare(payload.password, user.password)) {
      const token = this.createToken(user);
      await userModel.update(user.id, { token });
      return serviceRes(
        {
          id: payload.username,
          email: user.email,
          token: token
        },
        200
      );
    } else {
      return serviceRes('Wrong username / password', 400);
    }
  };

  logoutService = async (userId: string) => {
    const update = await userModel.update(userId, { token: '' });

    if (update) {
      return serviceRes({}, 200);
    } else return serviceRes('Logout failed', 400);
  };
}

export default new AuthService();
