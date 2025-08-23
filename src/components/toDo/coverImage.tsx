import { useState } from "react";
import { Sun } from "lucide-react";
import { Button } from "../ui/button";

export function CoverImage() {
  const [view, setView] = useState<"day" | "month">("day");

  const today = new Date();
  const day = today.getDate();
  const weekday = today.toLocaleDateString("en-US", { weekday: "short" });
  const month = today.toLocaleDateString("en-US", { month: "long" });
  const year = today.getFullYear();
  return (
    <div
      className="relative w-full max-w-6xl mx-auto h-40 rounded-xl overflow-hidden shadow-lg"
      style={{
        backgroundImage: "url('/cover.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-black/50 w-full h-full absolute inset-0"></div>

      <div className="relative p-4 pt-23 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <Sun className="text-yellow-400 w-8 h-8" />
          <div>
            <div className="text-3xl font-bold flex items-baseline gap-2">
              {day} <span className="text-base font-normal">{weekday}</span>
            </div>
            <div className="text-sm">
              {month} {year}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">Free Limit: 3 / 30 Entries</span>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setView("day")}
              className={`  ${
                view === "day" ? "text-yellow-500 " : "bg-gray-700"
              }`}
            >
              Day
            </Button>
            <Button
              onClick={() => setView("month")}
              className={`${
                view === "month" ? "text-yellow-500 " : "bg-gray-700"
              }`}
            >
              Month
            </Button>
          </div>
          {/* <button className="p-2 rounded-md bg-gray-800">⚙️</button> */}
        </div>
      </div>
    </div>
  );
}
