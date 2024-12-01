import { Text, Title } from '@/components/antdchild/Text';
import { Card } from 'antd';
import React from 'react';
import RegisterForm from './components/form';

const Register = () => {
  return (
    <Card bordered={false} className='w-full max-w-xl'>
      <Title level={2}>Register</Title>
      <Text>Register to our product management system</Text>
      <RegisterForm />
    </Card>
  );
};

export default Register;
