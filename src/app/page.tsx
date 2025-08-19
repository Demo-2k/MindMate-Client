"use client";
import { HomePage } from "@/components/homePage";
import { useState } from "react";

import axios from "axios";
import { AnalyzePage } from "./(main)/components/analyzePage";

export default function Home() {
  const [step, setStep] = useState(0);
  const [analyzeData, setAnalyzeData] = useState<any>(null); 
  const [diary, setDiary] = useState("");

  const handleNext = () => setStep(step + 1);
  

  const diaryPost = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4001/ai/postDiary/1`,
        { text: diary }
      );
      console.log("ress:", response.data);
      setAnalyzeData(response.data); 
    } catch (error) {
      console.log(error);
    }
  };

  const HandleDiary = () => {
    diaryPost().then(() => handleNext()); 
  };

  const stepComponents = [
    <HomePage key={0} HandleDiary={HandleDiary} diary={diary} setDiary={setDiary} />,
    <AnalyzePage key={1} data={analyzeData}  />, 
  ];

  return stepComponents[step];
}
