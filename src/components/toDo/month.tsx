
import { Card } from "../ui/card";
import Calendar from "./calendar";
import MoodJournal from "./moodJournal";

export const Month = () => {
  return (
    <div className="flex gap-10">
      {/* <div className="absolute inset-0 bg-grid-paper pointer-events-none"></div> */}

      <Calendar />
      <MoodJournal />
    </div>
  );
};
