import { Text, Title, Link } from '@/components/antdchild/Text';
import { Card } from 'antd';
import { Button, Flex, Form, Input } from 'antd';
import React from 'react';
import { Item } from '@/components/antdchild/Form';
import Password from 'antd/es/input/Password';
import { login } from '@/lib';
import { redirect } from 'next/navigation';

const Login = async ({ searchParams }: { searchParams?: { error?: string } }) => {
  const errorText = searchParams?.error || null;
  return (
    <Card bordered={false} className='w-full max-w-xl'>
      <Title level={2}>Login</Title>
      <Text>Login to our product management system</Text>
      <Form
        onFinish={async (formData) => {
          'use server';
          const data = await login(formData);
          if (!data.error) redirect('/dashboard');
          else redirect(`/auth/login?error=${data.message}`);
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
        {errorText && <Text type='danger'>{errorText}</Text>}
        <Flex justify='space-between'>
          <Link href={'/auth/register'}>Don&apos;t have account? </Link>
          <Button type='primary' htmlType='submit' data-testid='submit-btn'>
            Submit
          </Button>
        </Flex>
      </Form>
    </Card>
  );
};

export default Login;
