export const FirstStats = () => {
  return (
    <div className="flex gap-2 ">
      <div className="text-white h-fit pr-[100px] border-[#2a2a2a] border rounded-lg pb-[30px] pt-[20px] pl-[20px] bg-[#111111] shadow-md shadow-black/30">
        <p className="text-[13px] font-semibold text-[#a1a1aa]">Emotions</p>
        <h1 className="text-2xl">
          <b>47</b>%
        </h1>
      </div>

      <div className="text-white h-fit pr-[100px] border-[#2a2a2a] border rounded-lg pb-[30px] pt-[20px] pl-[20px] bg-[#111111] shadow-md shadow-black/30">
        <p className="text-[13px] font-semibold text-[#a1a1aa]">Tasks</p>
        <h1 className="text-2xl">
          <b>5</b>
        </h1>
      </div>

      <div className="text-white h-fit pr-[100px] border-[#2a2a2a] border rounded-lg pb-[30px] pt-[20px] pl-[20px] bg-[#111111] shadow-md shadow-black/30">
        <p className="text-[13px] font-semibold text-[#a1a1aa]">Streak</p>
        <h1 className="text-2xl">
          <b>6</b>
        </h1>
      </div>
    </div>
  );
};
