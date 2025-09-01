"use client";

import { useContext, useEffect, useState } from "react";
import { BarSide } from "./BarSide";
import axios from "axios";
import { toast } from "sonner";
import { userDiaryContext } from "@/provider/userDiaryProvider";
import { DairyText } from "../verseUi/diaryTextArea";
import Loader from "../loading";
import { UserContext } from "@/provider/userProvider";
import ProfileDropdown from "../profileDropdown";
import Clock from "./time";
import { ShowAvatarHome } from "../avatar/homeShowAvatar";
import { ChatBot } from "../chatBot/chatBot";
import NotebookCoverCard from "./note";
import SpotifyEmbed from "./music";
import { stat } from "node:fs";

// import { ChatBotBreathEx } from "../chatBot/chatBotBreath";

export default function HomeDiary() {
  const { userProvider } = useContext(UserContext);
  const { diaries, fetchDiary } = useContext(userDiaryContext);
  const [text, setText] = useState<null | string>(null);
  const [showdiaryInput, setShowDiaryInput] = useState(false);

  const [stats, setStats] = useState<{
    points: number | null;
    streaks: number | null;
  }>({
    points: null,
    streaks: null,
  });

  // const [currenDiaryId, setCurrentDiaryId] = useState<number | null>(null);
  const [laoding, setLoading] = useState(false);
  console.log("diaries", diaries[0]?.id);

  //SET SHOW AVATAR
  const [showChatBotHome, setShowChatBotHome] = useState(false);
  const [showAvatarQuestion, setShowAvatarQuestion] = useState(false);


  //show music
  const [urlMusic, setUrlMusic] = useState<string | null>(null)

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

  useEffect(() => {
    if (!userProvider?.id) return;
    const allProgress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/progress/getStreaks/${userProvider?.id}`
        );
        console.log("all response", response.data.summary.points);
        setStats({
          points: response.data.summary.points,
          streaks: response.data.summary.streaks,
        });
      } catch (error) {
        toast.error("streaks error");
      }
    };

    allProgress();
  }, [userProvider?.id]);

  console.log("3.showAvatarQuestion", showAvatarQuestion);

  if (laoding) {
    return <Loader />;
  }

  console.log("text text:", text);
  console.log("showChatBotHome:", showChatBotHome);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      {/* <ChatBotBreathEx  /> */}
      {/* <div className="z-50">
        {showChatBotHome && <ChatBot diaries={diaries} />}
      </div> */}

      <div className="z-50">
        {showChatBotHome && <ChatBot setShowChatBotHome={setShowChatBotHome} />}
      </div>

      <div className="absolute bottom-20 right-20 z-40">
        <ShowAvatarHome setShowChatBotHome={setShowChatBotHome} />
      </div>

      <div className="flex gap-3 absolute top-5 right-60 z-40">
        <div className="flex items-center gap-1">
          <img src="/cent.png" alt="streks" className="w-[24px] h-[24px]" />
          <p className="text-[24px] font-semibold text-white">
            {stats.streaks !== null ? stats.streaks : "…"}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <img src="/passion.png" alt="fire" className="w-[24px] h-[24px]" />
          <p className="text-[24px] font-semibold text-white">
            {stats.points !== null ? stats.points : "…"}
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
        <BarSide setUrlMusic = {setUrlMusic}/>
      </div>
    </div>
  );
}
