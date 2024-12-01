'use client';

import { Button, Flex, Form, Input } from 'antd';
import React from 'react';
import { Link, Title } from '@/components/antdchild/Text';
import { Item } from '@/components/antdchild/Form';
import Password from 'antd/es/input/Password';

const LoginForm: React.FC = () => {
  const onFinish = (values: { username: string; password: string }) => {
    console.log(values);
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

      <Title level={5}>Email</Title>
      <Item name='email' rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}>
        <Input />
      </Item>

      <Title level={5}>Password</Title>
      <Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
        <Password />
      </Item>

      <Title level={5}>Confirm Password</Title>
      <Item
        name='confirmPassword'
        rules={[
          { required: true, message: 'Please input your confirm password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            }
          })
        ]}
      >
        <Password />
      </Item>

      <Flex justify='space-between'>
        <Link href={'/auth/login'}>have account? </Link>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Flex>
    </Form>
  );
};

export default LoginForm;
