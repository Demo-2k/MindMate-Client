import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { StickyNote } from "lucide-react";
import { SheetDiaryItem } from "./diaryItem";

export function SheetDiary() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="hover:scale-119 transition-transform duration-200 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg shadow-md"
        >
          <StickyNote />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-black/20 backdrop-blur-sm border border-[#D3A569]">
        <SheetHeader>
          <SheetTitle className="">Таны өдрийн тэмдэглэлүүд</SheetTitle>
        </SheetHeader>
        <p className="text-white font-bold px-4">Өнөөдөр</p>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <SheetDiaryItem />
        </div>
        {/* <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
