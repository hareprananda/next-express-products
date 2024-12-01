import React, { PropsWithChildren } from 'react';
import { Flex } from 'antd';

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex gap={'middle'} align='center' justify='center' className='w-screen h-screen'>
      {children}
    </Flex>
  );
};

export default AuthLayout;
