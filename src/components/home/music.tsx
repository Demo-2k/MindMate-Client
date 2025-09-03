import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2, X } from "lucide-react";
interface SpotifyEmbedProps {
  urlMusic: string | null;
  width?: number;
  height?: number;
  defaultUrl?: string;
}

export default function SpotifyEmbed({
  width = 350,
  height = 152,
  urlMusic,
  defaultUrl = "https://open.spotify.com/embed/playlist/1buR1viIOgrYIWWX4j14gL?utm_source=generator&theme=0",
}: SpotifyEmbedProps) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string>(defaultUrl);

  useEffect(() => {
    // Refresh хийсэн ч сүүлд сонгосон дууг хадгалах
    const savedUrl = localStorage.getItem("currentUrlMusic");
    if (savedUrl) {
      setCurrentUrl(savedUrl);
    } else if (urlMusic) {
      setCurrentUrl(urlMusic);
    }
  }, []);

  useEffect(() => {
    if (urlMusic) {
      setCurrentUrl(urlMusic);
      localStorage.setItem("currentUrlMusic", urlMusic);
    }
  }, [urlMusic]);

  const w = isExpanded
    ? "350px"
    : typeof width === "number"
    ? `${width}px`
    : width;
  const h = isExpanded
    ? "452px"
    : typeof height === "number"
    ? `${height}px`
    : height;

    

  return (
    <motion.div
      drag
      dragElastic={0.2}
      initial={{ opacity: 0, scale: 0.95, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 24 }}
      className="fixed left-6 top-20 z-50 rounded-2xl cursor-grab shadow-2xl"
      style={{ width: w }}
    >
      {/* Gradient frame */}
      <div className="rounded-2xl ">
        <div className="rounded-2xl overflow-hidden bg-black/5 backdrop-blur-md border border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-1 border-b border-white/10">
            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <span className="tracking-wide">Spotify</span>
            </div>

            <div className="flex items-center gap-3 text-white/70">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hover:text-white transition"
                aria-label={isExpanded ? "Minimize" : "Maximize"}
              >
                {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
          </div>

          {/* Iframe */}
          <div className="relative" style={{ width: "100%", height: h }}>
            <div
              className="absolute inset-x-0 top-0 h-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.45), transparent)",
              }}
            />

            <iframe
              id="spotify-embed-card"
              title="spotify-embed"
              src={currentUrl}
              style={{ borderRadius: 12 }}
              width="100%"
              height={h}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
