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

// const comments = [
//   {
//     id: 1,
//     author: "Sarah Chen",
//     content:
//       "This is such an amazing feature! Love how smooth the animations are. The attention to detail in the hover effects and the way the carousels pause is really thoughtful UX design.",
//     avatar: "🥰",
//     time: "08/19/2025",
//     likes: 24,
//     replies: 3,
//   },
//   {
//     id: 2,
//     author: "Mike Johnson",
//     content:
//       "The infinite scroll effect is really well done. Great work on the implementation! I've been trying to build something similar for weeks.",
//     avatar: "MJ",
//     time: "5m ago",
//     likes: 18,
//     replies: 7,
//   },
//   {
//     id: 3,
//     author: "Emma Davis",
//     content:
//       "Beautiful design and the hover pause is a nice touch. Very user-friendly! The color scheme works perfectly with the overall aesthetic.",
//     avatar: "ED",
//     time: "8m ago",
//     likes: 31,
//     replies: 2,
//   },
//   {
//     id: 4,
//     author: "Alex Rodriguez",
//     content:
//       "I've been looking for something like this. The three-column layout works perfectly for displaying multiple conversation threads simultaneously.",
//     avatar: "AR",
//     time: "12m ago",
//     likes: 15,
//     replies: 5,
//   },
//   {
//     id: 5,
//     author: "Lisa Wang",
//     content:
//       "The scrolling directions are so creative! Left and right up, center down - genius. It creates this mesmerizing flow that keeps you engaged.",
//     avatar: "LW",
//     time: "15m ago",
//     likes: 42,
//     replies: 8,
//   },
//   {
//     id: 6,
//     author: "David Kim",
//     content:
//       "This would be perfect for a social media feed. Really impressed with the execution and the smooth transitions between states.",
//     avatar: "DK",
//     time: "18m ago",
//     likes: 27,
//     replies: 4,
//   },
//   {
//     id: 7,
//     author: "Rachel Green",
//     content:
//       "The pause on hover makes it easy to read longer comments. Thoughtful UX design! The modal interaction is clean and doesn't interrupt the flow.",
//     avatar: "RG",
//     time: "22m ago",
//     likes: 19,
//     replies: 6,
//   },
//   {
//     id: 8,
//     author: "Tom Wilson",
//     content:
//       "Clean code and smooth animations. This is exactly what I needed for my project. The semantic design tokens make customization so much easier.",
//     avatar: "TW",
//     time: "25m ago",
//     likes: 33,
//     replies: 9,
//   },
// ];

const tarotCards: any = [
  {
    emotion: "БАЯРТАЙ",
    name: "The Sun",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
  },
  {
    emotion: "ХӨӨРСӨН",
    name: "The Fool",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/RWS_Tarot_00_Fool.jpg/250px-RWS_Tarot_00_Fool.jpg",
  },
  {
    emotion: "ЭНЕРГИ_ДҮҮРЭН",
    name: "Wheel of Fortune",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
  },
  {
    emotion: "ГУНИГТАЙ",
    name: "Nine of Swords",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Swords09.jpg/250px-Swords09.jpg",
  },
  {
    emotion: "СТРЕССТЭЙ",
    name: "The Tower",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/RWS_Tarot_16_Tower.jpg/1024px-RWS_Tarot_16_Tower.jpg",
  },
  {
    emotion: "УРАМ_ЗОРИГТОЙ",
    name: "The Chariot",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
  },
  {
    emotion: "ТАЙВАН",
    name: "The Hermit",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/RWS_Tarot_09_Hermit.jpg/250px-RWS_Tarot_09_Hermit.jpg",
  },
  {
    emotion: "САНАА_ЗОВСОН",
    name: "The Moon",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
  },
  {
    emotion: "УУРТАЙ",
    name: "Five of Wands",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Wands02.jpg",
  },
  {
    emotion: "ГАНЦААРДСАН",
    name: "Eight of Cups",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cups08.jpg/250px-Cups08.jpg",
  },
  {
    emotion: "СОНИРХОЛГҮЙ",
    name: "Four of Swords",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Swords04.jpg/1024px-Swords04.jpg",
  },
  {
    emotion: "ИЧСЭН",
    name: "Seven of Cups",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Cups07.jpg/1024px-Cups07.jpg",
  },
];

function CarouselCard({ diary, onClick }: { diary: any; onClick: () => void }) {
  return (
    <Card
      className="bg-[url(/img/mountains.jpg)]  mb-4 w-full min-h-[340px] flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-border/50 backdrop-blur-sm"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3 bg-blue-200">
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
  onCommentClick: (comment: (typeof comments)[0]) => void;
}) {
  // Triple the comments for seamless infinite scroll
  const tripledComments = [...diary, ...diary, ...diary];

  console.log("diary", diary);

  return (
    <div className="h-[700px] overflow-hidden relative rounded-lg bg-yellow-200">
      <div
        className={`flex flex-col items-center animate-scroll-${direction}`}
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
    (typeof comments)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCommentClick = (comment: (typeof comments)[0]) => {
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
      <div className="container mx-auto p-6 bg-green-300 flex flex-cols justify-center">
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

        <div className="grid grid-cols-2 lg:grid-cols-3 bg-blue-500 w-[60%] gap-6">
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
        {diary.map((item) => (
          <CommentModal
            diary={item}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        ))}
        {/* <CommentModal diary={diary} isOpen={isModalOpen} onClose={closeModal} /> */}
      </div>
    </div>
  );
}
