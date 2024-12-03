import { notification } from 'antd';
import React, { useImperativeHandle } from 'react';

export interface NotifRef {
  prompt: (type: 'success' | 'error', msg: string) => void;
}

const NotifError = React.forwardRef<NotifRef, any>((props, ref) => {
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
