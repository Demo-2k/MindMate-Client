import { Dispatch, SetStateAction } from "react";

export const ShowAvatarHome = ({
  setShowChatBotHome,
  showAvatarQuestion,
}: {
  setShowChatBotHome: Dispatch<SetStateAction<boolean>>;
  showAvatarQuestion: boolean;
}) => {
  return (
    <div className="relative w-[200px] h-[250px]">
      {/* Avatar */}

      {showAvatarQuestion && (
        <div className="flex gap-4">
          <button
            className="bg-pink-300 px-2  border rounded-lg"
            //   onClick={() => handleShowAnalyzeAvatar}
          >
            Анализ
          </button>

          <button
            className="bg-pink-300 px-2 border rounded-lg"
              onClick={()=>setShowChatBotHome(true)}
          >
            Эсвэл ярилцах
          </button>
        </div>
      )}

      <img
        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHkxbWM4OGlhNXNuNG9jd244YmxpZGtqYWlnMnB1bDZrbGZyaHFobyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/q4DfyP2n7JyAyNRsSn/giphy.gif"
        alt="Pink&Ven"
        className="w-[200px] h-[200px]"
      />

      {/* Cloud → толгойн дээр гаргана */}
    </div>
  );
};
