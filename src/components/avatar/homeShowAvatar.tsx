import { Dispatch, SetStateAction, useState } from "react";
import { ChatBotaAnalyze } from "../chatBot/chatBotAnalyze";

export const ShowAvatarHome = ({
  setShowChatBotHome,
}: {
  setShowChatBotHome: Dispatch<SetStateAction<boolean>>;
}) => {
  const [analyze, setAnalyze] = useState(false);

  return (
    <div className="relative md:w-[220px] md:h-[280px] flex flex-col items-center gap-3">

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          className="text-[14px] md:text-lg bg-black border-2 border-[#fec195] 
             text-[#fec195] px-2 py-1 md:px-5 md:py-3 rounded-full shadow-xl hover:scale-105 hover:brightness-110 transition-transform duration-300"
          onClick={() => setAnalyze(true)}
        >
          Анализ
        </button>

        <button
          className="text-[14px] md:text-lg bg-black border-2 border-[#fec195] 
             text-[#fec195] px-2 py-1 md:px-5 md:py-3 rounded-full shadow-xl hover:scale-105 hover:brightness-110 transition-transform duration-300"
          onClick={() => setShowChatBotHome(true)}
        >
          Ярилцах
        </button>
      </div>

      <div
        className="w-[90px] h-[90px]  md:w-[150px] md:h-[150px] "
      >
        <div className="relative">
          {/* Main Orb */}
          <div className="">
            <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjluMDJkN3BjYXJ1Y2Njczg0aWpjank2bjZpY2dhMDRrdWl6Z2tibiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/gmz5GZZU6rEGrIJ3zw/giphy.gif" alt="" />
          </div>

          {/* Subtle ambient glow with blur */}
          <div
            className="absolute inset-0 rounded-full 
      bg-gradient-radial from-yellow-200/30 via-orange-200/20 to-transparent 
      blur-2xl scale-150 pointer-events-none"
          ></div>
        </div>
      </div>

      {analyze && <ChatBotaAnalyze setOpen={setAnalyze} open={analyze} />}
    </div>
  );
};
