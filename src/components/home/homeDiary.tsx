"use client";

import { useContext, useEffect, useState } from "react";
import { BarSide } from "./BarSide";
import axios from "axios";

import { userDiaryContext } from "@/provider/userDiaryProvider";
import { DairyText } from "../verseUi/diaryTextArea";

import { UserContext } from "@/provider/userProvider";

import { motion } from "framer-motion";

import SpotifyEmbed from "./music";

import ProfileDropdown from "../profileDropdown";
import Clock from "./time";
import { ShowAvatarHome } from "../avatar/homeShowAvatar";
import NotebookCoverCard from "./note";
import { toast } from "sonner";
import { ChatBot } from "../chatBot/chatBot";

// import { ChatBotBreathEx } from "../chatBot/chatBotBreath";

export default function HomeDiary() {
  const { userProvider } = useContext(UserContext);
  const { diaries, fetchDiary } = useContext(userDiaryContext);
  const [text, setText] = useState<null | string>(null);
  const [showdiaryInput, setShowDiaryInput] = useState(false);

  // const [stats, setStats] = useState<{
  //   points: number | null;
  //   streaks: number | null;
  // }>({
  //   points: null,
  //   streaks: null,
  // });

  // const [currenDiaryId, setCurrentDiaryId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  

  //SET SHOW AVATAR
  const [showChatBotHome, setShowChatBotHome] = useState(false);
  //hadaglah
  const [isSaved, setIsSaved] = useState(false);

  //show music
  const [urlMusic, setUrlMusic] = useState<string | null>(null);


  const handleDiarySave = async () => {
    setSaving(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/postDiary/${userProvider?.id}`,
        { text: text }
      );
 

      await fetchDiary(false);
      if (response.status === 200) {
        toast.success("Амжилттай нэмэгдлээ");
      }

    } catch (error) {
      toast.error("Error saving diary");

      console.error(error);
    } finally {
      setSaving(false);
      setShowDiaryInput(false);
      setIsSaved(true), setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const handleSaveButtonDiary = () => {
    handleDiarySave();
  };

  useEffect(() => {
    if (!userProvider?.id) return;

    const processTodayDiary = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/progress/processDiary/${userProvider?.id}`
        );
      
      } catch (error) {
        toast.error("streaks error");
      }
    };
    const allProgress = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/progress/getStreaks/${userProvider?.id}`
        );

      } catch (error) {
        toast.error("streaks error");
      }
    };
    processTodayDiary();
    allProgress();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <div className="z-50">
        {showChatBotHome && (
          <ChatBot diaries={diaries} setShowChatBotHome={setShowChatBotHome} />
        )}
      </div>

      <div className="absolute right-5 bottom-24 md:bottom-20 md:right-20 z-40 ">
        <ShowAvatarHome setShowChatBotHome={setShowChatBotHome} />
      </div>

      <div className="flex gap-1 md:gap-3 absolute top-2 md:top-5  md:right-60 z-40">
        <div className="flex items-center gap-1">
          <img
            src="/passion.png"
            alt="fire"
            className="w-[14px] h-[14px]  md:w-[24px] md:h-[24px]"
          />
          <p className="text-[14px] md:text-[24px] font-semibold text-white">
            {/* {stats.streaks !== null ? stats.streaks : "…"} */}
            {userProvider?.totalStreaks}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <img
            src="/cent.png"
            alt="streks"
            className="w-[14px] h-[14px]  md:w-[24px] md:h-[24px]"
          />

          <p className="text-[14px] md:text-[24px] font-semibold text-white">
            {userProvider?.totalPoints}
            {/* {stats.points !== null ? stats.points : "…"} */}
          </p>
        </div>
      </div>

      {!showdiaryInput && (
        <div onClick={() => setShowDiaryInput(true)}>
          <NotebookCoverCard />
        </div>
      )}

      <ProfileDropdown />

      <Clock />

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
