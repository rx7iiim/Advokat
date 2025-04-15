"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type DataPoint = {
  name: string;
  won: number;
  lost: number;
};


const dataByYear: Record<number, DataPoint[]> = {
  2023: [
    { name: 'Jan', won: 10, lost: 4 },
    { name: 'Feb', won: 6, lost: 2 },
    { name: 'Mar', won: 8, lost: 3 },
    { name: 'Apr', won: 9, lost: 1 },
    { name: 'May', won: 4, lost: 5 },
  ],
  2024: [
    { name: 'Jan', won: 14, lost: 3 },
    { name: 'Feb', won: 8, lost: 5 },
    { name: 'Mar', won: 11, lost: 2 },
    { name: 'Apr', won: 7, lost: 6 },
    { name: 'May', won: 13, lost: 4 },
    { name: 'Mar', won: 11, lost: 2 },
    { name: 'Apr', won: 7, lost: 6 },
    { name: 'May', won: 13, lost: 4 },
  ],
  2025: [
    { name: 'Jan', won: 12, lost: 7 },
    { name: 'Feb', won: 9, lost: 6 },
    { name: 'Mar', won: 13, lost: 4 },
    { name: 'Apr', won: 10, lost: 3 },
    { name: 'May', won: 15, lost: 2 },
    { name: 'Mar', won: 13, lost: 4 },
    { name: 'Apr', won: 10, lost: 3 },
    { name: 'May', won: 15, lost: 2 },
  ],
  2026: [
    { name: 'Jan', won: 14, lost: 7 },
    { name: 'Feb', won: 9, lost: 6 },
    { name: 'Mar', won: 3, lost: 4 },
    { name: 'Apr', won: 16, lost: 3 },
    { name: 'May', won: 15, lost: 2 },
    { name: 'Mar', won: 3, lost: 4 },
    { name: 'Apr', won: 16, lost: 3 },
    { name: 'May', won: 15, lost: 2 },
  ],
  2027: [
    { name: 'Jan', won: 17, lost: 7 },
    { name: 'Feb', won: 19, lost: 6 },
    { name: 'Mar', won: 3, lost: 4 },
    { name: 'Apr', won: 5, lost: 3 },
    { name: 'May', won: 10, lost: 2 },
    { name: 'Mar', won: 3, lost: 4 },
    { name: 'Apr', won: 5, lost: 3 },
    { name: 'May', won: 10, lost: 2 },
  ],
  2028: [
    { name: 'Jan', won: 1, lost: 7 },
    { name: 'Feb', won: 13, lost: 6 },
    { name: 'Mar', won: 15, lost: 4 },
    { name: 'Apr', won: 10, lost: 3 },
    { name: 'May', won: 13, lost: 2 },
    { name: 'Mar', won: 15, lost: 4 },
    { name: 'Apr', won: 10, lost: 3 },
    { name: 'May', won: 13, lost: 2 },
  ],
};
const Barchart: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState(2024);
    const years = Object.keys(dataByYear).map(Number).sort();

    const handlePrevYear = () => {
        const currentIndex = years.indexOf(selectedYear);
        if (currentIndex > 0) setSelectedYear(years[currentIndex - 1]);
      };
    
      const handleNextYear = () => {
        const currentIndex = years.indexOf(selectedYear);
        if (currentIndex > 0) setSelectedYear(years[currentIndex - 1]);
      };
    
  return (
    <div className=" w-full space-y-4">
             
             <div className="flex items-center  px-2 mb-4">
  <div className="ml-16">
    <h2 className="text-xl font-semibold">Won/Lost Cases</h2>
    <span className="text-gray-500">Cases from Jan–Dec, {selectedYear}</span>
  </div>
  <div className="ml-60 flex items-center space-x-2 bg-white text-black px-3 py-2 rounded-md shadow-sm border">
    <button onClick={() => setSelectedYear((prev) => prev - 1)}>
      <ChevronLeft />
    </button>
    <span>{selectedYear}</span>
    <button onClick={() => setSelectedYear((prev) => prev + 1)}>
      <ChevronRight />
    </button>
  </div>
</div>




      <div style={{ width: "80%", height: 200 }}>
        <ResponsiveContainer>
          <BarChart
            data={dataByYear[selectedYear]}
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
    </div>
  );
};

export default Barchart;
