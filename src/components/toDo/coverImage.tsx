import { useContext, useState } from "react";
import { Sun } from "lucide-react";
import { Button } from "../ui/button";
import { DialogToDo } from "./toDo";
import { Month } from "../calendar/month";
import { userDiaryContext } from "@/provider/userDiaryProvider";

const emojis = ["✨", "🌸", "🍀", "🫧", "🧸"];

export function CoverImage() {
  const { diaries } = useContext(userDiaryContext);
  const lastDiary = diaries[0];

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

  const weekdaysMn = [
    "Ням",
    "Даваа",
    "Мягмар",
    "Лхагва",
    "Пүрэв",
    "Баасан",
    "Бямба",
  ];

  const currentMonth = monthsMn[today.getMonth()];
  const weekday = weekdaysMn[today.getDay()];

  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  return (
    <div className="bg-black flex flex-col gap-4 px-10 py-10 border-2 border-[#2a2a2a] rounded-lg absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  overflow-auto">
      <div
        className="relative w-full mx-auto h-40 pt-18 rounded-xl overflow-hidden shadow-lg"
        style={{
          backgroundImage: "url('/cover.jpg')",
          backgroundSize: "cover",
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
      <DialogToDo lastDiary={lastDiary} />
    </div>
  );
}
