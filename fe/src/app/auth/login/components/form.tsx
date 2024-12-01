'use client';

import { Button, Flex, Form, Input } from 'antd';
import React from 'react';
import { Link, Title } from '@/components/antdchild/Text';
import { Item } from '@/components/antdchild/Form';
import Password from 'antd/es/input/Password';
import AuthReq from '@/req/auth/auth';

const LoginForm: React.FC = () => {
  const onFinish = (values: { username: string; password: string }) => {
    AuthReq.login(values).then((res) => {
      console.log(res);
    });
  };
  return (
    <Form
      onFinish={onFinish}
      // name='basic'
      // labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      // style={{ maxWidth: 600 }}
      // initialValues={{ remember: true }}
      // onFinishFailed={onFinishFailed}
      // autoComplete='off'
    >
      <Title level={5}>Username</Title>
      <Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Item>

      <Title level={5}>Password</Title>
      <Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
        <Password />
      </Item>

      <Flex justify='space-between'>
        <Link href={'/auth/register'}>Don&apos;t have account? </Link>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Flex>
    </Form>
  );
};

export default LoginForm;
