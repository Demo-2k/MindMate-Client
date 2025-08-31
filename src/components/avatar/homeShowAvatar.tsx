import { Dispatch, SetStateAction } from "react";

export const ShowAvatarHome = ({
  setShowChatBotHome,
}: {
  setShowChatBotHome: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="relative w-[220px] h-[280px] flex flex-col items-center gap-3">
      
      {/* Avatar GIF */}
      <div className="w-[200px] h-[200px] rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
        <img
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHkxbWM4OGlhNXNuNG9jd244YmxpZGtqYWlnMnB1bDZrbGZyaHFobyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/q4DfyP2n7JyAyNRsSn/giphy.gif"
          alt="Pink&Ven"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button className="bg-pink-400/90 text-white px-4 py-2 rounded-full shadow hover:bg-pink-500 transition">
          Анализ
        </button>

        <button
          className="bg-pink-400/90 text-white px-4 py-2 rounded-full shadow hover:bg-pink-500 transition"
          onClick={() => setShowChatBotHome(true)}
        >
          Ярилцах
        </button>
      </div>
    </div>
  );
};

