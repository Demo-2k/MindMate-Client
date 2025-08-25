"use client";

import { useCallback, useContext, useMemo, useState } from "react";
import { MusicPlayer } from "../musicplayer/player";
import { AllStats } from "../stats/allStats";
import { BarSide } from "./BarSide";
import { DialogToDo } from "../toDo/toDo";
import { debounce, values } from "lodash";
import axios from "axios";
import { toast } from "sonner";
import { userDiaryContext } from "@/provider/userDiaryProvider";
import { DiaryNote } from "@/types";
import { number } from "zod";
import { Button } from "../ui/button";

export default function HomeDiary() {
  const [stats, setStats] = useState(false);
  const [todo, setTodo] = useState(false);
  const [text, setText] = useState("");
  const [currenDiaryId, setCurrentDiaryId] = useState<number | null>(null);
  const [theme, setTheme] = useState();
  const [profile, setProfile] = useState()
  // const [currentPostDiary, setCurrentPostDiary] = useState<DiaryNote | null>(
  //   null
  // );

  const { diaries } = useContext(userDiaryContext);

  const curenDiary = diaries.filter((item) => item.id === currenDiaryId);
  console.log("current dauirrrrrr", curenDiary);

  const HandleDiaryItemClick = (id: number, note: string) => {
    setText(note);
    setCurrentDiaryId(id);
  };

  const handleNewNote = () => {
    setCurrentDiaryId(null);
    console.log("currentusre", curenDiary);
  };

  // const saveDiary = useMemo(
  //   () =>
  //     debounce(async (value: string, oldDiary?: DiaryNote | null) => {
  //       try {
  //         // Шинэ note үүсгэх
  //         const response = await axios.post(
  //           "http://localhost:4001/ai/postDiary/1",
  //           { text: value }
  //         );
  //         setCurrentPostDiary(response.data);
  //         setCurrentDiaryId(response.data.id);
  //         // Хуучин note устгах
  //         if (curenDiary[0]?.id) {
  //           const res = await axios.delete(
  //             `http://localhost:4001/ai/deleteDiary/${curenDiary[0]?.id}`
  //           );
  //           console.log("Deleted old diary:", res.data);
  //         }

  //         // Шинэ note state-д хадгалах

  //         console.log("POST new note:", response.data);
  //       } catch (error) {
  //         toast.error("Error saving diary");
  //         console.error(error);
  //       }
  //     }, 9000),
  //   []
  // );

  const handleClick = async () => {
    try {
      // Шинэ note үүсгэх
      const response = await axios.post(
        "http://localhost:4001/ai/postDiary/1",
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

      console.log("POST new note:", response.data);
    } catch (error) {
      toast.error("Error saving diary");
      console.error(error);
    }
  };

  return (
    // <div className=" w-fit h-[700px]  ">
    //   <AllStats />
    // </div>
    <div className="w-full h-screen my-bg flex flex-col items-center justify-center ">
      {stats && <AllStats />}
      {todo && <DialogToDo />}

      <div className="flex  pt-[200px]  justify-center  gap-10">
        <div>
          {" "}
          <MusicPlayer />
        </div>

        <div>
          <textarea
            placeholder="Өдрийн тэмдэглэлээ бичээрэй..."
            className="w-[800px] px-4 py-3 text-2xl rounded-2xl bg-transparent border-1  text-white shadow-lg outline-none  "
            rows={15}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              // saveDiary(e.target.value, currentPostDiary);
            }}
          />
        </div>
      </div>
      <Button onClick={handleClick}>Save</Button>

      <div className="backdrop-blur-md mt-15 py-3 px-7 border-none rounded-lg">
        <BarSide
          HandleDiaryItemClick={HandleDiaryItemClick}
          handleNewNote={handleNewNote}
          setStats={setStats}
          stats={stats}
          setTodo={setTodo}
          todo={todo}
        />
      </div>
    </div>
  );
}
