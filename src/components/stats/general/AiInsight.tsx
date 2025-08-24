export const AiInsight = () => {
  return (
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
  );
};
