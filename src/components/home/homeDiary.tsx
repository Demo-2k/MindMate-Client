"use client";

import { useState } from "react";
import { MusicPlayer } from "../musicplayer/player";
import { AllStats } from "../stats/allStats";
import { BarSide } from "./BarSide";

export default function HomeDiary() {
  const [stats, setStats] = useState(false);
  return (
    // <div className=" w-fit h-[700px]  ">
    //   <AllStats />
    // </div>
    <div className="w-full h-screen my-bg flex flex-col items-center justify-center ">
      {stats && <AllStats />}

      <div className="flex  pt-[200px]  justify-center  gap-10">
        <div>
          {" "}
          <MusicPlayer />
        </div>

        <div>
          <textarea
            placeholder="Өдрийн тэмдэглэлээ бичээрэй..."
            className="w-[800px] px-4 py-3 text-2xl rounded-2xl bg-transparent border-1  text-white shadow-lg outline-none  "
            rows={15}
          />
        </div>
      </div>

      <div className="backdrop-blur-md mt-15 py-3 px-7 border-none rounded-lg">
        <BarSide setStats={setStats} stats={stats} />
      </div>
    </div>
  );
}
