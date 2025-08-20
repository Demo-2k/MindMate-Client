"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ScrollingColumn from "./ScrollingColumn";

import { DiaryNote } from "./CarouselCard";
import CommentModal from "./CommentMotal";


export default function DiaryCarousel() {
  const [selectedComment, setSelectedComment] = useState<DiaryNote | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diary, setDiary] = useState<DiaryNote[]>([]);

  const handleCommentClick = (comment: DiaryNote) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComment(null);
  };

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await axios.get<DiaryNote[]>(`http://localhost:4001/ai/getAllDiaryNotes/1`);
        setDiary(response.data);
      } catch (error) {
        console.error("Failed to fetch diary notes:", error);
      }
    };
    fetchDiary();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto p-6">
        <style jsx>{`
          @keyframes scroll-up { 0% { transform: translateY(0); } 100% { transform: translateY(-33.333%); } }
          @keyframes scroll-down { 0% { transform: translateY(-33.333%); } 100% { transform: translateY(0); } }

          .animate-scroll-up { animation: scroll-up 30s linear infinite; }
          .animate-scroll-down { animation: scroll-down 30s linear infinite; }

          .column-container:hover .animate-scroll-up,
          .column-container:hover .animate-scroll-down {
            animation-play-state: paused;
          }

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ScrollingColumn diary={diary.slice(0, 5)} direction="up" onCommentClick={handleCommentClick} />
          <ScrollingColumn diary={diary.slice(5, 10)} direction="down" onCommentClick={handleCommentClick} />
          <ScrollingColumn diary={diary.slice(10, 15)} direction="up" onCommentClick={handleCommentClick} />
        </div>

        {selectedComment && (
          <CommentModal diary={selectedComment} isOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>
    </div>
  );
}
