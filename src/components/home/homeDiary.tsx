"use client";

import { useCallback, useContext, useMemo, useState } from "react";

import { BarSide } from "./BarSide";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { userDiaryContext } from "@/provider/userDiaryProvider";

import { CoverImage } from "../toDo/coverImage";

import Loader from "../loading";
import { UserContext } from "@/provider/userProvider";
import Calendar from "../calendar/calendar";
import { Month } from "../calendar/month";
import SpotifyEmbed from "./music";
import ProfileDropdown from "../profileDropdown";
import { DairyText } from "../verseUi/diaryTextArea";
import Clock from "./time";

export default function HomeDiary() {
  const { userProvider } = useContext(UserContext);
  const [isZoomed, setIsZoomed] = useState(false);
  const [stats, setStats] = useState(false);
  const [todo, setTodo] = useState(false);
  const [text, setText] = useState("");

  const [currenDiaryId, setCurrentDiaryId] = useState<number | null>(null);
  const [laoding, setLoading] = useState(false);

  console.log("diaryyy", text);

  const [showdiary, setShowdiary] = useState(false);

  const { diaries } = useContext(userDiaryContext);

  const curenDiary = diaries.filter((item) => item.id === currenDiaryId);
  console.log("current dauirrrrrr", curenDiary);

  const HandleDiaryItemClick = (id: number, note: string) => {
    setText(note);
    setCurrentDiaryId(id);
  };

  const handleNewNote = (text: string) => {
    setCurrentDiaryId(null);
    console.log("currentusre", curenDiary);
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      // Шинэ note үүсгэх
      const response = await axios.post(
        `http://localhost:4001/ai/postDiary/${userProvider.id}`,
        { text: text }
      );

      // setCurrentPostDiary(response.data);
      setCurrentDiaryId(response.data.id);

      // Хуучин note устгах
      if (curenDiary[0]?.id) {
        const res = await axios.delete(
          `http://localhost:4001/ai/deleteDiary/${curenDiary[0]?.id}`
        );
        console.log("Deleted old diary:", res.data);
      }
      console.log("responssee", response);

      if (response.status === 200) {
        toast.success("Амжилттай нэмэгдлээ");
      }

      console.log("POST new note:", response.data);
    } catch (error) {
      toast.error("Error saving diary");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDiarySave = () => {
    handleClick();
    setShowdiary(false);
  };

  if (laoding) {
    return <Loader />;
  }

  return (
    // <div className=" w-fit h-[700px]  ">
    //   <AllStats />
    // </div>
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      {todo && <CoverImage />}
      {stats && <Month />}

      <div className="h-[80%]">
        <DairyText
          setText={setText}
          handleDiarySave={handleDiarySave}
          setIsOpen={setShowdiary}
          isOpen={showdiary}
        />
      </div>
      <ProfileDropdown />
      <Clock />
      <SpotifyEmbed />
      <div className="backdrop-blur-md mt-15 py-3 px-7 border-none rounded-lg ">
        <BarSide />
      </div>
    </div>
  );
}
