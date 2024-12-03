import { Text } from '@/components/antdchild/Text';
import { getSession } from '@/lib';
import { UserOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import React from 'react';

const Name = () => {
  const session = getSession();
  return (
    <Flex align='center' gap={'10px'}>
      <UserOutlined style={{ fontSize: 20 }} />
      <Flex vertical className='overflow-hidden'>
        <Text className='text-ellipsis block overflow-hidden text-nowrap'>{session?.id}</Text>
        <Text className='text-ellipsis block overflow-hidden text-nowrap'>{session?.email}</Text>
      </Flex>
    </Flex>
  );
};

export default Name;
