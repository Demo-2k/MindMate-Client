"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { RichTextEditor } from "./richRextEditor";
import { Dispatch, SetStateAction } from "react";

type User = {
  email: string;
  username?: string;
  avatar?: string;
};

type HomePageProps = {
  HandleDiary: () => void;
  setDiary: Dispatch<SetStateAction<string>>;
  diary: string;
  loading: boolean;
};

export const HomePage = ({
  HandleDiary,
  diary,
  setDiary,
  loading,
}: HomePageProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Token-аас user мэдээлэл авах
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({
          email: payload.data?.email,
          username: payload.data?.username,
          avatar: payload.data?.avatar, // Google picture ирж байвал энд харуулна
        });
      } catch (err) {
        console.error("Failed to parse token:", err);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center pt-10 z-0">
      {/* User info */}
      {user && (
        <div className="mb-6 flex flex-col items-center gap-2">
          <h2 className="text-xl font-bold">
            Welcome, {user.username || user.email}
          </h2>
          {user.avatar && (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-16 h-16 rounded-full"
            />
          )}
        </div>
      )}

      <div className="w-screen max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-3 h-3 rounded-full bg-pink-400"></span>
          <h2 className="text-lg font-semibold">How&apos;s your day going?</h2>
        </div>

        <RichTextEditor
          value={diary}
          onChange={setDiary}
          placeholder="Spill the tea... what's on your mind today? ☁️"
          maxLength={2000}
        />

        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-3 text-2xl">
            <span className="animate-bounce">😊</span>
            <span className="animate-bounce delay-[0.1s]">😭</span>
            <span className="animate-bounce delay-[0.2s]">😤</span>
            <span className="animate-bounce delay-[0.3s]">🥳</span>
          </div>
        </div>
      </div>

      <Button
        onClick={HandleDiary}
        disabled={loading}
        className="mt-6 px-10 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-pink-300 via-pink-200 to-purple-300 shadow-[0_0_25px_rgba(236,72,153,0.3),0_0_40px_rgba(168,85,247,0.3)] hover:opacity-90 transition flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}⚡ Save ✨
      </Button>
    </div>
  );
};
