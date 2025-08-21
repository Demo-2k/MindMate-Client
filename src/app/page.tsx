"use client";
import { HomePage } from "@/components/homePage";
import { useContext, useState } from "react";
import axios from "axios";
import { AnalyzePage } from "./(main)/components/analyzePage";
import { UserContext } from "@/provider/userProvider";
import { AiAnalysis } from "@/types";

export default function Home() {
  const { userProvider } = useContext(UserContext);

  const [step, setStep] = useState(0);
  const [analyzeData, setAnalyzeData] = useState<AiAnalysis | null>(null);

  console.log("analyzepage:", analyzeData);

  const [diary, setDiary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const diaryPost = async () => {
    if (!userProvider?.id) {
      alert("burtguulnuu");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:4001/ai/postDiary/${userProvider.id}`,
        { text: diary }
      );
      console.log("ress:", response.data);
      setAnalyzeData(response.data);
      handleNext();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const HandleDiary = () => {
    diaryPost();
  };

  const stepComponents = [
    <HomePage
      key={0}
      HandleDiary={HandleDiary}
      diary={diary}
      setDiary={setDiary}
      loading={loading}
    />,
    <AnalyzePage key={1} data={analyzeData} handleBack={handleBack} />,
  ];

  return stepComponents[step];
}
