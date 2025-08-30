"use client";

import { useContext, useEffect, useState } from "react";

import { BarSide } from "./BarSide";

import axios from "axios";
import { toast } from "sonner";
import { userDiaryContext } from "@/provider/userDiaryProvider";

import { DairyText } from "../verseUi/diaryTextArea";

import Loader from "../loading";
import { UserContext } from "@/provider/userProvider";

import SpotifyEmbed from "./music";
import ProfileDropdown from "../profileDropdown";
import Clock from "./time";
import { ShowAvatarHome } from "../avatar/homeShowAvatar";
import { ChatBot } from "../chatBot/chatBot";
// import { ChatBotBreathEx } from "../chatBot/chatBotBreath";

export default function HomeDiary() {
  const { userProvider } = useContext(UserContext);
  const { diaries, fetchDiary } = useContext(userDiaryContext);
  const [text, setText] = useState("");

  const [currenDiaryId, setCurrentDiaryId] = useState<number | null>(null);
  const [laoding, setLoading] = useState(false);

  //SET SHOW AVATAR
  const [showChatBotHome, setShowChatBotHome] = useState(false);
  const [showAvatarQuestion, setShowAvatarQuestion] = useState(false);

  // const curenDiary = diaries.filter((item) => item.id === currenDiaryId);
  // console.log("diaries", curenDiary);
  console.log("dairies diaress all:", diaries);
  

  const handleDiarySave = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4001/ai/postDiary/${userProvider.id}`,

        { text: text }
      );
      setShowAvatarQuestion(true);
      console.log("1.showAvatarQuestion", showAvatarQuestion);
      // await fetchDiary();
      // setCurrentDiaryId(response.data.id);

      console.log("responssee", response);

      if (response.status === 200) {
        toast.success("Амжилттай нэмэгдлээ");
      }
    } catch (error) {
      toast.error("Error saving diary");

      console.error(error);
    } finally {
      setLoading(false);

      console.log("2.showAvatarQuestion", showAvatarQuestion);
    }
  };
  
  useEffect(() => {
    console.log("showAvatarQuestion updated:", showAvatarQuestion);
  }, [showAvatarQuestion]);

  console.log("3.showAvatarQuestion", showAvatarQuestion);

  if (laoding) {
    return <Loader />;
  }

  console.log("showChatBotHome:", showChatBotHome);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      {/* <ChatBotBreathEx  /> */}
      <div className="z-50">{showChatBotHome && <ChatBot diaries={diaries} />}</div>

      <div className="absolute bottom-20 right-20 z-40">
        <ShowAvatarHome
          setShowChatBotHome={setShowChatBotHome}
          showAvatarQuestion={showAvatarQuestion}
        />
      </div>

      <div className="h-[80%]">
        <DairyText
          setText={setText}
          handleDiarySave={handleDiarySave}
          text={text}
        />
      </div>

      <ProfileDropdown />

      <Clock />

      <SpotifyEmbed />

      <div className="w-30 h-30 bg-pink-300 rounded-full absolute bottom-20 right-20 z-30 flex flex-col items-center text-white gap-1"></div>

      <div className="backdrop-blur-md mt-15 py-3 px-7 border-none rounded-lg ">
        <BarSide />
      </div>
    </div>
  );
}
