"use client";
import Calendar from "./calendar";
import { useContext, useState } from "react";
import { userDiaryContext } from "@/provider/userDiaryProvider";
import MoodJournal from "./moodJournal";

const emojis = ["✨", "🌸", "🍀", "🫧", "🧸"];

export const Month = () => {
  const { diaries } = useContext(userDiaryContext);
  



const today = new Date();
const day = today.getDate();
const year = today.getFullYear();

const monthsMn = [
  "нэгдүгээр сар",
  "хоёрдугаар сар",
  "гуравдугаар сар",
  "дөрөвдүгээр сар",
  "тавдугаар сар",
  "зургаадугаар сар",
  "долоодугаар сар",
  "наймдугаар сар",
  "есдүгээр сар",
  "аравдугаар сар",
  "арваннэгдүгээр сар",
  "арванхоёрдугаар сар",
];

const weekdaysMn = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];

const currentMonth = monthsMn[today.getMonth()];
const weekday = weekdaysMn[today.getDay()];

const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

const [selectedDate, setSelectedDate] = useState(today.toDateString());
const diaryForSelectedDate = diaries.find(d =>
  new Date(d.createdAt).toDateString() === new Date(selectedDate).toDateString()
);

  return (
  
      <div className="bg-black flex flex-col gap-4 p-10 border-2 border-[#2a2a2a] rounded-lg absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-400 overflow-auto">
        <div
          className="relative w-full mx-auto h-40 pt-18 rounded-xl overflow-hidden shadow-lg"
          style={{
            backgroundImage: "url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXZvbGZnMjZtMGE4aTBia2Rwc2t1bGphMHFxZHVtczIxYnp5Y3J1MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pVGsAWjzvXcZW4ZBTE/giphy.gif')",
            backgroundRepeat: "repeat",
          }}
        >
          <div className="bg-black/50 w-full h-full absolute inset-0"></div>

          <div className="relative p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 text-3xl">{randomEmoji}</div>
              <div>
                <div className="text-3xl font-bold flex items-baseline gap-2">
                  {day} <span className="text-base font-normal">{weekday}</span>
                </div>
                <div className="text-sm">
                  {currentMonth} {year}
                </div>
              </div>
            </div>
          </div>
        </div>
      <div/>

        <div className="flex gap-10">
          <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate}/> 
          <MoodJournal  note={diaryForSelectedDate?.note || ""}
          date={selectedDate}
          />
        </div>
      </div>
    
  );
};
