import { DialogTheme } from "../theme/theme";
import { DialogUser } from "../userPen/user";
import { Month } from "../calendar/month";
import { CoverImage } from "../toDo/coverImage";
import { TooltipProvider } from "../ui/tooltip";

export const BarSide = () => {
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
