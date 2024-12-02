'use client';

import { Text } from '@/components/antdchild/Text';
import Loading, { LoadingRef } from '@/components/loading/Loading';
import NotifError, { NotifErrorRef } from '@/components/model/Notification';
import AuthReq from '@/req/auth/auth';
import { LogoutOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

const LogoutBtn = () => {
  const loadingRef = useRef<LoadingRef>(null);
  const errorRef = useRef<NotifErrorRef>(null);
  const router = useRouter();

  const clickLogout = () => {
    loadingRef.current?.show();
    AuthReq.logout().then((res) => {
      loadingRef.current?.dismiss();
      console.log('this is the res', res);
      if (!res.error) {
        router.replace('/auth/login');
      } else errorRef.current?.prompt('error', 'Logout failed');
    });
  };

  return (
    <>
      <Loading ref={loadingRef} />
      <NotifError ref={errorRef} />
      <Button type='text' onClick={clickLogout}>
        <Flex justify='space-between' align='center' gap={'10px'}>
          <LogoutOutlined style={{ fontSize: 20 }} />

          <Text>Logout</Text>
        </Flex>
      </Button>
    </>
  );
};

export default LogoutBtn;
