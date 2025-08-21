"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DiaryNote } from "@/types/diary";


interface Props {
  diary: DiaryNote | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CommentModal({ diary, isOpen, onClose }: Props) {
  if (!diary) return null;

  const createdDate = new Date(diary.createdAt).toLocaleString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground text-lg font-bold flex items-center justify-center">
              {diary.analysis?.calendarType?.[0] ?? "📝"}
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg">
                {diary.analysis?.calendarHighlight}
              </h3>
              <p className="text-sm text-muted-foreground">{createdDate}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Note text */}
        <div className="mt-4">
          <p className="text-base font-body text-foreground mb-4">
            ✍️ {diary.note}
          </p>

          {/* Analysis хэсэг */}
          <div className="space-y-4">
            {diary.analysis?.summary && (
              <div>
                <h4 className="font-semibold text-foreground">📝 Summary</h4>
                <p className="text-sm text-muted-foreground">{diary?.analysis.summary}</p>
              </div>
            )}

            {diary.analysis?.message && (
              <div>
                <h4 className="font-semibold text-foreground">💡 Message</h4>
                <p className="text-sm text-muted-foreground">{diary.analysis.message}</p>
              </div>
            )}

            {diary.analysis?.horoscope && (
              <div>
                <h4 className="font-semibold text-foreground">🔮 Horoscope</h4>
                <p className="text-sm text-muted-foreground">{diary.analysis.horoscope}</p>
              </div>
            )}

            {diary.analysis?.emotions?.length ? (
              <div>
                <h4 className="font-semibold text-foreground">😊 Emotions</h4>
                <div className="flex flex-wrap gap-2">
                  {diary.analysis.emotions.map((emo, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-full bg-muted text-sm text-foreground"
                    >
                      {emo}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground border-t pt-4 mt-6">
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
