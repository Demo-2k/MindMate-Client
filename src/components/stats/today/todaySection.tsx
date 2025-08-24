"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Flame, Sparkles, Activity } from "lucide-react";

interface TodayProps {
  mood: "happy" | "neutral" | "sad" | "stressed";
  streak: number;
  progress: number; // %
}

const moodText: Record<TodayProps["mood"], { emoji: string; text: string }> = {
  happy: { emoji: "😊", text: "Өнөөдөр чи их баяртай байна!" },
  neutral: { emoji: "😐", text: "Өнөөдөр тайван өдөр байна." },
  sad: { emoji: "😢", text: "Өнөөдөр бага зэрэг гунигтай байна." },
  stressed: { emoji: "😣", text: "Өнөөдөр бага зэрэг стресстэй байна." },
};

const moodAction: Record<TodayProps["mood"], string> = {
  happy: "Найздаа баяртайгаа хуваалцаарай 👯",
  neutral: "10 минут алхаж тархиа сэргээгээрэй 🚶‍♀️",
  sad: "Өөртөө дуртай зүйл хийж баярлуул ☕️",
  stressed: "Амьсгалын дасгал хийгээд завсарлаарай 🌿",
};

export default function TodaySection({ mood, streak, progress }: TodayProps) {
  const [actionDone, setActionDone] = useState(false);
  const [streakCount, setStreakCount] = useState(streak);
  const [progressValue, setProgressValue] = useState(progress);

  const handleActionClick = () => {
    if (!actionDone) {
      setActionDone(true);
      setStreakCount(streakCount + 1);
      //   setProgressValue(Math.min(progressValue + 20, 100));
    }
  };

  const moodBg: Record<TodayProps["mood"], string> = {
    happy: "rgba(255,223,186,0.3)",
    neutral: "rgba(200,200,200,0.3)",
    sad: "rgba(180,220,255,0.3)",
    stressed: "rgba(255,180,180,0.3)",
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto">
      {/* Mood Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundImage:
            "url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExem54dTc4ejhncmw0cjI0Nm4zN2luazdycnI1bjZ0ZjBrNmxtNnQzNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9JxkPTP3alOykb8PmQ/giphy.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="rounded-2xl text-black shadow-lg relative overflow-hidden"
      >
        <div
          className="backdrop-blur-sm p-4 rounded transition-colors duration-500"
          style={{ backgroundColor: moodBg[mood] }}
        >
          <motion.h2
            className="text-2xl text-white font-bold flex items-center gap-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {moodText[mood].emoji} {moodText[mood].text}
          </motion.h2>
          <p className="mt-2 text-base">
            TL;DR:{" "}
            {mood === "happy" ? "Good vibes ✨" : "Бүх зүйл зүгээр болно 💪"}
          </p>
        </div>
      </motion.div>

      {/* Action Suggestion */}
      <div className="flex gap-6">
        <Card className="rounded-2xl shadow-md border-0 bg-black/60 text-white border border-white/50 w-1/2">
          <CardContent className="p-6 flex flex-col items-start gap-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles size={20} /> Өнөөдрийн жижиг action
            </h3>
            <p
              className={`text-base ${
                actionDone ? "line-through opacity-50" : ""
              }`}
            >
              {moodAction[mood]}
            </p>
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
        </Card>

        <Card className="rounded-2xl shadow-md border-0 bg-black/60 text-white border border-white/50 w-1/2">
          <CardContent>
            {/* <div className="text-white h-fit w-[260px] border-[#2a2a2a] border rounded-xl pb-[30px] pt-[20px] pl-[20px] bg-[#111111] shadow-md shadow-black/30"> */}
            <p className="text-[13px] font-semibold text-[#a1a1aa]">
              Онцлох үг:
            </p>
            <img src="/CatPlaying.gif" alt="" className="" />
            <p>Залхуутай л өдөр байлаа</p>
            {/* <h1 className="text-lg">3 өдөр дараалж тэмдэглэл бичлээ 🔥</h1> */}
            {/* </div> */}
          </CardContent>
        </Card>
      </div>

      {/* Progress + Streak */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="rounded-2xl shadow-md border-0 bg-black/60 text-white border border-white/50">
          <CardContent className="p-6 flex flex-col items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Flame size={28} className="text-orange-400" />
            </motion.div>
            <p className="text-lg font-bold">
              {streakCount} өдөр дараалж challenge биелүүллээ!
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md border-0 bg-black/60 text-white border border-white/50">
          <CardContent className="p-6">
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
  );
}
