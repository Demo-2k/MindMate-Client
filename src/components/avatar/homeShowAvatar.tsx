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
    <div className="relative h-[120px] w-[180px] md:w-[220px] md:h-[280px] flex flex-col items-center gap-3">
      {/* Avatar GIF */}

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          className="text-[14px] md:text-lg bg-[#fec195] text-gray-900 px-1 py-1 md:px-4 md:py-2 rounded-full shadow-lg hover:bg-[#f7b973] transition"
          onClick={() => setAnalyze(true)}
        >
          Анализ
        </button>

        <button
          className="text-[14px] md:text-lg bg-[#fec195] text-gray-900 px-1 py-1 md:px-4 md:py-2 rounded-full shadow-lg hover:bg-[#f7b973] transition"
          onClick={() => setShowChatBotHome(true)}
        >
          Ярилцах
        </button>
      </div>
      <div className="w-[200px] h-[200px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform border border-[#fec195]/40">
        <div className="relative flex items-center justify-center w-28 h-28">
          {/* Glow давхарга */}
          <div className="absolute inset-0 rounded-full animate-glow bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 blur-2xl opacity-80"></div>

          {/* Доторх icon/emoji */}
          <div className="relative text-6xl">🔮</div>
        </div>
      </div>

      {analyze && <ChatBotaAnalyze setOpen={setAnalyze} open={analyze} />}
    </div>
  );
};
