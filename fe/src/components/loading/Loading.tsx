import { Spin } from 'antd';
import React, { useImperativeHandle, useState } from 'react';

export interface LoadingRef {
  show: () => void;
  dismiss: () => void;
}

const Loading = React.forwardRef<LoadingRef, Record<string, any>>(({}, ref) => {
  const [showLoading, setShowLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    dismiss: () => setShowLoading(false),
    show: () => setShowLoading(true)
  }));

  if (!showLoading) return null;

  return (
    <div
      className='fixed w-screen h-screen flex justify-center items-center top-0 left-0'
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      data-testid='loading'
    >
      <Spin tip='Loading' size='large' />
    </div>
  );
});

Loading.displayName = 'Loading';

export default Loading;
