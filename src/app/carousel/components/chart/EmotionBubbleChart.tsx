"use client"

import { useState, useEffect } from "react"
import MainChart from "./MainChart"
import { EmotionData, generateEmotionData } from "./generateEmotionData"
import SelectedEmotionPanel from "./SelectedEmotionPanel"
import EmotionLegend from "./EmotionLegend"
import Instructions from "./Instructions"



export default function EmotionBubbleChart() {
  const [emotionData, setEmotionData] = useState<EmotionData[]>([])
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionData | null>(null)
  const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null)

  useEffect(() => {
    setEmotionData(generateEmotionData())
  }, [])

  const totalFrequency = emotionData.reduce((sum, e) => sum + e.frequency, 0);

  const emotionsWithProportions = emotionData.map((e) => ({
    ...e,
    proportion: totalFrequency > 0 ? (e.frequency / totalFrequency) * 100 : 0,
  }))

  const randomizeData = () => {
    setEmotionData(generateEmotionData())
    setSelectedEmotion(null)
  }

  return (
    <div className="space-y-6">
      <MainChart
        emotions={emotionsWithProportions}
        selectedEmotion={selectedEmotion}
        setSelectedEmotion={setSelectedEmotion}
        hoveredEmotion={hoveredEmotion}
        setHoveredEmotion={setHoveredEmotion}
        randomizeData={randomizeData}
      />

      {selectedEmotion && <SelectedEmotionPanel emotion={selectedEmotion} />}

      <EmotionLegend

        emotions={emotionsWithProportions}
        selectedEmotion={selectedEmotion}
        onSelect={setSelectedEmotion}
      />

      <Instructions />
    </div>
  )
}
