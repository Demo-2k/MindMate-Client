import { Card } from "../ui/card";

interface MoodJournalProps {
  note: string;
  date?: string;
}

export default function MoodJournal({ note, date }: MoodJournalProps) {
 
  return (
    <Card className="bg-black text-white border-white/10 w-full">
      <div className="bg-black flex flex-col items-center ">
        {/* Grid Paper Background */}
        <div className="w-full max-w-lg bg-black relative overflow-hidden">
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-paper pointer-events-none"></div>

          {/* Journal Header */}
          <div className="relative z-10 p-4 flex flex-col items-center gap-2">
            <img src="https://static.wixstatic.com/media/3d08de_04787dde932445f8ad168438df9f38d0~mv2.png/v1/fit/w_924,h_520/3d08de_04787dde932445f8ad168438df9f38d0~mv2.png" alt="zurag" />
          </div>

          {/* Entries */}
          <div className="relative z-10 flex flex-col gap-4 p-4">
            <h2 className="text-white font-bold">{date || "Өнөөдөр"}</h2>
            <p className="whitespace-pre-line ">{note || "Энэ өдрийн тэмдэглэл хоосон байна..."}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
