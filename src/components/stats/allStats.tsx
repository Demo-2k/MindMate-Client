import { BellRing, Goal, House } from "lucide-react";
import { DialyChallenge } from "./today/chall";
import { FirstStats } from "./today/firstStats";
import { useState } from "react";
import { GeneralStats } from "./general/generalFirst";
import TodaySection from "./today/todaySection";

export const AllStats = () => {
  const [today, setToday] = useState(true);
  const [general, setGeneral] = useState(false);

  const handleToday = () => {
    setGeneral(false);
    setToday(true);
  };

  const HandleGeneral = () => {
    setGeneral(true);
    setToday(false);
  };

  const data = {
    mood: "happy",
    streak: 3,
    progress: 60,
  };

  return (
    <div className="bg-black w-[950px] h-[630px] flex gap-4 p-[30px] border-2 border-[#2a2a2a] rounded-lg absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <div className="w-[180px]">
        <div className="text-white  w-fit p-3 ">
          <div
            onClick={handleToday}
            className="flex gap-3 items-center p-3 rounded-lg border border-[#D3A569] bg-[#D3A569]/10 cursor-pointer"
          >
            <BellRing className="w-5 h-5 text-[#D3A569]" />
            <span className="text-sm font-medium">Өнөөдөр</span>
          </div>
          <div
            className="flex gap-3 items-center p-3 rounded-lg cursor-pointer"
            onClick={HandleGeneral}
          >
            <House className="w-[20px] h-[20px]" />
            Ерөнхий
          </div>
          <div className="flex gap-3 items-center p-3 rounded-lg cursor-pointer">
            <Goal className="w-[20px] h-[20px]" /> Хийх зүйлс
          </div>
        </div>
      </div>

      {today && !general && (
        <div className="flex flex-col gap-4">
          {/* <FirstStats />
          <DialyChallenge /> */}
          <TodaySection
            mood={data.mood}
            streak={data.streak}
            progress={data.progress}
          />
        </div>
      )}

      {!today && general && <GeneralStats />}
    </div>
  );
};
