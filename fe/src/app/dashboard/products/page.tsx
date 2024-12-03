'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import type { TableProps } from 'antd';
import LocalLoading from '@/components/loading/LocalLoading';
import { ProductListResponse } from '@/req/product/productmodel';
import ProductReq from '@/req/product/product';
import Link from 'next/link';
import { Title } from '@/components/antdchild/Text';

type ProductType = ProductListResponse['data'][number];

const pageSize = 5;
const ProductList: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState<ProductType[]>([]);

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
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, { id }) => {
        return <Link href={`/dashboard/products/detail/${id}`}>Detail</Link>;
      }
    }
  ];

  const reqProduct = (page: number) => {
    setLoading(true);
    ProductReq.list(page, pageSize).then((res) => {
      setLoading(false);
      if (!res.error) {
        const { metadata } = res.data;
        setData(res.data.data);
        setTotalData(metadata.count);
      }
    });
  };

  useEffect(() => {
    reqProduct(1);
  }, []);

  return (
    <>
      <Title level={3}>Products</Title>
      <Card title='Product Data' extra={<Link href={'/dashboard/products/add'}>Add Product</Link>} bordered={false}>
        <LocalLoading showLoading={loading} data-testid='productList-loading' />
        <Table<ProductType>
          pagination={{
            position: ['none', 'bottomCenter'],
            pageSize: pageSize,
            total: totalData,
            onChange(page) {
              reqProduct(page);
            }
          }}
          columns={newColumns}
          dataSource={data}
        />
      </Card>
    </>
  );
};

export default ProductList;
