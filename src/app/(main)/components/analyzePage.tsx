import { Heart, Sparkles, Star, Zap } from "lucide-react"
import axios from "axios";
export const AnalyzePage =() => {
    const diaryPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/ai/getAiAnalyze/1`); {
            console.log("resssss:", response.data);
        }
        

      console.log("ress:", response);
      
    } catch (error) {
      console.log(error);
    }
  };
    return(
        <div>
            <div className="flex flex-col gap-5">
                <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Sparkles/>
                        <p>Daily Summary</p>
                    </div>
                    <p className="leading-relaxed font-medium">text</p>
                </div>
                <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Heart/>
                        <p>Emotion Check</p>
                    </div>
                    <div className="px-4 py-2 rounded-full border shadow-lg transition-all duration-300 hover:scale-105">
                        <span>🤔</span>
                        <span>Reflective</span>
                    </div>
                </div>
                <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Star/>
                        <p>Today's Energy</p>
                    </div>
                    <div className="text-center mb-4 text-6xl animate-pulse">🔮</div>
                    <p className="leading-relaxed font-medium text-center">text</p>
                </div>
                <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Zap/>
                        <p>Daily Motivation</p>
                    </div>
                    <p className="text-xl font-bold leading-relaxed relative">text</p>
                </div>
            </div>
        </div>
    )
}