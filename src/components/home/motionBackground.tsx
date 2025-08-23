"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HomePage } from "../homePage";
import { AnalyzePage } from "@/app/(main)/components/analyzePage";
import axios from "axios";
import { AiAnalysis, Diary } from "@/types";

import { useRouter } from "next/navigation";
import { UserContext } from "@/provider/userProvider";

// Exact positioning data from Mobbin's HTML
const appLogos = [
  {
    name: "ChatGPT",
    src: "/tarotLogo/theSun.jpg",
    top: 0,
    left: 53.19,
    baseTransform: { x: 25.4519, y: 24.9355 },
  },
  {
    name: "Headspace",
    src: "/tarotLogo/theFool.jpg",
    top: 7.14,
    left: 97.22,
    baseTransform: { x: -28.329, y: 27.8212 },
  },
  {
    name: "Nike",
    src: "/tarotLogo/nineOfSwords.jpg",
    top: 88.57,
    left: 75.42,
    baseTransform: { x: -14.6871, y: 24.3332 },
  },
  {
    name: "Dropbox",
    src: "/tarotLogo/horoscope.png",
    top: 14.29,
    left: 16.94,
    baseTransform: { x: 15.9719, y: -2.53326 },
  },
  {
    name: "Creme",
    src: "/tarotLogo/theTower.jpg",
    top: 1.71,
    left: -5.56,
    baseTransform: { x: 29.8906, y: 20.8153 },
  },
  {
    name: "Cosmos",
    src: "/tarotLogo/theChariot.jpg",
    top: 20,
    left: 73.33,
    baseTransform: { x: 13.0516, y: 27.6091 },
  },
  {
    name: "Mailchimp",
    src: "/tarotLogo/theHermit.jpg",
    top: 42.29,
    left: -5.56,
    baseTransform: { x: 12.8212, y: 17.6335 },
  },
  {
    name: "Airbnb",
    src: "/tarotLogo/fortune-teller.png",
    top: 45.71,
    left: 92.36,
    baseTransform: { x: -27.9274, y: 29.6762 },
  },
  {
    name: "Airbnb",
    src: "/tarotLogo/theMoon.jpg",
    left: 5.71,
    top: 30.36,
    baseTransform: { x: 29.6762, y: -27.9274 },
  },
  {
    name: "Twitch",
    src: "/tarotLogo/eightOfCups.jpg",
    top: 81.43,
    left: 1.39,
    baseTransform: { x: 29.8581, y: 22.0917 },
  },
  {
    name: "Wise",
    src: "/tarotLogo/wheelOfFormtune.jpg",
    top: 75.71,
    left: 40.83,
    baseTransform: { x: 21.1801, y: -0.312211 },
  },
  {
    name: "Apple TV",
    src: "/tarotLogo/theMoon.jpg",
    top: 69.43,
    left: 99.1,
    baseTransform: { x: 25.0566, y: 25.0705 },
  },
];

function FloatingLogo({
  name,
  src,
  top,
  left,
  baseTransform,
  index,
}: {
  name: string;
  src: string;
  top: number;
  left: number;
  baseTransform: { x: number; y: number };
  index: number;
}) {
  const [animatedTransform, setAnimatedTransform] = useState(baseTransform);

  useEffect(() => {
    const animate = () => {
      const time = Date.now() * 0.001;
      const frequency1 = 0.4 + Math.sin(index * 0.5) * 0.2;
      const frequency2 = 0.3 + Math.cos(index * 0.7) * 0.15;

      // Create organic floating movement around the base transform
      const floatX = Math.sin(time * frequency1 + index) * 25;
      const floatY = Math.cos(time * frequency2 + index * 1.3) * 35;

      setAnimatedTransform({
        x: baseTransform.x + floatX,
        y: baseTransform.y + floatY,
      });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [baseTransform, index]);

  return (
    <div
      className="absolute w-20 h-20 transition-transform duration-300 hover:scale-110 cursor-pointer"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        transform: `translateX(${animatedTransform.x}px) translateY(${animatedTransform.y}px)`,
      }}
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg">
        <Image
          src={src || "/placeholder.svg"}
          alt={`${name} logo`}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
    </div>
  );
}

export default function FloatMain() {
  const [mounted, setMounted] = useState(false);

  const { userProvider } = useContext(UserContext);
  const { push } = useRouter();

  const [step, setStep] = useState(0);
  const [analyzeData, setAnalyzeData] = useState<AiAnalysis | null>(null);
  const [savedDiary, setSavedDiary] = useState<Diary | null>(null);

  console.log("diary note", savedDiary);
  

  console.log("analyzepage:", analyzeData);

  const [diary, setDiary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const diaryPost = async () => {
    if (!userProvider?.id) {
      alert("burtguulnuu");
      push("/sign-in");
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
      setSavedDiary(response.data);
      handleNext();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeDiary = async () => {
    if (!savedDiary) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4001/diary/${savedDiary.id}/analyze`
      );
      setAnalyzeData(response.data);
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
    analyzeData ? (
      <AnalyzePage key={1} data={analyzeData} handleBack={handleBack} />
    ) : (
      <div key={1}>Loading...</div>
    ),
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50text-slate-100  relative overflow-hidden ">
      <header className="flex justify-between items-center  relative z-20">
        <div></div>
      </header>

      {/* Hero Section */}

      <main className="relative z-20">
        <motion.div
          className="text-left "
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {stepComponents[step]}
        </motion.div>
      </main>

      {/* Floating Logos Background */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full max-w-screen-2xl mx-auto">
          {appLogos.map((logo, index) => (
            <div key={index} className="pointer-events-auto">
              <FloatingLogo
                name={logo.name}
                src={logo.src}
                top={logo.top}
                left={logo.left}
                baseTransform={logo.baseTransform}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}

      <div className="absolute bottom-0 left-0 right-0 h-96  pointer-events-none" />
    </div>
  );
}
