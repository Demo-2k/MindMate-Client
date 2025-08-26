"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Palette } from "lucide-react";
import Image from "next/image";

const themes = [
  { id: 1, url: "https://images.hdqwalls.com/download/beyond-the-rings-cosmic-odyssey-q9-3840x2160.jpg" },
  { id: 2, url: "https://images.unsplash.com/photo-1753826188215-6076831cab97?q=80&w=3879&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, url: "https://images.hdqwalls.com/download/high-angle-view-of-cityscape-against-cloudy-sky-new-york-rq-3840x2160.jpg" },
  { id: 4, url: "https://wallpapercave.com/wp/wp6287510.jpg" },
  { id: 5, url: "https://images.hdqwalls.com/download/wonder-woman-symbol-of-hope-nm-3840x2160.jpg" },
  { id: 6, url: "https://images.unsplash.com/photo-1743376272672-c130603a3af2?q=80&w=3929&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 7, url: "https://4kwallpapers.com/images/wallpapers/anime-girl-5120x2880-15604.jpg" },
  { id: 8, url: "https://images.hdqwalls.com/download/anime-landscape-d5-1920x1080.jpg" },
  { id: 9, url: "https://images.hdqwalls.com/download/superman-earth-greatest-guardian-52-3840x2160.jpg" },
  { id: 10, url: "https://cdn.wallpapersafari.com/45/17/fsFvBk.jpg" },
  { id: 11, url: "https://images.hdqwalls.com/download/soldier-battlefield-6-game-xo-3840x2160.jpg" },
  { id: 12, url: "https://images.hdqwalls.com/wallpapers/bthumb/final-of-time-synthwave-5k-rx.jpg" },
];

export function DialogTheme() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme) {
      setSelectedTheme(savedTheme);
      document.body.style.backgroundImage = `url(${savedTheme})`;
    }
  }, []);

  
  const handleSave = () => {
    if (selectedTheme) {
      localStorage.setItem("app-theme", selectedTheme);
      document.body.style.backgroundImage = `url(${selectedTheme})`;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:scale-110 transition-transform duration-200 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg shadow-md"
        >
          <Palette />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-black">
        <DialogHeader>
          <DialogTitle>Choose your theme</DialogTitle>
          <DialogDescription>
            Background photos
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-2 mt-4">
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
              <Image
                src={theme.url}
                alt={`Theme ${theme.id}`}
                width={250}
                height={150}
                className="object-cover w-full h-32"
              />
              {selectedTheme === theme.url && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-semibold">
                  Selected
                </div>
              )}
            </div>
          ))}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={!selectedTheme}>
            Save Theme
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
