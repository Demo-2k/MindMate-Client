"use client";

import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type diaryTextAreaProps = {
  handleSaveButtonDiary: () => void;
  setText: Dispatch<SetStateAction<string | null>>;
  text: string | null;
  setShowDiaryInput: Dispatch<SetStateAction<boolean>>;
};

export const DairyText = ({
  handleSaveButtonDiary,
  setText,
  text,
  setShowDiaryInput,
}: diaryTextAreaProps) => {
  const isDisabled = !text || text.trim().length === 0;

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Diary button */}
      {/* <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-[#a3865a] hover:bg-[#c0a16b] 
                   text-white rounded-xl shadow-lg transition"
      >
        Өдрийн тэмдэглэл
      </button> */}

      <motion.div
        className="fixed top-1/2 left-1/2 
    w-[90vw] max-w-[900px] 
       h-[80vh] max-h-[700px] 
    -translate-x-1/2 -translate-y-1/2 
    bg-black/5 backdrop-blur-lg
    rounded-2xl shadow-2xl p-6 cursor-grab 
    border border-white/10 flex flex-col
    md:w-[900px] md:h-[700px]"
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Өдрийн тэмдэглэл ✍️
        </h2>

        <textarea
          value={text || ""}
          onChange={(e) => setText(e.target.value)}
          placeholder="Өнөөдөр юу болсон бэ..."
          className="flex-1 w-full p-4 rounded-lg 
                       bg-black/5 
                       text-white caret-[#c0a16b]
                       focus:outline-none focus:ring-2 focus:ring-[#c0a16b] 
                       resize-none shadow-inner inset-0 bg-grid-paper"
        />

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={() => setShowDiaryInput(false)}
            className="px-5 py-2 rounded-lg 
    bg-black border border-[#fec195] text-[#fec195] 
    font-medium transition duration-200 shadow-md transform hover:scale-110 focus:ring-2 focus:ring-yellow-300"
          >
            Болих
          </button>

          <button
            onClick={handleSaveButtonDiary}
            disabled={isDisabled}
            className={`px-5 py-2 rounded-lg font-medium transition duration-200 shadow-md transform
    ${
      isDisabled
        ? "bg-gray-400 text-white cursor-not-allowed"
        : "bg-[#fec195] border border-[#fec195] text-black hover:scale-110 focus:ring-2 focus:ring-yellow-300"
    }`}
          >
            Хадгалах
          </button>
        </div>
      </motion.div>
    </div>
  );
};
