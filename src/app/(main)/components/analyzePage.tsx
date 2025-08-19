"use client";
import { Heart, Sparkles, Star, Zap } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

import DiaryCalendar from "./calendar";

export const AnalyzePage = ({ data }: { data: any }) => {
  console.log(data.emotions);
  const emotions = data?.emotions;
  console.log("emationd:", emotions);

  let emotion = [];
  for (let i = 0; i <= emotions.length; i++) {
    let e = emotions[i];
    if (e === "БАЯРТАЙ" || e === "ХӨӨРСӨН" || e === "ЭНЕРГИ_ДҮҮРЭН") {
      let emoji = "🤩 Happy";
      emotion.push(emoji);
    }
    // return e;
  }

//   const [entries, setEntries] = useState([
//     { date: "2025-08-01", mood: 0.5 },
//     { date: "2025-08-02", mood: -0.3 },
//     { date: "2025-08-05", mood: 0.8 },
//   ]);
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().slice(0, 10)
//   );

//   const datesInMonth = Array.from({ length: 31 }, (_, i) => {
//     const day = (i + 1).toString().padStart(2, "0");
//     return `2025-08-${day}`;
//   });

  return (
    <div className="max-w-md mx-auto space-y-6 pt-50">
      <div className="flex flex-col gap-5">
        <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6 ">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-blue-500" />
            <p className="mt-2 text-gray-700">Daily Summary</p>
          </div>
          <p className="leading-relaxed font-medium">{data?.summary}...</p>
        </div>
        <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="text-blue-500" />
            <p className="mt-2 text-gray-700">Emotion Check</p>
          </div>
          <div className="px-4 py-2 rounded-full border shadow-lg transition-all duration-300 hover:scale-105">
            <span>{emotion}</span>
            {/* <span>{data?.emotions}....</span> */}
          </div>
        </div>
        <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Star className="text-green-700" />
            <p className="mt-2 text-gray-700">Today's Energy</p>
          </div>
          <div className="text-center mb-4 text-6xl animate-pulse">🔮</div>
          <p className="leading-relaxed font-medium text-center">
            {data?.horoscope}...{" "}
          </p>
        </div>
        <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-green-700" />
            <p className="mt-2 text-gray-700">Daily Motivation</p>
          </div>
          <p className="text-xl font-bold leading-relaxed relative">
            {data?.message}...
          </p>
        </div>
      </div>
      {/* <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-4 shadow-lg rounded-2xl bg-white max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CalendarDays className="w-5 h-5 mr-2 text-indigo-600" /> August
              2025
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-center font-medium text-gray-600">
                  {d}
                </div>
              ))}
              {datesInMonth.map((date) => {
                const dayEntry = entries.find((e) => e.date === date);
                const bgColor = dayEntry
                  ? dayEntry.mood > 0
                    ? "bg-green-400"
                    : "bg-red-400"
                  : "bg-gray-200";
                return (
                  <div
                    key={date}
                    className={`h-12 flex items-center justify-center rounded cursor-pointer ${bgColor} text-white`}
                    onClick={() => setSelectedDate(date)}
                  >
                    {parseInt(date.split("-")[2])}
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div> */}
      <DiaryCalendar/>
    </div>
  );
};
