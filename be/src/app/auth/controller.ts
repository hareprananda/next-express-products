import { httpRes } from '@/utils/utils';
import { Request, Response } from 'express';
import AuthService from './service';
import { registerPayloadSchema } from './dto';

class AuthController {
  registerController = async (req: Request, res: Response) => {
    try {
      await registerPayloadSchema.validate(req.body).catch((err) => {
        throw {
          status: 422,
          message: err.message
        };
      });
      const { data, statusCode } = await AuthService.registerService(req.body);

      httpRes(res, statusCode, data);
    } catch (err) {
      httpRes(res, err?.status || 500, err?.message || 'Internal Server Error');
    }
  };

  loginController = async (req: Request, res: Response) => {
    try {
      const { data, statusCode } = await AuthService.loginService(req.body);

      httpRes(res, statusCode, data);
    } catch (err) {
      httpRes(res, 500, 'Internal Server Error');
    }
  };

  logoutController = async (req: Request, res: Response) => {
    try {
      const { data, statusCode } = await AuthService.logoutService(req.body);
      httpRes(res, statusCode, data);
    } catch {
      httpRes(res, 500, 'Internal Server Error');
    }
  };
}

export default new AuthController();
