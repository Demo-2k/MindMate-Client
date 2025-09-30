"use client";
import { useContext, useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Music } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { UserContext } from "@/provider/userProvider";

interface SelectMusicProps {
  setUrlMusic: (url: string) => void;
}

type SongType = {
  title: string;
  artist?: string;
  url: string;
  cover: string;
  locked: boolean;
  price: number;
};


const songs = [
  {
    title: "Tokyo Reflections 🎴 ",
    artist: "LoFi Tokyo",
    url: "https://open.spotify.com/embed/album/7yxqlNe4tMuxJXS6MSjmbw?utm_source=generator",
    cover: "/tokyo.png",
    locked: false,
    price: 0,
  },
  {
    title: "Legend",
    artist: "Jannabi",
    url: "https://open.spotify.com/embed/album/28GiIRNu9nEugqnUci3aIC?utm_source=generator",
    cover:
      "https://i.pinimg.com/736x/3f/84/f4/3f84f4913612406a92b79524bd00e865.jpg",
    locked: true,
    price: 5,
  },
  {
    title: "Emotions",
    artist: "Tony Ann",
    url: "https://open.spotify.com/embed/album/4f7MbVewxBC2kMIj9nM7lU?utm_source=generator",
    cover:
      "https://i.pinimg.com/1200x/2f/3a/dd/2f3add78882ac9faa927abafd652eed9.jpg",
    locked: true,
    price: 20,
  },
  {
    title: "One Life",
    artist: "Crazy JaZz",
    url: "https://open.spotify.com/embed/album/6Ek8XECwopxbCoNp9eOEo7?utm_source=generator",
    cover: "/jazz.png",
    locked: true,
    price: 30,
  },
  {
    title: "Chill PlayList",
    url: "https://open.spotify.com/embed/playlist/3EY0v9dXaP1wkUYRKQ5B4E?utm_source=generator",
    cover:
      "https://i.pinimg.com/736x/c0/47/79/c0477913310db066811bd78ad72b47e5.jpg",
    locked: true,
    price: 45,
  },
  {
    title: "Trending Moods",
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX16doZpno3Aw?utm_source=generator",
    cover:
      "https://i.pinimg.com/736x/0e/a5/c2/0ea5c2cb4ae34db192ead4fe97142bca.jpg",
    locked: true,
    price: 60,
  },
  {
    title: "Oriental Lofi",
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1DWTdBIyTaKDBw?utm_source=generator",
    cover:
      "https://i.pinimg.com/736x/e6/bb/3e/e6bb3ed4cd40c710b9f9b6953665e807.jpg",
    locked: true,
    price: 80,
  },
  {
    title: "After Hours",
    artist: "The Weeknd",
    url: "https://open.spotify.com/embed/album/4yP0hdKOZPNshxUOjY0cZj?utm_source=generator",
    cover:
      "https://i.pinimg.com/736x/f6/66/12/f66612351e98a1e260221cdcba336ab1.jpg",
    locked: true,
    price: 100,
  },
  {
    title: "Chill Mix",
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1EVHGWrwldPRtj?utm_source=generator",
    cover:
      "https://i.pinimg.com/736x/c1/9a/96/c19a9667056d1c63cdb28697abb8de56.jpg",
    locked: true,
    price: 130,
  },
];


export default function SelectMusic({ setUrlMusic }: SelectMusicProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [songList, setSongList] = useState(songs);

  const { userProvider, setUserProvider } = useContext(UserContext);

  useEffect(() => {
    const unlocked = JSON.parse(localStorage.getItem("unlockedSongs") || "[]");

    if (!unlocked.includes(songs[0].title)) {
      unlocked.push(songs[0].title);
      localStorage.setItem("unlockedSongs", JSON.stringify(unlocked));
    }

    setSongList(
      songs.map((song) => ({
        ...song,
        locked: !unlocked.includes(song.title),
      }))
    );
  }, []);

  const UnlockSongs = async (song: SongType) => {
    if (!userProvider?.totalPoints) return;
    if (!confirm(`${song?.price}-р unlock хийх үү?`)) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/progress/UnlockSongs/${userProvider?.id}`,
        { songPrice: song?.price }
      );

      setSongList((prev) =>
        prev.map((s) => (s.title === song.title ? { ...s, locked: false } : s))
      );

      const unlocked = JSON.parse(
        localStorage.getItem("unlockedSongs") || "[]"
      );
      localStorage.setItem(
        "unlockedSongs",
        JSON.stringify([...unlocked, song.title])
      );

      setUserProvider({
        ...userProvider,
        totalPoints: response?.data?.totalPoints,
      });

      toast.message(`"${song.title}" unlock боллоо!`);
    } catch (error) {
      toast.message("Алдаа гарлаа");
    }
  };

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="h-8 w-8 md:h-[42px] md:w-[42px] hover:scale-110 transition-transform duration-200 bg-white/30 backdrop-blur-sm rounded-lg shadow-md text-[#fec195]"
            onClick={() => setOpen(true)}
          >
            <Music />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-[#fec195]">
          <p>Дуу</p>
        </TooltipContent>
      </Tooltip>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-2xl w-full h-[80vh] text-white bg-black flex flex-col ">
          <DialogTitle className="text-white">Дуу сонгох</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 overflow-y-auto">
            {songList.map((song) => (
              <div
                key={song.title}
                onClick={() => {
                  if (song?.locked) {
                    if ((userProvider?.totalPoints ?? 0) >= song?.price) {
                      UnlockSongs(song);
                    } else {
                      toast.message(
                        `Оноо хүрэхгүй байна! (${song.price} points хэрэгтэй)`
                      );
                    }
                  } else {
                    setSelected(song.url);
                    setOpen(false);
                    setUrlMusic(song.url);
                  }
                }}
                className="cursor-pointer group  rounded-lg  hover:scale-105 transition-transform group relative"
              >
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-full h-42 object-cover rounded-lg"
                />
                <div className="pt-2">
                  <p className=" text-white text-center font-semibold">
                    {song.title}
                  </p>
                  <p className=" text-gray-400 text-center text-sm font-normal">
                    {song.artist}
                  </p>
                </div>

                {song.locked && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center rounded-lg shadow-inner border border-black/50">
                    <span className="text-white font-extrabold text-2xl mb-2 animate-pulse drop-shadow-lg">
                      🔒
                    </span>
                    <span className="text-white font-semibold text-sm">
                      {song.price} оноо
                    </span>
                    <span className="text-gray-300 text-xs mt-1">
                      Тоглохын тулд нээх
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
