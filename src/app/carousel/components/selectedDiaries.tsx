"use client";

import { useContext, useEffect, useState } from "react";
import CarouselCard from "./CarouselCard";
import { userDiaryContext } from "@/provider/userDiaryProvider";
import { DiaryNote } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subDays } from "date-fns";
import CommentModal from "./CommentMotal";

export const AllUsersDiaries = () => {
  const { diaries } = useContext(userDiaryContext);
  console.log("alllll  diaries", diaries[0]);

  const [filteredDiaries, setFilteredDiaries] = useState<DiaryNote[]>([]);

  const [selectedDiaries, setSelectedDiaries] = useState<DiaryNote | null>(
    null
  );
  const [selectedComment, setSelectedComment] = useState<DiaryNote | null>(
    null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  let filtered: DiaryNote[] = [];

  const handleCommentClick = (comment: DiaryNote) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComment(null);
  };

  const handleSelectDiariesByDate = (value: string) => {
    console.log("seveee", value);

    const today = new Date();

    if (value === "last7") {
      const fromSevenDays = subDays(today, 1).toISOString();
      console.log("sevenDays", fromSevenDays);

      filtered = diaries.filter(
        (diaries) =>
          new Date(diaries.createdAt) < new Date(fromSevenDays) &&
          new Date(diaries.createdAt) <= today
      );
      console.log("7000000", filtered);
    } else if (value === "lastMonth") {
      const fromLastMonth = subDays(today, 30).toISOString();

      filtered = diaries.filter(
        (diary) =>
          new Date(diary.createdAt) >= new Date(fromLastMonth) &&
          new Date(diary.createdAt) <= today
      );
      console.log("30000", filtered);
    } else if (value === "all") {
      filtered = diaries;
    }
    console.log("fil;tereee:", filtered);

    setFilteredDiaries(filtered);
    //  console.log("diaryy", new Date(diaries.createdAt));
  };

  const handleSelectByEmotions = (value: string) => {
    console.log("valueee", value);

    if (value === "Joy") {
      filtered = diaries.filter((diary) => {
        return diary?.analysis?.emotions[0] === "БАЯРТАЙ";
        console.log(diary.analysis?.emotions[0]);
      });
      console.log("filtered: joy:", filtered);
    } else if (value === "Sadness") {
      filtered = diaries.filter((diary) => {
        return diary.analysis?.emotions[0] === "ГУНИГТАЙ";
      });
      // setFilteredDiaries(filtered);
    } else if (value === "Calm") {
      filtered = diaries.filter((diary) => {
        return diary.analysis?.emotions[0] === "ТАЙВАН";
      });
    } else if (value === "Angry") {
      filtered = diaries.filter((diary) => {
        return diary.analysis?.emotions[0] === "УУРТАЙ";
      });
    } else if (value === "all") {
      filtered = diaries;
    }
    setFilteredDiaries(filtered);
  };

  useEffect(() => {
    handleSelectDiariesByDate("all");
  }, []);

  return (
    <div>
      {" "}
      <div className="w-full flex justify-end">
        <div className="flex gap-6">
          <Select
            defaultValue="all"
            onValueChange={(value) => handleSelectByEmotions(value)}
          >
            <div className="">
              <SelectTrigger className="w-[180px] mb-8">
                <SelectValue placeholder="Select a filters" />
              </SelectTrigger>
            </div>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Emotions</SelectItem>

                <SelectItem value="Joy">Joy</SelectItem>
                <SelectItem value="Sadness">Sadness</SelectItem>
                <SelectItem value="Calm">Calm</SelectItem>
                <SelectItem value="Angry">Angry</SelectItem>
                {/* <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            defaultValue="all"
            onValueChange={(value) => handleSelectDiariesByDate(value)}
          >
            <div className="w-full flex justify-end">
              <SelectTrigger className="w-[180px] mb-8">
                <SelectValue placeholder="Select a emotion" />
              </SelectTrigger>
            </div>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Бүгд</SelectItem>

                <SelectItem value="last7">Сүүлийн 7 хоног</SelectItem>
                <SelectItem value="lastMonth">Сүүлийн нэг сар</SelectItem>

                {/* <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {filteredDiaries.length === 0 && <div> шүүлт олдсонгүй... </div>}
      <div className="grid grid-cols-4 gap-4 ">
        {filteredDiaries.map((item, i) => (
          <div key={i}>
            <CarouselCard
              diary={item}
              onClick={() => handleCommentClick(item)}
            />
          </div>
        ))}
      </div>
      {selectedComment && (
        <CommentModal
          diary={selectedComment}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};
