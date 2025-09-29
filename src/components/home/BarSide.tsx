import { DialogTheme } from "../theme/theme";
import { Month } from "../calendar/month";
import { CoverImage } from "../analyze/coverImage";
import { TooltipProvider } from "../ui/tooltip";
import { DialogBreath } from "../userPen/breathingExercise";
import SelectMusic from "../userPen/selectMusic";

interface BarSideProps {
  setUrlMusic: (url: string) => void;
}
export const BarSide = ({ setUrlMusic }: BarSideProps) => {
  return (
    <TooltipProvider>
      <div className="flex gap-4">
        <CoverImage />
        <Month />
        <DialogBreath />
        <SelectMusic setUrlMusic={setUrlMusic} />
        <DialogTheme />
      </div>
    </TooltipProvider>
  );
};
