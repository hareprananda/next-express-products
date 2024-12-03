import React from 'react';
import ProductForm from '@/app/dashboard/products/components/Form';
import { Flex } from 'antd';

const Page = () => {
  return (
    <Flex justify='center' data-testid='flexx'>
      <ProductForm type='add' />
    </Flex>
  );
};

export default Page;
