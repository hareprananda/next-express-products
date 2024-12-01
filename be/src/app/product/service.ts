import productModel, { Product } from '@/db/models/productModel';
import { formatMoney, serviceRes } from '@/utils/utils';
import { Pagination } from './dto';

class ProductService {
  addProductService = async (payload: Omit<Product, 'id'>) => {
    const id = Math.floor(Math.random() * Math.pow(10, 5)) + '' + new Date().getTime();

    const newProduct = {
      id,
      ...payload
    };
    const addSuccess = await productModel.add(newProduct);

    if (addSuccess) {
      return serviceRes({ ...newProduct, price: formatMoney(newProduct.price) }, 200);
    }
    return serviceRes('add product failed', 400);
  };

  detailProductService = async (id: string) => {
    const product = await productModel.get(id);

    if (product) return serviceRes({ ...product, price: formatMoney(product.price) }, 200);
    return serviceRes('no product found', 400);
  };

  updateProductService = async (id: string, payload: Partial<Product>) => {
    const product = await productModel.update(id, payload);

    if (product) return serviceRes({}, 200);
    return serviceRes('update product failed', 400);
  };

  deleteProductService = async (id: string) => {
    const product = await productModel.delete(id);

    if (product) return serviceRes({}, 200);
    return serviceRes('delete product failed', 400);
  };

  getAllProduct = async ({ page, limit }: Pagination) => {
    const data = await productModel.pagination(page, limit);
    if (data) {
      const newData = data.data.map((v) => ({
        ...v,
        price: formatMoney(v.price)
      }));
      return serviceRes({ metadata: data.metadata, data: newData }, 200);
    }
    return serviceRes('something went wrong', 500);
  };

  getInfographic = async (type: 'type' | 'year') => {
    const allData = await productModel.getAll();
    // const result: {comparator: string, value: number} = [];
    const tempObj: Record<string, number> = {};

    for (const data of allData) {
      const comparatorName = data[type] || 'unclassified';
      if (tempObj[comparatorName]) tempObj[comparatorName] += data.stock;
      else tempObj[comparatorName] = data.stock;
    }

    const finalData = Object.keys(tempObj).map((v) => ({
      comparator: v,
      value: tempObj[v]
    }));

    return serviceRes(finalData, 200);
  };
}

export default new ProductService();
