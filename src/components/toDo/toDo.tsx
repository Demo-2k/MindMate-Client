import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoverImage } from "./coverImage";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Trash2 } from "lucide-react";

interface Todo {
  text: string;
  done: boolean;
}

export function DialogToDo() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSave = () => {
    if (value.trim() === "") return;
    setTodos([...todos, { text: value, done: false }]);
    setValue("");
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleTodo = (index: number, checked: boolean) => {
    const newTodos = [...todos];
    newTodos[index].done = checked;
    setTodos(newTodos);
  };

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
              <img
                src="https://media.giphy.com/media/rwiOduiq2oatO/giphy.gif"
                alt="gif"
                className="h-23 w-23"
              />
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
                <div className="flex flex-col gap-1 items-center">
                  <p className="text-2xl">🥰</p>
                  <p className="border-2 border-fuchsia-600 rounded-4xl w-4"></p>
                  <p className="text-xs">0%</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <p className="text-2xl">😊</p>
                  <p className="border-2 border-amber-500 rounded-4xl w-4"></p>
                  <p className="text-xs">0%</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <p className="text-2xl">😌</p>
                  <p className="border-2 border-green-500 rounded-4xl w-4"></p>
                  <p className="text-xs">0%</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <p className="text-2xl">😡</p>
                  <p className="border-2 border-red-500 rounded-4xl w-4"></p>
                  <p className="text-xs">0%</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <p className="text-2xl">🥺</p>
                  <p className="border-2 border-blue-500 rounded-4xl w-4"></p>
                  <p className="text-xs">0%</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <p className="text-2xl">😨</p>
                  <p className="border-2 border-purple-600 rounded-4xl w-4"></p>
                  <p className="text-xs">0%</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Journal Section */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="text-white p-3 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h1>Todo 🍒</h1>
              {value && (
                <Button onClick={handleSave} className="border border-blue-950">
                  + save
                </Button>
              )}
            </div>
            <Input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="What is your main todo for today?"
              maxLength={120}
              className="transition-shadow duration-200 focus:outline-none focus:ring-0 focus:shadow-[0_12px_20px_-14px_rgba(59,130,246,0.7)] "
            />
            <p className="text-xs">0/120</p>
          </div>

          <Card className="bg-neutral-900 text-white p-3">
            <img
              src="https://static.wixstatic.com/media/3d08de_04787dde932445f8ad168438df9f38d0~mv2.png/v1/fit/w_924,h_520/3d08de_04787dde932445f8ad168438df9f38d0~mv2.png"
              alt="ymar negen text"
            />

            <div className="mt-6 space-y-2">
              {todos.map((todo, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center gap-2 p-2 rounded hover:border hover:border-gray-400 group transition-colors duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={todo.done}
                      onCheckedChange={(checked) =>
                        toggleTodo(idx, checked === true)
                      }
                    />
                    <span
                      className={todo.done ? "line-through text-gray-400" : ""}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => removeTodo(idx)}
                    className=" hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Trash2/>
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1 flex flex-col gap-4">
          <Card className="bg-cover bg-center text-white bg-[url('https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3b3B1aHlxM2JmMmc1bmxpNHZjNXZ4c3o4cnk2eGVvc2g5ZjN5MGw3ZyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/muzaYMXAENjiw/giphy.gif')]">
          <p className="text-md font-extrabold"> Today's Prompt ✏️ </p>
          <p> What are your top three priorities for today? </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
