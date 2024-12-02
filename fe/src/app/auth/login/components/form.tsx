'use client';

import { Button, Flex, Form, Input } from 'antd';
import React, { useRef, useState } from 'react';
import { Link, Text, Title } from '@/components/antdchild/Text';
import { Item } from '@/components/antdchild/Form';
import Password from 'antd/es/input/Password';
import AuthReq from '@/req/auth/auth';
import Loading, { LoadingRef } from '@/components/loading/Loading';
import LocalStorage from '@/helper/localstorage';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const [errorText, setErrorText] = useState('');
  const loadingRef = useRef<LoadingRef>(null);
  const router = useRouter();
  const onFinish = (values: { username: string; password: string }) => {
    loadingRef.current?.show();
    setErrorText('');
    AuthReq.login(values).then((res) => {
      loadingRef.current?.dismiss();
      if (!res.error) {
        LocalStorage.set('user', res.data);
        router.replace('/dashboard');
      } else setErrorText(res.message);
    });
  };
  return (
    <>
      <Form onFinish={onFinish}>
        <Title level={5}>Username</Title>
        <Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input data-testid='username-input' />
        </Item>

        <Title level={5}>Password</Title>
        <Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
          <Password data-testid='password-input' />
        </Item>
        {errorText && <Text type='danger'>{errorText}</Text>}
        <Flex justify='space-between'>
          <Link href={'/auth/register'}>Don&apos;t have account? </Link>
          <Button type='primary' htmlType='submit' data-testid='submit-btn'>
            Submit
          </Button>
        </Flex>
      </Form>
      <Loading ref={loadingRef} />
    </>
  );
};

export default LoginForm;
