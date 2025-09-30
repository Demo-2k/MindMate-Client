// showNotification.tsx
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface AchievementNotificationProps {
  achievementMessage: string;
  pointsMessage: string;
  onClose: () => void;
}

export const AchievementNotification = ({
  achievementMessage,
  pointsMessage,
  onClose,
}: AchievementNotificationProps) => {
  // Auto-close after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
   <motion.div
  initial={{ opacity: 0, y: -50, scale: 0.8 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 50, scale: 0.9 }}
  transition={{ duration: 0.4 }}
  className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
>
  <div className="bg-gray-900/80 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-md text-white max-w-sm text-center border border-gray-700/50">
    <h3 className="text-2xl font-semibold text-pink-400 mb-2">Амжилт! 🌟</h3>

    {/* Achievement Message */}
    <p className="text-base mb-3 leading-relaxed text-gray-200">
      {achievementMessage}
    </p>

    {/* Points Message */}
    <p className="text-3xl font-bold text-purple-300">{pointsMessage}</p>

    {/* Optional Close Button */}
    {/* <button onClick={onClose} className="mt-4 text-sm underline opacity-70">
      Хаах
    </button> */}
  </div>
</motion.div>

  );
};

