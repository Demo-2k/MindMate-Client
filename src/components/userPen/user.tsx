"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Pause, Play, RotateCcw, TreePalm } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Phase = "inhale" | "hold" | "exhale";

interface BreathCycle {
  phase: Phase;
  duration: number;
  instruction: string;
  color: string;
  scale: number;
}

export function DialogBreath() {
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<Phase>("inhale");
  const [timeLeft, setTimeLeft] = useState(4);

  const cycles: BreathCycle[] = [
    {
      phase: "inhale",
      duration: 4,
      instruction: "Breathe In",
      color: "from-blue-400 to-blue-600",
      scale: 1.4,
    },
    {
      phase: "hold",
      duration: 4,
      instruction: "Hold",
      color: "from-teal-400 to-teal-600",
      scale: 1.4,
    },
    {
      phase: "exhale",
      duration: 6,
      instruction: "Breathe Out",
      color: "from-green-400 to-green-600",
      scale: 0.7,
    },
  ];

  const totalCycles = 5;
  const currentCycleData =
    cycles.find((c) => c.phase === currentPhase) || cycles[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Move to next phase
      if (currentPhase === "inhale") {
        setCurrentPhase("hold");
        setTimeLeft(4);
      } else if (currentPhase === "hold") {
        setCurrentPhase("exhale");
        setTimeLeft(6);
      } else if (currentPhase === "exhale") {
        if (currentCycle < totalCycles - 1) {
          setCurrentCycle((prev) => prev + 1);
          setCurrentPhase("inhale");
          setTimeLeft(4);
        } else {
          // Session complete
          setIsActive(false);
        }
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentPhase, currentCycle]);

  const toggleSession = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
      if (currentCycle >= totalCycles) {
        reset();
      }
    }
  };

  const reset = () => {
    setIsActive(false);
    setCurrentCycle(0);
    setCurrentPhase("inhale");
    setTimeLeft(4);
  };

  const isComplete = currentCycle >= totalCycles && !isActive;

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="hover:scale-110 transition-transform duration-200 bg-white/20 backdrop-blur-sm border border-white/40 rounded-lg shadow-md"
            onClick={() => setOpen(true)}
          >
            <TreePalm />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Breathing Exercise</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!max-w-7xl w-full h-[60vh] bg-black overflow-auto">
          <DialogTitle></DialogTitle>

          <div className="bg-black rounded-2xl p-8  flex flex-col gap-6">
            <div className="text-center mb-8">
              <motion.h2
                className="text-2xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Breath Game
              </motion.h2>
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Follow the breathing pattern to relax and focus
              </motion.p>
              <motion.div
                className="mt-4 bg-white px-4 py-2 rounded-full inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="text-sm font-medium text-gray-700">
                  Session {currentCycle + 1}/{totalCycles}
                </span>
              </motion.div>
            </div>

            <div className="flex flex-col items-center mb-8 gap-5">
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    className="mb-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h3
                      className="text-xl font-semibold text-gray-700 mb-2"
                      key={currentCycleData.instruction}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentCycleData.instruction}
                    </motion.h3>
                    <motion.div
                      className="text-3xl font-bold text-blue-600"
                      key={timeLeft}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {timeLeft}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative mb-8">
                <motion.div
                  className={`w-32 h-32 rounded-full bg-gradient-to-br ${currentCycleData.color} shadow-lg`}
                  animate={{
                    scale: isActive ? currentCycleData.scale : 1,
                    boxShadow: isActive
                      ? `0 0 ${
                          currentCycleData.scale * 30
                        }px rgba(59, 130, 246, 0.4)`
                      : "0 10px 25px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{
                    duration: isActive ? currentCycleData.duration : 1,
                    ease: currentPhase === "hold" ? "linear" : "easeInOut",
                  }}
                />

                {/* Inner circles for depth */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    scale: isActive ? currentCycleData.scale * 0.8 : 1,
                  }}
                  transition={{
                    duration: isActive ? currentCycleData.duration : 1,
                    ease: currentPhase === "hold" ? "linear" : "easeInOut",
                  }}
                >
                  <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 bg-white bg-opacity-30 rounded-full"
                      animate={{
                        scale: isActive
                          ? currentCycleData.scale > 1
                            ? 1.2
                            : 0.8
                          : 1,
                      }}
                      transition={{
                        duration: isActive ? currentCycleData.duration : 1,
                        ease: currentPhase === "hold" ? "linear" : "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Breathing guide ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white border-opacity-40"
                  animate={{
                    scale: isActive ? currentCycleData.scale * 1.1 : 1.05,
                    opacity: isActive ? 0.6 : 0.3,
                  }}
                  transition={{
                    duration: isActive ? currentCycleData.duration : 1,
                    ease: currentPhase === "hold" ? "linear" : "easeInOut",
                  }}
                />
              </div>

              <AnimatePresence>
                {isComplete && (
                  <motion.div
                    className="text-center mb-6 p-4 bg-green-100 rounded-xl border border-green-200"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="text-2xl mb-2"
                    >
                      🎉
                    </motion.div>
                    <h3 className="text-lg font-semibold text-green-800 mb-1">
                      Session Complete!
                    </h3>
                    <p className="text-green-700">
                      Great job on completing your breathing exercise
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-4">
                <Button
                  onClick={toggleSession}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200"
                  variant="ghost"
                >
                  <motion.div>
                    {isActive ? <Pause size={20} /> : <Play size={20} />}
                  </motion.div>
                  {isActive
                    ? "Pause"
                    : isComplete
                    ? "Start New Session"
                    : "Start"}
                </Button>

                <Button
                  onClick={reset}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors duration-200"
                  variant="ghost"
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Progress indicator */}
            <motion.div
              className="w-full bg-gray-200 rounded-full h-2 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    ((currentCycle +
                      (isActive
                        ? (currentCycleData.duration - timeLeft) /
                          currentCycleData.duration
                        : 0)) /
                      totalCycles) *
                    100
                  }%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
