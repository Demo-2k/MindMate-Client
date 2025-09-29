"use client";

import { useContext, useState } from "react";
import { userDiaryContext } from "@/provider/userDiaryProvider";
import MoodJournal from "./moodJournal";
import { Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Calendar1 from "./calendar";

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

  const [selectedDate, setSelectedDate] = useState(today.toDateString());
  const diaryForSelectedDate = diaries.find(
    (d) =>
      new Date(d.createdAt).toDateString() ===
      new Date(selectedDate).toDateString()
  );
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            
            className="h-8 w-8 md:h-[42px] md:w-[42px] hover:scale-110 transition-transform duration-200 bg-white/30 backdrop-blur-sm text-[#fec195] rounded-lg shadow-md"
            onClick={() => setOpen(true)}
          >
            <Calendar />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-[#fec195]">
          <p>чиний түүх</p>
        </TooltipContent>
      </Tooltip>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-7xl w-full h-[90vh] bg-black text-white overflow-auto flex flex-col">
          <DialogTitle></DialogTitle> <DialogDescription></DialogDescription>
          <div className="bg-black flex flex-col gap-4   border-[#2a2a2a] rounded-lg w-full h-full ">
            <div
              className=" w-full mx-auto h-50  rounded-xl shadow-lg"
              style={{
                backgroundImage:
                  "url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXZvbGZnMjZtMGE4aTBia2Rwc2t1bGphMHFxZHVtczIxYnp5Y3J1MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pVGsAWjzvXcZW4ZBTE/giphy.gif')",
                backgroundRepeat: "repeat",
              }}
            >
             

              <div className=" p-4 pt-30 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 text-3xl">
                    {randomEmoji}
                  </div>
                  <div>
                    <div className="text-3xl font-bold flex items-baseline gap-2">
                      {day}{" "}
                      <span className="text-base font-normal">{weekday}</span>
                    </div>
                    <div className="text-sm">
                      {currentMonth} {year}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
              <Calendar1
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                 diaries={diaries} 
              />
              <MoodJournal
                note={diaryForSelectedDate?.note || ""}
                date={selectedDate}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
