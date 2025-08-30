import { useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { DiaryNote } from "@/types";

dayjs.extend(isoWeek);
interface CalendarProps {
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

interface Calendar1Props extends CalendarProps {
  diaries: DiaryNote[];
}

export default function Calendar1({
  selectedDate,
  onSelectDate,
  diaries,
}: Calendar1Props) {

  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const daysInMonth = currentMonth.daysInMonth();
  const startDay = currentMonth.startOf("month").isoWeekday() - 1;
  const today = dayjs();

  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

    const moods: Record<string, { color: string; label: string; emoji: string }> =
    {
      БАЯРТАЙ: { color: "bg-amber-300", label: "Баяртай", emoji: "😊" },
      ТАЙВАН: { color: "bg-emerald-400", label: "Тайван", emoji: "😌" },
      УУРТАЙ: { color: "bg-rose-500", label: "Ууртай", emoji: "😡" },
      ГУНИГТАЙ: { color: "bg-sky-400", label: "Гунигтай", emoji: "🥺" },
      СТРЕССТЭЙ: { color: "bg-violet-400", label: "Стресстэй", emoji: "😨" },
      UNKNOWN: { color: "bg-black border", label: "Mood алга", emoji: "❓" },
    };

  const generateCalendar = () => {
    const weeks = [];
    const days = [];

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

const specialDates: Record<string, string> = {};

if (Array.isArray(diaries)) {
  diaries.forEach((diary) => {
    const mood = diary.analysis?.emotions?.[0] || "UNKNOWN";
    const dateStr = dayjs(diary.createdAt).format("YYYY-MM-DD");
    specialDates[dateStr] = moods[mood]?.color || moods.UNKNOWN.color;
  });
}



  return (
    <div className="flex flex-col items-center p-4 bg-black text-white rounded-2xl w-full max-w-3xl gap-5">
      
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

     
      <div className="grid grid-cols-7 gap-1 sm:gap-2 w-full text-center text-gray-400 mb-2 text-xs sm:text-sm md:text-base">
        {"Mon Tue Wed Thu Fri Sat Sun".split(" ").map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

  
      <div className="grid grid-cols-7 gap-1 sm:gap-2 w-full">
        {generateCalendar().map((week, i) => (
          <div key={i} className="contents">
            {week.map((day, idx) => {
              if (!day) return <div key={i + "-" + idx}></div>;

              const dateStr = day.format("YYYY-MM-DD");
              const isToday = day.isSame(today, "day");
              const special = specialDates[dateStr];

              return (
                <div
                  key={dateStr}
                  onClick={() => onSelectDate(dateStr)}
                  className={`flex items-center justify-center rounded-md border 
                    text-xs sm:text-sm md:text-base
                    h-4 sm:h-12 md:h-16 lg:h-20 cursor-pointer transition-all duration-200
                    ${isToday ? "border-orange-400" : "border-transparent"}
                     ${special ? `${special}` : ""}
                    ${
                      selectedDate === dateStr
                        ? "border-yellow-200 shadow-[0_0_15px_#ffe600]"
                        : ""
                    }
                    hover:scale-105 hover:shadow-[0_0_10px_#ffffff]
                    active:scale-95 active:shadow-[0_0_20px_#ffea00]`}
                >
                  {day.date()}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="font-medium">сэтгэл хөдлөл</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-auto">
        {Object.values(moods).map((mood, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <p className={`h-3 w-3 rounded-2xl ${mood.color}`}></p>
            <p>
              {mood.emoji} {mood.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
