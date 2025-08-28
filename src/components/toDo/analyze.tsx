"use client";

import { useContext, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { CoverImage } from "./coverImage";
import { Activity, Flame, Sparkles } from "lucide-react";
import { DiaryNote } from "@/types";
import { UserContext } from "@/provider/userProvider";

const data = {
  mood: "happy",
  streak: 3,
  progress: 60,
};



interface MoodBarProps {
  moodsFromBackend: string[]; // жишээ: ['ТАЙВАН','ТАЙВАН']
}

const moodMap: Record<string, { emoji: string; color: string }> = {
  БАЯРТАЙ: { emoji: "БАЯРТАЙ", color: "amber-500" },
  ТАЙВАН: { emoji: "ТАЙВАН", color: "green-500" },
  УУРТАЙ: { emoji: "УУРТАЙ", color: "red-500" },
  ГУНИГТАЙ: { emoji: "ГУНИГТАЙ", color: "blue-500" },
  СТРЕССТЭЙ: { emoji: "СТРЕССТЭЙ", color: "purple-600" },
};

const allMoods = Object.values(moodMap);
// console.log("allMood", moodMap[0].color);

export function Analysis({ lastDiary }: { lastDiary: DiaryNote }) {
  console.log(
    "lastDiary?.aiinsight?.mood_caption",
    lastDiary?.aiInsight?.mood_caption
  );
const {userProvider} = useContext(UserContext)

  const moodsFromBackend = lastDiary?.analysis?.emotions;

  const [progressValue, setProgressValue] = useState(data.progress);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Өглөөний мэнд ☀️,");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Өдрийн мэнд 🌤,");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("Оройн мэнд 🌇,");
    } else {
      setGreeting("Сайхан амраарай 🌙,");
    }
  }, []);

  return (
    <div>
      <div className="bg-black text-white grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <Card className="bg-black text-white p-6 border-white/20">
            <div className="flex justify-between">
              <div>
                <h2 className="text-sm text-gray-400">{greeting}</h2>
                <h1 className="text-md font-bold">{userProvider.username}</h1>
              </div>

              <img
                src="https://media.giphy.com/media/rwiOduiq2oatO/giphy.gif"
                alt="gif"
                className="h-25 w-25 rounded-lg object-cover"
              />
            </div>
          </Card>
          <Card className="bg-black text-white p-6 border-white/20">
            {allMoods.map((mood) => {
              // moodsFromBackend-д байгаа эсэхийг шалгах
              const isActive = moodsFromBackend?.includes(mood?.emoji);

              // Tailwind class-уудыг static хадгалах
              const moodClasses: Record<string, string> = {
                БАЯРТАЙ: "border-amber-500",
                ТАЙВАН: "border-green-500",
                УУРТАЙ: "border-red-500",
                ГУНИГТАЙ: "border-blue-500",
                СТРЕССТЭЙ: "border-purple-600",
              };

              return (
                <div
                  key={mood.emoji}
                  className="flex flex-col gap-1 items-center"
                >
                  <p
                    className={`text-2xl ${
                      isActive ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    {mood.emoji}
                  </p>
                  <div
                    className={`border-2 rounded-4xl w-4 h-1 ${
                      isActive ? moodClasses[mood.emoji] : "border-gray-500"
                    }`}
                  ></div>
                </div>
              );
            })}
          </Card>
       
        </div>

        {/* Journal Section */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card className="bg-black text-white border-white/20 p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
              {lastDiary?.aiInsight?.mood_caption}
            </h2>
            <p className="mt-2 text-base">{lastDiary?.aiInsight?.tldr}</p>
          </Card>

      
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-4">
          <Card className="bg-cover bg-center text-white border-white/20 p-6 bg-[url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWNhejU3dWw4aTUzenJmZjY0eTEwYmU4YnQ1dGJvcHg2eWZ4NGYzdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1zgzISaYrnMAYRJJEr/giphy.gif')]">
            <p className="text-md font-extrabold"> Today's Prompt ✏️ </p>
            <p> How can you ensure you stay positive and motivated today? </p>
          </Card>
          <Card className="bg-black text-white border-white/20 p-6">
            <CardContent>
              <p className="text-[13px] font-semibold text-[#a1a1aa]">
                Онцлох үг:
              </p>
              <img src="/CatPlaying.gif" alt="" className="rounded-lg" />
              <p className="mt-2">Залхуутай л өдөр байлаа</p>
            </CardContent>
          </Card>

          <Card className="bg-black text-white border border-white/20 p-6">
            <CardContent>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Activity size={20} /> Өдрийн зорилго
              </h3>
              <Progress
                value={progressValue}
                className="mt-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse"
              />
              <p className="mt-2 text-sm">{progressValue}% complete</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
