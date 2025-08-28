"use client";

import { useCallback, useContext, useMemo, useState } from "react";
import { MusicPlayer } from "../musicplayer/player";

import { BarSide } from "./BarSide";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { userDiaryContext } from "@/provider/userDiaryProvider";

import { CoverImage } from "../toDo/coverImage";

import { DairyText } from "../verseUi/diaryTextArea";
import Loader from "../loading";
import { UserContext } from "@/provider/userProvider";
import Calendar from "../calendar/calendar";
import { Month } from "../calendar/month";
import SpotifyEmbed from "./music";

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

      <SpotifyEmbed/>

      {/* <motion.div
        drag
        dragElastic={0.2}
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 100 }}
        className="fixed 
                     rounded-2xl pt-8 cursor-grab 
                     border border-white/10 flex flex-col"
      >
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/1buR1viIOgrYIWWX4j14gL?utm_source=generator&theme=0"
          width="400px"
          height="652px"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </motion.div> */}

      <div className="backdrop-blur-md mt-15 py-3 px-7 border-none rounded-lg ">
        <BarSide />
      </div>
    </div>
  );
}
