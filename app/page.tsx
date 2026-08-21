'use client';
import {useMemo,useState,useEffect} from 'react';
import {AnimatePresence,motion} from 'framer-motion';
import {Heart, Instagram, Linkedin, Music2, Play, Pause, Search, SkipBack, SkipForward, Users, X, ListMusic} from 'lucide-react';
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

export default function Home(){
 const [q,setQ]=useState(''); const [mood,setMood]=useState(''); const [active,setActive]=useState<Song|null>(null); const [wish,setWish]=useState<string[]>([]); const [showContrib,setShowContrib]=useState(false);
 const [pujoDays, setPujoDays] = useState(55);

 useEffect(() => {
   const pujoDate = new Date('2026-10-16T00:00:00');
   const today = new Date();
   const diffTime = pujoDate.getTime() - today.getTime();
   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
   if (diffDays > 0) setPujoDays(diffDays);
 }, []);

 const filtered=useMemo(()=>songs.filter(s=>((s.title+' '+s.artist+' '+s.category).toLowerCase().includes(q.toLowerCase())) && (!mood || s.moods?.includes(mood))).slice(0,12),[q,mood]);
 const play=(s:Song)=>setActive(s); const toggleWish=(id:string)=>setWish(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
 
 return <main className="min-h-screen pb-28" style={{ backgroundImage: "linear-gradient(to bottom, rgba(9, 8, 12, 0.7), rgba(9, 8, 12, 0.95)), url('https://raw.githubusercontent.com/SagnikChakraborty27d/moner-kotha/main/de566c7b-0327-4e8d-b4bb-d66d29b5b29a.png')", backgroundSize: "cover", backgroundPosition: "bottom center", backgroundAttachment: "fixed" }}>
  
  <section className="hero min-h-[690px] px-5 pt-8 md:px-12">
   <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between">
    <div>
     <div className="bengali text-2xl font-bold text-[#f2ca55]">মনের কথা</div>
     <div className="text-xs uppercase tracking-[.3em] text-white/50">songs • স্মৃতি • কলকাতা</div>
    </div>
    <div className="flex items-center gap-2">
     <a className="glass rounded-full p-3" href="#music"><Music2 size={18}/></a>
     <button onClick={()=>setShowContrib(true)} className="glass rounded-full px-4 py-2 text-sm"><Users size={16} className="inline mr-2"/>Contributors</button>
    </div>
   </nav>
   <div className="relative z-10 mx-auto max-w-6xl pt-28 md:pt-36">
    <p className="bengali text-xl text-[#f2ca55] md:text-2xl">শহরটা গান গায় যখন</p>
    <h1 className="section-title mt-3 max-w-3xl text-6xl leading-[.95] md:text-8xl">Moner Kotha</h1>
    
    {/* Pretty Styled Pujo Countdown Header */}
    <div className="mt-4 flex flex-col gap-1">
      <span className="bengali text-3xl md:text-4xl font-bold text-[#f2ca55] tracking-wide drop-shadow-md">পুজো আসছে</span>
      <span className="text-xs md:text-sm tracking-[0.25em] text-white/80 uppercase font-medium">{pujoDays} days until Durga Pujo</span>
    </div>

    <p className="bengali mt-6 max-w-xl text-xl leading-9 text-white/70">পুজোর আলো থেকে পুরনো কলকাতার গলি—তোমার মনের মতো গান, এক জায়গায়।</p>
    <div className="mt-8 flex flex-wrap gap-3">
     <a href="#music" className="rounded-full bg-[#f2ca55] px-6 py-3 font-semibold text-[#26160f]">শুরু করি <Play size={16} className="inline ml-1" fill="currentColor"/></a>
     <button onClick={()=>setMood('মহালয়া ভোর')} className="glass rounded-full px-6 py-3">মহালয়া ভোর</button>
    </div>
   </div>
  </section>

  <section className="mx-auto max-w-6xl px-5 pt-10 md:px-12">
   <div className="glass rounded-[30px] p-5 md:p-7">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
     <div>
      <div className="text-xs uppercase tracking-[.28em] text-white/45">Mood room</div>
      <h2 className="bengali mt-1 text-2xl font-semibold">আজ মনটা কেমন?</h2>
     </div>
     <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 md:w-80">
      <Search size={18} className="text-white/45"/>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="গান বা শিল্পী খুঁজুন" className="w-full bg-transparent outline-none placeholder:text-white/35 text-white"/>
     </div>
    </div>
    <div className="scrollbar mt-5 flex gap-3 overflow-x-auto pb-1">
     {moods.map(([icon,label])=><button key={label} onClick={()=>setMood(mood===label?'':label)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition ${mood===label?'border-[#f2ca55]/60 bg-[#f2ca55]/15 text-[#f2ca55]':'border-white/10 bg-white/5 text-white/70'}`}>{icon} {label}</button>)}
    </div>
   </div>
  </section>

  <section id="music" className="mx-auto max-w-6xl px-5 pt-12 md:px-12">
   <div className="flex items-end justify-between">
    <div>
     <div className="text-xs uppercase tracking-[.28em] text-white/40">Playlists</div>
     <h2 className="section-title mt-2 text-4xl">গানের ঘর</h2>
    </div>
    <button onClick={()=>setMood('')} className="text-sm text-white/45">সব গান</button>
   </div>
   <div className="mt-6 grid gap-4 md:grid-cols-3">
    {collections.map(([name,desc],i)=><motion.div whileHover={{y:-5}} key={name} className={`glass rounded-[28px] p-5 ${i===0?'bg-[#6d3328]/30':i===1?'bg-[#1d2747]/30':'bg-[#56331f]/30'}`}>
     <div className="mb-8 flex h-28 items-end rounded-2xl border border-white/10 bg-gradient-to-br from-[#f2ca55]/25 via-[#7c3828]/30 to-[#151d39]/60 p-4"><span className="bengali text-3xl text-[#f2ca55]">{i===0?'পুজো':i===1?'মহালয়া':'কলকাতা'}</span></div>
     <h3 className="text-xl font-semibold">{name}</h3><p className="mt-2 text-sm leading-6 text-white/55">{desc}</p>
    </motion.div>)}
   </div>
   
   <div className="mt-6 flex flex-col gap-2">
    {filtered.map((s,i)=><motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*.02}} key={s.id} className="flex items-center gap-4 rounded-2xl p-2 hover:bg-white/5 transition cursor-pointer" onClick={()=>play(s)}>
     <span className="text-[#f2ca55] text-sm font-medium w-6 text-center">{(i+1).toString().padStart(2, '0')}</span>
     <img src={s.cover} alt="cover" className="h-12 w-12 rounded-md object-cover" />
     <div className="min-w-0 flex-1">
      <div className="truncate font-semibold text-[#f2ca55]">{s.title}</div>
      <div className="truncate text-xs text-white/60">{s.artist}</div>
     </div>
     <span className="text-xs text-white/40">{s.duration}</span>
    </motion.div>)}
   </div>
  </section>

  <section className="mx-auto max-w-6xl px-5 pt-14 md:px-12">
   <div className="glass relative overflow-hidden rounded-[34px] p-7 md:p-10">
    <div className="absolute -right-16 -top-20 h-60 w-60 rounded-full bg-[#f2ca55]/10 blur-3xl"/>
    <div className="max-w-2xl">
     <div className="text-xs uppercase tracking-[.28em] text-white/40">Old Calcutta room</div>
     <h2 className="section-title mt-3 text-4xl md:text-5xl">শহর, স্মৃতি, আর কিছু পুরনো গান।</h2>
     <p className="bengali mt-4 leading-8 text-white/60">Coffee House-এর আড্ডা, বৃষ্টির জানলা, হলুদ রাস্তার আলো—Vintage Old Calcutta collection-এ শহরের অন্য একটা সময়কে শুনে নাও।</p>
     <button onClick={()=>setMood('কলকাতার সন্ধ্যা')} className="mt-6 rounded-full border border-[#f2ca55]/30 bg-[#f2ca55]/10 px-5 py-3 text-[#f2ca55]">কলকাতার সন্ধ্যা চালাও</button>
    </div>
   </div>
  </section>

  <footer className="mx-auto flex max-w-6xl flex-col gap-4 px-5 pb-8 pt-14 text-sm text-white/40 md:flex-row md:items-center md:justify-between md:px-12">
   <div><span className="bengali text-lg text-white/70">মনের কথা</span> · made with bhalobasha</div>
   <button onClick={()=>setShowContrib(true)} className="hover:text-white">About the creator</button>
  </footer>

  <AnimatePresence>
   {showContrib&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5 backdrop-blur-md">
    <motion.div initial={{y:30,scale:.97}} animate={{y:0,scale:1}} exit={{y:30,scale:.97}} className="glass relative w-full max-w-xl rounded-[34px] p-6 md:p-8">
     <button onClick={()=>setShowContrib(false)} className="absolute right-5 top-5 rounded-full bg-white/5 p-2"><X size={20}/></button>
     <div className="text-center text-xs uppercase tracking-[.35em] text-white/45">Made with bhalobasha by</div>
     <div className="mt-6 rounded-[28px] border border-white/10 bg-black/10 p-7 text-center">
      <img src="https://raw.githubusercontent.com/SagnikChakraborty27d/moner-kotha/main/sagnik-profile.png" alt="Sagnik Chakraborty" className="mx-auto h-28 w-28 rounded-full object-cover ring-2 ring-white/15"/>
      <h3 className="mt-5 text-2xl font-semibold">Sagnik Chakraborty</h3>
      <p className="mt-2 text-sm text-white/50">Founder • Developer • Designer • Music Curator</p>
      <div className="mt-6 flex justify-center gap-3">
       <a aria-label="Instagram" href="https://www.instagram.com/schakraborty_floyd/" target="_blank" className="glass rounded-full p-3"><Instagram size={19}/></a>
       <a aria-label="LinkedIn" href="https://www.linkedin.com/in/sagnik-chakraborty-0ab57240a" target="_blank" className="glass rounded-full p-3"><Linkedin size={19}/></a>
      </div>
     </div>
    </motion.div>
   </motion.div>}
  </AnimatePresence>

  {active&&<><audio src={active.previewUrl} autoPlay className="hidden" /><div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#1b1417]/90 px-4 py-3 backdrop-blur-2xl"><div className="mx-auto flex max-w-6xl items-center gap-3"><div className="hidden h-12 w-12 place-items-center rounded-xl bg-[#7c3828] sm:grid"><Music2 size={20}/></div><div className="min-w-0 flex-1"><div className="truncate font-semibold">{active.title}</div><div className="truncate text-xs text-white/45">{active.artist}</div></div><button className="hidden rounded-full p-2 text-white/60 sm:block"><SkipBack size={18}/></button><button onClick={()=>setActive(null)} className="grid h-11 w-11 place-items-center rounded-full bg-[#f2ca55] text-[#26160f]"><Pause size={18} fill="currentColor"/></button><button className="hidden rounded-full p-2 text-white/60 sm:block"><SkipForward size={18}/></button><div className="hidden items-center gap-2 text-xs text-white/40 md:flex"><ListMusic size={17}/> {wish.length} saved</div></div></div></>}
 </main>
  }
