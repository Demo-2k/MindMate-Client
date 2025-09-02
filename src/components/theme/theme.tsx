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
  { id: 1, url: "https://images.hdqwalls.com/download/beyond-the-rings-cosmic-odyssey-q9-3840x2160.jpg" },
  { id: 2, url: "https://images.unsplash.com/photo-1754630551378-e1ecffe9da6b?q=80&w=3866&auto=format&fit=crop&ixlib=rb-4.1.0" },
  { id: 3, url: "https://images.hdqwalls.com/download/high-angle-view-of-cityscape-against-cloudy-sky-new-york-rq-3840x2160.jpg" },
  { id: 4, url: "https://wallpapercave.com/wp/wp6287510.jpg" },
  { id: 5, url: "https://images.hdqwalls.com/download/wonder-woman-symbol-of-hope-nm-3840x2160.jpg" },
  { id: 6, url: "https://images.unsplash.com/photo-1743376272672-c130603a3af2?q=80&w=3929&auto=format&fit=crop&ixlib=rb-4.1.0" },
  { id: 7, url: "https://4kwallpapers.com/images/wallpapers/anime-girl-5120x2880-15604.jpg" },
  { id: 8, url: "https://images.hdqwalls.com/download/anime-landscape-d5-1920x1080.jpg" },
  { id: 9, url: "https://images.hdqwalls.com/download/superman-earth-greatest-guardian-52-3840x2160.jpg" },
  { id: 10, url: "https://cdn.wallpapersafari.com/45/17/fsFvBk.jpg" },
  { id: 11, url: "https://images.hdqwalls.com/download/soldier-battlefield-6-game-xo-3840x2160.jpg" },
  { id: 12, url: "https://images.hdqwalls.com/wallpapers/bthumb/final-of-time-synthwave-5k-rx.jpg" },
  { id: 13, url: "https://images.unsplash.com/photo-1752430038064-250d400e220f?q=80&w=3962&auto=format&fit=crop&ixlib=rb-4.1.0" },
  { id: 14, url: "https://images.unsplash.com/photo-1593362831502-5c3ad1c05f57?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0" }
];

const DEFAULT_THEME = "https://media.daily.dev/image/upload/s--r2ffZPB4--/f_auto/v1716969841/dailydev_where_developers_suffer_together_sfvfog";

export function DialogTheme() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { userProvider, getCurrentUserByAccessToken } = useContext(UserContext);
  console.log("user", userProvider);
  

  
  useEffect(() => {
    const themeToUse = userProvider?.themeUrl || localStorage.getItem("app-theme") || DEFAULT_THEME;
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
            variant="ghost"
            className="hover:scale-110 transition-transform duration-200 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg shadow-md"
            onClick={() => setOpen(true)}
          >
            <Images />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>зураг</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full h-[90vh] sm:h-auto sm:max-h-[80vh] sm:max-w-[600px] bg-black p-4 overflow-auto">
          <DialogHeader>
            <DialogTitle>Дэвсгэр зурагууд</DialogTitle>
            <DialogDescription>Сонгох дэвсгэр зурагууд</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`relative cursor-pointer rounded-xl overflow-hidden border-4 transition ${
                  selectedTheme === theme.url ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => setSelectedTheme(theme.url)}
              >
                <div className="relative w-full h-[40vh] sm:h-40">
                  <Image src={theme.url} alt={`Theme ${theme.id}`} fill className="object-cover" unoptimized />
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
              <Button variant="outline">Гарах</Button>
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