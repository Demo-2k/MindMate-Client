"use client"
import { HomePage } from "@/components/homePage";
import Image from "next/image";
import { useState } from "react";
import { AnalyzePage } from "./(main)/components/analyzePage";

export default function Home() {
  const [step, setStep] = useState(0);

  const handleNext = () => setStep (step +1);
  

  const stepComponents = [
    <HomePage key={0} handleNext={handleNext}/>,
    <AnalyzePage key={1}/>
  ]
  return stepComponents[step]
}
