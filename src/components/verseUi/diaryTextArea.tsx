"use client";

import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type diaryTextAreaProps = {
  handleDiarySave: () => void;
  setText: Dispatch<SetStateAction<string>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

export const DairyText = ({
  handleDiarySave,
  setText,
  setIsOpen,
  isOpen,
}: diaryTextAreaProps) => {
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
    bg-white/10 backdrop-blur-lg
    rounded-2xl shadow-2xl p-6 cursor-grab 
    border border-white/20 flex flex-col
    md:w-[900px] md:h-[700px]"
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Өдрийн тэмдэглэл ✍️
        </h2>

        <textarea
          onChange={(e) => setText(e.target.value)}
          placeholder="Өнөөдөр юу болсон бэ..."
          className="flex-1 w-full p-4 rounded-lg 
                       bg-white/5 border border-white/20
                       text-white caret-[#c0a16b]
                       focus:outline-none focus:ring-2 focus:ring-[#c0a16b] 
                       resize-none shadow-inner"
        />

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-5 py-2 rounded-lg 
             bg-gray-200 hover:bg-gray-300 
             text-gray-700 font-medium
             transition duration-200"
          >
            Болих
          </button>

          <button
            onClick={handleDiarySave}
            className="px-5 py-2 rounded-lg text-white font-medium
             bg-gradient-to-r from-violet-500 to-sky-500
             hover:from-violet-600 hover:to-sky-600
             focus:ring-2 focus:ring-violet-300
             transition duration-200 shadow-md"
          >
            Хадгалах
          </button>
        </div>
      </motion.div>
    </div>
  );
};
