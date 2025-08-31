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
import NotebookCoverCard from "./note";
// import { ChatBotBreathEx } from "../chatBot/chatBotBreath";

export default function HomeDiary() {
  const { userProvider } = useContext(UserContext);
  const { diaries, fetchDiary } = useContext(userDiaryContext);
  const [text, setText] = useState<null | string>(null);
  const [showdiaryInput, setShowDiaryInput] = useState(false);

  // const [currenDiaryId, setCurrentDiaryId] = useState<number | null>(null);
  const [laoding, setLoading] = useState(false);
  console.log("diaries", diaries[0]?.id);

  //SET SHOW AVATAR
  const [showChatBotHome, setShowChatBotHome] = useState(false);
  const [showAvatarQuestion, setShowAvatarQuestion] = useState(false);

  console.log("dairies diaress all:", diaries);

  // const getTodayDiary = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:4001/ai/getTodayDiary/${userProvider.id}`
  //     );
  //     console.log("today note ", response);

  //     if (response.data?.note) {
  //       setText(response.data.note); // Өдөрт бичсэн бүх entry-г харуулна
  //     } else {
  //       setText(""); // Өнөөдрийн бичлэг байхгүй бол хоосон
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setText("");
  //   }
  // };

  const handleDiarySave = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4001/ai/postDiary/${userProvider.id}`,

        { text: text }
      );
      // setText(response.data.note);
      setShowAvatarQuestion(true);

      console.log("response response", response);

      await fetchDiary();
      // setCurrentDiaryId(response.data.id);
      if (response.status === 200) {
        toast.success("Амжилттай нэмэгдлээ");
      }

      // setShowAvatarQuestion(true);
    } catch (error) {
      toast.error("Error saving diary");

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveButtonDiary = () => {
    setShowDiaryInput(false);
    handleDiarySave();
  };

  // useEffect(() => {
  //   // if (diaries.length > 0) {
  //   //   getTodayDiary();
  //   // }
  //   if(!diaries) return;
  //   getTodayDiary();
  // }, [diaries]);

  console.log("3.showAvatarQuestion", showAvatarQuestion);

  if (laoding) {
    return <Loader />;
  }

  console.log("text text:", text);
  console.log("showChatBotHome:", showChatBotHome);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      {/* <ChatBotBreathEx  /> */}
      {/* <div className="z-50">{showChatBotHome && <ChatBot diaries={diaries} />}</div> */}

      <div className="z-50">{showChatBotHome && <ChatBot setShowChatBotHome={setShowChatBotHome}/>}</div>

      <div className="absolute bottom-20 right-20 z-40">
        <ShowAvatarHome setShowChatBotHome={setShowChatBotHome} />
      </div>

      {!showdiaryInput && (
        <div onClick={() => setShowDiaryInput(true)}>
          <NotebookCoverCard />
        </div>
      )}
      <ProfileDropdown />

      <Clock />

      <SpotifyEmbed />


      {showdiaryInput && (
        <div className="h-[80%]">
          <DairyText
            setText={setText}
            handleSaveButtonDiary={handleSaveButtonDiary}
            text={text}
            setShowDiaryInput={setShowDiaryInput}
          />
        </div>
      )}

      <div className="backdrop-blur-md py-3 px-7 border-none rounded-lg absolute bottom-15">
        <BarSide />
      </div>
    </div>
  );
}
