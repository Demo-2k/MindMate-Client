import { DialyChallenge } from "./chall";
import { FirstStats } from "./firstStats";
import { StatsSideBars } from "./statsSideBar";

export const AllStats = () => {
  return (
    <div className="bg-black w-fit  flex gap-4 p-[30px] border-2 border-[#2a2a2a] rounded-lg absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <div className="w-[180px]">
        <StatsSideBars />
      </div>
      <div className="flex flex-col gap-4">
        <FirstStats />

        <DialyChallenge />
      </div>
    </div>
  );
};
