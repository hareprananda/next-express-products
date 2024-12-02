'use client';

import LocalLoading from '@/components/loading/LocalLoading';
import ProductReq from '@/req/product/product';
import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

type ChartData = {
  name: string;
  value: number;
};

const YearChart = () => {
  const [loading, setLoading] = useState(false);
  const [yearData, setYearData] = useState<ChartData[]>([]);

  useEffect(() => {
    setLoading(true);
    ProductReq.chart('year').then((res) => {
      setLoading(false);
      if (!res.error) {
        const newData: ChartData[] = [];
        for (const data of res.data) {
          newData.push({
            name: data.comparator,
            value: data.value
          });
        }
        setYearData(newData);
      }
    });
  }, []);
  return (
    <>
      <LocalLoading showLoading={loading} data-testid='yearchart-loading' />
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart width={150} height={40} data={yearData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' tick={{ fill: 'white' }} />
          <YAxis color='#ffffff' tick={{ fill: 'white' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey='value' fill='#1677ff' />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default YearChart;
