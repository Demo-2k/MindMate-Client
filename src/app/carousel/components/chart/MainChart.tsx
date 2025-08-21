import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmotionData } from "./generateEmotionData"


interface MainChartProps {
  emotions: EmotionData[]
  selectedEmotion: EmotionData | null
  setSelectedEmotion: (e: EmotionData | null) => void
  hoveredEmotion: string | null
  setHoveredEmotion: (e: string | null) => void
  randomizeData: () => void
}

export default function MainChart({ emotions, selectedEmotion, setSelectedEmotion, hoveredEmotion, setHoveredEmotion, randomizeData }: MainChartProps) {

  const getBubblePosition = (index: number, total: number, centerX: number, centerY: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    }
  }

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Emotion Bubble Chart
        </CardTitle>
        <CardDescription className="text-lg">
          Interactive visualization of your emotional landscape - click bubbles to explore
        </CardDescription>
        <Button
          onClick={randomizeData}
          className="mx-auto mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          🎲 Randomize Data
        </Button>
      </CardHeader>

      <CardContent>
        <div className="relative w-full h-[600px] overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-indigo-900">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              {emotions.map((e, i) => (
                <radialGradient key={e.emotion} id={`gradient-${i}`} cx="30%" cy="30%">
                  <stop offset="0%" stopColor={e.color} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={e.color} stopOpacity="0.6" />
                </radialGradient>
              ))}
            </defs>

            {emotions.map((e, i) => {
              const pos = getBubblePosition(i, emotions.length, 400, 300, 180)
              const baseRadius = Math.max(e.proportion! * 3 + 20, 25)
              const isSelected = selectedEmotion?.emotion === e.emotion
              const isHovered = hoveredEmotion === e.emotion
              const radius = isSelected ? baseRadius * 1.3 : isHovered ? baseRadius * 1.1 : baseRadius

              return (
                <g key={e.emotion}>
                  <circle
                    cx={pos.x} cy={pos.y} r={radius}
                    fill={`url(#gradient-${i})`}
                    stroke={isSelected ? e.color : "transparent"}
                    strokeWidth={isSelected ? 4 : 0}
                    className={`cursor-pointer transition-all duration-300 ${isSelected ? "animate-pulse" : ""} ${isHovered ? "brightness-110" : ""}`}
                    onClick={() => setSelectedEmotion(isSelected ? null : e)}
                    onMouseEnter={() => setHoveredEmotion(e.emotion)}
                    onMouseLeave={() => setHoveredEmotion(null)}
                    style={{ filter: isSelected || isHovered ? "drop-shadow(0 8px 16px rgba(0,0,0,0.3))" : "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}
                  />
                  <text x={pos.x} y={pos.y-5} textAnchor="middle" className="text-2xl pointer-events-none select-none">{e.icon}</text>
                  <text x={pos.x} y={pos.y+15} textAnchor="middle" className="text-sm font-semibold fill-slate-700 dark:fill-slate-200 pointer-events-none select-none">{e.emotion}</text>
                  <text x={pos.x} y={pos.y+30} textAnchor="middle" className="text-xs fill-slate-500 dark:fill-slate-400 pointer-events-none select-none">{e.proportion!.toFixed(1)}%</text>
                </g>
              )
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}
