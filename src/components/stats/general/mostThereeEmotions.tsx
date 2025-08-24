import FocusScoreChart from "./pieChart";

export const MostEmotions = ({data, weeklyTimeline}) => {
  return (
     <div>
        <h2 className="text-lg font-bold mb-3">🏆 Хамгийн их эмоци</h2>
        <div className="flex gap-3">
          {data
            .sort((a, b) => b.value - a.value)
            .slice(0, 3)
            .map((mood, index) => {
              //   console.log(index);
              return (
                <div
                  key={index}
                  className="px-4 py-2 rounded-xl"
                  style={{ border: `2px solid ${mood.color}` }}
                >
                  {index + 1}-р байр: {mood.name} ({mood.value})
                </div>
              );
            })}
        </div>
      </div>
  );
};
