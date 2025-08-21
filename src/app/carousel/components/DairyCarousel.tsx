"use client";

import * as React from "react";
import { useContext, useState } from "react";
import { userDiaryContext } from "@/provider/userDiaryProvider";
import { DiaryNote } from "@/types/diary";
import CommentModal from "./CommentMotal";
import CarouselCard from "./CarouselCard";

// shadcn/ui carousel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function DiaryCarousel() {
  const { diaries } = useContext(userDiaryContext);
  const diary = diaries as DiaryNote[];

  const [selectedComment, setSelectedComment] = useState<DiaryNote | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCommentClick = (comment: DiaryNote) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComment(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto p-6 flex flex-col items-center">
        <Carousel className="w-full max-w-5xl">
          <CarouselContent>
            {diary.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <CarouselCard
                  diary={item}
                  onClick={() => handleCommentClick(item)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {selectedComment && (
          <CommentModal
            diary={selectedComment}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}
