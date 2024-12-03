import { Text } from '@/components/antdchild/Text';
import { logout } from '@/lib';
import { LogoutOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { redirect } from 'next/navigation';
import React from 'react';

const LogoutBtn = () => {
  const clickLogout = async () => {
    'use server';
    await logout();
    redirect('/auth/login');
  };

  return (
    <>
      <form action={clickLogout}>
        <Button type='text' htmlType='submit'>
          <Flex justify='space-between' align='center' gap={'10px'}>
            <LogoutOutlined style={{ fontSize: 20 }} />

            <Text>Logout</Text>
          </Flex>
        </Button>
      </form>
    </>
  );
};

export default LogoutBtn;
