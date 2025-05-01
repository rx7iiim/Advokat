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
    <div>

      {/* Week Navigation */}
      <span
  className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm"
>
  <button
   onClick={handlePrevWeek}
    type="button"
    className="px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
  >
     ◀
  </button>

  <button
    type="button"
    className="px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
  >
    {format(currentDate, "MMMM yyyy")}
  </button>

  <button
    onClick={handleNextWeek} 
    type="button"
    className="px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative"
  >
     ▶
  </button>
</span>

    <div className="p-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out h-screen">
<div className="flex h-full">
       {/* Hours on the left */}
       <div className="flex flex-col justify-end items-end text-xs text-gray-500 mr-2 h-full">
          {hours.map((hour, i) => (
            <div key={i} className="h-full flex justify-end items-end flex-nowrap mt-auto">
              <p>{hour}</p> <p>am</p>
            </div>
          ))}
        </div>
      


<div className="w-full">
  
<div className="h-full">
    <div className="flex-1 grid grid-cols-7 gap-0 mr-auto ">
          {days.map((date, index) => {
            const isSelected =
              selectedDate && format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");

            return (
              <div key={index} className="border rounded-sm overflow-hidden bg-white">
                {/* Date Header */}
                <button
                  onClick={() => handleSelectDate(date)}
                  className={`w-full py-1 text-center font-semibold transition-all duration-200 ${
                    isSelected ? "bg-blue-500 text-white font-bold" : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {format(date, "d")}
                </button></div>
             );
            })}</div>
            

            {/* Calendar Grid with Hours on the sides */}
  
       

       {/* Main Calendar Grid */}
       <div className="flex-1 grid grid-cols-7 gap-0 h-full">
         {days.map((date, index) => {
           const isSelected =
             selectedDate && format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");

           return (
             <div key={index} className="border h-full overflow-hidden bg-white">
             

               {/* Time Slots (empty for fetched data) */}
               <div className="grid grid-rows-13 h-full">
                 {hours.map((_, i) => (
                   <div key={i} className="h-8 border-t"></div>
                 ))}
               </div>
             </div>
           );
         })}
       </div></div></div>

       {/* Hours on the right */}
       <div className="flex flex-col justify-between text-xs text-gray-500 ml-2 mt-auto">
         {hours.map((hour, i) => (
           <div key={i} className="h-8 flex items-center flex-nowrap">
             <p>{hour}</p> <p>am</p>
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
    </div>
  );
};

export default DayCalendar;