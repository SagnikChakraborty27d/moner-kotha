"use client";

import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { motion, AnimatePresence } from "framer-motion";
import { Apple, Download, Headphones, Search, CloudRain, Coffee, Play, User, Menu } from "lucide-react";

// --- THE DATA ---
const PUJO_HITS_COLLECTION = [
  {
    id: "01",
    title: "Dugga Elo",
    artist: "Monali Thakur",
    duration: "2:27",
    metadata: "Lyricist: Traditional | Composer: Kaushik-Guddu",
    youtubeId: "SFJeglBF5cg", 
    links: { 
      apple: "music://apple.com/", 
      spotify: "spotify:track:",   
    }
  }
];

export default function App() {
  const [activeSong, setActiveSong] = useState(PUJO_HITS_COLLECTION[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTheme, setActiveTheme] = useState("maaDurga");

  // Dynamic Backgrounds for future swiping expansion
  const THEMES: Record<string, string> = {
    maaDurga: "url('/backgrounds/286dd9e4-0161-4bdd-8257-c9e3a33f9729.png')",
    // You can add more backgrounds here later for the swipe effect
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050b14]">
      
      {/* 1. DYNAMIC BACKGROUND (Maa Durga) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTheme}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: THEMES[activeTheme] }}
        />
      </AnimatePresence>
      
      {/* Gradient overlay to make text readable */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050b14]/80 via-transparent to-[#050b14]" />

      {/* Hidden Audio Engine */}
      <div className="hidden">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${activeSong.youtubeId}`}
          playing={isPlaying}
          controls={false}
          width="0" height="0"
        />
      </div>

      {/* 2. THE UI CONTENT (Scrollable) */}
      <div className="relative z-20 h-full w-full overflow-y-auto scrollbar-hide pb-20">
        
        {/* Top Navbar */}
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white text-xs font-medium">252 online</span>
          </div>
          
          <div className="flex gap-2">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 text-white">
              <Play size={14} />
              <div className="w-4 h-4 bg-[#1DB954] rounded-full flex items-center justify-center text-black font-bold text-[8px]">S</div>
            </div>
            <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/5"><User size={14} /></button>
            <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/5"><Coffee size={14} /></button>
          </div>
        </div>

        {/* Bluetooth Indicator */}
        <div className="flex justify-center w-full mb-4">
           <div className="flex items-center gap-2 text-xs font-semibold text-[#e8bc66] bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md border border-[#e8bc66]/20">
             <Headphones size={14} />
             BLUETOOTH CONNECTED: 🎧 Sagnik's Pods Pro
           </div>
        </div>

        {/* Hero Section (Countdown) */}
        <div className="flex flex-col items-center mt-2 mb-8">
          <h1 className="text-[#e8bc66] text-5xl font-bold tracking-wider mb-3 drop-shadow-lg" style={{ fontFamily: 'serif' }}>
            পুজো আসছে
          </h1>
          <p className="text-gray-300 text-sm tracking-widest font-medium">55 days until Durga Pujo</p>
          
          <button className="mt-6 flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-widest hover:bg-white/10 transition">
            <Menu size={14} className="text-[#e8bc66]" /> BROWSE PLAYLISTS
          </button>
        </div>

        {/* --- NEW FEATURE: THE MUSIC PLAYER CARD --- */}
        <div className="px-5 mb-6">
          <div className="w-full p-5 flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl">
            
            {/* Deep-Links */}
            <div className="absolute top-5 right-5 flex gap-2">
               <a href={activeSong.links.apple} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"><Apple size={16} /></a>
               <a href={activeSong.links.spotify} className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1DB954]/20 text-[#1DB954] font-bold hover:bg-[#1DB954]/40">S</a>
            </div>

            <h2 className="text-gray-400 text-[10px] font-bold tracking-[0.2em] mb-4 uppercase">NOW PLAYING</h2>
            
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={`https://img.youtube.com/vi/${activeSong.youtubeId}/hqdefault.jpg`}
                alt={activeSong.title}
                className="w-20 h-20 rounded-2xl object-cover shadow-lg border border-white/10"
              />
              <div className="flex-1 overflow-hidden">
                <h3 className="text-[#e8bc66] text-xl font-bold tracking-tight truncate">{activeSong.title}</h3>
                <p className="text-gray-200 text-sm font-semibold">{activeSong.artist}</p>
                <p className="text-gray-400 text-[10px] mt-1 truncate">{activeSong.metadata}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between w-full mt-2">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-[#e8bc66] text-black px-8 py-2.5 rounded-full font-bold text-xs hover:scale-105 transition"
              >
                {isPlaying ? "PAUSE" : "PLAY TRACK"}
              </button>
              
              <a 
                 href="/albums/pujo.zip" 
                 download="pujo.zip"
                 className="flex items-center gap-2 bg-white/10 text-white px-4 py-2.5 rounded-full text-xs font-semibold hover:bg-white/20 transition"
               >
                 <Download size={14} /> ALBUM.ZIP
              </a>
            </div>
          </div>
        </div>

        {/* 3. THE ORIGINAL CARDS (Mood Room & Old Calcutta) */}
        <div className="px-5 space-y-4">
          
          {/* Mood Room Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem]">
            <p className="text-gray-400 text-xs tracking-[0.2em] mb-2 uppercase">Mood Room</p>
            <h2 className="text-white text-2xl font-bold mb-5" style={{ fontFamily: 'serif' }}>আজ মনটা কেমন?</h2>
            
            <div className="flex items-center gap-3 bg-black/40 rounded-full px-4 py-3 border border-white/5 mb-4">
              <Search size={16} className="text-gray-400" />
              <input type="text" placeholder="গান বা শিল্পী খুঁজুন" className="bg-transparent text-sm text-white focus:outline-none w-full" />
            </div>

            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/5 whitespace-nowrap text-sm text-gray-200">
                🔥 পুজোর সকাল
              </button>
              <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/5 whitespace-nowrap text-sm text-gray-200">
                🌧️ Rainy Day
              </button>
              <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/5 whitespace-nowrap text-sm text-gray-200">
                ☕
              </button>
            </div>
          </div>

          {/* Old Calcutta Room Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem]">
            <p className="text-gray-400 text-xs tracking-[0.2em] mb-2 uppercase">Old Calcutta Room</p>
            <h2 className="text-white text-3xl font-bold mb-4 leading-tight" style={{ fontFamily: 'serif' }}>
              শহর, স্মৃতি, আর কিছু পুরনো গান ।
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Coffee House-এর আড্ডা, বৃষ্টির জানলা, হলুদ রাস্তার আলো—Vintage Old Calcutta collection-এ শহরের অন্য একটা সময়কে শুনে নাও।
            </p>
            <button className="border border-[#e8bc66]/50 text-[#e8bc66] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#e8bc66]/10 transition">
              কলকাতার সন্ধ্যা চালাও
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
