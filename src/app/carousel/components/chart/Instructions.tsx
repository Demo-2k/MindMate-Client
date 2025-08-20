import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function ChartInstructions() {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
      <CardHeader>
        <CardTitle className="text-xl text-blue-800 dark:text-blue-200">How to Use This Chart</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p><strong className="text-blue-700 dark:text-blue-300">🫧 Bubble Size:</strong> Larger bubbles represent emotions that appear more frequently in your diary</p>
            <p><strong className="text-blue-700 dark:text-blue-300">🎯 Click Bubbles:</strong> Select any bubble to view detailed emotion information and metrics</p>
            <p><strong className="text-blue-700 dark:text-blue-300">🎨 Colors & Icons:</strong> Each emotion has a unique color and emoji for easy identification</p>
          </div>
          <div className="space-y-2">
            <p><strong className="text-blue-700 dark:text-blue-300">📊 Progress Bars:</strong> Show frequency, intensity, and impact scores for selected emotions</p>
            <p><strong className="text-blue-700 dark:text-blue-300">🎲 Randomize:</strong> Generate new data distributions to see how the chart adapts</p>
            <p><strong className="text-blue-700 dark:text-blue-300">🔗 Legend:</strong> Click legend items to quickly select and explore specific emotions</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
