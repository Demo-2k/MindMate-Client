import { useContext, useState } from "react";
import { ListTodo, Sun, TextSelect } from "lucide-react";
import { Button } from "../ui/button";
import { Month } from "../calendar/month";
import { userDiaryContext } from "@/provider/userDiaryProvider";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Analysis } from "./analyze";

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
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className=" h-8 w-8 md:h-[42px] md:w-[42px] hover:scale-110 transition-transform duration-200 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg shadow-md"
            onClick={() => setOpen(true)}
          >
            <TextSelect />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>анализ</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-7xl w-full h-[80vh] bg-black overflow-auto">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="bg-black flex flex-col gap-4 border-[#2a2a2a] rounded-lg w-full h-full ">
            <div
              className=" w-full mx-auto h-50  rounded-xl overflow-hidden shadow-lg"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.com/originals/92/98/b8/9298b8aa90e9bc71a6162878ee24cbeb.gif')",
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
            <Analysis lastDiary={lastDiary} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
