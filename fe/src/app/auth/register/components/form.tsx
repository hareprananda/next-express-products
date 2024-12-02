'use client';

import { Button, Flex, Form, Input, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import { Link, Text, Title } from '@/components/antdchild/Text';
import { Item } from '@/components/antdchild/Form';
import Password from 'antd/es/input/Password';
import Loading, { LoadingRef } from '@/components/loading/Loading';
import AuthReq from '@/req/auth/auth';
import { RegisterPayload } from '@/req/auth/authmodel';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const loadingRef = useRef<LoadingRef>(null);
  const router = useRouter();
  const [errorText, setErrorText] = useState('');
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const onFinish = ({ username, email, password }: RegisterPayload) => {
    loadingRef.current?.show();
    AuthReq.register({ email, password, username }).then((res) => {
      loadingRef.current?.dismiss();
      if (!res.error) {
        setOpenSuccessModal(true);
      } else setErrorText(res.message);
    });
  };

  return (
    <>
      <Loading ref={loadingRef} />
      <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
        title={'Register Success'}
        open={openSuccessModal}
        onOk={() => router.push('/auth/login')}
      >
        <Text data-testid='success-text'>
          You&apos;re successfully registered, please login using the registered credential to enter the system
        </Text>
      </Modal>
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
          <Input data-testid='username-input' />
        </Item>

        <Title level={5}>Email</Title>
        <Item name='email' rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}>
          <Input data-testid='email-input' />
        </Item>

        <Title level={5}>Password</Title>
        <Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
          <Password data-testid='password-input' />
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
          <Password data-testid='confirm-password-input' />
        </Item>
        {errorText && <Text type='danger'>{errorText}</Text>}
        <Flex justify='space-between'>
          <Link href={'/auth/login'}>have account? </Link>
          <Button type='primary' htmlType='submit' data-testid='submit-btn'>
            Submit
          </Button>
        </Flex>
      </Form>
    </>
  );
};

export default LoginForm;
