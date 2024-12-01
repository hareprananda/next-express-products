import { Text, Title } from '@/components/antdchild/Text';
import { Card } from 'antd';
import React from 'react';
import LoginForm from './components/form';

const Login = () => {
  return (
    <Card bordered={false} className='w-full max-w-xl'>
      <Title level={2}>Login</Title>
      <Text>Login to our product management system</Text>
      <LoginForm />
    </Card>
  );
};

export default Login;
