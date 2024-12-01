import BaseModel from './baseModel';

export type Product = {
  id: string;
  name: string;
  type: 'new' | 'second';
  year: string;
  price: number;
  stock: number;
};

class ProductModel extends BaseModel<Product> {
  protected key: string = 'products';
}

export default new ProductModel();
