import { Spin } from 'antd';
import React from 'react';

export interface LoadingRef {
  show: () => void;
  dismiss: () => void;
}

const LocalLoading: React.FC<{ showLoading: boolean; 'data-testid'?: string }> = ({ showLoading, ...props }) => {
  if (!showLoading) return null;

  return (
    <div
      className='absolute w-full h-full flex justify-center items-center top-0 left-0 z-10'
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      data-testid={props['data-testid']}
    >
      <Spin tip='Loading' size='large' />
    </div>
  );
};

export default LocalLoading;
