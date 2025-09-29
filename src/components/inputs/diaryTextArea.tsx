"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

type diaryTextAreaProps = {
  handleSaveButtonDiary: (mood?: string) => void;
  setText: Dispatch<SetStateAction<string | null>>;
  text: string | null;
  setShowDiaryInput: Dispatch<SetStateAction<boolean>>;
  saving: boolean;
};

export const DairyText = ({
  handleSaveButtonDiary,
  setText,
  text,
  setShowDiaryInput,
  saving,
}: diaryTextAreaProps) => {
  const isDisabled = !text || text.trim().length === 0;

  // Mood state
  const moods = [
    { emoji: "😊", category: "БАЯРТАЙ" },
    { emoji: "😌", category: "ТАЙВАН" },
    { emoji: "🥺", category: "ГУНИГТАЙ" },
    { emoji: "😡", category: "УУРТАЙ" },
    { emoji: "😨", category: "СТРЕССТЭЙ" },
  ];
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectMood = (mood: { emoji: string; category: string }) => {
    setSelectedMood(mood.emoji);
    setSelectedCategory(mood.category);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        {true && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 
                     w-[70vw] max-w-[600px] 
                     h-[80vh] max-h-[700px] 
                     -translate-x-1/2 -translate-y-1/2 
                     bg-black/70 backdrop-blur-lg
                     rounded-2xl shadow-2xl p-6 flex flex-col
                     md:w-[900px] md:h-[700px]"
          >
            <h2 className="text-2xl mb-4 text-white font-semibold ">
              Өнөөдрийн мэдрэмж ✍️
            </h2>

            {/* Mood selection */}
            <div className="flex justify-between mb-4">
              {moods.map((mood) => (
                <motion.button
                  key={mood.emoji}
                  onClick={() => handleSelectMood(mood)} // ⚡ Category-г хадгалах
                  whileHover={{ scale: 1.2 }}
                  animate={{
                    scale: selectedMood === mood.emoji ? 1.3 : 1,
                    rotate: selectedMood === mood.emoji ? [0, 7, -7, 0] : 0,
                    textShadow:
                      selectedMood === mood.emoji
                        ? "0 0 4px #FFD700, 0 0 8px #FFD700"
                        : "0 0 0px #000000",
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                    rotate: {
                      duration: 0.5,
                      ease: "easeInOut",
                      times: [0, 0.3, 0.7, 1],
                    },
                  }}
                  className="text-3xl"
                >
                  {mood.emoji}
                </motion.button>
              ))}
            </div>

            {/* Diary textarea */}
            <textarea
              value={text || ""}
              onChange={(e) => setText(e.target.value)}
              placeholder="Өнөөдөр юу болсон бэ..."
              className="flex-1 w-full p-4 rounded-lg 
                       bg-black/70 text-white caret-[#c0a16b]
                       focus:outline-none focus:ring-2 focus:ring-[#c0a16b] 
                       resize-none shadow-inner bg-grid-paper"
            />

            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setShowDiaryInput(false)}
                className="px-5 py-2 rounded-lg bg-black border border-[#fec195] text-[#fec195] 
                         font-medium transition duration-200 shadow-md transform hover:scale-110 focus:ring-2 focus:ring-yellow-300"
              >
                Болих
              </button>

              <button
                onClick={() => handleSaveButtonDiary(selectedCategory || undefined)}
                disabled={isDisabled || saving}
                className={`px-5 py-2 rounded-lg font-medium transition duration-200 shadow-md transform
                         ${
                           isDisabled || saving
                             ? "bg-black text-[#fec195] cursor-not-allowed"
                             : "bg-[#fec195] border border-[#fec195] text-black hover:scale-110 focus:ring-2 focus:ring-yellow-300"
                         }`}
              >
                {saving ? "Хадгалж байна..." : "Хадгалах"}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
