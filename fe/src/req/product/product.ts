import apiCall from '..';
import * as Model from './productmodel';

class ProductReqClass {
  chart = (type: 'year' | 'type') => {
    return apiCall<Model.ChartResponse[]>({
      method: 'GET',
      url: `/products/chart/${type}`
    });
  };

  list = (page = 1, limit = 20) => {
    return apiCall<Model.ProductListResponse>({
      method: 'GET',
      url: '/products',
      params: { page, limit }
    });
  };

  addProduct = (data: Model.ProductPayload) => {
    return apiCall<Model.Product>({
      method: 'POST',
      url: '/products',
      data
    });
  };

  deleteProduct = (id: string) => {
    return apiCall({
      method: 'DELETE',
      url: `/products/${id}`
    });
  };

  updateProduct = (id: string, data: Model.ProductPayload) => {
    return apiCall({
      method: 'PUT',
      url: `/products/${id}`,
      data
    });
  };

  productDetail = (id: string) => {
    return apiCall<Model.Product>({
      method: 'GET',
      url: `/products/${id}`
    });
  };
}

const ProductReq = new ProductReqClass();

export default ProductReq;
