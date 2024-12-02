'use client';

import LocalLoading from '@/components/loading/LocalLoading';
import { capitalize } from '@/helper/utils';
import ProductReq from '@/req/product/product';
import { Col, Row } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const TypeChart = () => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([
    { name: 'New', value: 0 },
    { name: 'Second', value: 0 }
  ]);

  const reqData = () => {
    setLoading(true);
    ProductReq.chart('type').then((res) => {
      if (!res.error) {
        setLoading(false);
        const newChartData = res.data.map((v) => ({
          name: capitalize(v.comparator),
          value: v.value
        }));
        setChartData(newChartData);
      }
    });
  };

  useEffect(() => {
    reqData();
  }, []);

  const totalData = useMemo(() => {
    return chartData.reduce((acc, v) => acc + v.value, 0);
  }, [chartData]);

  return (
    <>
      <LocalLoading showLoading={loading} data-testid='typechart-loading' />
      <Row gutter={[15, 10]}>
        <Col span={24}>
          <div className='flex gap-3 justify-center'>
            <Label color={'#ffffff'} name='Total' value={totalData} />
            {chartData.map((prop, index) => (
              <Label key={index} color={COLORS[index % COLORS.length]} {...prop} />
            ))}
          </div>
        </Col>
        <Col className={'w-[220px] h-[220px] gutter-row'} span={24}>
          <ResponsiveContainer width={'100%'} height={'100%'}>
            <PieChart>
              <Pie
                data={chartData}
                cx='50%'
                cy='50%'
                labelLine={false}
                outerRadius={100}
                fill='#8884d8'
                dataKey='value'
                strokeWidth={2}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </>
  );
};

const Label = (item: { name: string; value: number } & { color: string }) => {
  return (
    <div className='flex flex-col items-center'>
      <p
        style={{
          color: item.color
        }}
      >
        {item.value}
      </p>
      <p>{item.name}</p>
    </div>
  );
};

export default TypeChart;
