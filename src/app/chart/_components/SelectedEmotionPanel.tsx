import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { EmotionData } from "./EmotionBubbleChart"



interface Props { emotion: EmotionData }

export default function SelectedEmotionPanel({ emotion }: Props) {
  return (
    <Card className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-2 border-purple-200 dark:border-purple-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <span className="text-3xl">{emotion.icon}</span>
          <span className={`bg-gradient-to-r ${emotion.gradient} bg-clip-text text-transparent`}>{emotion.emotion}</span>
        </CardTitle>
        <CardDescription className="text-lg">{emotion.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Frequency</span>
              <span className="text-sm text-muted-foreground">{emotion.frequency} times</span>
            </div>
            <Progress value={emotion.proportion!} className="h-3" />
            <p className="text-xs text-muted-foreground">{emotion.proportion!.toFixed(1)}% of total emotions</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Intensity</span>
              <span className="text-sm text-muted-foreground">{emotion.intensity}/10</span>
            </div>
            {/* <Progress value={emotion.intensity*10} className="h-3" /> */}
            <p className="text-xs text-muted-foreground">Average emotional intensity</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Impact Score</span>
              <span className="text-sm text-muted-foreground">{emotion.impact}/100</span>
            </div>
            <Progress value={emotion.impact} className="h-3" />
            <p className="text-xs text-muted-foreground">Overall life impact</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
