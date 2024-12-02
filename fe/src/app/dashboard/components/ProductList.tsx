'use client';

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import LocalLoading from '@/components/loading/LocalLoading';
import { ProductListResponse } from '@/req/product/productmodel';
import ProductReq from '@/req/product/product';

type ProductType = ProductListResponse['data'][number];

const newColumns: TableProps<ProductType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (_, { price }) => {
      return price.formattedAmount;
    }
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock'
  },
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year'
  }
];

const ProductList: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<ProductType[]>([]);

  const reqProduct = () => {
    setLoading(true);
    ProductReq.list(1, 5).then((res) => {
      setLoading(false);
      if (!res.error) {
        setData(res.data.data);
      }
    });
  };

  useEffect(() => {
    reqProduct();
  }, []);

  return (
    <>
      <LocalLoading showLoading={loading} data-testid='productList-loading' />
      <Table<ProductType> pagination={{ position: ['none', 'none'] }} columns={newColumns} dataSource={data} />
    </>
  );
};

export default ProductList;
