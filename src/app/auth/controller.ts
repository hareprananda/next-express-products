import { httpRes } from '@/utils/utils';
import { Request, Response } from 'express';
import AuthService from './service';

class AuthController {
  registerController = async (req: Request, res: Response) => {
    try {
      const { data, statusCode } = await AuthService.registerService(req.body);

      httpRes(res, statusCode, data);
    } catch {
      httpRes(res, 500, 'Internal Server Error');
    }
  };

  loginController = async (req: Request, res: Response) => {
    try {
      const { data, statusCode } = await AuthService.registerService(req.body);

      httpRes(res, statusCode, data);
    } catch {
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
