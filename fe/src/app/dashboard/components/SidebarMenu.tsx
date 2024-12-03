'use client';
import React from 'react';
import { UserOutlined, ProductOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Menu } from 'antd';

const SidebarMenu = () => {
  const router = useRouter();
  const items = [
    {
      key: 1,
      icon: React.createElement(UserOutlined),
      label: 'Home',
      onClick: () => router.push('/dashboard')
    },
    {
      key: 2,
      icon: React.createElement(ProductOutlined),
      label: 'Product',
      onClick: () => router.push('/dashboard/products')
    }
  ];
  return <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={items} />;
};

export default SidebarMenu;
