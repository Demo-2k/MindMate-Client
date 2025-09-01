"use client";
import { useState } from "react";
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

interface SelectMusicProps {
  setUrlMusic: (url: string) => void;
}

const songs = [
  {
    title: "Tokyo Reflections 🎴 ",
    artist: "LoFi Tokyo",
    url: "https://open.spotify.com/embed/album/7yxqlNe4tMuxJXS6MSjmbw?utm_source=generator",
    cover: "/tokyo.png",
  },
  {
    title: "Legend",
    artist: "Jannabi",
    url: "https://open.spotify.com/embed/album/28GiIRNu9nEugqnUci3aIC?utm_source=generator",
    cover:
      "https://i.pinimg.com/736x/3f/84/f4/3f84f4913612406a92b79524bd00e865.jpg",
  },
  {
    title: "Emotions",
    artist: "Tony Ann",
    url: "https://open.spotify.com/embed/album/4f7MbVewxBC2kMIj9nM7lU?utm_source=generator",
    cover: "https://i.pinimg.com/1200x/2f/3a/dd/2f3add78882ac9faa927abafd652eed9.jpg",
  },
  {
    title: "One Life",
    artist: "Crazy JaZz",
    url: "https://open.spotify.com/embed/album/6Ek8XECwopxbCoNp9eOEo7?utm_source=generator",
    cover: "/jazz.png",
  },
  {
    title: "Chill PlayList",
    url: "https://open.spotify.com/embed/playlist/3EY0v9dXaP1wkUYRKQ5B4E?utm_source=generator",
    cover: "https://i.pinimg.com/736x/c0/47/79/c0477913310db066811bd78ad72b47e5.jpg",
  },
  {
    title: "Trending Moods",
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX16doZpno3Aw?utm_source=generator",
    cover: "https://i.pinimg.com/736x/0e/a5/c2/0ea5c2cb4ae34db192ead4fe97142bca.jpg",
  },
  {
    title: "Oriental Lofi",
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1DWTdBIyTaKDBw?utm_source=generator",
    cover: "https://i.pinimg.com/736x/e6/bb/3e/e6bb3ed4cd40c710b9f9b6953665e807.jpg",
  },
  {
    title: "After Hours",
    artist: "The Weeknd",
    url: "https://open.spotify.com/embed/album/4yP0hdKOZPNshxUOjY0cZj?utm_source=generator",
    cover: "https://i.pinimg.com/736x/f6/66/12/f66612351e98a1e260221cdcba336ab1.jpg",
  },
  {
    title: "Chill Mix",
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1EVHGWrwldPRtj?utm_source=generator",
    cover: "https://i.pinimg.com/736x/c1/9a/96/c19a9667056d1c63cdb28697abb8de56.jpg",
  },
];

export default function SelectMusic({ setUrlMusic }: SelectMusicProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="hover:scale-110 transition-transform duration-200 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg shadow-md"
            onClick={() => setOpen(true)}
          >
            <Music />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Дуу</p>
        </TooltipContent>
      </Tooltip>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-2xl w-full h-[70vh] bg-black flex flex-col ">
          <DialogTitle className="text-white">Дуу сонгох</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="grid grid-cols-3 gap-5 ">
            {songs.map((song) => (
              <div
                key={song.title}
                onClick={() => {
                  setSelected(song.url);
                  setOpen(false); // dialog хаах
                  setUrlMusic(song.url);
                }}
                className="cursor-pointer group  rounded-lg  hover:scale-105 transition-transform"
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
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
