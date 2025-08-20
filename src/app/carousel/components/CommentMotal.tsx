"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DiaryNote } from "./CarouselCard";


interface Props {
  diary: DiaryNote | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CommentModal({ diary, isOpen, onClose }: Props) {
  if (!diary) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground text-lg font-bold flex items-center justify-center">
              {diary.avatar}
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg">{diary?.analysis?.calendarHighlight}</h3>
              <p className="text-sm text-muted-foreground">{diary.time}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <p className="mt-4 text-base leading-relaxed font-body text-foreground mb-6">
          {diary?.analysis?.horoscope}
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground border-t pt-4">
          <button className="flex items-center gap-2 hover:text-accent transition-colors">
            <span className="text-accent">♥</span> {diary.likes || 0} likes
          </button>
          <button className="flex items-center gap-2 hover:text-primary transition-colors">
            💬 {diary.replies || 0} replies
          </button>
          <button className="flex items-center gap-2 hover:text-primary transition-colors">
            🔗 Share
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
