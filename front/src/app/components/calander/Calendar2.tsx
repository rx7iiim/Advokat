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
    <div className="p-4 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out">
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePrevMonth} 
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-all duration-200">
          ◀
        </button>
        <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
        <button 
          onClick={handleNextMonth} 
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-all duration-200">
          ▶
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid (6 rows = 42 days) */}
      <div className="grid grid-cols-7 gap-2 transition-all duration-300 ease-in-out">
        {days.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isSelected =
            selectedDate && format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");

          return (
            <button
              key={index}
              onClick={() => handleSelectDate(date)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                isSelected ? "bg-blue-500 text-white font-bold scale-110" : 
                isCurrentMonth ? "hover:bg-gray-100" : "text-gray-400"
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
  );
};

export default Calendar2;
