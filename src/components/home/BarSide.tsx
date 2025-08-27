import { Calendar, ChartNoAxesCombined, ListTodo } from "lucide-react";

import { DialogTheme } from "../theme/theme";

import { DialogUser } from "../userPen/user";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Month } from "../calendar/month";
import { CoverImage } from "../toDo/coverImage";

export const BarSide = ({ setCalendar, calendar, setTodo, todo }: any) => {
  return (
    <TooltipProvider>
      <div className="flex gap-4">
        <CoverImage/>
        <Month/>
        <DialogTheme />
        <DialogUser />
      </div>
    </TooltipProvider>
  );
};
