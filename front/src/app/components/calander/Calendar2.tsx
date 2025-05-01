import { useState } from "react";
import { 
  format, addMonths, subMonths, 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, isSameMonth 
} from "date-fns";

const Calendar2 = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);   

  // Change month functions
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  // Get first and last visible day (force 6 rows = 42 days)
  const firstDay = startOfWeek(startOfMonth(currentMonth));
  const lastDay = endOfWeek(endOfMonth(currentMonth));

  // Ensure exactly 42 days are generated
  let days = eachDayOfInterval({ start: firstDay, end: lastDay });
  while (days.length < 42) {
    days.push(addMonths(lastDay, 1)); // Add missing days
  }

  // Handle date selection
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <span
  className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm"
>
  <button
   onClick={handlePrevMonth}
    type="button"
    className="px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
  >
     ◀
  </button>

  <button
    type="button"
    className="px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
  >
    {format(currentMonth, "MMMM yyyy")}
  </button>

  <button
    onClick={handleNextMonth} 
    type="button"
    className="px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
  >
     ▶
  </button>
</span>











    <div className="p-4  rounded-lg shadow-sm transition-all duration-300 ease-in-out h-screen">
    

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-400 bg-gray bg-gray-50 border border-gray-100 ">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid (6 rows = 42 days) */}
      <div className="grid grid-cols-7 bg-gray-100 border-solid gap-0.5 transition-all duration-300 ease-in-out h-full border border-gray-100">
        {days.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isSelected =
            selectedDate && format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");

          return (
            <button
              key={index}
              onClick={() => handleSelectDate(date)}
              className={`w-full h-full flex items-center justify-center transition-all duration-200 ${
                isSelected
                  ? " text-gray-900 font-bold"
                  : isCurrentMonth
                  ? "bg-white"
                  : "text-gray-400 bg-gray-50"
              }`}
              
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Show selected date */}
      {selectedDate && (
        <p className="mt-4 text-center text-lg font-semibold text-gray-700">
          Selected Date: {format(selectedDate, "PPP")}
        </p>
      )}
    </div>
    </div>
  );
};

export default Calendar2;
