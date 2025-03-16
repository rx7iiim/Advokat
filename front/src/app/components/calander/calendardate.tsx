import { useState } from "react";
import { 
  format, addDays, subDays, 
  startOfWeek, endOfWeek, eachDayOfInterval 
} from "date-fns";

const DayCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Change week functions
  const handlePrevWeek = () => setCurrentDate(subDays(currentDate, 7));
  const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));

  // Get the days for the current week
  const startDay = startOfWeek(currentDate);
  const endDay = endOfWeek(currentDate);
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  // Handle date selection
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  // Generate hours (12 hours per day)
  const hours = Array.from({ length: 12 }, (_, i) => `${i + 7}:00`);

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm transition-all duration-300 ease-in-out">
      {/* Week Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePrevWeek} 
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-all duration-200 text-gray-600">
          ◀
        </button>
        <h2 className="text-xl font-bold text-gray-700">{format(currentDate, "MMMM yyyy")}</h2>
        <button 
          onClick={handleNextWeek} 
          className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-all duration-200 text-gray-600">
          ▶
        </button>
      </div>

      {/* Calendar Grid with Hours on the sides */}
      <div className="flex">
        {/* Hours on the left */}
        <div className="flex flex-col justify-between text-xs text-gray-500 mr-2">
          {hours.map((hour, i) => (
            <div key={i} className="h-8 flex items-center justify-end">
              {hour}
            </div>
          ))}
        </div>

        {/* Main Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const isSelected =
              selectedDate && format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");

            return (
              <div key={index} className="border rounded-lg overflow-hidden bg-white">
                {/* Date Header */}
                <button
                  onClick={() => handleSelectDate(date)}
                  className={`w-full py-1 text-center font-semibold transition-all duration-200 ${
                    isSelected ? "bg-blue-500 text-white font-bold" : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {format(date, "d")}
                </button>

                {/* Time Slots (empty for fetched data) */}
                <div className="grid grid-rows-12">
                  {hours.map((_, i) => (
                    <div key={i} className="h-8 border-t"></div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Hours on the right */}
        <div className="flex flex-col justify-between text-xs text-gray-500 ml-2">
          {hours.map((hour, i) => (
            <div key={i} className="h-8 flex items-center">
              {hour}
            </div>
          ))}
        </div>
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

export default DayCalendar;