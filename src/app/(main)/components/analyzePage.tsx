"use client";

import { Heart, MoveLeft, Sparkles, Star, Zap } from "lucide-react";
import { useState } from "react";

type EmotionsType = {
  БАЯРТАЙ: string;
  ХӨӨРСӨН: string;
  ЭНЕРГИ_ДҮҮРЭН: string;
  ГУНИГТАЙ: string;
  СТРЕССТЭЙ: string;
  УРАМ_ЗОРИГТОЙ: string;
  ТАЙВАН: string;
  САНАА_ЗОВСОН: string;
  УУРТАЙ: string;
  ГАНЦААРДСАН: string;
  СОНИРХОЛГҮЙ: string;
  ИЧСЭН: string;
};

export type TarotCard = {
  emotion: string; // object-ийн key
  name: string;
  imageUrl: string;
};

export const tarotCards: TarotCard[] = [
  {
    emotion: "БАЯРТАЙ",
    name: "The Sun",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
  },
  {
    emotion: "ХӨӨРСӨН",
    name: "The Fool",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/RWS_Tarot_00_Fool.jpg/250px-RWS_Tarot_00_Fool.jpg",
  },
  {
    emotion: "ЭНЕРГИ_ДҮҮРЭН",
    name: "Wheel of Fortune",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
  },
  {
    emotion: "ГУНИГТАЙ",
    name: "Nine of Swords",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Swords09.jpg/250px-Swords09.jpg",
  },
  {
    emotion: "СТРЕССТЭЙ",
    name: "The Tower",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/RWS_Tarot_16_Tower.jpg/1024px-RWS_Tarot_16_Tower.jpg",
  },
  {
    emotion: "УРАМ_ЗОРИГТОЙ",
    name: "The Chariot",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
  },
  {
    emotion: "ТАЙВАН",
    name: "The Hermit",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/RWS_Tarot_09_Hermit.jpg/250px-RWS_Tarot_09_Hermit.jpg",
  },
  {
    emotion: "САНАА_ЗОВСОН",
    name: "The Moon",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
  },
  {
    emotion: "УУРТАЙ",
    name: "Five of Wands",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Wands02.jpg",
  },
  {
    emotion: "ГАНЦААРДСАН",
    name: "Eight of Cups",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cups08.jpg/250px-Cups08.jpg",
  },
  {
    emotion: "СОНИРХОЛГҮЙ",
    name: "Four of Swords",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Swords04.jpg/1024px-Swords04.jpg",
  },
  {
    emotion: "ИЧСЭН",
    name: "Seven of Cups",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Cups07.jpg/1024px-Cups07.jpg",
  },
];
<<<<<<< Updated upstream

export const AnalyzePage = ({ data, handleBack }: any) => {
=======
type AnalyzePageProps = {
  data: AiAnalysis ,
  handleBack: () => void
}
export const AnalyzePage = ({ data, handleBack }: AnalyzePageProps) => {
>>>>>>> Stashed changes
  // Emoji map
  const emojiMap: Record<string, string> = {
    БАЯРТАЙ: "🤩 Happy",
    ХӨӨРСӨН: "😄 Excited",
    ЭНЕРГИ_ДҮҮРЭН: "⚡ Energetic",
    ГУНИГТАЙ: "😢 Sad",
    СТРЕССТЭЙ: "😓 Stressed",
    УРАМ_ЗОРИГТАЙ: "💪 Motivated",
    ТАЙВАН: "😌 Calm",
    САНАА_ЗОВСОН: "😟 Worried",
    УУРТАЙ: "😠 Angry",
    ГАНЦААРДСАН: "😔 Lonely",
    СОНИРХОЛГҮЙ: "😒 Bored",
    ИЧСЭН: "😳 Shy",
  };

  const emationd: (keyof EmotionsType)[] = data?.emotions;
  const emotion: string[] = emationd.map((e) => emojiMap[e]).filter(Boolean);

  // Tarot card list

  const cardsToShow = tarotCards.filter(
    (emo) => emo.emotion === data?.emotions[0]
  );
  console.log("cardsToShow", cardsToShow);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pt-8 sm:pt-12 lg:pt-20">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 sm:mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 group"
        >
          <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="hidden sm:inline">Back to Journal</span>
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Analysis Cards */}
          <div className="xl:col-span-2 space-y-6">
            {/* Daily Summary */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20 hover:bg-white/80 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-full">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Daily Summary
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-medium">
                {data?.summary}...
              </p>
            </div>

            {/* Daily Motivation */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20 hover:bg-white/80 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-yellow-500/10 rounded-full">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Daily Motivation
                </h2>
              </div>
              <blockquote className="text-lg sm:text-xl font-bold leading-relaxed text-gray-800 relative pl-4 border-l-4 border-gradient-to-b from-yellow-400 to-orange-500">
                "{data?.message}..."
              </blockquote>
            </div>
          </div>

          {/* Right Column - Tarot Section */}
          <div className="xl:col-span-1">
            <div className="perspective-1000">
              <div
                className="relative w-full h-175 group [transform-style:preserve-3d] transition-transform duration-700 ease-in-out
      hover:[transform:rotateY(180deg)] cursor-pointer"
              >
                {/* Front side */}
                <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={cardsToShow[0].imageUrl}
                    alt={cardsToShow[0].name}
                    className=" object-cover"
                  />
                </div>

                {/* Back side */}
                <div
                  className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden shadow-lg
        bg-black/80 flex flex-col items-center justify-center p-4 text-center text-white"
                >
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    {cardsToShow[0].name}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    {data?.horoscope}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
