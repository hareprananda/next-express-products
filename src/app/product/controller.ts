import { addProductPayloadSchema, infographicProductSchema, paginationSchema, updateProductPayloadSchema } from './dto';
import { Request, Response } from 'express';
import ProductService from './service';
import { httpRes } from '@/utils/utils';

class ProductController {
  addProduct = async (req: Request, res: Response) => {
    try {
      await addProductPayloadSchema.validate(req.body).catch((err) => {
        throw {
          status: 422,
          message: err.message
        };
      });
      const { data, statusCode } = await ProductService.addProductService(req.body);

      httpRes(res, statusCode, data);
    } catch (err) {
      httpRes(res, err?.status || 500, err?.message || 'Internal Server Error');
    }
  };

  detailProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { data, statusCode } = await ProductService.detailProductService(id);

      httpRes(res, statusCode, data);
    } catch (err) {
      httpRes(res, 500, 'Internal Server Error');
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      await updateProductPayloadSchema.validate(req.body).catch((err) => {
        throw {
          status: 422,
          message: err.message
        };
      });
      const id = req.params.id;
      const { data, statusCode } = await ProductService.updateProductService(id, req.body);

      httpRes(res, statusCode, data);
    } catch (err) {
      httpRes(res, err?.status || 500, err?.message || 'Internal Server Error');
    }
  };

  listProduct = async (req: Request, res: Response) => {
    try {
      await paginationSchema.validate(req?.query || {}).catch((err) => {
        throw {
          status: 422,
          message: err.message
        };
      });
      const { page, limit } = req.query || {};
      const params = {
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 20
      };
      const { data, statusCode } = await ProductService.getAllProduct(params);

      httpRes(res, statusCode, data);
    } catch (err) {
      httpRes(res, 500, 'Internal Server Error');
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { data, statusCode } = await ProductService.deleteProductService(id);

      httpRes(res, statusCode, data);
    } catch (err) {
      httpRes(res, err?.status || 500, err?.message || 'Internal Server Error');
    }
  };

  infographicProduct = async (req: Request, res: Response) => {
    try {
      const type = req.params.type;
      await infographicProductSchema.validate({ type }).catch((err) => {
        throw {
          status: 422,
          message: err.message
        };
      });
      const { data, statusCode } = await ProductService.getInfographic(type as 'type' | 'year');

      httpRes(res, statusCode, data);
    } catch (err) {
      httpRes(res, err?.status || 500, err?.message || 'Internal Server Error');
    }
  };
}

export default new ProductController();