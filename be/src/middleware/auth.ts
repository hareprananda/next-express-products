import { TokenPayload } from '@/app/auth/dto';
import userModel from '@/db/models/userModel';
import { httpRes } from '@/utils/utils';
import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';

const auth = (f: (req: Request, res: Response) => void) => {
  return async (r: Request, res: Response) => {
    let bearerToken = r.headers['authorization'];
    if (!bearerToken) {
      httpRes(res, 401, 'Unauthorized');
      return;
    }

    bearerToken = bearerToken.replace(/^Bearer\s/, '');
    const decodedPayload = jwt.decode(bearerToken) as TokenPayload;
    try {
      const user = await userModel.get(decodedPayload.username);
      if (!user || user.token !== bearerToken) throw 'err';
      jwt.verify(bearerToken, process.env.JWT_SECRET, {
        algorithms: ['HS256']
      }) as TokenPayload;
    } catch (err) {
      if (err?.message === 'jwt expired') {
        await userModel.update(decodedPayload.username, { token: '' });
      }
      httpRes(res, 401, 'Unauthorized');
      return;
    }

    f(r, res);
  };
};

export default auth;
