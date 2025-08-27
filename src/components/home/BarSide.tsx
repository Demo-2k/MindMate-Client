import { Calendar, ChartNoAxesCombined, ListTodo } from "lucide-react";

import { DialogTheme } from "../theme/theme";

import { SheetDiary } from "./sheetDiary/sheetLeftDiaries";
import { DialogUser } from "../userPen/user";
import { Button } from "../ui/button";

export const BarSide = ({
  setCalendar,
  calendar,
  setTodo,
  todo,
  HandleDiaryItemClick,
  handleNewNote,
}: any) => {
  return (
    <div className="flex gap-4">
      <SheetDiary
        HandleDiaryItemClick={HandleDiaryItemClick}
        handleNewNote={handleNewNote}
      />

      <Button
        onClick={() => setTodo(!todo)}
        variant="outline"
        className="hover:scale-119 transition-transform duration-200 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg shadow-md"
      >
        <ListTodo />
      </Button>
      <Button
        onClick={() => setCalendar(!calendar)}
        variant="outline"
        className="hover:scale-119 transition-transform duration-200 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg shadow-md"
      >
        <Calendar />
      </Button>

      <DialogTheme />

      <DialogUser />
    </div>
  );
};
