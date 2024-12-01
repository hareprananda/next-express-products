import Auth from '@/app/auth/controller';
import Product from '@/app/product/controller';
import auth from '@/middleware/auth';
import { httpRes } from '@/utils/utils';
import express from 'express';

const routes = express.Router();

routes.post('/auth/register', Auth.registerController);
routes.post('/auth/login', Auth.loginController);
routes.post('/auth/logout', auth(Auth.logoutController));
routes.post('/products', auth(Product.addProduct));
routes.get('/products/:id', auth(Product.detailProduct));
routes.put('/products/:id', auth(Product.updateProduct));
routes.delete('/products/:id', auth(Product.deleteProduct));
routes.get('/products', auth(Product.listProduct));
routes.get('/products/chart/:type', auth(Product.infographicProduct));
routes.all('*', (req, res) => {
  httpRes(res, 404, 'Not Found');
});

export default routes;
