import { BellRing, Goal, House } from "lucide-react";

export const StatsSideBars = () => {
  return (
    <div className="text-white  w-fit p-3 border border-[#D3A569]">
      <div className="flex gap-2 items-center mb-3">
        <BellRing className="w-[20px] h-[20px]" /> Өнөөдөр
      </div>
      <div className="flex gap-2 items-center mb-3">
        <House className="w-[20px] h-[20px]" />
        Ерөнхий
      </div>
      <div className="flex gap-2 items-center mb-3">
        <Goal className="w-[20px] h-[20px]" /> Хийх зүйлс
      </div>
    </div>
  );
};
