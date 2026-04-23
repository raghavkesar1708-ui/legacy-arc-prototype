/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  Trophy, 
  Users, 
  LayoutGrid, 
  MessageSquare, 
  Bell, 
  Search, 
  TrendingUp, 
  Gamepad2, 
  Share2, 
  ExternalLink, 
  Clock, 
  MapPin, 
  Star, 
  ShieldCheck,
  ChevronRight,
  MoreVertical,
  Heart,
  Plus,
  BarChart3
} from "lucide-react";

// --- THEME & CONSTANTS ---
const C = {
  bg: "#05050F",
  card: "#0D0D1E",
  cardB: "#1A1A35",
  purple: "#7C5CFC",
  purpleL: "#9B7FFF",
  purpleD: "#4A31B8",
  gold: "#F5A623",
  teal: "#00D4B4",
  red: "#FF4757",
  green: "#2ED573",
  gray: "#8888AA",
  white: "#FFFFFF",
  text: "#C8C8E8",
  orange: "#E8863A",
};

const GAMES = [
  { id: "bgmi", name: "BGMI", color: "#F5A623" },
  { id: "val", name: "Valorant", color: "#FF4655" },
  { id: "ff", name: "Free Fire", color: "#FF8C00" },
  { id: "cod", name: "COD Mobile", color: "#00A8E8" },
  { id: "pubg", name: "PUBG PC", color: "#F0D060" },
  { id: "cs2", name: "CS2", color: "#FF6B35" }
];

const BGIS_STANDINGS = [
  { rank: 1, name: "GodLike Esports", tag: "GLE", wwcd: 12, kills: 187, pts: 524, trend: "up", color: "#F5A623" },
  { rank: 2, name: "OR Esports", tag: "OR", wwcd: 9, kills: 163, pts: 478, trend: "up", color: "#9B7FFF" },
  { rank: 3, name: "Team XO", tag: "XO", wwcd: 8, kills: 154, pts: 443, trend: "down", color: "#00D4B4" },
  { rank: 4, name: "Blind Esports", tag: "BE", wwcd: 7, kills: 141, pts: 408, trend: "stable", color: "#FF4757" },
  { rank: 5, name: "Entity Gaming", tag: "EG", wwcd: 6, kills: 128, pts: 367, trend: "up", color: "#2ED573" },
];

const FEED_POSTS = [
  { id: 1, user: "ScoutOP", content: "Just hit Conqueror this season! 🔥 Top 500 India grinding continues.", tag: "BGMI", time: "2h ago", likes: 124, avatar: "S", color: "#F5A623" },
  { id: 2, user: "ZephyrX", content: "Need 2 for Valorant ranked push — Diamond+ only, mic required. DM me 🎮", tag: "LFG", time: "4h ago", likes: 18, avatar: "Z", color: "#FF4655" },
  { id: 3, user: "LegacyArc", content: "GodLike wins BGMI Pro Series Week 3! ClutchGod drops 18 kills in the final circle 🏆", tag: "Esports", time: "5h ago", likes: 342, avatar: "LA", color: "#7C5CFC" },
];

// --- COMPONENTS ---

