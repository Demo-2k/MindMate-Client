export const DialyChallenge = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8">
        <div>
          <div className="text-white h-fit w-[350px] border-[#2a2a2a] border rounded-xl pb-[30px] pt-[20px] pl-[20px] bg-[#111111] shadow-md shadow-black/30">
            <p className="text-sm flex gap-4">
              Your daily challenge <img src="/idea.png" className="w-5 h-5" />
            </p>
            {/* <div className="flex gap-4 items-center"> */}

            <p className="text-lg ">
              Өнөөдөр та бага зэрэг ядралттай байна. 10 минут алхах challenge
              хийж үзээрэй.
            </p>
            {/* </div> */}
          </div>
        </div>

        <div className="text-white h-fit w-[260px] border-[#2a2a2a] border rounded-xl pb-[30px] pt-[20px] pl-[20px] bg-[#111111] shadow-md shadow-black/30">
          <p className="text-sm">Your hightlight:</p>
          <img src="/CatPlaying.gif" alt="" className="" />
          <p>Залхуутай л өдөр байлаа</p>
          {/* <h1 className="text-lg">3 өдөр дараалж тэмдэглэл бичлээ 🔥</h1> */}
        </div>
      </div>

      <div className="text-white h-fit border-[#2a2a2a] border rounded-xl p-5 bg-[#111111] shadow-md shadow-black/30">
        <p className="text-sm mb-2">Micro action feedback</p>
        <p className="text-sm text-gray-400">
          Өнөөдөр <span className="text-white font-semibold">3</span> жижиг
          зорилгоо биелүүлсэн,
          <span className="text-green-400"> 2</span> нь гол зорилгод хүрсэн
          байна ✅
        </p>
        {/* progress bar mock */}
        <div className="w-full bg-[#2a2a2a] h-2 rounded-full mt-3">
          <div className="bg-[#D3A569] h-2 rounded-full w-[60%]"></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">60% complete</p>
      </div>

      <div className="text-white h-fit w-[260px] border-[#2a2a2a] border rounded-xl pb-[30px] pt-[20px] pl-[20px] bg-[#111111] shadow-md shadow-black/30">
        <p className="text-sm">Your streaks</p>
        <h1 className="text-lg">3 өдөр дараалж тэмдэглэл бичлээ 🔥</h1>
      </div>
    </div>
  );
};
