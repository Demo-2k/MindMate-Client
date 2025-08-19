"use client";
import { Heart, Sparkles, Star, Zap } from "lucide-react";

export const AnalyzePage = ({ data }: { data: any }) => {
  console.log(data.emotions);
  const emotions = data?.emotions;
  console.log("emationd:", emotions);

  let emotion = [];
  for (let i = 0; i <= emotions.length; i++) {
    let e = emotions[i];
    if (e === "БАЯРТАЙ" || e === "ХӨӨРСӨН" || e === "ЭНЕРГИ_ДҮҮРЭН") {
      let emoji = "🤩 Happy";
      emotion.push(emoji);
    }
    // return e;
  }



  return (
    <div className="max-w-md mx-auto space-y-6 pt-50">
      <div className="flex flex-col gap-5">
        <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6 ">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-blue-500" />
            <p className="mt-2 text-gray-700">Daily Summary</p>
          </div>
          <p className="leading-relaxed font-medium">{data?.summary}...</p>
        </div>
        <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="text-blue-500" />
            <p className="mt-2 text-gray-700">Emotion Check</p>
          </div>
          <div className="px-4 py-2 rounded-full border shadow-lg transition-all duration-300 hover:scale-105">
            <span>{emotion}</span>
            {/* <span>{data?.emotions}....</span> */}
          </div>
        </div>
        <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Star className="text-green-700" />
            <p className="mt-2 text-gray-700">Today's Energy</p>
          </div>
          <div className="text-center mb-4 text-6xl animate-pulse">🔮</div>
          <p className="leading-relaxed font-medium text-center">
            {data?.horoscope}...{" "}
          </p>
        </div>
        <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-green-700" />
            <p className="mt-2 text-gray-700">Daily Motivation</p>
          </div>
          <p className="text-xl font-bold leading-relaxed relative">
            {data?.message}...
          </p>
        </div>
      </div>
      
      
    </div>
  );
};
