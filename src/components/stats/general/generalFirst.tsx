import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { AiInsight } from "./AiInsight";
import { MoodTimeLine } from "./moodTimeLine";
import { MostEmotions } from "./topEmotions";

const data = [
  { name: "Баяртай 😊", value: 12, color: "#FFD93D" },
  { name: "Тайван 😌", value: 9, color: "#6BCB77" },
  { name: "Стресстэй 😣", value: 6, color: "#FF6B6B" },
  { name: "Гунигтай 😢", value: 4, color: "#4D96FF" },
];

const weeklyTimeline = [
  { day: "Дав", emotion: "😊", score: 70 },
  { day: "Мяг", emotion: "😌", score: 65 },
  { day: "Лха", emotion: "😣", score: 40 },
  { day: "Пүр", emotion: "😊", score: 80 },
  { day: "Баа", emotion: "😌", score: 75 },
  { day: "Бям", emotion: "😊", score: 90 },
  { day: "Ням", emotion: "😢", score: 30 },
];

export const GeneralStats = () => {
  return (
    <div className="text-white p-6 space-y-8 overflow-y-scroll">
      {/* Top 3 эмоци */}
      <MostEmotions weeklyTimeline={weeklyTimeline} data={data} />

      {/* Weekly Timeline */}
      <MoodTimeLine weeklyTimeline={weeklyTimeline} data={data} />

      {/* AI Insight */}
      <AiInsight />
    </div>
  );
};
