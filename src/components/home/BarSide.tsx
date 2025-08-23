import { ChartNoAxesCombined, ListTodo } from "lucide-react";

import { DialogTheme } from "../theme/theme";
import { DialogToDo } from "../toDo/toDo";
import { SheetDiary } from "./sheetDiary/sheetLeftDiaries";
import { DialogUser } from "../userPen/user";
import { Button } from "../ui/button";
import { useState } from "react";

export const BarSide = ({ setStats, stats, setTodo, todo }: any) => {
  return (
    <div className="flex gap-4">
      <SheetDiary />

      <Button
        onClick={() => setTodo(!todo)}
        variant="outline"
        className="hover:scale-119 transition-transform duration-200 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg shadow-md"
      >
        <ListTodo />
      </Button>

      <Button
        onClick={() => setStats(!stats)}
        variant="outline"
        className="hover:scale-119 transition-transform duration-200 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg shadow-md"
      >
        <ChartNoAxesCombined />
      </Button>

      <DialogTheme />

      <DialogUser />
    </div>
  );
};
