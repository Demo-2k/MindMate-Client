"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";



function CarouselCard({ diary, onClick }: { diary: any; onClick: () => void }) {
  return (
    <Card
      className="mb-4 min-h-[140px] flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-border/50 backdrop-blur-sm"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center flex-shrink-0 shadow-sm">
            {diary?.analysis?.calendarType}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-sm text-foreground font-heading"></span>
              <span className="text-xs text-muted-foreground">
                {diary.createdAt}
              </span>
            </div>
            <p className="text-sm text-card-foreground leading-relaxed font-body line-clamp-3">
              {diary.note}
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="text-accent">♥</span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ScrollingColumn({
  diary,
  direction,
  onCommentClick,
}: {
  diary: any;
  direction: "up" | "down";
  onCommentClick: (comment: (typeof diary)[0]) => void;
}) {
  // Triple the comments for seamless infinite scroll
  const tripledComments = [...diary, ...diary, ...diary];

  console.log("diary", diary);

  return (
    <div className="h-[700px] overflow-hidden relative rounded-lg">
      <div
        className={`flex flex-col animate-scroll-${direction}`}
        style={{
          animation: `scroll-${direction} 60s linear infinite`,
        }}
      >
        {tripledComments.map((diary, index) => (
          <CarouselCard
            key={`${diary.id}-${index}`}
            diary={diary}
            onClick={() => onCommentClick(diary)}
          />
        ))}
      </div>
    </div>
  );
}

function CommentModal({
  diary,
  isOpen,
  onClose,
}: {
  diary: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!diary) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground text-lg font-bold flex items-center justify-center">
                {diary.avatar}
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg">
                  {diary?.analysis?.calendarHighlight}
                </h3>
                <p className="text-sm text-muted-foreground">{diary.time}</p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-base leading-relaxed font-body text-foreground mb-6">
            {diary?.analysis?.horoscope}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground border-t pt-4">
            <button className="flex items-center gap-2 hover:text-accent transition-colors">
              <span className="text-accent">♥</span> {diary.likes} likes
            </button>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              💬 {diary.replies} replies
            </button>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              🔗 Share
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function DiaryCarousel() {
  const [selectedComment, setSelectedComment] = useState<
    (typeof diary)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCommentClick = (comment: (typeof diary)[0]) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedComment(null);
  };
  type DiaryNote = {
    id: number;
    note: string;
    createdAt: string;
    updatedAt: string;
    analysis?: {
      id: number;
      result: string;
    };
  };
  const [diary, setDiary] = useState<DiaryNote[]>([]);

  useEffect(() => {
    const diaryAnalyze = async () => {
      try {
        const response = await axios.get<DiaryNote[]>(
          `http://localhost:4001/ai/getAllDiaryNotes/1`
        );
        setDiary(response.data);
        console.log("note", response.data);
      } catch (error) {
        console.error("Failed to fetch diary notes:", error);
      }
    };
    diaryAnalyze();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto p-6">
        <style jsx>{`
          @keyframes scroll-up {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-33.333%);
            }
          }

          @keyframes scroll-down {
            0% {
              transform: translateY(-33.333%);
            }
            100% {
              transform: translateY(0);
            }
          }

          .animate-scroll-up {
            animation: scroll-up 30s linear infinite;
          }

          .animate-scroll-down {
            animation: scroll-down 30s linear infinite;
          }

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
          {/* Left Column - Scrolls Up */}
          <div className="column-container">
            <ScrollingColumn
              diary={diary.slice(0, 5)}
              direction="up"
              onCommentClick={handleCommentClick}
            />
          </div>

          {/* Center Column - Scrolls Down */}
          <div className="column-container">
            <ScrollingColumn
              diary={diary.slice(6, 10)}
              direction="down"
              onCommentClick={handleCommentClick}
            />
          </div>

          {/* Right Column - Scrolls Up */}
          <div className="column-container">
            <ScrollingColumn
              diary={diary.slice(11, 15)}
              direction="up"
              onCommentClick={handleCommentClick}
            />
          </div>
        </div>
        {diary.map((item)=> <CommentModal diary={item} isOpen={isModalOpen} onClose={closeModal} />)}
        {/* <CommentModal diary={diary} isOpen={isModalOpen} onClose={closeModal} /> */}
      </div>
    </div>
  );
}
