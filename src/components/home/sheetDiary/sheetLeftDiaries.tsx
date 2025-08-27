// import { Button } from "@/components/ui/button";

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { StickyNote } from "lucide-react";
// import { SheetDiaryItem } from "./diaryItem";
// import { useContext } from "react";
// import { userDiaryContext } from "@/provider/userDiaryProvider";

// export function SheetDiary({ HandleDiaryItemClick, handleNewNote }: any) {
//   const { diaries } = useContext(userDiaryContext);

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button
//           variant="outline"
//           className="hover:scale-119 transition-transform duration-200 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg shadow-md"
//         >
//           <StickyNote />
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="bg-black/20 backdrop-blur-sm border border-[#D3A569]">
//         <SheetHeader>
//           <SheetTitle className="">Таны өдрийн тэмдэглэлүүд</SheetTitle>
//         </SheetHeader>

//         <p onClick={() => handleNewNote()} className="text-white">
//           New Note
//         </p>
//         <p className="text-white font-bold px-4">Өнөөдөр</p>

//         <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-y-scroll">
//           {diaries.map((diary, i) => (
//             <div onClick={() => HandleDiaryItemClick(diary.id, diary.note)} key={i}>
//               <SheetDiaryItem key={diary.id} diary={diary} />
//             </div>
//           ))}
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }
