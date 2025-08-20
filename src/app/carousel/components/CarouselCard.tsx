"use client";

import { Card, CardContent } from "@/components/ui/card";

export type DiaryNote = {
  id: number;
  note: string;
  createdAt: string;
  updatedAt: string;
  likes?: number;
  replies?: number;
  avatar?: string;
  time?: string;
  analysis?: {
    id: number;
    calendarType?: string;
    calendarHighlight?: string;
    horoscope?: string;
    result?: string;
  };
};


interface Props {
  diary: DiaryNote;
  onClick: () => void;
}

export default function CarouselCard({ diary, onClick }: Props) {
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
              <span className="text-xs text-muted-foreground">{diary.createdAt}</span>
            </div>
            <p className="text-sm text-card-foreground leading-relaxed font-body line-clamp-3">
              {diary.note}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
