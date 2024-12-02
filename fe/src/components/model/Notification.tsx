import { notification } from 'antd';
import React, { useImperativeHandle } from 'react';

export interface NotifErrorRef {
  prompt: (type: 'success' | 'error', msg: string) => void;
}

const NotifError = React.forwardRef<NotifErrorRef, any>((props, ref) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: 'success' | 'error', message: string) => {
    api[type]({
      message: 'Error',
      description: message,
      placement: 'topRight'
    });
  };

  useImperativeHandle(ref, () => ({
    prompt: openNotification
  }));

  return contextHolder;
});
NotifError.displayName = 'NotifError';

export default NotifError;
