'use client';
import { Text } from '@/components/antdchild/Text';
import LocalStorage from '@/helper/localstorage';
import { UserOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import React from 'react';

const Name = () => {
  let user = {
    id: '',
    email: ''
  };

  if (typeof window !== 'undefined') {
    user = (LocalStorage.get('user') || {}) as typeof user;
  }
  return (
    <Flex align='center' gap={'10px'}>
      <UserOutlined style={{ fontSize: 20 }} />
      <Flex vertical className='overflow-hidden'>
        <Text className='text-ellipsis block overflow-hidden text-nowrap'>{user?.id}</Text>
        <Text className='text-ellipsis block overflow-hidden text-nowrap'>{user?.email}</Text>
      </Flex>
    </Flex>
  );
};

export default Name;
