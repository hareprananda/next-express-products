import React from 'react';
import { Button, Card } from 'antd';

const Home = () => (
  <div className='App'>
    <Card title='Default size card' extra={<a href='#'>More</a>} className='max-w-xl'>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
    <Button type='primary'>Ini button djancoek</Button>
  </div>
);

export default Home;
