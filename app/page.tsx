'use client';
import {useMemo,useState,useEffect} from 'react';
import {AnimatePresence,motion} from 'framer-motion';
import {Heart, Instagram, Linkedin, Music2, Play, Pause, Search, SkipBack, SkipForward, Users, X, ListMusic, Coffee, Shuffle, Repeat, ChevronDown} from 'lucide-react';
import ReactPlayer from 'react-player/youtube';
import songs from '../data/songs.json';

export type Song = {
  id: string;
  title: string;
  artist: string;
  category: string;
  moods: string[];
  duration: string;
  cover: string;
  youtubeId: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  previewUrl: string;
};

const moods=[['🔥','পুজোর সকাল'],['🌧️','Rainy Day'],['☕','কলকাতার সন্ধ্যা']];
const tabs = ['DURGA PUJA', 'MAHALAYA', 'KOLKATA'];

export default function Home(){
 const [q,setQ]=useState(''); 
 const [mood,setMood]=useState(''); 
 const [active,setActive]=useState<Song|null>(null); 
 const [isPlaying,setIsPlaying]=useState(false);
 const [showContrib,setShowContrib]=useState(false); 
 const [showChai,setShowChai]=useState(false); 
 const [showPlaylist,setShowPlaylist]=useState(false); 
 const [activeTab,setActiveTab]=useState('DURGA PUJA');
 const [pujoDays, setPujoDays] = useState(55);
 const [showSplash, setShowSplash] = useState(true);

 useEffect(() => {
   const timer = setTimeout(() => setShowSplash(false), 2500);
   const pujoDate = new Date('2026-10-16T00:00:00');
   const today = new Date();
   const diffTime = pujoDate.getTime() - today.getTime();
   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
   if (diffDays > 0) setPujoDays(diffDays);
   return () => clearTimeout(timer);
 }, []);

 const filtered=useMemo(()=>songs.filter(s=>((s.title+' '+s.artist+' '+s.category).toLowerCase().includes(q.toLowerCase())) && (!mood || s.moods?.includes(mood))), [q,mood,activeTab]);
 
 const play=(s:Song)=>{
   setActive(s);
   setIsPlaying(true);
 };
 
 return <main className="min-h-screen pb-40 text-white" style={{ backgroundImage: "linear-gradient(to bottom, rgba(9, 8, 12, 0.4), rgba(9, 8, 12, 0.85)), url('https://raw.githubusercontent.com/SagnikChakraborty27d/moner-kotha/main/public/backgrounds/286dd9e4-0161-4bdd-8257-c9e3a33f9729.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
  
  {/* Cinematic Intro Splash Screen */}
  <AnimatePresence>
    {showSplash && (
    <motion.div initial={{opacity:1}} exit={{opacity:0}} transition={{duration:0.8}} className="fixed inset-0 z-[100] bg-[#09080c] flex flex-col items-center justify-center p-6 text-center">
        <motion.img initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} transition={{duration:1}} src="https://raw.githubusercontent.com/SagnikChakraborty27d/moner-kotha/main/app/231fb176-3eb3-4c0e-88a3-13abfe31ba2b.png" alt="Moner Kotha Logo" className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover shadow-[0_0_30px_rgba(242,202,85,0.3)] border-2 border-[#f2ca55]/40 mb-6" />
        <motion.h1 initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.3, duration:0.8}} className="bengali text-3xl md:text-4xl font-bold text-[#f2ca55] tracking-wide">শহরটা গান গায় যখন</motion.h1>
        <motion.p initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.5, duration:0.8}} className="mt-2 text-xs md:text-sm tracking-[0.3em] text-white/60 uppercase font-medium">Entering the lanes of nostalgia...</motion.p>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Top Navigation Bar */}
  <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-40 backdrop-blur-xl bg-black/20 border-b border-white/10">
    <div className="glass rounded-full px-4 py-2 flex items-center gap-2 bg-black/30 border border-white/15">
      <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse shadow-[0_0_8px_#00ff88]"/>
      <span className="text-xs font-medium text-white/90">252 online</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="glass rounded-full flex items-center p-1 px-2 gap-1 bg-black/30 border border-white/15">
         <button onClick={()=>setShowPlaylist(true)} className="p-2 hover:bg-white/10 rounded-full transition"><Play size={14} className="text-white/80"/></button>
         <a href="https://open.spotify.com/playlist/51quSl18YnTjrII2uYmyYT" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-white/10 rounded-full transition flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#1DB954]">
               <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.72.48-1.08.24-2.999-1.8-6.78-2.22-11.22-1.24-.42.09-81-.24-.9-.66-.09-.42.24-.81.66-.9 4.86-1.08 9.12-.6 12.54 1.56.36.24.48.72.24 1.08zm1.5-3.3c-.3.42-.9.54-1.32.24-3.42-2.1-8.64-2.73-12.66-1.49-.48.15-1.02-.12-1.17-.6-.15-.48.12-1.02.6-1.17 4.5-1.38 10.35-.66 14.31 1.74.42.3.54.9.24 1.32zm.12-3.45C14.94 8.34 8.67 8.16 5.04 9.24c-.57.18-1.17-.15-1.35-.72-.18-.57.15-1.17.72-1.35 4.14-1.23 11.25-1.02 15.42 1.47.51.3.69.96.39 1.47-.3.51-.96.69-1.47.39z"/>
            </svg>
         </a>
      </div>
      <button onClick={()=>setShowContrib(true)} className="glass p-3 rounded-full hover:bg-white/10 transition bg-black/30 border border-white/15"><Users size={16} className="text-white/80"/></button>
      <button onClick={()=>setShowChai(true)} className="glass p-3 rounded-full hover:bg-white/10 transition bg-black/30 border border-white/15"><Coffee size={16} className="text-white/80"/></button>
    </div>
  </div>

  {/* Hero Pujo Asche Section */}
  <section className="relative z-10 pt-36 pb-8 flex flex-col items-center text-center px-4">
     <h1 className="bengali text-6xl md:text-8xl font-bold text-[#f2ca55] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">পুজো আসছে</h1>
     <p className="mt-3 text-sm tracking-[0.2em] text-white/90 font-medium drop-shadow-md">{pujoDays} days until Durga Pujo</p>
  </section>

  {/* Browse Playlists Button */}
  <section className="relative z-10 mx-auto max-w-2xl px-5 flex justify-center mb-10">
    <button onClick={()=>setShowPlaylist(true)} className="glass bg-[#1a1417]/80 hover:bg-[#251d21] border border-white/15 rounded-full px-6 py-3.5 flex items-center gap-3 text-xs tracking-widest text-white/90 font-semibold uppercase shadow-2xl transition-all cursor-pointer backdrop-blur-xl">
      <ListMusic size={16} className="text-[#f2ca55]" /> Browse Playlists <ChevronDown size={14} className="text-white/50"/>
    </button>
  </section>

  {/* Mood Room Section */}
  <section className="mx-auto max-w-4xl px-5 pt-2 md:px-12">
    <div className="glass rounded-[30px] p-5 md:p-7 bg-black/40 border border-white/15 backdrop-blur-2xl shadow-2xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[.28em] text-white/45 font-semibold">Mood room</div>
          <h2 className="bengali mt-1 text-2xl font-semibold">আজ মনটা কেমন?</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2.5 md:w-80">
          <Search size={18} className="text-white/45"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="গান বা শিল্পী খুঁজুন" className="w-full bg-transparent outline-none placeholder:text-white/35 text-white text-sm"/>
        </div>
      </div>
      <div className="scrollbar mt-5 flex gap-3 overflow-x-auto pb-1">
        {moods.map(([icon,label])=>(
          <button key={label} onClick={()=>setMood(mood===label?'':label)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${mood===label?'border-[#f2ca55]/60 bg-[#f2ca55]/20 text-[#f2ca55]':'border-white/15 bg-white/5 text-white/70 hover:bg-white/10'}`}>
            {icon} {label}
          </button>
        ))}
      </div>
    </div>
  </section>

  {/* Old Calcutta Room Section */}
  <section className="mx-auto max-w-4xl px-5 pt-8 md:px-12">
    <div className="glass relative overflow-hidden rounded-[34px] p-7 md:p-10 bg-black/40 border border-white/15 backdrop-blur-2xl shadow-2xl">
      <div className="absolute -right-16 -top-20 h-60 w-60 rounded-full bg-[#f2ca55]/10 blur-3xl pointer-events-none"/>
      <div className="max-w-2xl relative z-10">
        <div className="text-xs uppercase tracking-[.28em] text-white/40 font-semibold">Old Calcutta room</div>
        <h2 className="section-title mt-3 text-4xl md:text-5xl font-bold">শহর, স্মৃতি, আর কিছু পুরনো গান।</h2>
        <p className="bengali mt-4 leading-8 text-white/70">Coffee House-এর আড্ডা, বৃষ্টির জানলা, হলুদ রাস্তার আলো—Vintage Old Calcutta collection-এ শহরের অন্য একটা সময়কে শুনে নাও।</p>
        <button onClick={()=>{setMood('কলকাতার সন্ধ্যা'); setShowPlaylist(true);}} className="mt-6 rounded-full border border-[#f2ca55]/30 bg-[#f2ca55]/10 px-5 py-3 text-[#f2ca55] text-sm hover:bg-[#f2ca55]/20 transition font-medium">কলকাতার সন্ধ্যা চালাও</button>
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer className="mx-auto flex max-w-4xl flex-col gap-4 px-5 pb-10 pt-14 text-sm text-white/40 md:flex-row md:items-center md:justify-between md:px-12">
    <div><span className="bengali text-lg text-white/70">মনের কথা</span> · made with bhalobasha</div>
    <button onClick={()=>setShowContrib(true)} className="hover:text-white transition">About the creator</button>
  </footer>

  {/* Modals & Popups */}
  <AnimatePresence>
    {showPlaylist&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md flex flex-col justify-end sm:grid sm:place-items-center">
      <motion.div initial={{y:"100%"}} animate={{y:0}} exit={{y:"100%"}} transition={{type:"spring", damping:25, stiffness:200}} className="w-full sm:max-w-md bg-[#161215]/95 border-t sm:border border-white/15 rounded-t-[34px] sm:rounded-[34px] p-6 h-[85vh] sm:h-[650px] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        
        <div className="flex justify-between items-center mb-6">
          <span className="text-[11px] tracking-[0.3em] text-white/60 font-bold uppercase">Playlists</span>
          <button onClick={()=>setShowPlaylist(false)} className="text-white/50 hover:text-white p-2 -mr-2 bg-white/5 rounded-full"><X size={18}/></button>
        </div>
        
        <div className="flex gap-6 border-b border-white/10 pb-4 mb-4 overflow-x-auto">
           {tabs.map(tab => (
             <button key={tab} onClick={()=>setActiveTab(tab)} className={`text-[11px] font-bold tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 ${activeTab===tab ? 'text-[#f2ca55] border-b-2 border-[#f2ca55] pb-1' : 'text-white/40 hover:text-white/70'}`}>
               {tab}
             </button>
           ))}
        </div>
        
        <p className="text-xs text-white/40 mb-4 font-medium">The main curated {activeTab.toLowerCase()} playlist.</p>
        
        <div className="flex-1 overflow-y-auto pb-20 flex flex-col gap-1.5 pr-1">
           {filtered.map((s, i) => (
              <div key={s.id} onClick={()=>{play(s); setShowPlaylist(false);}} className={`flex items-center gap-4 rounded-2xl p-2.5 cursor-pointer transition-all ${active?.id === s.id ? 'bg-white/15 border border-white/10' : 'hover:bg-white/5'}`}>
                 <span className={`text-sm font-medium w-6 text-center ${active?.id === s.id ? 'text-[#f2ca55]' : 'text-white/40'}`}>{(i+1).toString().padStart(2, '0')}</span>
                 <img src={s.cover} alt={s.title} className="w-[48px] h-[48px] rounded-xl object-cover shadow-md" />
                 <div className="flex-1 min-w-0">
                   <div className={`truncate font-semibold text-sm ${active?.id === s.id ? 'text-[#f2ca55]' : 'text-white/90'}`}>{s.title}</div>
                   <div className="truncate text-xs text-white/50 mt-0.5">{s.artist}</div>
                 </div>
                 <span className="text-[11px] text-white/30">{s.duration}</span>
              </div>
           ))}
        </div>
      </motion.div>
    </motion.div>}

    {showChai&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md grid place-items-center p-5">
      <motion.div initial={{y:30,scale:.97}} animate={{y:0,scale:1}} exit={{y:30,scale:.97}} className="glass relative w-full max-w-sm rounded-[34px] p-8 text-center bg-[#1a1417]/90 border border-white/15 backdrop-blur-2xl">
        <button onClick={()=>setShowChai(false)} className="absolute right-5 top-5 rounded-full bg-white/5 p-2 hover:bg-white/10 transition"><X size={18}/></button>
        <div className="text-xs uppercase tracking-[0.3em] text-white/50 font-semibold mt-2">Buy us a Chai</div>
        <p className="mt-4 text-sm text-white/70 leading-relaxed">If Moner Kotha made your Pujo a little nicer, you know what to do. One cup of chai, and we're back to the adda.</p>
        <div className="mt-6 bg-white p-3 rounded-2xl inline-block shadow-2xl">
           <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=9366745761@fam" alt="QR Code" className="w-48 h-48 rounded-xl opacity-90"/>
        </div>
        <p className="mt-4 text-xs text-white/40">Scan with any UPI app</p>
        <div className="mt-4 bg-black/40 border border-white/10 rounded-full py-3 px-5 flex justify-between items-center">
           <span className="text-sm text-white/60 font-mono">9366745761@fam</span>
           <button className="text-xs text-[#f2ca55] font-bold tracking-wider hover:underline" onClick={() => navigator.clipboard.writeText('9366745761@fam')}>COPY</button>
        </div>
      </motion.div>
    </motion.div>}

    {showContrib&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md grid place-items-center p-5">
      <motion.div initial={{y:30,scale:.97}} animate={{y:0,scale:1}} exit={{y:30,scale:.97}} className="glass relative w-full max-w-sm rounded-[34px] p-8 text-center bg-[#1a1417]/90 border border-white/15 backdrop-blur-2xl">
        <button onClick={()=>setShowContrib(false)} className="absolute right-5 top-5 rounded-full bg-white/5 p-2 hover:bg-white/10 transition"><X size={18}/></button>
        <div className="text-xs uppercase tracking-[.35em] text-white/45 font-semibold mt-2">Made with bhalobasha by</div>
        <div className="mt-6 rounded-[28px] border border-white/10 bg-black/30 p-7 text-center shadow-inner">
          <img src="https://raw.githubusercontent.com/SagnikChakraborty27d/moner-kotha/main/sagnik-profile.png" alt="Sagnik Chakraborty" className="mx-auto h-28 w-28 rounded-full object-cover ring-2 ring-[#f2ca55]/30 shadow-lg"/>
          <h3 className="mt-5 text-2xl font-semibold">Sagnik Chakraborty</h3>
          <p className="mt-2 text-sm text-white/50">Founder • Developer • Music Curator</p>
          <div className="mt-5 flex justify-center gap-4">
            <a href="https://www.instagram.com/schakraborty_floyd" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 transition text-white/70 hover:text-white">
              <Instagram size={18} />
            </a>
            <a href="https://www.linkedin.com/in/sagnik-chakraborty-0ab57240a" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 transition text-white/70 hover:text-white">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>}
  </AnimatePresence>

  {/* Hidden YouTube Audio Engine for Real Song Playback */}
  {active&&<div className="hidden">
    <ReactPlayer 
      url={`https://www.youtube.com/watch?v=${active.youtubeId}`} 
      playing={isPlaying} 
      controls={false}
      volume={1}
    />
  </div>}

  {active&&<motion.div initial={{y:100}} animate={{y:0}} className="fixed bottom-4 left-4 right-4 z-[60] max-w-2xl mx-auto">
      <div className="glass rounded-[32px] p-4 md:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col gap-3 border border-white/15 bg-[#251d21]/90 backdrop-blur-2xl">
        
        <div className="flex justify-center -mt-7">
           <button onClick={()=>setShowPlaylist(true)} className="glass bg-[#1a1417] hover:bg-[#2a2225] transition-colors border border-white/15 rounded-full px-5 py-1.5 flex items-center gap-2 text-[10px] tracking-widest text-white/80 font-semibold uppercase shadow-md cursor-pointer">
             <ListMusic size={12} className="text-[#f2ca55]"/> PLAYLIST <ChevronDown size={12}/>
           </button>
        </div>

        <div className="flex items-center gap-4">
           <img src={active.cover} alt={active.title} className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-2xl object-cover shadow-lg" />
           <div className="flex-1 min-w-0">
              <div className="font-bold text-white truncate text-base md:text-lg">{active.title}</div>
              <div className="text-xs md:text-sm text-white/60 truncate">{active.artist}</div>
              
              <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
                <div className="bg-[#f2ca55] h-1 w-full rounded-full animate-pulse"></div>
              </div>
              <div className="text-[10px] text-white/40 mt-1">Playing via YouTube Engine • {active.duration}</div>
           </div>
           
           <div className="flex items-center gap-2 md:gap-3">
              <button onClick={()=>setIsPlaying(!isPlaying)} className="bg-[#f2ca55] text-black p-3.5 rounded-full shadow-lg hover:scale-105 transition cursor-pointer">
                {isPlaying ? <Pause size={20} fill="currentColor"/> : <Play size={20} fill="currentColor"/>}
              </button>
           </div>
        </div>

        <div className="flex justify-between items-center pt-2.5 border-t border-white/10 text-xs text-white/50 px-2 font-medium">
           <button className="flex items-center gap-1.5 hover:text-white transition"><Shuffle size={14}/> Shuffle</button>
           <button className="flex items-center gap-1.5 hover:text-white transition"><Repeat size={14}/> Repeat</button>
           <button className="flex items-center gap-1.5 hover:text-[#f2ca55] transition text-white/70"><Music2 size={14}/> Dhak</button>
        </div>
      </div>
    </motion.div>}
 </main>
  }
