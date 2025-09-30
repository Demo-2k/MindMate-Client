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
import { AchievementNotification } from "../showNotficationAndsuggest.tsx/shownotfication";

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

  const [achievementCard, setAchievementCard] = useState<{
    message: string;
    points: string;
  } | null>(null);

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

      console.log("post diary res", response);

      if (response.status === 200) {
        const progress = response.data?.progress || {};

        const {
          addedPoints = 0,
          addedAchievements = [],
          finalProgress = null,
        } = progress;

        // Toast
        if (addedAchievements.length > 0 || addedPoints > 0) {
          console.log("progress", progress);

          const achievementMessage =
            addedAchievements.length > 0
              ? `Шинэ achievement: ${addedAchievements
                  .map((a: achievementItemType) => a.title)
                  .join(", ")}.`
              : "";
          const pointsMessage =
            addedPoints > 0 ? `+${addedPoints} оноо нэмэгдлээ! 🎉` : "";

          // Set state to show the central card
          setAchievementCard({
            message: achievementMessage,
            points: pointsMessage,
          });

          // Auto-hide the card after 4 seconds
          setTimeout(() => {
            setAchievementCard(null);
          }, 4000); // 4 seconds
        }

        // Point animation эхлүүлэх
        if (addedPoints > 0) {
          setPointsAnimation(addedPoints);

          const start = userPoints;
          const end = userPoints + addedPoints;
          const duration = 1500;
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

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <div className="absolute bottom-0 right-0 z-50">
        {showChatBotHome && (
          <ChatBot diaries={diaries} setShowChatBotHome={setShowChatBotHome} />
        )}
      </div>

      <div className="absolute right-5 bottom-24 md:bottom-20 md:right-20 z-40 ">
        <ShowAvatarHome setShowChatBotHome={handleChatBotClick} />
      </div>

      <div className="absolute top-2 md:top-5 right-4 z-50 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[14px] md:text-2xl">⭐</span>
          <motion.span
            key={userPoints}
            // Animate: Pops up then settles when the score updates
            initial={{ scale: 1 }}
            animate={{ scale: [1.2, 1] }} // Pops up slightly then settles back
            transition={{ duration: 0.3 }}
            className="text-[14px] md:text-2xl font-semibold text-white"
          >
            {userPoints}
          </motion.span>

          {/* --- ДРАМАТИК ОНОО НЭМЭГДЭХ АНИМЭЙШН --- */}
          <AnimatePresence>
            {pointsAnimation > 0 && (
              <motion.span
                key="plusPoints"
                initial={{
                  opacity: 0,
                  scale: 2, // Start much bigger for visual impact
                  x: 200, // Move further right to emphasize the flight path
                  y: 200, // Move further down
                }}
                animate={{
                  opacity: 1,
                  scale: 1, // Shrink slightly as it flies
                  x: 0,
                  y: -30,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  transition: { duration: 0.2 },
                }}
                transition={{
                  // Нэмэгдсэн хугацаа: 1.5 секунд
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="text-yellow-400 text-3xl font-extrabold absolute z-50 whitespace-nowrap drop-shadow-lg"
              >
                +{pointsAnimation}
              </motion.span>
            )}
          </AnimatePresence>
          {/* ------------------------------------------- */}
        </div>

        <Clock />
      </div>

      <AnimatePresence>
        {achievementCard && (
          <AchievementNotification
            key={achievementCard.message} // key-г нэмэх
            achievementMessage={achievementCard.message}
            pointsMessage={achievementCard.points}
            onClose={() => setAchievementCard(null)}
          />
        )}
      </AnimatePresence>

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

      <div className="md:px-7 border-none rounded-lg absolute bottom-6 md:bottom-15">
        <BarSide setUrlMusic={setUrlMusic} />
      </div>
    </div>
  );
}
