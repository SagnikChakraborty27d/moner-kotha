'use client';
import {useMemo,useState} from 'react';
import {AnimatePresence,motion} from 'framer-motion';
import {Heart, Instagram, Linkedin, Music2, Play, Pause, Search, SkipBack, SkipForward, Users, X, ListMusic, Coffee, Shuffle, Repeat, ChevronDown} from 'lucide-react';
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

const tabs = ['DURGA PUJA', 'MAHALAYA', 'KOLKATA'];

export default function Home(){
 const [active,setActive]=useState<Song|null>(null); const [showContrib,setShowContrib]=useState(false); const [showChai,setShowChai]=useState(false); const [showPlaylist,setShowPlaylist]=useState(false); const [activeTab,setActiveTab]=useState('DURGA PUJA');
 const play=(s:Song)=>setActive(s);
 
 return <main className="min-h-screen pb-40" style={{ backgroundImage: "linear-gradient(to bottom, rgba(9, 8, 12, 0.2), rgba(9, 8, 12, 0.8)), url('https://raw.githubusercontent.com/SagnikChakraborty27d/moner-kotha/main/de566c7b-0327-4e8d-b4bb-d66d29b5b29a.png')", backgroundSize: "cover", backgroundPosition: "bottom center", backgroundAttachment: "fixed" }}>
  
  {/* Top Navigation */}
  <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-40">
    <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
      <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse shadow-[0_0_8px_#00ff88]"/>
      <span className="text-xs font-medium text-white/90">252 online</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="glass rounded-full flex items-center p-1 px-2 gap-1">
         <button onClick={()=>setShowPlaylist(true)} className="p-2 hover:bg-white/10 rounded-full transition"><Play size={14} className="text-white/80"/></button>
         <a href="https://open.spotify.com/playlist/51quSl18YnTjrII2uYmyYT" target="_blank" className="p-2 hover:bg-white/10 rounded-full transition"><Music2 size={14} className="text-white/80"/></a>
      </div>
      <button onClick={()=>setShowContrib(true)} className="glass p-3 rounded-full hover:bg-white/10 transition"><Users size={16} className="text-white/80"/></button>
      <button onClick={()=>setShowChai(true)} className="glass p-3 rounded-full hover:bg-white/10 transition"><Coffee size={16} className="text-white/80"/></button>
    </div>
  </div>

  {/* Hero Pujo Asche Section */}
  <section className="relative z-10 pt-32 pb-10 flex flex-col items-center text-center px-4">
     <h1 className="bengali text-6xl md:text-8xl font-bold text-[#f2ca55] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">পুজো আসছে</h1>
     <p className="mt-4 text-sm tracking-[0.2em] text-white/90 font-medium drop-shadow-md">55 days until Durga Pujo</p>
  </section>

  {/* Main Screen Playlist Trigger */}
  <section className="relative z-10 mx-auto max-w-2xl px-5 flex justify-center mt-8">
    <button onClick={()=>setShowPlaylist(true)} className="glass bg-[#2a2225]/80 hover:bg-[#2a2225] border border-white/10 rounded-full px-6 py-3 flex items-center gap-3 text-xs tracking-widest text-white/90 font-semibold uppercase shadow-xl transition-all">
      <ListMusic size={16} className="text-[#f2ca55]" /> Browse Playlists <ChevronDown size={14} className="text-white/50"/>
    </button>
  </section>

  {/* Modals & Popups */}
  <AnimatePresence>
    {/* The Devipaksha Playlist Drawer */}
    {showPlaylist&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex flex-col justify-end sm:grid sm:place-items-center">
      <motion.div initial={{y:"100%"}} animate={{y:0}} exit={{y:"100%"}} transition={{type:"spring", damping:25, stiffness:200}} className="w-full sm:max-w-md bg-[#1a1518]/95 border-t border-white/10 rounded-t-[34px] sm:rounded-[34px] p-6 h-[85vh] sm:h-[650px] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        
        <div className="flex justify-between items-center mb-6">
          <span className="text-[11px] tracking-[0.3em] text-white/60 font-bold uppercase">Playlists</span>
          <button onClick={()=>setShowPlaylist(false)} className="text-white/50 hover:text-white p-2 -mr-2"><X size={18}/></button>
        </div>
        
        <div className="flex gap-6 border-b border-white/10 pb-4 mb-4 overflow-x-auto">
           {tabs.map(tab => (
             <button key={tab} onClick={()=>setActiveTab(tab)} className={`text-[11px] font-bold tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 ${activeTab===tab ? 'text-white' : 'text-white/40 hover:text-white/70'}`}>
               {tab}
             </button>
           ))}
        </div>
        
        <p className="text-xs text-white/40 mb-5 font-medium">The main curated {activeTab.toLowerCase()} playlist.</p>
        
        <div className="flex-1 overflow-y-auto pb-20 flex flex-col gap-1 pr-2">
           {songs.map((s, i) => (
              <div key={s.id} onClick={()=>{play(s); setShowPlaylist(false);}} className={`flex items-center gap-4 rounded-2xl p-2 cursor-pointer transition-all ${active?.id === s.id ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                 <span className={`text-sm font-medium w-6 text-center ${active?.id === s.id ? 'text-[#f2ca55]' : 'text-white/40'}`}>{(i+1).toString().padStart(2, '0')}</span>
                 <img src={s.cover} className="w-[46px] h-[46px] rounded-[10px] object-cover shadow-md" />
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

    {/* Chai Modal */}
    {showChai&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md grid place-items-center p-5">
      <motion.div initial={{y:30,scale:.97}} animate={{y:0,scale:1}} exit={{y:30,scale:.97}} className="glass relative w-full max-w-sm rounded-[34px] p-8 text-center">
        <button onClick={()=>setShowChai(false)} className="absolute right-5 top-5 rounded-full bg-white/5 p-2"><X size={18}/></button>
        <div className="text-xs uppercase tracking-[0.3em] text-white/50 font-semibold mt-2">Buy us a Chai</div>
        <p className="mt-4 text-sm text-white/70 leading-relaxed">If Moner Kotha made your Pujo a little nicer, you know what to do. One cup of chai, and we're back to the adda.</p>
        <div className="mt-6 bg-white p-3 rounded-2xl inline-block shadow-xl">
           <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=9366745761@fam" alt="QR Code" className="w-48 h-48 rounded-xl opacity-90"/>
        </div>
        <p className="mt-4 text-xs text-white/40">Scan with any UPI app</p>
        <div className="mt-4 bg-black/30 border border-white/10 rounded-full py-3 px-5 flex justify-between items-center">
           <span className="text-sm text-white/60 font-mono">9366745761@fam</span>
           <button className="text-xs text-[#f2ca55] font-bold tracking-wider" onClick={() => navigator.clipboard.writeText('9366745761@fam')}>COPY</button>
        </div>
      </motion.div>
    </motion.div>}

    {/* Contributors Modal */}
    {showContrib&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md grid place-items-center p-5">
      <motion.div initial={{y:30,scale:.97}} animate={{y:0,scale:1}} exit={{y:30,scale:.97}} className="glass relative w-full max-w-sm rounded-[34px] p-8 text-center">
        <button onClick={()=>setShowContrib(false)} className="absolute right-5 top-5 rounded-full bg-white/5 p-2"><X size={18}/></button>
        <div className="text-xs uppercase tracking-[.35em] text-white/45 mt-2">Made with bhalobasha by</div>
        <div className="mt-6 rounded-[28px] border border-white/10 bg-black/20 p-7 text-center">
          <img src="https://raw.githubusercontent.com/SagnikChakraborty27d/moner-kotha/main/sagnik-profile.png" alt="Sagnik Chakraborty" className="mx-auto h-28 w-28 rounded-full object-cover ring-2 ring-white/15"/>
          <h3 className="mt-5 text-2xl font-semibold">Sagnik Chakraborty</h3>
          <p className="mt-2 text-sm text-white/50">Founder • Developer • Music Curator</p>
        </div>
      </motion.div>
    </motion.div>}
  </AnimatePresence>

  {/* Custom Floating Audio Player */}
  {active&&<><audio src={active.previewUrl} autoPlay className="hidden" />
    <motion.div initial={{y:100}} animate={{y:0}} className="fixed bottom-4 left-4 right-4 z-[60]">
      <div className="glass rounded-[32px] p-5 shadow-2xl flex flex-col gap-4 border border-white/10 bg-[#3a3033]/60 backdrop-blur-2xl">
        
        {/* Top Dropdown Button - Now opens the Playlist UI! */}
        <div className="flex justify-center -mt-8">
           <button onClick={()=>setShowPlaylist(true)} className="glass bg-[#2a2225] hover:bg-[#3a3033] transition-colors border border-white/10 rounded-full px-5 py-1.5 flex items-center gap-2 text-[10px] tracking-widest text-white/70 font-semibold uppercase shadow-lg cursor-pointer">
             <ListMusic size={12}/> PLAYLIST <ChevronDown size={12}/>
           </button>
        </div>

        {/* Main Audio Controls */}
        <div className="flex items-center gap-4">
           <img src={active.cover} className="w-[72px] h-[72px] rounded-2xl object-cover shadow-lg" />
           <div className="flex-1 min-w-0">
              <div className="font-bold text-white truncate text-lg">{active.title}</div>
              <div className="text-sm text-white/60 truncate">{active.artist}</div>
              
              {/* Fake Progress Bar */}
              <div className="w-full bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
                <div className="bg-white/80 h-1 w-1/3 rounded-full animate-pulse"></div>
              </div>
              <div className="text-[10px] text-white/40 mt-1">0:32 / {active.duration}</div>
           </div>
           
           <div className="flex items-center gap-3">
              <button className="text-white/60 hover:text-white"><SkipBack size={20}/></button>
              <button onClick={()=>setActive(null)} className="bg-white text-[#2a2225] p-3 rounded-full shadow-lg hover:scale-105 transition"><Pause size={20} fill="currentColor"/></button>
              <button className="text-white/60 hover:text-white"><SkipForward size={20}/></button>
           </div>
        </div>

        {/* Bottom Actions Row */}
        <div className="flex justify-between items-center pt-3 border-t border-white/10 text-xs text-white/50 px-2 font-medium">
           <button className="flex items-center gap-2 hover:text-white transition"><Shuffle size={14}/> Shuffle</button>
           <button className="flex items-center gap-2 hover:text-white transition"><Repeat size={14}/> Repeat</button>
           <button className="flex items-center gap-2 hover:text-[#f2ca55] transition text-white/70"><Music2 size={14}/> Dhak</button>
        </div>
      </div>
    </motion.div>
  </>}
 </main>
   }
