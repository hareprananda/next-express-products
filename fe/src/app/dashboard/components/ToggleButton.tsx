'use client';

import { BarsOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const ToggleButton = () => {
  const onClickButton = () => {
    const element = document.querySelector('#toggled-menu');

    const isOpen = element?.classList.contains('w-60');
    if (isOpen) {
      element?.classList.remove('w-60');
      element?.classList.add('w-0');
    } else {
      element?.classList.remove('w-0');
      element?.classList.add('w-60');
    }
  };
  return (
    <div className='sm:hidden'>
      <Button onClick={onClickButton}>
        <BarsOutlined />
      </Button>
    </div>
  );
};

export default ToggleButton;
