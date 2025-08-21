"use client";

import { DiaryNote } from "@/types/diary";
import CarouselCard from "./CarouselCard";


interface Props {
  diary: DiaryNote[];
  direction: "up" | "down";
  onCommentClick: (diary: DiaryNote) => void;
}

export default function ScrollingColumn({ diary, direction, onCommentClick }: Props) {
  const tripledComments = [...diary, ...diary, ...diary];
  

  return (
    <div className="h-[700px] overflow-hidden relative rounded-lg column-container">
      <div
        className={`flex flex-col animate-scroll-${direction}`}
        style={{ animation: `scroll-${direction} 60s linear infinite` }}
      >
        {tripledComments.map((item, index) => (
          <CarouselCard key={`${item.id}-${index}`} diary={item} onClick={() => onCommentClick(item)} />
        ))}
      </div>
    </div>
  );
}
