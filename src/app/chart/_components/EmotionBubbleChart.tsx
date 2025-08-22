"use client";

import { useState, useContext, useEffect } from "react";
import MainChart from "./MainChart";
import SelectedEmotionPanel from "./SelectedEmotionPanel";
import EmotionLegend from "./EmotionLegend";
import { userDiaryContext } from "@/provider/userDiaryProvider";
import { DiaryNote } from "@/types";

export interface EmotionData {
  emotion: string;
  frequency: number;
  intensity?: number;
  color: string;
  gradient: string;
  icon: string;
  description?: string;
  impact?: number;
  proportion?: number;
}

const EMOTIONS = [
  {
    emotion: "БАЯРТАЙ",
    color: "#FFD700",
    gradient: "from-yellow-400 to-yellow-600",
    icon: "😊",
    description: "Moments of happiness and delight",
  },
  {
    emotion: "Gratitude",
    color: "#32CD32",
    gradient: "from-green-400 to-green-600",
    icon: "🙏",
    description: "Appreciation and thankfulness",
  },
  {
    emotion: "Love",
    color: "#FF69B4",
    gradient: "from-pink-400 to-pink-600",
    icon: "❤️",
    description: "Deep affection and connection",
  },
  {
    emotion: "УРАМ_ЗОРИГТОЙ",
    color: "#87CEEB",
    gradient: "from-blue-300 to-blue-500",
    icon: "😌",
    description: "Peaceful satisfaction",
  },
  {
    emotion: "СТРЕССТЭЙ",
    color: "#DDA0DD",
    gradient: "from-purple-300 to-purple-500",
    icon: "😰",
    description: "Worry and nervous tension",
  },
  {
    emotion: "ГУНИГТАЙ",
    color: "#4682B4",
    gradient: "from-blue-500 to-blue-700",
    icon: "😢",
    description: "Feelings of sorrow and melancholy",
  },
  {
    emotion: "УУРТАЙ",
    color: "#FF6347",
    gradient: "from-red-400 to-red-600",
    icon: "🤩",
    description: "High energy and anticipation",
  },
  {
    emotion: "ТАЙВАН",
    color: "#B0E0E6",
    gradient: "from-cyan-200 to-cyan-400",
    icon: "🧘",
    description: "Inner peace and tranquility",
  },
];

function countEmotionsFromDiaries(diaries: DiaryNote[]) {
  const emotionCount: Record<string, number> = {};

  diaries.forEach((d) => {
    d?.analysis?.emotions.forEach((emotion: string) => {
      emotionCount[emotion] = (emotionCount[emotion] || 0) + 1;
    });
  });

  return Object.entries(emotionCount).map(([emotion, frequency]) => ({
    emotion,
    frequency,
  }));
}

export default function EmotionBubbleChart() {
  const [emotionData, setEmotionData] = useState<EmotionData[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionData | null>(
    null
  );

  const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null);

  const { diaries } = useContext(userDiaryContext);
  const diary = diaries as DiaryNote[];

  const counted = countEmotionsFromDiaries(diaries);

  const mergedData: EmotionData[] = counted.map((e) => {
    const meta = EMOTIONS.find((m) => m.emotion === e.emotion);
    return {
      ...e,
      color: meta?.color || "#999999", // meta байхгүй бол default color
      gradient: meta?.gradient || "from-gray-400 to-gray-600",
      icon: meta?.icon || "❔",
      description: meta?.description || "No description",
    };
  });

  useEffect(() => {
    setEmotionData(mergedData);
  }, []);

  const totalFrequency = emotionData.reduce((sum, e) => sum + e.frequency, 0);

  const emotionsWithProportions = emotionData.map((e) => ({
    ...e,
    proportion: totalFrequency > 0 ? (e.frequency / totalFrequency) * 100 : 0,
  }));

  return (
    <div className="space-y-6">
      <MainChart
        emotions={emotionsWithProportions}
        selectedEmotion={selectedEmotion}
        setSelectedEmotion={setSelectedEmotion}
        hoveredEmotion={hoveredEmotion}
        setHoveredEmotion={setHoveredEmotion}
      />

      {selectedEmotion && <SelectedEmotionPanel emotion={selectedEmotion} />}

      <EmotionLegend
        emotions={emotionsWithProportions}
        selectedEmotion={selectedEmotion}
        onSelect={setSelectedEmotion}
      />
    </div>
  );
}

// {
//     "emotion": "ГУНИГТАЙ",
//     "frequency": 11,
//     "color": "#4682B4",
//     "gradient": "from-blue-500 to-blue-700",
//     "icon": "😢",
//     "description": "Feelings of sorrow and melancholy"
// }
