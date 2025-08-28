import { DialogTheme } from "../theme/theme";
import { Month } from "../calendar/month";
import { CoverImage } from "../toDo/coverImage";
import { TooltipProvider } from "../ui/tooltip";
import { DialogBreath } from "../userPen/breathingExercise";

export const BarSide = () => {
  return (
    <TooltipProvider>
      <div className="flex gap-4">
        <CoverImage/>
        <Month/>
        <DialogTheme />
        <DialogBreath />
      </div>
    </TooltipProvider>
  );
};
