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
}

const ProductReq = new ProductReqClass();

export default ProductReq;
