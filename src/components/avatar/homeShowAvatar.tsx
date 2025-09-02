import { Dispatch, SetStateAction, useState } from "react";
import { ChatBotaAnalyze } from "../chatBot/chatBotAnalyze";

export const ShowAvatarHome = ({
  setShowChatBotHome,
}: {
  setShowChatBotHome: Dispatch<SetStateAction<boolean>>;
}) => {
  const [analyze, setAnalyze] = useState(false);


  console.log("analyze", analyze);
  
  return (
    <div className="relative md:w-[220px] md:h-[280px] flex flex-col items-center gap-3">

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          className="text-[14px] md:text-lg bg-gradient-to-r from-orange-400 via-pink-300 to-yellow-300 
             text-white px-3 py-2 md:px-5 md:py-3 rounded-full shadow-xl hover:scale-105 hover:brightness-110 transition-transform duration-300"
          onClick={() => setAnalyze(true)}
        >
          Анализ
        </button>

        <button
          className="text-[14px] md:text-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400 
             text-white px-3 py-2 md:px-5 md:py-3 rounded-full shadow-xl hover:scale-105 hover:brightness-110 transition-transform duration-300"
          onClick={() => setShowChatBotHome(true)}
        >
          Ярилцах
        </button>
      </div>

      <div
        className="w-[90px] h-[90px]  md:w-[150px] md:h-[150px] rounded-full 
  bg-gradient-to-br from-yellow-300 via-orange-400 to-amber-300
  flex items-center justify-center overflow-hidden shadow-2xl 
  transform hover:scale-105 transition-transform border border-[#fec195]/30"
      >
        <div className="relative">
          {/* Main Orb */}
          <div className="magical-orb text-5xl md:text-8xl select-none rounded-full">
            🔮
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
