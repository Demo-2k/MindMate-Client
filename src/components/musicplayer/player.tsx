import { SkipBack, SkipForward } from "lucide-react";

export const MusicPlayer = () => {
  return (
    <div className="flex items-center gap-3 bg-gray-900/70 p-3 rounded-xl shadow-lg w-[300px] h-[100px]">
      {/* Зураг */}
      <img
        src="/tarotLogo/fortune-teller.PNG"
        alt="album cover"
        className="w-[70px] h-[70px] rounded-lg object-cover"
      />

      {/* Текст ба контрол */}
      <div className="flex flex-col justify-between flex-1 text-white">
        {/* Playlist + Song name */}
        <div className="flex justify-between items-center text-xs text-gray-300">
          <p>Playlist name</p>
          {/* <p>Song name</p> */}
        </div>

        {/* Гол дууны нэр */}
        <p className="text-sm font-semibold truncate">MUSIC name</p>

        {/* Player controls */}
        <div className="flex items-center gap-3 mt-2">
          <SkipBack className="w-4 h-4 cursor-pointer hover:text-blue-400" />
          <SkipForward className="w-4 h-4 cursor-pointer hover:text-blue-400" />
        </div>
      </div>
    </div>
  );
};
