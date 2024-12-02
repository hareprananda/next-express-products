import { Modal } from 'antd';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Text } from '../antdchild/Text';

type promptParam = { message: string; title: string; onOk?: () => void; onCancel?: () => void };
export interface ModalRef {
  prompt: (obj: promptParam) => void;
}

const ModalPrompt = forwardRef<ModalRef, any>((props, ref) => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [onOkPrompt, setOnOkPrompt] = useState<() => void>();
  const [onCancelPrompt, setOnCancelPrompt] = useState<() => void>();

  const openPrompt = ({ message, title, onCancel, onOk }: promptParam) => {
    setOpen(true);
    setMessage(message);
    setTitle(title);
    onCancel && setOnCancelPrompt(onCancel);
    onOk && setOnOkPrompt(onOk);
  };

  useImperativeHandle(ref, () => ({
    prompt: openPrompt
  }));

  useEffect(() => {
    if (!open) {
      setOnOkPrompt(undefined);
      setOnCancelPrompt(undefined);
    }
  }, [open]);

  return (
    <Modal title={title} open={open} onOk={() => onOkPrompt} onCancel={() => onCancelPrompt}>
      <Text>{message}</Text>
    </Modal>
  );
});

ModalPrompt.displayName = 'ModalPrompt';

export default ModalPrompt;
