"use client";

import Link from "next/link";
import { MessageSquareHeart, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const router = useRouter();

  
  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 z-50">
      {/* Logo */}
      <Link href={"/"}>
        <div className="flex items-center gap-2 cursor-pointer">
          <MessageSquareHeart className="w-10 h-10 text-pink-500" />
          <div className="flex flex-col leading-tight">
            <span className="text-4xl font-bold bg-gradient-to-r from-current to-current bg-clip-text">
              MindMate
            </span>
            <span className="text-lg font-medium">Your daily vibe check ✨</span>
          </div>
        </div>
      </Link>

      {/* Settings dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-3 rounded-full hover:bg-gray-100">
            <Settings className="w-10 h-10 text-gray-500" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
