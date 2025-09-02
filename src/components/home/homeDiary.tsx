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
  console.log("diaries", diaries[0]?.id);

  //SET SHOW AVATAR
  const [showChatBotHome, setShowChatBotHome] = useState(false);
  //hadaglah
  const [isSaved, setIsSaved] = useState(false);

  //show music
  const [urlMusic, setUrlMusic] = useState<string | null>(null);

  console.log("dairies diaress all:", diaries);

  const handleDiarySave = async () => {
    setSaving(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/postDiary/${userProvider?.id}`,
        { text: text }
      );
      // setText(response.data.note);
      console.log("response response", response);
      await fetchDiary(false);
      // setCurrentDiaryId(response.data.id);
      if (response.status === 200) {
        console.log("toast дуудагдаж байна");
        toast.success("Амжилттай нэмэгдлээ");
      }

      console.log("response.status", response.status);
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

  console.log("user provideerrr:", userProvider);

  useEffect(() => {
    if (!userProvider?.id) return;

    const processTodayDiary = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/progress/processDiary/${userProvider?.id}`
        );
        console.log("all response", response.data);
      } catch (error) {
        toast.error("streaks error");
      }
    };
    const allProgress = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/progress/getStreaks/${userProvider?.id}`
        );
        console.log("all response", response.data.summary.points);
      } catch (error) {
        toast.error("streaks error");
      }
    };
    processTodayDiary();
    allProgress();
  }, []);

  console.log("text text:", text);
  console.log("showChatBotHome:", showChatBotHome);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <div className="z-50">
        {showChatBotHome && (
          <ChatBot diaries={diaries} setShowChatBotHome={setShowChatBotHome} />
        )}
      </div>

      {/* <div className="z-50">
        {showChatBotHome && <ChatBot setShowChatBotHome={setShowChatBotHome} />}
      </div> */}

      <div className="absolute bottom-20 right-20 z-40">
        <motion.div
          animate={{ scale: isSaved ? 1.2 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ShowAvatarHome setShowChatBotHome={setShowChatBotHome} />
        </motion.div>
      </div>

      <div className="absolute bottom-20 right-20 z-40">
        <ShowAvatarHome setShowChatBotHome={setShowChatBotHome} />
      </div>

      <div className="flex gap-3 absolute top-5 right-60 z-40">
        <div className="flex items-center gap-1">
          <img src="/passion.png" alt="fire" className="w-[24px] h-[24px]" />
          <p className="text-[24px] font-semibold text-white">
            {/* {stats.streaks !== null ? stats.streaks : "…"} */}
            {userProvider?.totalStreaks}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <img src="/cent.png" alt="streks" className="w-[24px] h-[24px]" />

          <p className="text-[24px] font-semibold text-white">
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

      {/* <DoneBreathExercise /> */}

      {showdiaryInput && (
        <div className="h-[80%]">
          <DairyText
            setText={setText}
            handleSaveButtonDiary={handleSaveButtonDiary}
            text={text}
            setShowDiaryInput={setShowDiaryInput}
            saving={saving}
          />
        </div>
      )}

      <div className="backdrop-blur-md py-3 px-7 border-none rounded-lg absolute bottom-15">
        <BarSide setUrlMusic={setUrlMusic} />
      </div>
    </div>
  );
}
