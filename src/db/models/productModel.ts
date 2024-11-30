import BaseModel from './baseModel';

type Product = {
  id: string;
  name: string;
  type: 'new' | 'second';
  price: number;
  amount: number;
};

class ProductModel extends BaseModel<Product> {
  protected key: string = 'products';
}

export default new ProductModel();
