import React, { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2, X } from "lucide-react";


// Wonderspace-style Spotify embed card (refined)
// Usage: <SpotifyEmbed playlistUrl="https://open.spotify.com/embed/playlist/..." />
// Dependencies: framer-motion, tailwindcss, lucide-react


export default function SpotifyEmbed({
playlistUrl =
"https://open.spotify.com/embed/playlist/1buR1viIOgrYIWWX4j14gL?utm_source=generator&theme=0",
width = 400,
height = 652,
}) {
const [isExpanded, setIsExpanded] = useState(false);
const w = isExpanded ? "600px" : typeof width === "number" ? `${width}px` : width;
const h = isExpanded ? "800px" : typeof height === "number" ? `${height}px` : height;


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
<div className="rounded-2xl p-[1px] bg-gradient-to-tr from-[#4b367c] via-[#6e63b6] to-[#2fb6d9]">
<div className="rounded-2xl overflow-hidden bg-black/60 backdrop-blur-md border border-white/10">
{/* Header */}
<div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
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
<button
onClick={() => {
// simple close → hide by setting display none (could be improved with parent state)
const el = document.getElementById("spotify-embed-card");
if (el) el.style.display = "none";
}}
className="hover:text-red-400 transition"
aria-label="Close"
>
<X size={18} />
</button>
</div>
</div>


{/* Iframe */}
<div className="relative" style={{ width: "100%", height: h }}>
<div
className="absolute inset-x-0 top-0 h-20 pointer-events-none"
style={{
background: "linear-gradient(180deg, rgba(0,0,0,0.45), transparent)",
}}
/>


<iframe
id="spotify-embed-card"
title="spotify-embed"
src={playlistUrl}
style={{ borderRadius: 12 }}
width="100%"
height={h}
frameBorder="0"
allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
allowFullScreen
loading="lazy"
/>
</div>


{/* Footer */}
<div className="px-4 py-2 text-[11px] text-white/50 border-t border-white/10">
Drag me around • Wonderspace style
</div>
</div>
</div>
</motion.div>
);
}