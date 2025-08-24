import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

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
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
          🏆 Хамгийн их эмоци
        </h2>
        <div className="flex gap-3">
          {data
            .sort((a, b) => b.value - a.value)
            .slice(0, 3)
            .map((mood, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded-xl bg-opacity-20"
                style={{ backgroundColor: mood.color }}
              >
                🏅 {index + 1}-р байр: {mood.name} ({mood.value})
              </div>
            ))}
        </div>
      </div>

      {/* Weekly Timeline */}
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mb-2">
          📅 Weekly Mood
        </h2>
        <p className="text-xs text-white/60 mb-3">This week at a glance</p>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weeklyTimeline}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                padding: 8,
              }}
              formatter={(value, _name, props) => [
                `Score: ${value}`,
                `Mood ${props.payload.emotion}`,
              ]}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#999"
              strokeWidth={2}
              dot={({ cx, cy, value }) => {
                let color =
                  value >= 70 ? "#22c55e" : value >= 50 ? "#f59e0b" : "#ef4444";
                return (
                  <circle cx={cx} cy={cy} r={6} fill={color} />
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Insight */}
      <div className="rounded-xl bg-white/5 p-4 border border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">💡</span>
          <h3 className="font-bold">Weekly Insights</h3>
        </div>
        <ul className="text-sm text-white/80 space-y-1 list-disc list-inside">
          <li>🎉 Баасан → Happy level хамгийн өндөр 🚀</li>
          <li>📚 Шалгалтын өдөр → Stress ихсэв 😣</li>
          <li>👯 Найзуудтай уулзвал → Happy +30% өссөн 😍</li>
        </ul>
        <button className="mt-3 text-xs bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-3 py-1.5 rounded">
          🚀 Challenge: 3-өдөр Happy Streak
        </button>
      </div>
    </div>
  );
};


