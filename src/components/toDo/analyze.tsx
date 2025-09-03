"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Car, Lock } from "lucide-react";
import { DiaryNote } from "@/types";
import { UserContext } from "@/provider/userProvider";

import { motion, AnimatePresence } from "framer-motion";

const data = {
  mood: "happy",
  streak: 3,
  progress: 60,
};

const images = [
  "https://media.giphy.com/media/rwiOduiq2oatO/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZDFqYWt2enBqMmhjM3RzeHIzMGtleTc3eWVwNDBseWJ0NG5tanhpdiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/bgHDlfCiHdsGoQl3vm/giphy.gif",
  "https://media.giphy.com/media/xUOwFXZCw8yJUI7tEk/giphy.gif",
  "https://media.giphy.com/media/inK3HQNIcecwF39Beb/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExejZzMGs1bjhuN3hzcDQ3Z253YXd5amE3YTBiNXU1b3l2b21nOThlbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l2JhBrGF8aUBwQpVe/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHJlZHR5NnNxcnh5NDdiaXRudTJwcDdybDk2eG41dmNmNTJ1Z3JmZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Oj5I04j19PNJeV9g1R/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3YXV5OXo4eWJoYW04cHhkaDZtamV0Ym5hb2gwYmRlNDRzOWRiMXc1byZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/fWrorpy7Jrlvi/giphy.gif",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXZwYzdnMXRkY2MxYnhxN2VpYmVicDlnNnp1ZjlxYTZjNDIwYzhycCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MuEgKN1kAJDlFdqbVC/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3OHdjMXplaXh6YWdjNTV5MjJ1YXVxNnI5N2xobGhoOWtraGZ5ZXBnaSZlcD12MV9zdGlja2Vyc19yZWxhdGVkJmN0PXM/4QZK21zlzVIyc/giphy.gif",
];
type EmotionCategory =
  | "БАЯРТАЙ"
  | "ТАЙВАН"
  | "УУРТАЙ"
  | "ГУНИГТАЙ"
  | "СТРЕССТЭЙ";

import {
  type LucideIcon,
  Smile,
  Leaf,
  Angry,
  Frown,
  AlertTriangle,
} from "lucide-react";
import axios from "axios";

export function Analysis({ lastDiary }: { lastDiary: DiaryNote }) {
  const { userProvider } = useContext(UserContext);

  const [progressValue, setProgressValue] = useState(data.progress);
  const [greeting, setGreeting] = useState("");
  const moodsFromBackend = lastDiary?.analysis?.emotions;

  const [showPoints, setShowPoints] = useState(false);

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

  const dailyImage = useMemo(() => {
    const today = new Date();
    const dayNumber = today.getDate();
    const index = dayNumber % images.length;
    return images[index];
  }, []);

  const moodMap: Record<
    EmotionCategory,
    { Icon: LucideIcon; textClass: string }
  > = {
    БАЯРТАЙ: { Icon: Smile, textClass: "text-amber-300" },
    ТАЙВАН: { Icon: Leaf, textClass: "text-emerald-400" },
    УУРТАЙ: { Icon: Angry, textClass: "text-rose-500" },
    ГУНИГТАЙ: { Icon: Frown, textClass: "text-sky-400" },
    СТРЕССТЭЙ: { Icon: AlertTriangle, textClass: "text-violet-400" },
  };

  const handleClick = async () => {
    if ((lastDiary?.aiInsight?.achievements?.length ?? 0) > 0) {
      setShowPoints(true);
      setTimeout(() => setShowPoints(false), 1500); // 1.5 сек дараа алга болно
    }
  };

  return (
    <div>
      <div className="bg-black text-white grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <Card className="bg-black text-white p-6 border-white/20">
            <div className="flex justify-between">
              <div>
                <h2 className="text-sm text-gray-400">{greeting}</h2>
                <h1 className="text-md font-bold">{userProvider?.username}</h1>
              </div>

              <img
                src={dailyImage}
                alt="gif"
                className="h-25 w-25 rounded-lg object-cover"
              />
            </div>
          </Card>
          <Card className="bg-black text-white p-6 border-white/20">
            {Object.entries(moodMap).map(([moodName, { Icon, textClass }]) => {
              const isActive = (moodsFromBackend ?? []).includes(
                moodName as EmotionCategory
              );

              return (
                <div
                  key={moodName}
                  className="flex flex-col gap-1 items-center"
                >
                  <Icon
                    className={`h-8 w-8 ${isActive ? textClass : "opacity-30"}`}
                  />
                  <span className="text-xs mt-1">{moodName}</span>
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
          </Card>

          <Card
            className={`relative p-6 border-2 transition-all duration-300 cursor-pointer
    ${
      (lastDiary?.aiInsight?.achievements?.length ?? 0) > 0
        ? "bg-gradient-to-br from-yellow-100/10 to-yellow-500/10 border-yellow-400/20 shadow-lg"
        : "bg-gray-900/80 border-gray-700 opacity-60 pointer-events-none"
    }`}
            onClick={handleClick}
          >
            {/* Point Popup */}
            <AnimatePresence>
              {showPoints && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1.5, y: -40 }}
                  exit={{ opacity: 0, scale: 0.5, y: -80 }}
                  transition={{ duration: 0.6 }}
                  className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 text-4xl font-extrabold text-green-400 drop-shadow-lg"
                >
                  +5 ⭐
                </motion.div>
              )}
            </AnimatePresence>

            {(lastDiary?.aiInsight?.achievements?.length ?? 0) > 0 ? (
              <div className="streak-points flex justify-between items-center mb-4 text-white">
                <p>⭐ Points: 5</p>
              </div>
            ) : (
              <div className="streak-points flex justify-between items-center mb-4 text-white">
                <p>⭐ Points: 0</p>
              </div>
            )}

            {(lastDiary?.aiInsight?.achievements?.length ?? 0) > 0 ? (
              lastDiary?.aiInsight?.achievements.map((ach, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="mt-2 bg-black/30 p-3 rounded-lg border border-yellow-500/40"
                >
                  <p className="text-[13px] font-semibold text-yellow-600">
                    {ach?.title}
                  </p>
                  <p className="text-sm text-gray-200">{ach?.desc}</p>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative">
                  {/* <img
                    src="/lock-icon.png"
                    alt="Locked"
                    className="w-12 h-12 mb-2 opacity-70"
                  /> */}
                  <Lock className="w-12 h-12 mb-2 opacity-70 text-white" />
                  <div className="absolute inset-0 rounded-full bg-yellow-300/20 blur-md"></div>
                </div>
                <p className="text-sm text-gray-400">
                  Achievements will unlock soon
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* <div className=""></div> */}

        {/* Right Sidebar */}
        <div className="flex flex-col gap-4">
          <Card className="bg-cover bg-center text-white border-white/20 p-6 bg-[url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWNhejU3dWw4aTUzenJmZjY0eTEwYmU4YnQ1dGJvcHg2eWZ4NGYzdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1zgzISaYrnMAYRJJEr/giphy.gif')]">
            <p className="text-md font-extrabold"> Өнөөдрийн Fun Fact ✏️ </p>
            <p> {lastDiary?.aiInsight?.fun_fact} </p>
          </Card>
          <Card className="bg-black text-white border-white/20 p-6">
            <CardContent>
              <p className="text-[13px] font-semibold text-[#a1a1aa]">
                Mood action:
              </p>
              <img src="/CatPlaying.gif" alt="" className="rounded-lg" />
              <p className="mt-2 text-lg">{lastDiary?.analysis?.moodAction}</p>
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
