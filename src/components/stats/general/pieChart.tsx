"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Productive", value: 3, color: "#ec4899" }, // Pink/magenta color
  { name: "Remaining", value: 97, color: "#374151" }, // Dark gray
]

export default function FocusScoreChart() {
  return (
    <Card className="w-full max-w-sm bg-gray-900 border-gray-800 mt-5">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-white text-sm font-medium">Focus Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                startAngle={90}
                endAngle={450}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-white">3%</div>
            <div className="text-sm text-gray-400">Productivity</div>
          </div>
        </div>

        {/* <div className="text-center space-y-1">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-sm text-gray-400">Trending</span>
            <span className="text-sm text-green-400 font-medium">up by 2800%</span>
            <span className="text-blue-400">📈</span>
          </div>
          <div className="text-xs text-gray-500">compared to yesterday</div>
          <div className="text-xs text-gray-400">Focus Time: 29 Mins / 19 Hrs 49 Mins</div>
        </div> */}
      </CardContent>
    </Card>
  )
}
