import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { DiaryNote } from "@/types";
import { Dispatch, SetStateAction } from "react";

type HomePageProps = {
  HandleDiary: ()=> void,
  setDiary: Dispatch<SetStateAction<string>>,
  diary:string,
  loading:boolean
}
export const HomePage = ({ HandleDiary, diary, setDiary, loading}: HomePageProps) => {
  console.log("setDIaryyy:", setDiary);
  

  return (
    <div>
  <div className="min-h-screen flex flex-col items-center  bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 z-0">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-3 h-3 rounded-full bg-pink-400"></span>
          <h2 className="text-lg font-semibold">How&apos;s your day going?</h2>
        </div>

        <textarea
        value={diary}
        onChange={(e) => setDiary(e.target.value)}
          placeholder="Spill the tea... what's on your mind today? ☁️"
          maxLength={500}
          className="w-full h-28 p-3 rounded-xl bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none resize-none"
        ></textarea>

        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-3 text-2xl">
            <span className="text-2xl animate-bounce">😊</span>
            <span className="text-2xl animate-bounce delay-[0.1s]">😭</span>
            <span className="text-2xl animate-bounce delay-[0.2s]">😤</span>
            <span className="text-2xl animate-bounce delay-[0.3s]">🥳</span>
          </div>
          <span className="text-gray-500 text-sm">{diary.length}/500</span>
        </div>
      </div>

       <Button
        onClick={HandleDiary}
        disabled={loading}
        className="mt-6 px-10 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-pink-300 via-pink-200 to-purple-300 shadow-[0_0_25px_rgba(236,72,153,0.3),0_0_40px_rgba(168,85,247,0.3)] hover:opacity-90 transition flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        ⚡ Analyze My Vibes ✨
      </Button>
    </div>
    </div>
  );
};
