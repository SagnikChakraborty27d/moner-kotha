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

const moods=[['🔥','পুজোর সকাল'],['🌧️','Rainy Day'],['☕','কলকাতার সন্ধ্যা']];
const collections=[['Modern Pujo Hits', 'Retro']];
const tabs = ['DURGA PUJA', 'MAHALAYA', 'KOLKATA'];

export default function Home(){
 const [q,setQ]=useState(''); const [mood,setMood]=useState(''); const [active,setActive]=useState<Song|null>(null); const [showContrib,setShowContrib]=useState(false); const [showChai,setShowChai]=useState(false); const [showPlaylist,setShowPlaylist]=useState(false); const [activeTab,setActiveTab]=useState('DURGA PUJA');
 
 const filtered=useMemo(()=>songs.filter(s=>((s.title+' '+s.artist+' '+s.category).toLowerCase().includes(q.toLowerCase())) && (!mood || s.moods?.includes(mood))).slice(0,12),[q,mood]);
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
         {/* Real Spotify Logo SVG */}
         <a href="https://open.spotify.com/playlist/51quSl18YnTjrII2uYmyYT" target="_blank" className="p-2 hover:bg-white/10 rounded-full transition flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#1DB954]">
               <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.72.48-1.08.24-2.999-1.8-6.78-2.22-11.22-1.24-.42.09-81-.24-.9-.66-.09-.42.24-.81.66-.9 4.86-1.08 9.12-.6 12.54 1.56.36.24.48.72.24 1.08zm1.5-3.3c-.3.42-.9.54-1.32.24-3.42-2.1-8.64-2.73-12.66-1.49-.48.15-1.02-.12-1.17-.6-.15-.48.12-1.02.6-1.17 4.5-1.38 10.35-.66 14.31 1.74.42.3.54.9.24 1.32zm.12-3.45C14.94 8.34 8.67 8.16 5.04 9.24c-.57.18-1.17-.15-1.35-.72-.18-.57.15-1.17.72-1.35 4.14-1.23 11.25-1.02 15.42 1.47.51.3.69.96.39 1.47-.3.51-.96.69-1.47.39z"/>
            </svg>
         </a>
      </div>
      <button onClick={()=>setShowContrib(true)} className="glass p-3 rounded-full hover:bg-white/10 transition"><Users size={16} className="text-white/80"/></button>
      <button onClick={()=>setShowChai(true)} className="glass p-3 rounded-full hover:bg-white/10 transition"><Coffee size={16} className="text-white/80"/></button>
    </div>
  </div>

  {/* Hero Pujo Asche Section - Clean Main Screen */}
  <section className="relative z-10 pt-32 pb-10 flex flex-col items-center text-center px-4">
     <h1 className="bengali text-6xl md:text-8xl font-bold text-[#f2ca55] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">পুজো আসছে</h1>
     <p className="mt-4 text-sm tracking-[0.2em] text-white/90 font-medium drop-shadow-md">55 days until Durga Pujo</p>
  </section>

  {/* Main Screen Playlist Trigger Button */}
  <section className="relative z-10 mx-auto max-w-2xl px-5 flex justify-center mt-6">
    <button onClick={()=>setShowPlaylist(true)} className="glass bg-[#2a2225]/80 hover:bg-[#2a2225] border border-white/10 rounded-full px-6 py-3 flex items-center gap-3 text-xs tracking-widest text-white/90 font-semibold uppercase shadow-xl transition-all cursor-pointer">
      <ListMusic size={16} className="text-[#f2ca55]" /> Browse Playlists <ChevronDown size={14} className="text-white/50"/>
    </button>
  </section>

  {/* Re-merged Mood Room & Search */}
  <section className="mx-auto max-w-4xl px-5 pt-12 md:px-12">
    <div className="glass rounded-[30px] p-5 md:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs uppercase tracking-[.28em] text-white/45">Mood room</div>
          <h2 className="bengali mt-1 text-2xl font-semibold">আজ মনটা কেমন?</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 md:w-80">
          <Search size={18} className="text-white/45"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="গান বা শিল্পী খুঁজুন" className="w-full bg-transparent outline-none placeholder:text-white/35 text-white text-sm"/>
        </div>
      </div>
      <div className="scrollbar mt-5 flex gap-3 overflow-x-auto pb-1">
        {moods.map(([icon,label])=>(
          <button key={label} onClick={()=>setMood(mood===label?'':label)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${mood===label?'border-[#f2ca55]/60 bg-[#f2ca55]/15 text-[#f2ca55]':'border-white/10 bg-white/5 text-white/70'}`}>
            {icon} {label}
          </button>
        ))}
      </div>
    </div>
  </section>

  {/* Re-merged Old Calcutta Room Section */}
  <section className="mx-auto max-w-4xl px-5 pt-12 md:px-12">
    <div className="glass relative overflow-hidden rounded-[34px] p-7 md:p-10">
      <div className="absolute -right-16 -top-20 h-60 w-60 rounded-full bg-[#f2ca55]/10 blur-3xl"/>
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[.28em] text-white/40">Old Calcutta room</div>
        <h2 className="section-title mt-3 text-4xl md:text-5xl">শহর, স্মৃতি, আর কিছু পুরনো গান।</h2>
        <p className="bengali mt-4 leading-8 text-white/60">Coffee House-এর আড্ডা, বৃষ্টির জানলা, হলুদ রাস্তার আলো—Vintage Old Calcutta collection-এ শহরের অন্য একটা সময়কে শুনে নাও।</p>
        <button onClick={()=>{setMood('কলকাতার সন্ধ্যা'); setShowPlaylist(true);}} className="mt-6 rounded-full border border-[#f2ca55]/30 bg-[#f2ca55]/10 px-5 py-3 text-[#f2ca55] text-sm hover:bg-[#f2ca55]/20 transition">কলকাতার সন্ধ্যা চালাও</button>
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
    {/* Devipaksha Playlist Drawer */}
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
           {filtered.map((s, i) => (
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
        
        {/* Top Dropdown Button */}
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
