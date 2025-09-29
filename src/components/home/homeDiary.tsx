"use client";

import { useContext, useEffect, useState } from "react";
import { BarSide } from "./BarSide";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import { userDiaryContext } from "@/provider/userDiaryProvider";
import { UserContext } from "@/provider/userProvider";

import { DairyText } from "../inputs/diaryTextArea";
import SpotifyEmbed from "./music";
import ProfileDropdown from "../profileDropdown";
import Clock from "./time";

import { ShowAvatarHome } from "../avatar/homeShowAvatar";

import NotebookCoverCard from "../homeButton/note";

import { ChatBot } from "../chatBot/chatBot";

// import { ChatBotBreathEx } from "../chatBot/chatBotBreath";

type achievementItemType = {
  id: string;
  desc: string;
  title: string;
};

export default function HomeDiary() {
  const { userProvider } = useContext(UserContext);
  const { diaries, fetchDiary } = useContext(userDiaryContext);
  const [text, setText] = useState<null | string>(null);
  const [showdiaryInput, setShowDiaryInput] = useState(false);

  const [allPoints, setAllPoints] = useState<number | null>(null);

  const [saving, setSaving] = useState(false);

  //SET SHOW AVATAR
  const [showChatBotHome, setShowChatBotHome] = useState(false);
  //hadaglah
  const [isSaved, setIsSaved] = useState(false);

  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [showBreathingConfirm, setShowBreathingConfirm] = useState(false);

  //show music
  const [urlMusic, setUrlMusic] = useState<string | null>(null);

  console.log("userproveder", userProvider);

  // State
  const [userPoints, setUserPoints] = useState<number>(
    userProvider?.totalPoints || 0
  );
  const [pointsAnimation, setPointsAnimation] = useState<number>(0);

  // handleDiarySave
  const handleDiarySave = async (mood?: string) => {
    setSaving(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/postDiary/${userProvider?.id}`,
        { text: text }
      );

      if (response.status === 200) {
        const { addedPoints, addedAchievements, finalProgress } =
          response.data.progress;

        // Toast
        if (addedAchievements.length > 0 || addedPoints > 0) {
          const achievementMessage =
            addedAchievements.length > 0
              ? `Шинэ achievement: ${addedAchievements
                  .map((a: achievementItemType) => a.title)
                  .join(", ")}.`
              : "";
          const pointsMessage =
            addedPoints > 0 ? ` ${addedPoints} оноо нэмэгдлээ! 🎉` : "";
          toast.success(`${achievementMessage}${pointsMessage}`, {
            duration: 5000,
          });
        }

        // Point animation эхлүүлэх
        if (addedPoints > 0) {
          setPointsAnimation(addedPoints);

          const start = userPoints;
          const end = userPoints + addedPoints;
          const duration = 1000;
          const steps = 30;
          const increment = (end - start) / steps;
          let current = start;
          let step = 0;

          const interval = setInterval(() => {
            current += increment;
            setUserPoints(Math.round(current));
            step++;
            if (step >= steps) {
              clearInterval(interval);
              setPointsAnimation(0); // animation дууссан
            }
          }, duration / steps);
        }
      }

      await fetchDiary(false);
    } catch (error) {
      toast.error("Error saving diary");
      console.error(error);
    } finally {
      setSaving(false);
      setShowDiaryInput(false);
    }
  };

  const handleSaveButtonDiary = (mood?: string) => {
    handleDiarySave(mood);
  };

  const handleChatBotClick = () => {
    if (!diaries || diaries.length === 0) {
      toast.error("Эхлээд өдрийн тэмдэглэлээ бичнэ үү");
      return;
    }
    setShowChatBotHome(true);
  };

  // useEffect(() => {
  //   if (!userProvider?.id || !diaries[0]) return;

  //   // const processTodayDiary = async () => {
  //   //   try {
  //   //     const response = await axios.get(
  //   //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/progress/processDiary/${userProvider?.id}`
  //   //     );
  //   //   } catch (error) {
  //   //     toast.error("streaks error");
  //   //   }
  //   // };
  //   const allProgress = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/progress/getStreaks/${userProvider?.id}`
  //       );

  //       console.log(
  //         "all process diary",
  //         response.data.success.finalProgress.points
  //       );
  //       setAllPoints(response?.data?.success?.finalProgress?.points);
  //     } catch (error) {
  //       // toast.error("streaks error");
  //       console.log(error);
  //     }
  //   };
  //   // processTodayDiary();
  //   // allProgress();
  // }, [userProvider?.id]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <div className="absolute absolute bottom-0 right-0 z-50">
        {showChatBotHome && (
          <ChatBot diaries={diaries} setShowChatBotHome={setShowChatBotHome} />
        )}
      </div>

      <div className="absolute right-5 bottom-24 md:bottom-20 md:right-20 z-40 ">
        <ShowAvatarHome setShowChatBotHome={handleChatBotClick} />
      </div>

      <div className="absolute top-2 md:top-5 right-4 z-50 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span>⭐</span>
          <motion.span
            key={userPoints}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="font-semibold text-white"
          >
            {userPoints}
          </motion.span>

          <AnimatePresence>
            {pointsAnimation > 0 && (
              <motion.span
                key="plusPoints"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: -20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="text-green-400 font-bold"
              >
                +{pointsAnimation}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full shadow-md">
          <span className="text-[14px] md:text-2xl">⭐</span>
          <span className="text-[14px] md:text-2xl font-semibold text-white">
            {userPoints}
          </span>
        </div> */}

        <Clock />
      </div>

      {!showdiaryInput && (
        <div className="flex gap-3">
          <div onClick={() => setShowDiaryInput(true)}>
            <NotebookCoverCard />
          </div>
        </div>
      )}

      <ProfileDropdown />

      <SpotifyEmbed urlMusic={urlMusic} />

      {showdiaryInput && (
        <div className="h-[80%] absolute z-50">
          <DairyText
            setText={setText}
            handleSaveButtonDiary={handleSaveButtonDiary}
            text={text}
            setShowDiaryInput={setShowDiaryInput}
            saving={saving}
          />
        </div>
      )}

      <div className="backdrop-blur-md py-3 px-3 md:px-7 border-none rounded-lg absolute bottom-6 md:bottom-15">
        <BarSide setUrlMusic={setUrlMusic} />
      </div>
    </div>
  );
}
