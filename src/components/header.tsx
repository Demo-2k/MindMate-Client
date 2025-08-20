"use client";

import { MessageSquareHeart, Settings } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./themeSwitcher";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 z-50">
     <Link href={"/"}>
      <div className="flex items-center gap-2">
        <MessageSquareHeart className="w-10 h-10 text-pink-500" />
        <div className="flex flex-col leading-tight">
          <span className="text-4xl font-bold bg-gradient-to-r from-current to-current bg-clip-text">MindMate</span>
          <span className="text-lg font-medium">Your daily vibe check ✨</span>
        </div>
      </div>
      </Link>

       <ModeToggle/>
      {/* <Button className="p-10 rounded-full hover:bg-gray-100" >
        <Settings className="w-10 h-10 color-gray" />
      </Button> */}
    </header>
  );
}
