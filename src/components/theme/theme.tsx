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
  { id: 1, url: "https://sdmntprnortheu.oaiusercontent.com/files/00000000-c2f8-61f4-a614-5f7d11eca93a/raw?se=2025-08-25T09%3A51%3A57Z&sp=r&sv=2024-08-04&sr=b&scid=a4244c9c-4ea7-593a-9f25-cf1ef6b93af2&skoid=03727f49-62d3-42ac-8350-1c0e6559d238&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-24T22%3A04%3A49Z&ske=2025-08-25T22%3A04%3A49Z&sks=b&skv=2024-08-04&sig=L1p9ythmasJpPgQ7VeV0UuQBgNyEI18UiVEjfphM%2BxQ%3D" },
  { id: 2, url: "https://cdn.magicdecor.in/com/2024/07/09150655/Famous-Landmarks-Travel-Theme-Wallpaper-M.jpg" },
  { id: 3, url: "https://t4.ftcdn.net/jpg/11/33/96/81/360_F_1133968132_sJ9c4UCGnKav7H4Kc842CDCMldNhgbsW.jpg" },
  { id: 4, url: "https://wallpapercave.com/wp/wp6287510.jpg" },
  { id: 5, url: "https://motionbgs.com/media/2621/night-study-on-the-balcony.jpg" },
  { id: 6, url: "https://cdn3.vectorstock.com/i/1000x1000/80/07/love-theme-on-background-vector-35038007.jpg" },
  { id: 7, url: "https://img.freepik.com/free-vector/dynamic-wallpaper-theme_52683-44743.jpg" },
  { id: 8, url: "https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-91d8-622f-abfd-57077ef63535/raw?se=2025-08-25T10%3A02%3A44Z&sp=r&sv=2024-08-04&sr=b&scid=62fb508e-982d-56b5-b326-9c1576653e7a&skoid=03727f49-62d3-42ac-8350-1c0e6559d238&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-25T01%3A46%3A48Z&ske=2025-08-26T01%3A46%3A48Z&sks=b&skv=2024-08-04&sig=xKUKQJutjrjYmMMfOVsK2grRfyr6Ykxou00qFgEEP4A%3D" },
  { id: 9, url: "https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-15cc-61f7-8c31-20d52684dd6e/raw?se=2025-08-25T09%3A59%3A37Z&sp=r&sv=2024-08-04&sr=b&scid=f6d81788-ed52-549b-a77e-7f5b42949e6f&skoid=03727f49-62d3-42ac-8350-1c0e6559d238&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-25T08%3A58%3A14Z&ske=2025-08-26T08%3A58%3A14Z&sks=b&skv=2024-08-04&sig=r0OAqd72t9IjGt9ewhGi/9aTsyMXUCIFtHY9ygf5WDM%3D" },
  { id: 10, url: "https://cosmosmagazine.com/wp-content/uploads/2020/02/230318_Astro_Katie_Katie_Mack_01.jpg" },
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
