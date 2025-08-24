import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const MoodTimeLine = ({ weeklyTimeline, data }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-3">📅 7 хоногийн мүүд timeline</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={weeklyTimeline}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white text-black p-2 rounded shadow">
                    <p>Өдөр: {data.day}</p>
                    <p>Score: {data.score}</p>
                    <p>Emotion: {data.emotion}</p>
                  </div>
                );
              }
            }}
          />
          <Line type="monotone" dataKey="score" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-between mt-2">
        {weeklyTimeline.map((d, i) => (
          <span key={i}>{d.emotion}</span>
        ))}
      </div>
    </div>
  );
};
