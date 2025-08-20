"use client";

import { tarotCards } from "@/app/(main)/components/analyzePage";
import { Card, CardContent } from "@/components/ui/card";
import { DiaryNote } from "@/types/diary";

interface Props {
  diary: DiaryNote;
  onClick: () => void;
}

export default function CarouselCard({ diary, onClick }: Props) {
  const tarotCard = tarotCards;
  console.log("tarotCard", tarotCard);

  const tarotBg = tarotCard.filter(
    (tarot, i) => tarot.emotion === diary.analysis?.emotions[0]
  );
  console.log("tarotBg", tarotBg);

  return (
    <Card
      style={{ backgroundImage: `url(${tarotBg[0]?.imageUrl}) ` }}
      className="bg-center bg-cover bg-no-repeat mb-4  w-full h-[340px] min-h-[240px] flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-border/50 backdrop-blur-sm"
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-end  h-full justify-center">
        {/* <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center flex-shrink-0 shadow-sm">
          {diary?.analysis?.calendarType}
        </div> */}

        <span
          className="block text-center text-xl font-semibold tracking-wider 
  text-[#2E1F0F] bg-[#FAE6A5] rounded-md py-1 shadow-sm 
  border border-yellow-600 ring-1 ring-yellow-400/70 shadow-md"
        >
          ✦{" "}
          {new Date(diary.createdAt).toLocaleDateString("mn-MN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          {/* {diary.createdAt} */}✦
        </span>

        {/* <p className="text-lg  leading-relaxed font-body line-clamp-3 text-[#1A1904] bg-[#FAE6A5]">
              {diary.note} 
            </p> */}
      </CardContent>
    </Card>
  );
}
