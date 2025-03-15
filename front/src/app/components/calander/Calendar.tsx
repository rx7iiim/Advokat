'use client'
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  return (
    <div className="bg-white shadow-md rounded-xl p-1 mt-0 mb-3 overflow-hidden h-45 w-full ">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        calendarClassName="custom-calendar"
      />
    </div>
  );
}