const Badge = ({ children, color = C.purple, className = "" }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-opacity-20 border border-opacity-30 ${className}`} 
        style={{ color: color, backgroundColor: color + "33", borderColor: color + "4D" }}>
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-[#0D0D1E] border border-[#1A1A35] rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary: `bg-[#7C5CFC] hover:bg-[#9B7FFF] text-white`,
    outline: `bg-transparent border border-[#7C5CFC] text-[#7C5CFC] hover:bg-[#7C5CFC] hover:bg-opacity-10`,
    ghost: `bg-transparent hover:bg-white hover:bg-opacity-5 text-[#8888AA] hover:text-white`,
  };

  return (
    <button 
      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// --- PAGES ---

function HomePage({ onNavigate }) {
  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center overflow-hidden border-b border-[#1A1A35]">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_-20%,#1A1A35_0%,#05050F_80%)]" />
        {/* Animated Grid Background Simulation */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: `linear-gradient(${C.cardB} 1px, transparent 1px), linear-gradient(90deg, ${C.cardB} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <Badge className="mb-4">India's Premier Gaming Identity</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white font-['Rajdhani'] uppercase italic">
            One identity. Every game. Forever.
          </h1>
          <p className="text-[#8888AA] text-lg mb-8 max-w-2xl mx-auto">
            Legacy Arc is the permanent home for your identity, legacy, and community. Connect your stats, find your squad, and compete in the arena.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="px-8 py-3 text-base" onClick={() => onNavigate('profile')}>Build Your Gamer Card</Button>
            <Button variant="outline" className="px-8 py-3 text-base" onClick={() => onNavigate('esports')}>Explore Tournaments</Button>
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <div className="max-w-6xl mx-auto w-full px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Simulated Demo", val: "591M+", color: C.green },
          { label: "Market by 2027", val: "$8.6B", color: C.teal },
          { label: "Active Squads", val: "472", color: C.gold },
          { label: "Profile Views", val: "24.1K", color: C.purple },
        ].map((s, i) => (
          <Card key={i} className="p-4 text-center">
            <div className="text-2xl font-bold text-white font-['Rajdhani']" style={{ color: s.color }}>{s.val}</div>
            <div className="text-[10px] text-[#8888AA] uppercase font-semibold tracking-wider mt-1">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Feed Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-['Rajdhani'] text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp size={20} className="text-[#7C5CFC]" />
              Community Feed
            </h2>
            <Button variant="ghost" className="text-xs">Filter: All</Button>
          </div>

          <div className="space-y-4">
            {FEED_POSTS.map(post => (
              <Card key={post.id} className="p-4 hover:border-[#7C5CFC] transition-colors duration-200">
                <div className="flex gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-['Rajdhani'] text-lg border-2" 
                       style={{ backgroundColor: post.color + "22", color: post.color, borderColor: post.color + "44" }}>
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{post.user}</span>
                      <Badge color={post.color === C.purple ? C.teal : post.color}>{post.tag}</Badge>
                      <span className="text-[11px] text-[#8888AA] ml-auto">{post.time}</span>
                    </div>
                    <p className="text-sm text-[#C8C8E8] mt-1 pr-4 leading-relaxed">{post.content}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-3 border-t border-[#1A1A35]">
                  <button className="flex items-center gap-1.5 text-xs text-[#8888AA] hover:text-[#FF4757] transition-colors">
                    <Heart size={14} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-[#8888AA] hover:text-white transition-colors">
                    <MessageSquare size={14} /> Comment
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-[#8888AA] hover:text-[#7C5CFC] transition-colors ml-auto">
                    <Share2 size={14} /> Share
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Esports Teaser */}
          <Card className="p-5 border-l-4 border-[#F5A623] bg-gradient-to-br from-[#0D0D1E] to-[#1A110D]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold font-['Rajdhani'] text-white uppercase tracking-wider flex items-center gap-2">
                <Trophy size={16} className="text-[#F5A623]" />
                Live Esports
              </h3>
              <div className="w-2 h-2 rounded-full bg-[#FF4757] animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white font-semibold">BGIS 2026 Finals</span>
                <Badge color={C.gold}>Day 4</Badge>
              </div>
              <div className="space-y-2">
                {BGIS_STANDINGS.slice(0, 3).map((team, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-[#1A1A35] last:border-0">
                    <span className="text-xs font-bold text-[#8888AA] w-4">#{team.rank}</span>
                    <span className="text-sm text-[#C8C8E8] flex-1">{team.name}</span>
                    <span className="text-sm font-bold text-white font-['Rajdhani']">{team.pts}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full text-xs" onClick={() => onNavigate('esports')}>View Full Table</Button>
            </div>
          </Card>

          {/* LFG / AI Match Teaser */}
          <Card className="p-5 border-l-4 border-[#00D4B4] bg-gradient-to-br from-[#0D0D1E] to-[#0D1E1A]">
            <h3 className="font-bold font-['Rajdhani'] text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <Users size={16} className="text-[#00D4B4]" />
              Squad Finder
            </h3>
            <p className="text-xs text-[#8888AA] mb-4">ML models found 12 gamers who match your playstyle and vibe.</p>
            <div className="flex -space-x-3 mb-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-[#1A1A35] border-2 border-[#0D0D1E] flex items-center justify-center text-[10px] text-white">
                  {i === 4 ? "+8" : <User size={14} />}
                </div>
              ))}
            </div>
            <Button className="w-full text-xs bg-[#00D4B4] hover:bg-[#00FDC0]" onClick={() => onNavigate('squad')}>Match Me Now</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ProfilePage({ onNavigate }) {
  const [profile] = useState({
    alias: "ScoutOP",
    name: "Tanmay Singh",
    city: "Mumbai, MH",
    tagline: "Aggressive Rusher | IGL | Content Creator",
    rank: "Conqueror",
    rankPoints: "9,842",
    mainGame: "BGMI",
    kd: "4.2",
    winRate: "68%",
    nationalRank: "#312",
    achievements: ["Conqueror S28", "BGMI Pro Series Finalist", "Top 500 India"],
    games: ["BGMI", "Valorant", "CS2", "Free Fire"]
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-10 px-6 space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Gamer Card */}
        <div className="md:col-span-1">
          <Card className="relative p-0 border-2 border-[#7C5CFC]">
            {/* Holographic Header */}
            <div className="bg-gradient-to-r from-[#4A31B8] to-[#1A1A35] p-4 text-center border-b border-[#7C5CFC] border-opacity-30">
              <div className="text-[10px] font-bold text-white tracking-[4px] uppercase opacity-60 mb-2">Gamer Identification</div>
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#7C5CFC] to-[#00D4B4] p-1 shadow-lg shadow-[#7C5CFC] shadow-opacity-40">
                <div className="w-full h-full rounded-full bg-[#0D0D1E] flex items-center justify-center">
                  <User size={48} className="text-white" />
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold font-['Rajdhani'] text-white uppercase italic tracking-wide">{profile.alias}</h2>
                  <span className="bg-[#2ED573] text-black text-[8px] font-black px-1.5 py-0.5 rounded leading-none flex items-center gap-0.5">
                    ✓ <span className="tracking-tighter">VERIFIED</span>
                  </span>
                </div>
                <div className="text-[11px] text-[#8888AA] font-semibold">{profile.name} • {profile.city}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[#05050F] border border-[#1A1A35] text-center">
                  <div className="text-lg font-bold text-[#F5A623] font-['Rajdhani']">{profile.rank}</div>
                  <div className="text-[9px] text-[#8888AA] uppercase font-bold tracking-wider">Current Rank</div>
                </div>
                <div className="p-3 rounded-lg bg-[#05050F] border border-[#1A1A35] text-center">
                  <div className="text-lg font-bold text-[#00D4B4] font-['Rajdhani']">{profile.kd}</div>
                  <div className="text-[9px] text-[#8888AA] uppercase font-bold tracking-wider">Lifetime K/D</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8888AA]">
                  <span>National Rank</span>
                  <span className="text-[#F5A623] font-bold font-['Rajdhani'] text-sm">{profile.nationalRank}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#8888AA]">
                  <span>Win Rate</span>
                  <span className="text-[#00D4B4] font-bold font-['Rajdhani'] text-sm">{profile.winRate}</span>
                </div>
                <div className="w-full h-1 bg-[#1A1A35] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#7C5CFC] to-[#00D4B4]" style={{ width: '68%' }} />
                </div>
              </div>

              <div className="pt-4 border-t border-[#1A1A35] flex flex-col gap-2">
                <Badge className="w-full justify-center py-1.5 cursor-pointer hover:bg-opacity-40">
                  <Share2 size={12} className="mr-1" /> Share Profile Link
                </Badge>
                <CopyProfileButton />
              </div>
            </div>
            
            {/* Visual Flair */}
            <div className="absolute top-2 right-2 w-1.5 h-6 bg-[#00D4B4] rounded-full opacity-50" />
          </Card>
        </div>

        {/* Right Column: Details & Stats */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold font-['Rajdhani'] text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Gamepad2 size={18} className="text-[#7C5CFC]" />
              Gaming Resume
            </h3>
            <p className="text-sm text-[#8888AA] italic mb-6 leading-relaxed">"{profile.tagline}"</p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] text-[#8888AA] font-bold uppercase tracking-widest mb-3">Top Achievements</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.achievements.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1A1A35] border border-[#7C5CFC] border-opacity-30">
                      <Star size={12} className="text-[#F5A623]" />
                      <span className="text-xs text-white font-medium">{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[10px] text-[#8888AA] font-bold uppercase tracking-widest mb-3">Primary Games</h4>
                  <div className="space-y-2">
                    {profile.games.map((g, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-[#05050F] border border-[#1A1A35]">
                        <span className="text-xs text-white uppercase font-bold tracking-tighter">{g}</span>
                        <ExternalLink size={10} className="text-[#8888AA]" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] text-[#8888AA] font-bold uppercase tracking-widest mb-3">Verified Integrations</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#2ED573] p-2 rounded bg-[#05050F] border border-[#1A1A35]">
                      <ShieldCheck size={14} /> <span>Krafton ID Verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#00A8E8] p-2 rounded bg-[#05050F] border border-[#1A1A35]">
                      <ShieldCheck size={14} /> <span>Steam Profile Linked</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-[#0D0D1E] to-[#05050F]">
            <h3 className="text-lg font-bold font-['Rajdhani'] text-white uppercase tracking-wider mb-4">Stats Over Time</h3>
            <div className="h-40 flex items-end gap-2 justify-between px-2">
              {[40, 60, 45, 75, 55, 90, 80, 70, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-[#1A1A35] rounded-t-lg relative group overflow-hidden">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="absolute bottom-0 w-full bg-gradient-to-t from-[#7C5CFC] to-[#00D4B4]"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[9px] text-[#8888AA] font-bold uppercase tracking-widest">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Nov</span>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// COPY PROFILE LINK BUTTON
// ============================================

function CopyProfileButton() {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText('legacyarc.in/@scoutop');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button 
      variant="outline" 
      className="w-full text-[10px] tracking-widest uppercase"
      onClick={handleCopy}
    >
      {copied ? '✅ Link Copied!' : '📋 Share Gamer Card'}
    </Button>
  );
}

function EsportsPage() {
  const [activeTab, setActiveTab] = useState("bgmi");
  
  const tournaments = [
    { id: 1, title: "BGMI Pro Series S4", org: "Krafton India", prize: "₹50 Lakhs", status: "Open", date: "May 20, 2026", color: "#F5A623" },
    { id: 2, title: "VCT India Open S2", org: "Riot Games India", prize: "₹25 Lakhs", status: "Registering", date: "May 28, 2026", color: "#FF4655" },
    { id: 3, title: "Free Fire India S8", org: "Garena India", prize: "₹20 Lakhs", status: "Announced", date: "June 05, 2026", color: "#FF8C00" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto py-10 px-6 space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-['Rajdhani'] text-white uppercase tracking-wider italic">Esports Arena</h2>
          <p className="text-[#8888AA] text-sm mt-1">Tournament discovery engine and 1-click registration.</p>
          <div className="text-[#F5A623] text-[10px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1">
             <ShieldCheck size={12} /> Official data via Krafton India
          </div>
        </div>
        <div className="flex gap-2 p-1 rounded-lg bg-[#0D0D1E] border border-[#1A1A35]">
          {["bgmi", "valorant", "free fire", "others"].map(t => (
            <button 
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === t ? 'bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC] shadow-opacity-30' : 'text-[#8888AA] hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tournament Feed */}
        <div className="lg:col-span-2 space-y-4">
          {tournaments.map(t => (
            <Card key={t.id} className="relative group">
              <div className="flex flex-col md:flex-row p-6 items-center gap-6">
                <div className="w-24 h-24 rounded-lg bg-[#05050F] flex items-center justify-center p-4 border border-[#1A1A35]">
                  <Gamepad2 size={40} style={{ color: t.color }} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#8888AA] uppercase tracking-widest">{t.org}</span>
                    <Badge color={t.status === "Open" ? C.green : C.gold}>{t.status}</Badge>
                  </div>
                  <h3 className="text-xl font-bold font-['Rajdhani'] text-white uppercase tracking-wider">{t.title}</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-xs text-[#8888AA]">
                    <span className="flex items-center gap-1.5"><Clock size={14} /> Starts: {t.date}</span>
                    <span className="flex items-center gap-1.5 text-[#F5A623] font-bold"><Trophy size={14} /> {t.prize} Pool</span>
                  </div>
                </div>
                <Button className="w-full md:w-auto px-10">Register</Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Live Standings Sidebar */}
        <div className="space-y-6">
          <Card className="p-5 border-t-2 border-[#7C5CFC]">
            <h3 className="font-bold font-['Rajdhani'] text-white uppercase tracking-wider mb-6 flex items-center justify-between">
              Live Standings
              <div className="flex items-center gap-2 text-[10px] text-[#FF4757]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF4757] animate-pulse" /> LIVE
              </div>
            </h3>
            
            <div className="space-y-2">
              <div className="grid grid-cols-12 px-2 text-[9px] font-bold text-[#8888AA] uppercase tracking-widest pb-2 border-b border-[#1A1A35]">
                <div className="col-span-2">#</div>
                <div className="col-span-6">Team</div>
                <div className="col-span-2 text-center">WWCD</div>
                <div className="col-span-2 text-right">Pts</div>
              </div>
              {BGIS_STANDINGS.map((team, i) => (
                <div key={i} className="grid grid-cols-12 px-2 py-3 items-center hover:bg-white hover:bg-opacity-[0.02] rounded-lg transition-colors cursor-pointer">
                  <div className="col-span-2 text-xs font-bold text-[#8888AA]">{team.rank}</div>
                  <div className="col-span-6 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#05050F] flex items-center justify-center text-[9px] font-bold" style={{ color: team.color }}>{team.tag}</div>
                    <span className="text-xs text-white font-medium truncate">{team.name}</span>
                  </div>
                  <div className="col-span-2 text-center text-xs text-[#00A8E8] font-bold">{team.wwcd}</div>
                  <div className="col-span-2 text-right text-xs font-bold font-['Rajdhani'] text-white">{team.pts}</div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-6 text-[10px] tracking-widest uppercase">Full Statistics Hub</Button>
          </Card>
          
          <Card className="p-5">
            <h3 className="font-bold font-['Rajdhani'] text-white uppercase tracking-wider mb-4">Market News</h3>
            <div className="space-y-4">
              {[
                "Global Esports qualify for VCT Asia Pacific",
                "GodLike adds new coach ahead of BGMS S4",
                "Indian Govt announces Esports fund of ₹500Cr"
              ].map((n, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="text-[10px] text-[#7C5CFC] font-bold uppercase mb-1">2h ago</div>
                  <div className="text-sm text-white group-hover:text-[#7C5CFC] transition-colors leading-tight">{n}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* ============================================ */}
      {/* LIVE TOURNAMENT LEADERBOARD                  */}
      {/* ============================================ */}
      <Card className="p-6 border-t-2 border-[#FF4757]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold font-['Rajdhani'] text-white uppercase tracking-wider flex items-center gap-3">
              🏆 Live Tournament Leaderboard
              <div className="flex items-center gap-2 text-[10px] text-[#FF4757]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF4757] animate-pulse" /> LIVE
              </div>
            </h3>
            <p className="text-[#8888AA] text-xs mt-1">BGMI Pro Series S4 — Round 3/6 in progress</p>
          </div>
          <Badge color={C.gold}>12 Teams Active</Badge>
        </div>

        {/* Live Match Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { team1: "GodLike", team2: "OR Esports", score1: 64, score2: 52, map: "Erangel", time: "12:34" },
            { team1: "Team XO", team2: "Blind", score1: 48, score2: 41, map: "Miramar", time: "08:21" },
            { team1: "Entity", team2: "TSM India", score1: 55, score2: 38, map: "Sanhok", time: "15:02" },
          ].map((match, i) => (
            <div key={i} className="p-4 rounded-lg bg-[#05050F] border border-[#1A1A35] hover:border-[#FF4757] hover:border-opacity-40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-[#8888AA] uppercase font-bold tracking-widest">{match.map}</span>
                <span className="text-[10px] text-[#FF4757] font-bold font-['Rajdhani']">{match.time}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="text-center flex-1">
                  <div className="text-xs text-white font-bold mb-1 truncate">{match.team1}</div>
                  <div className="text-2xl font-bold font-['Rajdhani'] text-[#F5A623]">{match.score1}</div>
                </div>
                <div className="text-[10px] font-black text-[#8888AA] uppercase">VS</div>
                <div className="text-center flex-1">
                  <div className="text-xs text-white font-bold mb-1 truncate">{match.team2}</div>
                  <div className="text-2xl font-bold font-['Rajdhani'] text-[#9B7FFF]">{match.score2}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Tournament Standings */}
        <div>
          <h4 className="text-sm font-bold font-['Rajdhani'] text-white uppercase tracking-wider mb-4">Overall Tournament Standings</h4>
          <div className="overflow-hidden rounded-lg border border-[#1A1A35]">
            <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-[#0D0D1E] text-[9px] font-bold text-[#8888AA] uppercase tracking-widest">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Team</div>
              <div className="col-span-2 text-center">WWCD</div>
              <div className="col-span-2 text-center">Kills</div>
              <div className="col-span-2 text-right">Total Pts</div>
            </div>
            {[
              { rank: 1, team: "GodLike Esports", tag: "GLE", wwcd: 8, kills: 142, pts: 412, color: "#F5A623" },
              { rank: 2, team: "OR Esports", tag: "OR", wwcd: 6, kills: 128, pts: 378, color: "#9B7FFF" },
              { rank: 3, team: "Team XO", tag: "XO", wwcd: 5, kills: 119, pts: 344, color: "#00D4B4" },
              { rank: 4, team: "Blind Esports", tag: "BE", wwcd: 4, kills: 108, pts: 298, color: "#FF4757" },
              { rank: 5, team: "Entity Gaming", tag: "EG", wwcd: 3, kills: 98, pts: 267, color: "#2ED573" },
              { rank: 6, team: "TSM India", tag: "TSM", wwcd: 3, kills: 91, pts: 254, color: "#00A8E8" },
              { rank: 7, team: "Reckoning", tag: "RE", wwcd: 2, kills: 85, pts: 221, color: "#FF8C00" },
              { rank: 8, team: "Marcos Gaming", tag: "MG", wwcd: 2, kills: 78, pts: 198, color: "#CC44FF" },
            ].map((team, i) => (
              <div key={i} className={`grid grid-cols-12 gap-2 px-4 py-3 items-center border-t border-[#1A1A35] hover:bg-white hover:bg-opacity-[0.02] transition-colors ${i === 0 ? 'bg-[#F5A623] bg-opacity-[0.03]' : ''} ${i < 3 ? 'border-l-2 border-l-[#7C5CFC]' : ''}`}>
                <div className="col-span-1 text-xs font-bold font-['Rajdhani']" style={{ color: i === 0 ? '#F5A623' : i < 3 ? '#7C5CFC' : '#8888AA' }}>
                  #{team.rank}
                </div>
                <div className="col-span-5 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ background: `${team.color}25`, color: team.color }}>{team.tag}</div>
                  <span className="text-xs text-white font-medium truncate">{team.team}</span>
                </div>
                <div className="col-span-2 text-center text-xs text-[#00D4B4] font-bold">{team.wwcd}</div>
                <div className="col-span-2 text-center text-xs text-[#C8C8E8]">{team.kills}</div>
                <div className="col-span-2 text-right text-sm font-bold font-['Rajdhani'] text-white">{team.pts}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Prize Pool Breakdown Bar */}
        <div className="mt-6 p-4 rounded-lg bg-[#05050F] border border-[#1A1A35]">
          <h4 className="text-xs font-bold text-[#8888AA] uppercase tracking-widest mb-3">💰 Prize Pool — ₹50,00,000</h4>
          <div className="space-y-2">
            {[
              { place: "🥇 1st", amount: "₹25,00,000", pct: 50, color: "#F5A623" },
              { place: "🥈 2nd", amount: "₹12,00,000", pct: 24, color: "#9B7FFF" },
              { place: "🥉 3rd", amount: "₹6,00,000", pct: 12, color: "#00D4B4" },
              { place: "4th-8th", amount: "₹1,40,000 each", pct: 14, color: "#8888AA" },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-[#C8C8E8] w-16">{p.place}</span>
                <div className="flex-1 h-2 bg-[#1A1A35] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
                <span className="text-xs font-bold text-white w-24 text-right">{p.amount}</span>
                <span className="text-[10px] text-[#8888AA] w-8">{p.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <TopPerformers />
    </motion.div>
  );
}

// ============================================
// TOP PERFORMERS COMPONENT
// ============================================

function TopPerformers() {
  const performers = [
    { name: "ClutchGod", team: "GodLike Esports", role: "IGL/Fragger", kd: "4.8", kills: 187, mvps: 6, top: true },
    { name: "Goblin", team: "OR Esports", role: "Fragger", kd: "4.1", kills: 162, mvps: 5 },
    { name: "Jonathan", team: "Team XO", role: "Fragger", kd: "3.7", kills: 154, mvps: 4 },
    { name: "Ronak", team: "Blind Esports", role: "Fragger", kd: "3.8", kills: 141, mvps: 4 },
  ];

  return (
    <Card className="p-6 mt-6">
      <h3 className="font-bold font-['Rajdhani'] text-white uppercase tracking-wider mb-4">⭐ Top Performers — BGIS 2026</h3>
      <div className="space-y-3">
        {performers.map((p, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-[#05050F] border border-[#1A1A35] hover:border-[#7C5CFC] hover:border-opacity-30 transition-all">
            <span className="text-lg font-bold font-['Rajdhani']" style={{ color: i === 0 ? '#F5A623' : '#8888AA' }}>#{i + 1}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{p.name}</span>
                {p.top && <span className="text-[10px]">🏆</span>}
              </div>
              <div className="text-[10px] text-[#8888AA]">{p.team} • {p.role}</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-[#00D4B4]">{p.kd}</div>
              <div className="text-[9px] text-[#8888AA]">K/D</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-[#F5A623]">{p.kills}</div>
              <div className="text-[9px] text-[#8888AA]">Kills</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-[#7C5CFC]">{p.mvps}</div>
              <div className="text-[9px] text-[#8888AA]">MVPs</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SquadPage() {
  const [matching, setMatching] = useState(false);
  const [result, setResult] = useState(null);

  const performMatch = () => {
    setMatching(true);
    setResult(null);
    setTimeout(() => {
      setMatching(false);
      setResult({
        squads: [
          { name: "Team Phoenix", match: "98% Match", players: ["Nighthawk", "ZephyrX", "CrazyPriya"], vibes: ["Aggressive", "Late Night", "Competitive"] },
          { name: "The Alphas", match: "84% Match", players: ["ShadowByte", "TurboQ", "IceWolf99"], vibes: ["Chill", "Weekends", "Tactical"] }
        ]
      });
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto py-10 px-6 space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold font-['Rajdhani'] text-white uppercase tracking-wider italic">Squad Matcher</h2>
        <p className="text-[#8888AA] text-sm">AI-driven playstyle and communication analysis for long-term squad building.</p>
      </div>

      <Card className="p-8 border-2 border-dashed border-[#1A1A35] bg-[#05050F]">
        {!result ? (
          <div className="flex flex-col items-center gap-6">
            <div className={`p-6 rounded-full bg-[#1A1A35] text-[#7C5CFC] ${matching ? 'animate-pulse' : ''}`}>
              <Users size={64} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">Find your permanent squads</h3>
              <p className="text-[#8888AA] text-sm max-w-sm">Our models analyze your recent matches, communication frequency, and team contribution to find the perfect vibe.</p>
            </div>
            <Button 
              className="px-12 py-3" 
              onClick={performMatch}
              disabled={matching}
            >
              {matching ? "Analyzing Playstyles..." : "Start AI Matching"}
            </Button>
            {matching && (
              <div className="w-full max-w-xs h-1 bg-[#1A1A35] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="h-full w-24 bg-[#7C5CFC] shadow-[0_0_10px_#7C5CFC]"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white text-center">Top Matches Found</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.squads.map((s, i) => (
                <Card key={i} className="p-5 hover:border-[#00D4B4] transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-white uppercase tracking-wide">{s.name}</h4>
                    <span className="text-[10px] font-black text-[#00D4B4] tracking-widest">{s.match}</span>
                  </div>
                  <div className="flex -space-x-2 mb-4">
                    {s.players.map((p, j) => (
                      <div key={j} className="w-8 h-8 rounded-full bg-[#1A1A35] border-2 border-[#0D0D1E] flex items-center justify-center text-[8px] text-white font-bold">
                        {p.charAt(0)}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.vibes.map((v, j) => (
                      <Badge key={j} color={C.teal} className="text-[8px]">{v}</Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-6 text-xs">Request Entry</Button>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button variant="ghost" onClick={() => setResult(null)}>Reset Search</Button>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

// ============================================
// LEADERBOARD PAGE
// ============================================

function LeaderboardPage() {
  const [region, setRegion] = useState("National");
  const [game, setGame] = useState("BGMI");
  
  const leaderboardData = [
    { rank: 1, alias: "ScoutOP", game: "BGMI", kd: "4.2", tier: "Conqueror", state: "Maharashtra", pts: 9842, color: "#F5A623" },
    { rank: 2, alias: "Jonathan", game: "BGMI", kd: "3.9", tier: "Conqueror", state: "Karnataka", pts: 9621, color: "#9B7FFF" },
    { rank: 3, alias: "Mortal", game: "BGMI", kd: "3.7", tier: "Conqueror", state: "Maharashtra", pts: 9445, color: "#00D4B4" },
    { rank: 4, alias: "Dynamo", game: "BGMI", kd: "3.5", tier: "Ace Master", state: "Gujarat", pts: 9102, color: "#FF4757" },
    { rank: 5, alias: "ClutchGod", game: "BGMI", kd: "3.4", tier: "Ace Master", state: "Delhi", pts: 8876, color: "#2ED573" },
    { rank: 6, alias: "Kaztro", game: "BGMI", kd: "3.2", tier: "Ace", state: "Tamil Nadu", pts: 8654, color: "#00A8E8" },
    { rank: 7, alias: "Zgod", game: "BGMI", kd: "3.1", tier: "Ace", state: "Delhi", pts: 8421, color: "#FF8C00" },
    { rank: 8, alias: "Mavi", game: "Valorant", kd: "1.38", tier: "Radiant", state: "Maharashtra", pts: 8198, color: "#FF4655" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto py-10 px-6 space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold font-['Rajdhani'] text-white uppercase tracking-wider italic">Leaderboard</h2>
          <p className="text-[#8888AA] text-sm mt-1">District, state, and national rankings — updated live.</p>
        </div>
        <div className="flex gap-2 p-1 rounded-lg bg-[#0D0D1E] border border-[#1A1A35]">
          {["National", "State", "District"].map(r => (
            <button 
              key={r}
              onClick={() => setRegion(r)}
              className={`px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-widest transition-all ${region === r ? 'bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC] shadow-opacity-30' : 'text-[#8888AA] hover:text-white'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#0D0D1E] text-[10px] font-bold text-[#8888AA] uppercase tracking-widest border-b border-[#1A1A35]">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Player</div>
          <div className="col-span-2">Game</div>
          <div className="col-span-2 text-center">Tier</div>
          <div className="col-span-1 text-center">K/D</div>
          <div className="col-span-2 text-right">Score</div>
        </div>
        {leaderboardData.map((p, i) => (
          <div key={i} className={`grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-[#1A1A35] hover:bg-white hover:bg-opacity-[0.02] transition-colors ${i === 0 ? 'bg-[#F5A623] bg-opacity-[0.03]' : ''}`}>
            <div className="col-span-1 text-sm font-bold font-['Rajdhani']" style={{ color: i === 0 ? '#F5A623' : i < 3 ? '#7C5CFC' : '#8888AA' }}>
              #{p.rank}
            </div>
            <div className="col-span-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white border" style={{ background: `${p.color}25`, borderColor: `${p.color}50` }}>
                {p.alias.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{p.alias}</div>
                <div className="text-[10px] text-[#8888AA]">{p.state}</div>
              </div>
            </div>
            <div className="col-span-2 text-xs text-[#C8C8E8]">{p.game}</div>
            <div className="col-span-2 text-center">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: `${p.color}20`, color: p.color }}>{p.tier}</span>
            </div>
            <div className="col-span-1 text-center text-xs text-[#00D4B4] font-bold">{p.kd}</div>
            <div className="col-span-2 text-right text-sm font-bold font-['Rajdhani'] text-white">{p.pts.toLocaleString()}</div>
          </div>
        ))}
      </Card>
    </motion.div>
  );
}

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavItem = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
        active 
          ? 'bg-[#7C5CFC] text-white shadow-lg shadow-[#7C5CFC] shadow-opacity-30' 
          : 'text-[#8888AA] hover:text-white hover:bg-white hover:bg-opacity-5'
      }`}
    >
      {Icon && <Icon size={16} />}
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#05050F] text-[#C8C8E8] font-sans selection:bg-[#7C5CFC] selection:text-white">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-[#05050F] bg-opacity-90 backdrop-blur-xl border-b border-[#1A1A35] px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setCurrentPage('home')}
        >
          <div className="w-8 h-8 bg-[#7C5CFC] rounded flex items-center justify-center font-black text-white italic group-hover:scale-110 transition-transform">LA</div>
          <div className="flex items-center gap-1.5">
            <span className="font-['Rajdhani'] font-black text-xl italic tracking-widest text-white uppercase">
              Legacy <span className="text-[#7C5CFC]">Arc</span>
            </span>
            <span className="bg-[#7C5CFC] text-white text-[8px] font-bold px-1 rounded">BETA</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <NavItem id="home" label="Feed" icon={LayoutGrid} active={currentPage === 'home'} onClick={() => setCurrentPage('home')} />
          <NavItem id="esports" label="Esports" icon={Trophy} active={currentPage === 'esports'} onClick={() => setCurrentPage('esports')} />
          <NavItem id="squad" label="Squad" icon={Users} active={currentPage === 'squad'} onClick={() => setCurrentPage('squad')} />
          <NavItem id="leaderboard" label="Ranks" icon={BarChart3} active={currentPage === 'leaderboard'} onClick={() => setCurrentPage('leaderboard')} />
          <NavItem id="profile" label="Gamer Card" icon={User} active={currentPage === 'profile'} onClick={() => setCurrentPage('profile')} />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-[#1A1A35] rounded-lg px-3 py-1.5 gap-2 border border-[#7C5CFC] border-opacity-20">
            <Search size={14} className="text-[#8888AA]" />
            <input 
              type="text" 
              placeholder="Search identity..." 
              className="bg-transparent border-none outline-none text-xs text-white w-32 placeholder:text-zinc-600"
            />
          </div>
          <button className="p-2 text-[#8888AA] hover:text-white relative">
            <Bell size={20} />
            <div className="absolute top-1 right-1 w-2 h-2 bg-[#FF4757] rounded-full border-2 border-[#05050F]" />
          </button>
          <button className="p-2 text-[#8888AA] hover:text-white lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <LayoutGrid size={24} />
          </button>
          <div className="hidden md:flex items-center gap-3 ml-2 border-l border-[#1A1A35] pl-5">
            <Button variant="ghost" className="text-xs">Login</Button>
            <Button className="text-xs px-5">Join Hub</Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#05050F] pt-24 px-10 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {[
                { id: 'home', label: 'Community Feed', icon: LayoutGrid },
                { id: 'esports', label: 'Esports Hub', icon: Trophy },
                { id: 'squad', label: 'Squad Finder', icon: Users },
                { id: 'leaderboard', label: 'Leaderboard', icon: BarChart3 },
                { id: 'profile', label: 'Gamer Card', icon: User },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentPage(item.id); setIsMenuOpen(false); }}
                  className="flex items-center gap-4 text-2xl font-bold font-['Rajdhani'] uppercase tracking-widest text-[#8888AA] hover:text-white"
                >
                  <item.icon size={28} className="text-[#7C5CFC]" />
                  {item.label}
                </button>
              ))}
              <div className="pt-8 border-t border-[#1A1A35] flex flex-col gap-4">
                <Button className="w-full py-4 text-lg">Join Legacy Arc</Button>
                <Button variant="outline" className="w-full py-4 text-lg">Sign In</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main>
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'profile' && <ProfilePage onNavigate={setCurrentPage} />}
        {currentPage === 'esports' && <EsportsPage />}
        {currentPage === 'squad' && <SquadPage />}
        {currentPage === 'leaderboard' && <LeaderboardPage />}
      </main>

      {/* Global Footer (Simplified) */}
      <footer className="border-t border-[#1A1A35] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#7C5CFC] rounded flex items-center justify-center font-black text-white italic text-xs">LA</div>
            <span className="font-['Rajdhani'] font-black text-lg italic tracking-widest text-white uppercase">Legacy Arc</span>
          </div>
          <div className="flex gap-8 text-[11px] font-bold text-[#8888AA] uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Rules</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-[10px] text-[#8888AA] uppercase tracking-wider font-semibold">
            © 2026 Legacy Arc — The Identity Layer for India's 591 Million Gamers
          </div>
        </div>
      </footer>
    </div>
  );
}
