import { useContext, useState } from "react";
import { Sun } from "lucide-react";
import { Button } from "../ui/button";
import { DialogToDo } from "./toDo";
import { Month } from "./month";
import { userDiaryContext } from "@/provider/userDiaryProvider";

export function CoverImage() {
const {diaries} = useContext(userDiaryContext);
console.log("direeeee", diaries[0]);
const lastDiary = diaries[0];


  const [view, setView] = useState<"day" | "month">("day");

  const today = new Date();
  const day = today.getDate();
  const weekday = today.toLocaleDateString("en-US", { weekday: "short" });
  const currentMonth = today.toLocaleDateString("en-US", { month: "long" }); // 👈 нэрийг өөрчилсөн
  const year = today.getFullYear();

  const handleDayTab = () => {
    setView("day");
  };

  const handleMonthTab = () => {
    setView("month");
  };

  return (
    <div className="bg-black flex flex-col gap-4 px-60 py-40 border-2 border-[#2a2a2a] rounded-lg absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full min-h-screen overflow-auto">
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
            <Sun className="text-yellow-400 w-8 h-8" />
            <div>
              <div className="text-3xl font-bold flex items-baseline gap-2">
                {day} <span className="text-base font-normal">{weekday}</span>
              </div>
              <div className="text-sm">
                {currentMonth} {year}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">Free Limit: 3 / 30 Entries</span>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleDayTab}
                className={`${
                  view === "day" ? "text-yellow-500" : "bg-gray-700"
                }`}
              >
                Day
              </Button>
              <Button
                onClick={handleMonthTab}
                className={`${
                  view === "month" ? "text-yellow-500" : "bg-gray-700"
                }`}
              >
                Month
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 👇 энд зөв шалгалт */}
      {view === "day" && <DialogToDo lastDiary={lastDiary}/>}
      {view === "month" && <Month />}
    </div>
  );
}
