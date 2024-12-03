import React, { PropsWithChildren } from 'react';
import { Flex } from 'antd';
import colors from '@/components/theme/colors';
import { Title } from '@/components/antdchild/Text';
import LogoutButton from './components/LogoutButton';
import ToggleButton from './components/ToggleButton';
import Name from './components/Name';
import ComponentProvider from '@/components/provider/ComponentProvider';
import SidebarMenu from './components/SidebarMenu';

const App: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Flex vertical className='min-h-screen'>
        <Flex justify='space-between' align='center' className='z-20 w-full h-14 bg-slate-700 top-0 sticky px-4'>
          <Flex align='center' gap={'10px'}>
            <ToggleButton />
            <Title className='!m-0' level={3}>
              PRODUCT
            </Title>
          </Flex>
          <LogoutButton />
        </Flex>

        <Flex className='flex-auto'>
          <div
            id='toggled-menu'
            className='h-full shrink-0 sticky w-0 sm:w-60 transition-all overflow-hidden'
            style={{ background: colors.containerBg, height: 'calc(100vh - 3.5rem)', top: '3.5rem' }}
          >
            <div className='w-60'>
              <div className='p-4' style={{ backgroundColor: '#001529' }}>
                <Name />
              </div>

              <SidebarMenu />
            </div>
          </div>
          <div className='flex-auto relative'>
            <div className='bg-blue-900 w-full h-64 absolute top-0 left-0 z-0' />
            <div className='z-1 relative p-7'>
              <ComponentProvider>{children}</ComponentProvider>
            </div>
          </div>
        </Flex>
      </Flex>
    </>
  );
};

export default App;
