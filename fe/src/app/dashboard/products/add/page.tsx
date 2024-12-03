import React from 'react';
import ProductForm from '../components/Form';
import { Flex } from 'antd';

const page = () => {
  return (
    <Flex justify='center'>
      <ProductForm type='add' />
    </Flex>
  );
};

export default page;
