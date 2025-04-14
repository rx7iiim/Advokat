"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', won: 12, lost: 5 },
  { name: 'Feb', won: 8, lost: 7 },
  { name: 'Mar', won: 10, lost: 6 },
  { name: 'Apr', won: 15, lost: 8 },
  { name: 'May', won: 20, lost: 4 },
  { name: 'Jun', won: 18, lost: 6 },
  { name: 'Jul', won: 12, lost: 7 },
  { name: 'Aug', won: 14, lost: 5 },
  { name: 'Sep', won: 13, lost: 6 },
  { name: 'Oct', won: 17, lost: 8 },
  { name: 'Nov', won: 19, lost: 7 },
  { name: 'Dec', won: 16, lost: 5 },
];

const Barchart: React.FC = () => {
  return (
    <div className='' style={{ width: '100%', height: 200 }} >
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="won" fill="#0000FF" radius={[5, 5, 0, 0]} />
          <Bar dataKey="lost" fill="#6b7280" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
