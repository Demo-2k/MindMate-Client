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
              return <circle cx={cx} cy={cy} r={6} fill={color} key={weeklyTimeline.day}/>;
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
