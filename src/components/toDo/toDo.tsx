import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoverImage } from "./coverImage";

export function DialogToDo() {
  const [goal, setGoal] = useState("todo page hesgiig hiij duusgah");
  return (
    <div className="bg-black flex flex-col gap-4 p-[30px] border-2 border-[#2a2a2a] rounded-lg absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <CoverImage />
      <div className="bg-black text-white grid grid-cols-4 gap-4 ">
{/* Sidebar */}
        <div className="col-span-1 flex flex-col gap-4">
          <Card className="bg-neutral-900 text-white p-3">
            <div className="flex gap-5">
              <div className="flex flex-col gap-2">
                <div>
                  <h2 className="text-sm text-gray-400">Good Afternoon,</h2>
                  <h1 className="text-md font-bold">Zolomoloko</h1>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Day started:</h3>
                  <h4 className="text-sm">1:55 PM</h4>
                </div> 
              </div>
               <img src="https://media.giphy.com/media/rwiOduiq2oatO/giphy.gif" alt="gif" className="h-23 w-23"/>
            </div>
          </Card>
{/* mood cart */}
          <Card className="bg-neutral-900 text-white p-3">
            <div className="flex flex-col ">
              <div className="flex flex-col items-center">
                <h1 className="text-md font-extrabold">Mood</h1>
                <h2 className="text-sm text-gray-400">BAR</h2>
              </div>
              <div className="flex justify-between">
                <p className="text-2xl">🥰</p>
                <p className="text-2xl">😊</p>
                <p className="text-2xl">😌</p>
                <p className="text-2xl">😡</p>
                <p className="text-2xl">🥺</p>
                <p className="text-2xl">😨</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Journal Section */}
        <div className="col-span-2 flex flex-col gap-4">
          <Card className="bg-neutral-900 text-white">
            <CardHeader>
              <CardTitle>My Goal 🍒</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{goal}</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 text-white flex-1">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                mood journal ✨
              </CardTitle>
            </CardHeader>
            <CardContent>
              <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20">
                + Add Entry
              </button>

              <div className="mt-6 space-y-4">
                <p>
                  <span className="text-sm text-gray-400">1:55 PM ➤</span> 🥰
                </p>
                <p>
                  <span className="text-sm text-gray-400">1:56 PM ➤</span> 🍒
                  Set today’s goal → {goal}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1 flex flex-col gap-4">
          <Card className="bg-neutral-900 text-white">
            <CardHeader>
              <CardTitle>Today’s Prompt ✏️</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                How can you bring more creativity into your day?
              </p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 text-white flex-1">
            <CardHeader>
              <CardTitle>Focus Score 🎯</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-full">
              <div className="w-32 h-32 border-4 border-gray-500 rounded-full flex items-center justify-center">
                <p>0%</p>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Focus Time: 0 Min / 14h 17m
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
