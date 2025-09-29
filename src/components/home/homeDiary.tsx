"use client";

import { useContext, useEffect, useState } from "react";
import { BarSide } from "./BarSide";
import axios from "axios";
import { toast } from "sonner";

import { userDiaryContext } from "@/provider/userDiaryProvider";
import { UserContext } from "@/provider/userProvider";

import { DairyText } from "../inputs/diaryTextArea";
import SpotifyEmbed from "./music";
import ProfileDropdown from "../profileDropdown";
import Clock from "./time";

import { ShowAvatarHome } from "../avatar/homeShowAvatar";

import NotebookCoverCard from "../homeButton/note";

import { ChatBot } from "../chatBot/chatBot";
import { BreathDialog } from "../userPen/breathExDialog";
import { showNotification } from "../showNotficationAndsuggest.tsx/shownotfication";

// import { ChatBotBreathEx } from "../chatBot/chatBotBreath";

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

  const handleDiarySave = async (mood?: string) => {
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

      // if (mood === "БАЯРТАЙ" || mood === "ТАЙВАН") {
      //   showNotification("Өнөөдөр та сайхан мэдрэмж бичсэн байна! 🌟", mood);
      // } else if (
      //   mood === "ГУНИГТАЙ" ||
      //   mood === "УУРТАЙ" ||
      //   mood === "СТРЕССТЭЙ"
      // ) {
      //   showNotification("Бид таныг ойлгож байна 💛", mood, () => {
      //     setShowBreathingConfirm(true); 
      //   });
      // } else {
      //   showNotification("Мэдрэмжээ бичсэнд баярлалаа!", mood);
      // }
    } catch (error) {
      toast.error("Error saving diary");

      console.error(error);
    } finally {
      setSaving(false);
      setShowDiaryInput(false);
      setIsSaved(true), setTimeout(() => setIsSaved(false), 2000);
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
        <div className="flex items-center justify-center gap-2 backdrop-blur-md px-3 py-1 rounded-full shadow-md">
          <span className="text-[14px] md:text-2xl">⭐</span>
          <span className="text-[14px] md:text-2xl font-semibold text-white">
            {allPoints ?? userProvider?.totalPoints}
          </span>
        </div>
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
     

      <div className="md:px-7 border-none rounded-lg absolute bottom-6 md:bottom-15">
        <BarSide setUrlMusic={setUrlMusic} />
      </div>
    </div>
  );
}
