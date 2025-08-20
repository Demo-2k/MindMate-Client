"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { DiaryNote } from "../CarouselCard";

export interface EmotionData {
  emotion: string;
  frequency: number;
  intensity: number;
  color: string;
  gradient: string;
  icon: string;
  description: string;
  impact: number;
  proportion?: number;
}

 const EMOTIONS = [
    { emotion: "Joy", color: "#FFD700", gradient: "from-yellow-400 to-yellow-600", icon: "😊", description: "Moments of happiness and delight" },
    { emotion: "Gratitude", color: "#32CD32", gradient: "from-green-400 to-green-600", icon: "🙏", description: "Appreciation and thankfulness" },
    { emotion: "Love", color: "#FF69B4", gradient: "from-pink-400 to-pink-600", icon: "❤️", description: "Deep affection and connection" },
    { emotion: "Contentment", color: "#87CEEB", gradient: "from-blue-300 to-blue-500", icon: "😌", description: "Peaceful satisfaction" },
    { emotion: "Anxiety", color: "#DDA0DD", gradient: "from-purple-300 to-purple-500", icon: "😰", description: "Worry and nervous tension" },
    { emotion: "Sadness", color: "#4682B4", gradient: "from-blue-500 to-blue-700", icon: "😢", description: "Feelings of sorrow and melancholy" },
    { emotion: "Excitement", color: "#FF6347", gradient: "from-red-400 to-red-600", icon: "🤩", description: "High energy and anticipation" },
    { emotion: "Calm", color: "#B0E0E6", gradient: "from-cyan-200 to-cyan-400", icon: "🧘", description: "Inner peace and tranquility" },
  ]

export const generateEmotionData = (): EmotionData[] => {
  return EMOTIONS.map(e => ({
    ...e,
    frequency: Math.floor(Math.random() * 25) + 5,
    intensity: Math.floor(Math.random() * 10) + 1,
    impact: Math.floor(Math.random() * 100) + 1,
  }));
};

// Component дотор
export default function EmotionBubbleChart() {
  const [diary, setDiary] = useState<DiaryNote[]>([]);
  const [emotionData, setEmotionData] = useState<EmotionData[]>([]);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await axios.get<DiaryNote[]>('http://localhost:4001/ai/getAllDiaryNotes/1');
        setDiary(response.data);

        // Diary-г ашиглан emotionData үүсгэх
        const generated = generateEmotionData();
        // TODO: response.data-д байгаа эмоцуудаар frequency update хийж болно
        setEmotionData(generated);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDiary();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(emotionData, null, 2)}</pre>
    </div>
  );
}

