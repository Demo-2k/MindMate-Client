"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "@/provider/userProvider";
import Loader from "./loading";


export default function ProfileDropdown() {
  const { userProvider } = useContext(UserContext);
  
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handeLogOut = () => {
    setLoading(true);
    localStorage.removeItem("token");

    setTimeout(() => {
      router.push("/sign-up");
    }, 1000);
  };
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="absolute top-4 left-4 flex items-center gap-3 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://i.pravatar.cc/100" alt="User" />
            <AvatarFallback>RB</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-40 mt-2 bg-black p-2 rounded-lg border border-yellow-400">
          <DropdownMenuItem
            onClick={() => router.push("/")}
            className="group flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-transparent"
          >
            <User className="h-4 w-4 text-white group-hover:text-black" />
            <span className="text-white text-sm group-hover:text-black">
              My Profile
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handeLogOut}
            className="group flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-transparent"
          >
            <LogOut className="h-4 w-4 text-white group-hover:text-black" />
            <span className="text-white text-sm group-hover:text-black">
              Log out
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="text-white">
        <p className="font-semibold text-white">{userProvider?.username}</p>
      </div>
    </div>
  );
}
