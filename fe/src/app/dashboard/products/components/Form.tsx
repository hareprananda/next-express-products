'use client';

import React, { useEffect, useRef } from 'react';
import { Card, InputNumber, Select } from 'antd';
import { Title } from '@/components/antdchild/Text';
import { Button, Flex, Form, Input } from 'antd';
import { Item } from '@/components/antdchild/Form';
import { capitalize } from '@/helper/utils';
import { CalendarOutlined } from '@ant-design/icons';
import Loading, { LoadingRef } from '@/components/loading/Loading';
import { ProductPayload } from '@/req/product/productmodel';
import ProductReq from '@/req/product/product';
import Notification, { NotifRef } from '@/components/model/Notification';
import { useRouter } from 'next/navigation';

interface Props {
  type: 'add' | 'edit';
  params?: { id: string };
}

const Page: React.FC<Props> = ({ type, params }) => {
  const loadingRef = useRef<LoadingRef>(null);
  const notificationRef = useRef<NotifRef>(null);
  const [form] = Form.useForm<ProductPayload>();
  const { id } = params || {};
  const router = useRouter();

  const showNotification = (isError: boolean, errMsg: string) => {
    if (!isError) {
      notificationRef.current?.prompt('success', `Successfully ${type} data`);
    } else {
      notificationRef.current?.prompt('error', errMsg);
    }
  };

  const onFinish = (values: ProductPayload) => {
    loadingRef.current?.show();

    if (type === 'add') {
      ProductReq.addProduct(values).then((res) => {
        loadingRef.current?.dismiss();
        showNotification(res.error, res.message || '');
        if (!res.error) form.resetFields();
      });
    } else {
      ProductReq.updateProduct(id as string, values).then((res) => {
        loadingRef.current?.dismiss();
        showNotification(res.error, res.message || '');
      });
    }
  };

  const fetchDetail = () => {
    if (!id) return;
    loadingRef.current?.show();
    ProductReq.productDetail(id).then((res) => {
      loadingRef.current?.dismiss();
      if (!res.error) {
        const { name, price, stock, type, year } = res.data;
        form.setFieldsValue({ name, price: price.amount.toString(), stock: stock.toString(), type, year });
      } else notificationRef.current?.prompt('error', res.message);
    });
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const deleteData = () => {
    const shouldDelete = confirm('Are you sure want to delete this data?');
    if (!shouldDelete) return;
    loadingRef.current?.show();
    ProductReq.deleteProduct(id as string).then((res) => {
      if (!res.error) {
        notificationRef.current?.prompt('success', 'Data Successfully deleted');
        setTimeout(() => {
          loadingRef.current?.dismiss();
          router.push('/dashboard/products');
        }, 1000);
      } else {
        loadingRef.current?.dismiss();
      }
    });
  };

  return (
    <>
      <Notification ref={notificationRef} />
      <Loading ref={loadingRef} />
      <div className='w-full max-w-xl'>
        <Title level={3}>
          {capitalize(type)} Product {id || ''}
        </Title>
        <Card bordered={false} className='w-full'>
          <Form form={form} onFinish={onFinish}>
            <Title level={5}>Name</Title>
            <Item name='name' rules={[{ required: true, message: 'Please input product name' }]}>
              <Input data-testid='name-input' placeholder='Type your product name' />
            </Item>

            <Title level={5}>Price</Title>
            <Item name='price' rules={[{ required: true, message: 'Please input product name' }]}>
              <InputNumber
                addonBefore='$'
                data-testid='price-input'
                className='w-full'
                placeholder='Type price of product'
              />
            </Item>

            <Title level={5}>Type</Title>
            <Item name='type' rules={[{ required: true, message: 'Please input product name' }]}>
              <Select
                data-testid='type-select'
                placeholder='Select product type'
                options={[
                  { value: 'second', label: <span>Second</span> },
                  { value: 'new', label: <span>New</span> }
                ]}
              />
            </Item>

            <Title level={5}>Stock</Title>
            <Item name='stock' rules={[{ required: true, message: 'Please input product name' }]}>
              <InputNumber
                placeholder='Type amount stock of product'
                style={{ width: '100%' }}
                data-testid='stock-input'
                className='w-full'
              />
            </Item>

            <Title level={5}>Year</Title>
            <Item name='year' rules={[{ required: true, message: 'Please input product name' }]}>
              <InputNumber
                placeholder='Type year of the product made'
                addonBefore={<CalendarOutlined />}
                data-testid='year-input'
                className='w-full'
              />
            </Item>

            <Flex justify='flex-end' gap={10}>
              {!!id && (
                <Button color='danger' variant='outlined' onClick={deleteData} data-testid='delete-btn'>
                  Delete
                </Button>
              )}
              <Button type='primary' htmlType='submit' data-testid='submit-btn'>
                Submit
              </Button>
            </Flex>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Page;
