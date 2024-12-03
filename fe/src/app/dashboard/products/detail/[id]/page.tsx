import React from 'react';
import ProductForm from '../../components/Form';
import { Flex } from 'antd';

interface Props {
  params: { id: string };
}

const Page: React.FC<Props> = ({ params }) => {
  return (
    <Flex justify='center'>
      <ProductForm type='edit' params={params} />
    </Flex>
  );
};

export default Page;
