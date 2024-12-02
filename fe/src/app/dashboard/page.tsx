import React from 'react';
import { Title } from '@/components/antdchild/Text';
import { Card, Col, Row } from 'antd';
import TypeChart from './components/TypeChart';
import YearChart from './components/YearChart';
import ProductList from './components/ProductList';
import Link from 'next/link';

const page = () => {
  return (
    <>
      <Title level={3}>Home</Title>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Card title='Product Data' extra={<Link href={'/dashboard/products'}>More Data</Link>} bordered={false}>
            <ProductList />
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card title={'Type Chart'} bordered={false}>
            <div style={{ height: '300px' }}>
              <TypeChart />
            </div>
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card title={'Year Chart'} bordered={false}>
            <div style={{ height: '300px' }}>
              <YearChart />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default page;
