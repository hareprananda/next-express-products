import { Button, Flex, Form, Input } from 'antd';
import React from 'react';
import { Link, Text, Title } from '@/components/antdchild/Text';
import { Item } from '@/components/antdchild/Form';
import Password from 'antd/es/input/Password';
import { getSession, login } from '@/lib';
import { redirect } from 'next/navigation';

const LoginForm: React.FC = async () => {
  const thesession = await getSession();

  return (
    <>
      <Form
        onFinish={async (values: { username: string; password: string }) => {
          'use server';
          login(values).then((res) => {
            if (res.error) {
              redirect('/dashboard');
            }
          });
        }}
      >
        <Title level={5}>Username</Title>
        <Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input data-testid='username-input' />
        </Item>

        <Title level={5}>Password</Title>
        <Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
          <Password data-testid='password-input' />
        </Item>
        {/* {errorText && <Text type='danger'>{errorText}</Text>} */}
        <Flex justify='space-between'>
          <Link href={'/auth/register'}>Don&apos;t have account? </Link>
          <Button type='primary' htmlType='submit' data-testid='submit-btn'>
            Submit
          </Button>
        </Flex>
        <Text>{JSON.stringify(thesession)}</Text>
      </Form>
    </>
  );
};

export default LoginForm;
