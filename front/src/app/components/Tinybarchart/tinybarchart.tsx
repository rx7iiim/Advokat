import React from 'react';
import { BarChart, Bar, ResponsiveContainer , XAxis , YAxis } from 'recharts';

const data = [
    { name: 'Apr', won: 15, lost: 8 },
    { name: 'Mar', won: 10, lost: 6 },
  { name: 'Feb', won: 6, lost: 7 },
 
  
];

const Tinybarchart = () => {
  return (
    <div style={{ width: 250, height: 150 }}>
      <ResponsiveContainer width="85%" height="100%">
        <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
          <Bar dataKey="won" fill="#0000FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Tinybarchart;
