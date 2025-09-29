"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Images } from "lucide-react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import axios from "axios";
import { UserContext } from "@/provider/userProvider";

const themes = [
  {
    id: 1,
    url: "https://images.hdqwalls.com/download/beyond-the-rings-cosmic-odyssey-q9-3840x2160.jpg",
  },
  {
    id: 2,
    url: "https://img.freepik.com/free-photo/anime-night-sky-illustration_23-2151684356.jpg?t=st=1759137014~exp=1759140614~hmac=0e2a93859e2ec636a7b3cb741ee5c814ebdcff965e47cf50cfe0cbb0a702e2c6&w=2000",
  },
  {
    id: 3,
    url: "https://img.freepik.com/free-photo/illustration-anime-city_23-2151779648.jpg?t=st=1759137140~exp=1759140740~hmac=71dbd5860a5934fcaee58b87510b9cc087ba2043d69b2f7da0622344cd00d310&w=2000",
  },
  { id: 4, url: "https://wallpapercave.com/wp/wp6287510.jpg" },
  {
    id: 5,
    url: "https://images.hdqwalls.com/download/wonder-woman-symbol-of-hope-nm-3840x2160.jpg",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1743376272672-c130603a3af2?q=80&w=3929&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 7,
    url: "https://img.freepik.com/free-photo/japan-background-digital-art_23-2151546124.jpg?t=st=1759136866~exp=1759140466~hmac=b33d002c2c30566802eeeb38a1d1fa27828a6148f548c061484cd66286cdf6ab&w=2000",
  },
  {
    id: 8,
    url: "https://images.hdqwalls.com/download/anime-landscape-d5-1920x1080.jpg",
  },
  {
    id: 9,
    url: "https://images.hdqwalls.com/download/superman-earth-greatest-guardian-52-3840x2160.jpg",
  },
  { id: 10, url: "https://cdn.wallpapersafari.com/45/17/fsFvBk.jpg" },
  {
    id: 11,
    url: "https://img.freepik.com/free-photo/fantasy-anime-style-scene_23-2151135003.jpg?t=st=1759136534~exp=1759140134~hmac=ea21a6b00715513c3567bd1787159d9e83f3eb7f9f5c92bf394d73d3ffec9a1f&w=2000",
  },
  {
    id: 12,
    url: "https://img.freepik.com/free-photo/black-cat-stack-books-dreamy-sky_23-2152005275.jpg?t=st=1759135695~exp=1759139295~hmac=68d4174e412e519bb640d8b7ca1037d833ff105f92bccbef03569cba7a1a9fa4&w=2000",
  },
  {
    id: 13,
    url: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 14,
    url: "https://images.unsplash.com/photo-1593362831502-5c3ad1c05f57?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
];

const DEFAULT_THEME =
  "https://media.daily.dev/image/upload/s--r2ffZPB4--/f_auto/v1716969841/dailydev_where_developers_suffer_together_sfvfog";

export function DialogTheme() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { userProvider, getCurrentUserByAccessToken } = useContext(UserContext);


  useEffect(() => {
    const themeToUse =
      userProvider?.themeUrl ||
      localStorage.getItem("app-theme") ||
      DEFAULT_THEME;
    setSelectedTheme(themeToUse);
    document.body.style.backgroundImage = `url(${themeToUse})`;
  }, [userProvider]);

  const handleSave = async () => {
    if (selectedTheme && userProvider?.id) {
      try {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userProvider.id}/theme`,
          { themeUrl: selectedTheme }
        );

        localStorage.setItem("app-theme", selectedTheme);
        document.body.style.backgroundImage = `url(${selectedTheme})`;
        getCurrentUserByAccessToken();
      } catch (err) {
        console.error("Theme save error:", err);
      }
    }
  };

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            
            className="h-8 w-8 md:h-[42px] md:w-[42px] hover:scale-110 transition-transform duration-200 bg-white/30 backdrop-blur-sm text-[#fec195] rounded-lg shadow-md"
            onClick={() => setOpen(true)}
          >
            <Images />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-[#fec195]">
          <p>зураг</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full h-[90vh] sm:h-auto sm:max-h-[80vh] sm:max-w-[600px] text-white bg-black p-4 overflow-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>Сонгох дэвсгэр зурагууд</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`relative cursor-pointer rounded-xl overflow-hidden border-4 transition ${
                  selectedTheme === theme.url
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedTheme(theme.url)}
              >
                <div className="relative w-full h-[40vh] sm:h-40">
                  <Image
                    src={theme.url}
                    alt={`Theme ${theme.id}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                {selectedTheme === theme.url && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold">
                    Сонгох уу?
                  </div>
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="mt-4 sticky bottom-0 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="text-black">
                Гарах
              </Button>
            </DialogClose>
            <Button onClick={handleSave} disabled={!selectedTheme}>
              Хадгалах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
