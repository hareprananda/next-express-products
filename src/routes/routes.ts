import Auth from '@/app/auth/controller';
import auth from '@/middleware/auth';
import express from 'express';

const routes = express.Router();

routes.post('/auth/register', Auth.registerController);
routes.post('/auth/login', Auth.loginController);
routes.post('/auth/logout', auth(Auth.logoutController));

export default routes;
