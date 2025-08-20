import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmotionData,  } from "./generateEmotionData"


interface Props {
  emotions: EmotionData[]
  selectedEmotion: EmotionData | null
  onSelect: (emotion: EmotionData) => void
}

export default function EmotionLegend({ emotions, selectedEmotion, onSelect }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Emotion Legend</CardTitle>
        <CardDescription>Click on any emotion to view details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {emotions.map((e) => (
            <div
              key={e.emotion}
              onClick={() => onSelect(e)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedEmotion?.emotion === e.emotion
                  ? "bg-purple-100 dark:bg-purple-900 border-2 border-purple-300 dark:border-purple-600"
                  : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: e.color }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{e.emotion}</p>
                <p className="text-xs text-muted-foreground">{e.frequency}x • {(e.proportion || 0).toFixed(1)}%</p>
              </div>
            </div>
          ))}

        </div>
      </CardContent>
    </Card>
  )
}

