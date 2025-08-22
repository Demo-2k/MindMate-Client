"use client";

import { Home, Calendar, BarChart3, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Sitebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, [pathname]); 

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    router.push("/sign-in");
  };

  if (pathname === "/sign-in" || pathname === "/sign-up" || !isAuth) {
    return null;
  }

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/chart", label: "Chart", icon: Calendar },
    { href: "/carousel", label: "Stats", icon: BarChart3 },
  ];

  return (
    <>
      <div
        className="hidden md:flex fixed top-0 left-0 h-screen w-16 
                    bg-gradient-to-b from-yellow-50 to-blue-50 
                    flex-col items-center py-4 shadow-md"
      >
        <div className="mb-6">
          <Sun className="h-6 w-6 text-orange-600" />
        </div>
        <div className="flex flex-col gap-6 flex-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <button
                className={`p-2 rounded-xl transition ${
                  pathname === href
                    ? "bg-yellow-200 text-blue-600"
                    : "hover:bg-yellow-100 text-gray-600"
                }`}
              >
                <Icon className="h-6 w-6" />
              </button>
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-xl transition hover:bg-yellow-100 text-gray-600">
                <Settings className="h-6 w-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t flex justify-around py-2 z-50">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <button
              className={`flex flex-col items-center text-xs ${
                pathname === href ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <Icon className="h-6 w-6" />
              {label}
            </button>
          </Link>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex flex-col items-center text-xs text-gray-600">
              <Settings className="h-6 w-6" />
              <span className="text-[10px]">Settings</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
