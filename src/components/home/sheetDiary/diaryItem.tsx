export const SheetDiaryItem = () => {
  const note =
    "asjkdncoajdncvopencvpoecvojeqnvconeqkrvnqepofmceornfmcoerfmoepirfkefecejcfqefqelk f;k ewkjfvewjnrfvpweijfnreinrfoeirnbfje vcejndcencoewrufhnc sdj ckefc";

  const text = note.length <= 25 ? note : `${note.slice(0, 25)}...`;
  return (
    <div>
      <div className="border border-[#D3A569]  p-2 rounded-lg flex gap-3 bg-">
        <div>
          <img
            src="https://i.pinimg.com/736x/4e/20/4e/4e204e629a08625aefa6bff62e8766ad.jpg"
            alt=""
            className="w-[70px] h-[70px] rounded-full"
          />
        </div>

        <div>
          <h1 className="pt-3 text-white">{text}</h1>
          <p className="text-sm text-[#fcd34d]">8/22/25</p>
        </div>
      </div>
      <div className="border border-[#D3A569]  p-2 rounded-lg flex gap-3">
        <div>
          <img
            src="https://i.pinimg.com/736x/4e/20/4e/4e204e629a08625aefa6bff62e8766ad.jpg"
            alt=""
            className="w-[70px] h-[70px] rounded-full"
          />
        </div>

        <div>
          <h1 className="pt-3 text-white">{text}</h1>
          <p className="text-sm text-[#fcd34d]">8/22/25</p>
        </div>
      </div>
    </div>
  );
};
