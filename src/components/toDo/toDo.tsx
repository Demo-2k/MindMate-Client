"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { CoverImage } from "./coverImage";
import { Activity, Flame, Sparkles } from "lucide-react";
import { DiaryNote } from "@/types";

const data = {
  mood: "happy",
  streak: 3,
  progress: 60,
};

interface TodayProps {
  mood: "happy" | "neutral" | "sad" | "stressed";
  streak: number;
  progress: number;
}

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

export function DialogToDo({ lastDiary }: { lastDiary: DiaryNote }) {
  console.log(
    "lastDiary?.aiinsight?.mood_caption",
    lastDiary?.aiInsight?.mood_caption
  );
  console.log("lastDiary.lastDiary", lastDiary.analysis?.emotions);

  const moodsFromBackend = lastDiary.analysis?.emotions;

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
      <div className="bg-black text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <Card className="bg-black text-white p-6 border-white/50">
            <div className="flex justify-between">
              <div>
                <h2 className="text-sm text-gray-400">{greeting}</h2>
                <h1 className="text-md font-bold">Zolomoloko</h1>
              </div>

              <img
                src="https://media.giphy.com/media/rwiOduiq2oatO/giphy.gif"
                alt="gif"
                className="h-25 w-25 rounded-lg object-cover"
              />
            </div>
          </Card>
          <Card className="bg-black text-white p-6 border-white/50">
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
          {/* <Card className=" bg-black text-white p-3 border-white/50">
            <div className="flex gap-3">
              <img
                src="https://i.pinimg.com/1200x/34/b7/8c/34b78ca9887b259597f1c40f916d6d78.jpg"
                alt="tarot"
                className="w-25 h-35"
              />
              <p>
                Чиний өмнө гэрэлтэй зам байна, итгэлтэйгээр урагшил. Өөрийгөө
                илэрхийл, аз жаргалаа бусадтай хуваалц. Нар шиг гэгээ
                түгээгээрэй.
              </p>
            </div>
          </Card> */}
        </div>

        {/* Journal Section */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card className="bg-black text-white border-white/50 p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
              {lastDiary?.aiInsight?.mood_caption}
            </h2>
            <p className="mt-2 text-base">{lastDiary?.aiInsight?.tldr}</p>
          </Card>

          {/* <Card className="bg-[url('https://i.pinimg.com/736x/34/b4/b6/34b4b69d4324d8f221d246fcdd3b0e93.jpg')] text-white border-0 p-6">
            <CardContent className="flex flex-col items-start gap-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles size={20} /> Өнөөдрийн жижиг action
              </h3>
              <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md w-full sm:w-80">
                <h2 className="text-lg font-bold mb-2">
                  {lastDiary?.aiInsight?.moodChallenge.title}
                </h2>
                <p className="text-sm mb-4">
                  {lastDiary?.aiInsight?.moodChallenge.shareStyle}
                </p>
                <p className="text-yellow-400 font-semibold">
                  {lastDiary?.aiInsight?.moodChallenge.description}
                </p>
              </div>
              <button
                onClick={handleActionClick}
                className={`mt-2 px-4 py-2 rounded-lg font-semibold transition ${
                  actionDone
                    ? "bg-green-500 cursor-default"
                    : "bg-orange-400 hover:bg-orange-500"
                }`}
                disabled={actionDone}
              >
                {actionDone ? "Амжилттай ✔" : "Би хийлээ!"}
              </button>
            </CardContent>
            <CardContent className="flex flex-col items-center gap-2">
              <Flame size={28} className="text-orange-400" />
              <p className="text-lg font-bold">
                {streakCount} өдөр дараалж challenge биелүүллээ!
              </p>
            </CardContent>
          </Card> */}
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-4">
          <Card className="bg-cover bg-center text-white p-6 bg-[url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWNhejU3dWw4aTUzenJmZjY0eTEwYmU4YnQ1dGJvcHg2eWZ4NGYzdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1zgzISaYrnMAYRJJEr/giphy.gif')]">
            <p className="text-md font-extrabold"> Today's Prompt ✏️ </p>
            <p> How can you ensure you stay positive and motivated today? </p>
          </Card>
          <Card className="bg-black text-white border-white/50 p-6">
            <CardContent>
              <p className="text-[13px] font-semibold text-[#a1a1aa]">
                Онцлох үг:
              </p>
              <img src="/CatPlaying.gif" alt="" className="rounded-lg" />
              <p className="mt-2">Залхуутай л өдөр байлаа</p>
            </CardContent>
          </Card>

          <Card className="bg-black text-white border border-white/50 p-6">
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
