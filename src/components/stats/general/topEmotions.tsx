import FocusScoreChart from "./pieChart";

export const MostEmotions = ({data, weeklyTimeline}) => {
  return (
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
                className="px-4 py-2 rounded-xl bg-opacity-20 border"
                style={{ borderColor: mood.color }}
              >
                🏅 {index + 1}-р байр: {mood.name} ({mood.value})
              </div>
            ))}
        </div>
      </div>
  );
};
