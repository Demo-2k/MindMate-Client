import { useState } from "react";
import dayjs from "dayjs";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const daysInMonth = currentMonth.daysInMonth();
  const startDay = currentMonth.startOf("month").day();

  const today = dayjs();

  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  const generateCalendar = () => {
    const weeks = [];
    let days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push(dayjs(new Date(currentMonth.year(), currentMonth.month(), d)));
    }

    while (days.length) {
      weeks.push(days.splice(0, 7));
    }

    return weeks;
  };

  const specialDates: Record<string, string> = {
    "2025-08-24": "pink",
    "2025-08-25": "blue",
  };

  return (
    <div className="flex flex-col items-center p-4 bg-black text-white rounded-2xl w-[400px]">
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-4">
        <button
          onClick={prevMonth}
          className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
        >
          ←
        </button>
        <h2 className="text-lg font-semibold">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <button
          onClick={nextMonth}
          className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
        >
          →
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-2 w-full text-center text-gray-400 mb-2">
        {"Mon Tue Wed Thu Fri Sat Sun".split(" ").map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 w-full">
        {generateCalendar().map((week, i) => (
          <>
            {week.map((day, idx) => {
              if (!day) return <div key={i + "-" + idx}></div>;

              const dateStr = day.format("YYYY-MM-DD");
              const isToday = day.isSame(today, "day");
              const special = specialDates[dateStr];

              return (
                <div
                  key={dateStr}
                  className={`h-12 flex items-center justify-center rounded-md border 
                    ${isToday ? "border-orange-400" : "border-transparent"}
                    ${special === "pink" ? "bg-pink-500 shadow-[0_0_10px_#ff00ff]" : ""}
                    ${special === "blue" ? "bg-blue-600 border-orange-400" : ""}`}
                >
                  {day.date()}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}
