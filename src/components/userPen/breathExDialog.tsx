import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Phase = "inhale" | "hold" | "exhale";

const cycles = [
  { phase: "inhale" as Phase, duration: 4, label: "Амьсгалаа авaх" },
  { phase: "hold" as Phase, duration: 4, label: "Барих" },
  { phase: "exhale" as Phase, duration: 4, label: "Амьсгалаа гаргах" },
];

export const BreathDialog = ({
  setOpen,
  open,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {

  const totalRounds = 4;
  const [isActive, setIsActive] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(cycles[0].duration);

  const currentPhase = cycles[phaseIndex].phase;
  const currentLabel = cycles[phaseIndex].label;
  const currentDuration = cycles[phaseIndex].duration;

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      if (phaseIndex < cycles.length - 1) {
        setPhaseIndex((p) => p + 1);
        setTimeLeft(cycles[phaseIndex + 1].duration);
      } else {
        if (roundIndex < totalRounds - 1) {
          setRoundIndex((r) => r + 1);
          setPhaseIndex(0);
          setTimeLeft(cycles[0].duration);
        } else {
          setIsActive(false);
        }
      }
      return;
    }

    const t = setInterval(() => {
      setTimeLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(t);
  }, [isActive, timeLeft, phaseIndex, roundIndex]);

  const toggleStart = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      if (!isActive && roundIndex >= totalRounds) {
        reset();
      }
      setIsActive(true);
    }
  };

  const reset = () => {
    setIsActive(false);
    setRoundIndex(0);
    setPhaseIndex(0);
    setTimeLeft(cycles[0].duration);
  };

  const scaleMap: Record<Phase, number> = {
    inhale: 1.45,
    hold: 1.35,
    exhale: 0.75,
  };

  const gradientMap: Record<Phase, string> = {
    inhale: "from-cyan-400 to-blue-500",
    hold: "from-violet-400 to-purple-600",
    exhale: "from-pink-300 to-pink-500",
  };

  const outerRingColor: Record<Phase, string> = {
    inhale: "bg-[rgba(139,92,246,0.14)]",
    hold: "bg-[rgba(99,102,241,0.14)]",
    exhale: "bg-[rgba(236,72,153,0.12)]",
  };

  const dots = Array.from({ length: totalRounds }).map((_, i) => i);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!max-w-6xl w-full h-[60vh] text-white bg-black overflow-auto">
        <DialogTitle></DialogTitle> <DialogDescription></DialogDescription>
        <div className=" flex items-center justify-center px-3 sm:px-4 md:px-6">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg text-center">
            <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
              <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] xl:w-[360px] xl:h-[360px]">
                <motion.div
                  animate={{ scale: isActive ? 1 : 1 }}
                  className={`absolute inset-0 rounded-full flex items-center justify-center ${outerRingColor[currentPhase]}`}
                  style={{
                    filter: "blur(8px)",
                  }}
                />

                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isActive ? 360 : 0 }}
                  transition={{
                    duration: isActive ? 8 : 0,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-3 sm:-inset-4 md:-inset-5 lg:-inset-6 rounded-full pointer-events-none"
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      <linearGradient id="g1" x1="0" x2="1">
                        <stop
                          offset="0%"
                          stopColor="#7c3aed"
                          stopOpacity="0.12"
                        />
                        <stop
                          offset="100%"
                          stopColor="#60a5fa"
                          stopOpacity="0.08"
                        />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="100"
                      cy="100"
                      r="92"
                      fill="none"
                      stroke="url(#g1)"
                      strokeWidth="16"
                      strokeLinecap="round"
                      className="sm:stroke-[14] md:stroke-[16]"
                    />
                  </svg>
                </motion.div>

                <div className="absolute inset-[20px] sm:inset-[24px] md:inset-[28px] lg:inset-[30px] xl:inset-[32px] rounded-full bg-white flex items-center justify-center">
                  <motion.div
                    className={`rounded-full shadow-2xl`}
                    style={{
                      width: "85%",
                      height: "85%",
                    }}
                    animate={{
                      scale: isActive ? scaleMap[currentPhase] : 1,
                      boxShadow: isActive
                        ? "0 20px 60px rgba(99,102,241,0.16) sm:0 25px 70px rgba(99,102,241,0.16) md:0 30px 80px rgba(99,102,241,0.16)"
                        : "0 8px 20px rgba(0,0,0,0.08) sm:0 10px 25px rgba(0,0,0,0.08)",
                    }}
                    transition={{
                      duration: isActive ? currentDuration : 0.6,
                      ease: currentPhase === "hold" ? "linear" : "easeInOut",
                    }}
                  >
                    <div
                      className={`w-full h-full rounded-full overflow-hidden bg-gradient-to-br ${gradientMap[currentPhase]}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        className="absolute w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px] xl:w-[120px] xl:h-[120px] -translate-y-1 sm:-translate-y-2 md:-translate-y-3"
                        viewBox="0 0 110 110"
                      >
                        <defs>
                          <radialGradient id="rGrad" cx="30%" cy="25%">
                            <stop
                              offset="0%"
                              stopColor="rgba(255,255,255,0.35)"
                            />
                            <stop
                              offset="60%"
                              stopColor="rgba(255,255,255,0.08)"
                            />
                            <stop
                              offset="100%"
                              stopColor="rgba(255,255,255,0)"
                            />
                          </radialGradient>
                        </defs>
                        <circle cx="55" cy="45" r="45" fill="url(#rGrad)" />
                      </svg>

                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* <img
                          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzV2Zm9uOTA1ZjB5Zzhzb2did3gwZGtnZ3VyaGZodnl1Z2J6NDdudSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/cefJOb0iuO040skF4y/giphy.gif"
                          alt="emoji"
                        /> */}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="mt-4 sm:mt-5 md:mt-6">
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={currentLabel + isActive}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white tracking-tight"
                  >
                    {currentLabel}
                  </motion.h3>
                </AnimatePresence>
                <div className="mt-2 sm:mt-3 flex items-center justify-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {dots.map((d) => {
                      const active =
                        d < roundIndex ||
                        (d === roundIndex && isActive && phaseIndex > 0);
                      const upcoming =
                        d === roundIndex &&
                        !isActive &&
                        roundIndex === d &&
                        roundIndex === 0 &&
                        !isActive;
                      return (
                        <div
                          key={d}
                          className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                          style={{
                            background: active
                              ? "#fbcfe8"
                              : "rgba(255,255,255,0.12)",
                            boxShadow: active
                              ? "0 4px 10px rgba(251,203,232,0.12) sm:0 6px 14px rgba(251,203,232,0.12)"
                              : "none",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-5 md:mt-6 flex  sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <button
                  onClick={toggleStart}
                  className={`px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-2 rounded-full font-semibold shadow-md transition-transform transform active:scale-95 text-sm sm:text-base ${
                    isActive
                      ? "bg-yellow-400 text-black shadow-yellow-400/30"
                      : "bg-emerald-500 text-white shadow-emerald-500/30"
                  }`}
                >
                  {isActive ? "Зогсоох" : "Эхлэх"}
                </button>

                <button
                  onClick={reset}
                  className="px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-rose-500 text-white font-semibold shadow-rose-500/30 hover:bg-rose-600 transition-colors text-sm sm:text-base"
                >
                  Дахин
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-blue-500 text-white font-semibold shadow-blue-500/30 hover:bg-blue-600 transition-colors text-sm sm:text-base"
                >
                  Дуусгах
                </button>

                <div className="text-xs sm:text-sm text-white/80 px-2 py-1 sm:px-3 sm:py-2 rounded-full bg-white/6">
                  {timeLeft}s
                </div>
              </div>

              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-white/70 text-center px-4">
                Дараагийн фазын хугацаа: {currentDuration}s • Цикл{" "}
                {roundIndex + 1}/{totalRounds}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
