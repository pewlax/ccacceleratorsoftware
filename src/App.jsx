import { useState, useEffect } from "react";

/*
 * CC ACCELERATOR — Content Agency Command Center
 * Persistent storage for user accounts & client data.
 * Admin credentials are hardcoded and never displayed.
 * Clients sign up with invitation code: CCALIMITED2026
 */

// ─── THEME ───────────────────────────────────────────────────────────────────
const T = {
  bg: "#000", bg1: "#070707", bg2: "#0D0D0D", bg3: "#141414",
  border: "#1C1C1C", borderH: "#2A2A2A", borderA: "#60A5FA33",
  w: "#FFF", w2: "#E0E0E0", w3: "#AAA", w4: "#777", w5: "#555",
  a: "#60A5FA", aD: "#60A5FA18", aG: "#60A5FA44",
  g: "#34D399", gD: "#34D39914", r: "#F87171", rD: "#F8717114",
  y: "#FBBF24", p: "#A78BFA",
};

const INVITE_CODE = "CCALIMITED2026";

const ADMINS = [
  { email: "pewlax@gmail.com", password: "SteveCCAcceleratorPlatformAdmin12345", name: "Steve" },
  { email: "dannyfresko92@gmail.com", password: "DannyCCAcceleratorPlatformAdmin12345", name: "Danny" },
];

const LEAD_SOURCES = ["Instagram Reels", "Instagram Stories", "Instagram Posts", "Setter/DM", "Paid Ads", "Referrals", "Website/SEO", "Email Marketing", "TikTok", "YouTube", "Other"];

// ─── SEED DATA ───────────────────────────────────────────────────────────────
const SEED_CLIENTS = [
  {
    id: "c1", name: "Luxe Fashion", handle: "@luxefashion", igLink: "https://instagram.com/luxefashion",
    niche: "Fashion", avatar: "LF", email: "luxe@demo.com",
    followers: 284300, followersChange: 3200, following: 1420, posts: 1847, engagement: 4.8,
    views7d: 1420000, views30d: 5840000, views90d: 16200000,
    likes7d: 89400, likes30d: 342000, comments7d: 12300, comments30d: 48200,
    shares7d: 4200, shares30d: 16800, saves7d: 18700, saves30d: 72400,
    leads7d: 34, leads30d: 128, conversions: 42, reachRate: 62, storyViews: 84200,
    dailyViews: [180000, 210000, 195000, 220000, 198000, 205000, 212000],
    dailyFollowers: [284100, 284120, 284150, 284180, 284220, 284260, 284300],
    leadSources: [
      { source: "Instagram Reels", count: 42, pct: 32.8 },
      { source: "Paid Ads", count: 31, pct: 24.2 },
      { source: "Setter/DM", count: 22, pct: 17.2 },
      { source: "Referrals", count: 18, pct: 14.1 },
      { source: "Instagram Stories", count: 9, pct: 7.0 },
      { source: "Website/SEO", count: 6, pct: 4.7 },
    ],
    topPosts: [
      { id: "p1", caption: "Summer Collection Drop 🔥", views: 342000, likes: 28400, comments: 3200, date: "Mar 28" },
      { id: "p2", caption: "Behind the scenes at Milan", views: 289000, likes: 24100, comments: 2800, date: "Mar 25" },
      { id: "p3", caption: "Style guide: Spring essentials", views: 256000, likes: 21200, comments: 2100, date: "Mar 22" },
    ],
    competitors: [
      { name: "Vogue Style", handle: "@voguestyle", followers: 520000, engagement: 3.9, views30d: 8200000 },
      { name: "Elite Threads", handle: "@elitethreads", followers: 195000, engagement: 5.2, views30d: 4100000 },
      { name: "Mode Daily", handle: "@modedaily", followers: 310000, engagement: 4.1, views30d: 6300000 },
    ],
    notes: "Focus on Reels for Q2. Client wants 50% more video content.", contractEnd: "2026-08-15", plan: "Premium", monthlyBudget: 4500,
  },
  {
    id: "c2", name: "FitPro Academy", handle: "@fitproacademy", igLink: "https://instagram.com/fitproacademy",
    niche: "Fitness", avatar: "FP", email: "fitpro@demo.com",
    followers: 156800, followersChange: 1800, following: 890, posts: 2340, engagement: 6.2,
    views7d: 890000, views30d: 3420000, views90d: 9800000,
    likes7d: 67200, likes30d: 248000, comments7d: 8900, comments30d: 34200,
    shares7d: 5600, shares30d: 21400, saves7d: 22100, saves30d: 86000,
    leads7d: 52, leads30d: 198, conversions: 67, reachRate: 71, storyViews: 62400,
    dailyViews: [120000, 135000, 128000, 142000, 118000, 125000, 122000],
    dailyFollowers: [156500, 156520, 156560, 156610, 156680, 156740, 156800],
    leadSources: [
      { source: "Instagram Reels", count: 68, pct: 34.3 },
      { source: "Setter/DM", count: 48, pct: 24.2 },
      { source: "Referrals", count: 32, pct: 16.2 },
      { source: "Paid Ads", count: 28, pct: 14.1 },
      { source: "Instagram Stories", count: 14, pct: 7.1 },
      { source: "YouTube", count: 8, pct: 4.0 },
    ],
    topPosts: [
      { id: "p1", caption: "30-day transformation results 💪", views: 198000, likes: 18200, comments: 2400, date: "Mar 29" },
      { id: "p2", caption: "5 exercises you're doing wrong", views: 176000, likes: 15800, comments: 1900, date: "Mar 26" },
      { id: "p3", caption: "Meal prep Sunday special", views: 142000, likes: 12400, comments: 1600, date: "Mar 23" },
    ],
    competitors: [
      { name: "GymShark", handle: "@gymshark", followers: 890000, engagement: 3.2, views30d: 12400000 },
      { name: "FitFam", handle: "@fitfam_official", followers: 210000, engagement: 5.8, views30d: 4800000 },
      { name: "Iron Culture", handle: "@ironculture", followers: 134000, engagement: 6.9, views30d: 3200000 },
    ],
    notes: "Launching online coaching program in April.", contractEnd: "2026-06-30", plan: "Standard", monthlyBudget: 2800,
  },
  {
    id: "c3", name: "Nomad Eats", handle: "@nomadeats", igLink: "https://instagram.com/nomadeats",
    niche: "Food & Travel", avatar: "NE", email: "nomad@demo.com",
    followers: 98400, followersChange: 2400, following: 1200, posts: 1120, engagement: 7.4,
    views7d: 620000, views30d: 2480000, views90d: 7100000,
    likes7d: 48200, likes30d: 186000, comments7d: 6800, comments30d: 26400,
    shares7d: 8200, shares30d: 32800, saves7d: 31200, saves30d: 124000,
    leads7d: 18, leads30d: 72, conversions: 24, reachRate: 78, storyViews: 42800,
    dailyViews: [82000, 94000, 88000, 96000, 84000, 90000, 86000],
    dailyFollowers: [98100, 98140, 98180, 98240, 98300, 98350, 98400],
    leadSources: [
      { source: "Instagram Reels", count: 28, pct: 38.9 },
      { source: "Referrals", count: 16, pct: 22.2 },
      { source: "Instagram Posts", count: 12, pct: 16.7 },
      { source: "Website/SEO", count: 9, pct: 12.5 },
      { source: "Paid Ads", count: 7, pct: 9.7 },
    ],
    topPosts: [
      { id: "p1", caption: "Hidden gems of Lisbon 🇵🇹", views: 142000, likes: 12800, comments: 1800, date: "Mar 30" },
      { id: "p2", caption: "Street food tour: Bangkok", views: 128000, likes: 11200, comments: 1600, date: "Mar 27" },
      { id: "p3", caption: "Recipe: Authentic Pad Thai", views: 118000, likes: 10400, comments: 1400, date: "Mar 24" },
    ],
    competitors: [
      { name: "Taste Atlas", handle: "@tasteatlas", followers: 420000, engagement: 4.6, views30d: 7800000 },
      { name: "Foodie Travels", handle: "@foodietravels", followers: 145000, engagement: 6.1, views30d: 3600000 },
      { name: "Wanderlust Bites", handle: "@wanderlustbites", followers: 87000, engagement: 8.2, views30d: 2100000 },
    ],
    notes: "Japan trip content series planned for May.", contractEnd: "2026-12-01", plan: "Premium", monthlyBudget: 3800,
  },
  {
    id: "c4", name: "TechVault", handle: "@techvault", igLink: "https://instagram.com/techvault",
    niche: "Technology", avatar: "TV", email: "tech@demo.com",
    followers: 412000, followersChange: 5600, following: 680, posts: 3200, engagement: 3.9,
    views7d: 2100000, views30d: 8400000, views90d: 24600000,
    likes7d: 124000, likes30d: 486000, comments7d: 18200, comments30d: 72800,
    shares7d: 12400, shares30d: 49600, saves7d: 42000, saves30d: 168000,
    leads7d: 86, leads30d: 342, conversions: 114, reachRate: 58, storyViews: 148000,
    dailyViews: [280000, 310000, 295000, 320000, 298000, 305000, 292000],
    dailyFollowers: [411200, 411400, 411500, 411600, 411700, 411850, 412000],
    leadSources: [
      { source: "Instagram Reels", count: 112, pct: 32.7 },
      { source: "Paid Ads", count: 86, pct: 25.1 },
      { source: "YouTube", count: 52, pct: 15.2 },
      { source: "Setter/DM", count: 38, pct: 11.1 },
      { source: "Referrals", count: 30, pct: 8.8 },
      { source: "Website/SEO", count: 24, pct: 7.0 },
    ],
    topPosts: [
      { id: "p1", caption: "iPhone 17 leaked features 📱", views: 520000, likes: 42000, comments: 5800, date: "Mar 31" },
      { id: "p2", caption: "AI tools that will replace your job", views: 480000, likes: 38000, comments: 4200, date: "Mar 28" },
      { id: "p3", caption: "Best budget laptops 2026", views: 380000, likes: 28400, comments: 3600, date: "Mar 25" },
    ],
    competitors: [
      { name: "MKBHD", handle: "@mkbhd", followers: 4200000, engagement: 2.8, views30d: 42000000 },
      { name: "TechLinked", handle: "@techlinked", followers: 680000, engagement: 3.4, views30d: 12800000 },
      { name: "Unbox Therapy", handle: "@unboxtherapy", followers: 920000, engagement: 3.1, views30d: 15400000 },
    ],
    notes: "Viral strategy working well. Double down on controversial tech takes.", contractEnd: "2027-01-15", plan: "Enterprise", monthlyBudget: 7200,
  },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const fmt = (n) => { if (n >= 1e6) return (n/1e6).toFixed(1)+"M"; if (n >= 1e3) return (n/1e3).toFixed(1)+"K"; return n?.toString() ?? "0"; };

// ─── STORAGE HELPERS ─────────────────────────────────────────────────────────
const loadStorage = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
const saveStorage = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) { console.error("Storage save error:", e); }
};

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────
const font = "'DM Sans', system-ui, sans-serif";
const mono = "'JetBrains Mono', 'SF Mono', monospace";

const Inp = ({ label, value, onChange, type="text", placeholder, onKeyDown, isMono, autoFocus }) => (
  <div style={{ marginBottom: 12 }}>
    {label && <label style={{ fontSize: 10, color: T.w4, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4, display: "block", fontFamily: mono, fontWeight: 500 }}>{label}</label>}
    <input value={value} onChange={onChange} type={type} placeholder={placeholder} onKeyDown={onKeyDown} autoFocus={autoFocus}
      style={{ width: "100%", padding: "11px 13px", borderRadius: 6, border: `1px solid ${T.border}`, background: T.bg, color: T.w, fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: isMono ? mono : font, transition: "border-color 0.15s" }}
      onFocus={e => e.target.style.borderColor = T.a} onBlur={e => e.target.style.borderColor = T.border} />
  </div>
);

const Btn = ({ children, onClick, primary, disabled, small }) => (
  <button onClick={onClick} disabled={disabled} style={{
    width: "100%", padding: small ? "9px" : "12px", borderRadius: 6, cursor: disabled ? "default" : "pointer",
    border: primary ? "none" : `1px solid ${T.border}`, background: primary ? T.w : "transparent",
    color: primary ? T.bg : T.w3, fontSize: small ? 12 : 13, fontWeight: primary ? 600 : 400,
    fontFamily: font, opacity: disabled ? 0.4 : 1, transition: "all 0.15s",
  }}>{children}</button>
);

const MiniChart = ({ data, h = 32, w = 80 }) => {
  const mx = Math.max(...data), mn = Math.min(...data), rng = mx - mn || 1;
  const pts = data.map((v, i) => `${(i/(data.length-1))*w},${h-((v-mn)/rng)*(h-6)-3}`).join(" ");
  const uid = "g" + Math.random().toString(36).slice(2,7);
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs><linearGradient id={uid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.a} stopOpacity="0.15"/><stop offset="100%" stopColor={T.a} stopOpacity="0"/></linearGradient></defs>
      <polygon points={`${pts} ${w},${h} 0,${h}`} fill={`url(#${uid})`}/>
      <polyline points={pts} fill="none" stroke={T.a} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const Bar = ({ data, labels, h = 160, color = T.a }) => {
  const mx = Math.max(...data) || 1;
  return (
    <div style={{ height: h, display: "flex", alignItems: "flex-end", gap: 5, padding: "0 2px" }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <span style={{ fontSize: 8, color: T.w5, fontFamily: mono }}>{fmt(v)}</span>
          <div style={{ width: "100%", maxWidth: 28, height: `${(v/mx)*(h-36)}px`, background: `linear-gradient(180deg, ${color}, ${color}30)`, borderRadius: "3px 3px 0 0", transition: "height 0.5s ease" }}/>
          <span style={{ fontSize: 8, color: T.w5, fontFamily: mono }}>{labels?.[i]}</span>
        </div>
      ))}
    </div>
  );
};

const Stat = ({ label, value, change, icon, sub }) => (
  <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4, transition: "border-color 0.2s, transform 0.2s", cursor: "default" }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.transform = "translateY(-1px)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "none"; }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 9, color: T.w5, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: mono }}>{label}</span>
      <span style={{ fontSize: 14, opacity: 0.5 }}>{icon}</span>
    </div>
    <span style={{ fontSize: 22, fontWeight: 700, color: T.w, fontFamily: font, letterSpacing: "-0.02em" }}>{value}</span>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {change !== undefined && <span style={{ fontSize: 10, fontWeight: 600, fontFamily: mono, color: change >= 0 ? T.g : T.r, background: change >= 0 ? T.gD : T.rD, padding: "1px 5px", borderRadius: 3 }}>{change >= 0 ? "↑" : "↓"}{Math.abs(change).toFixed(1)}%</span>}
      {sub && <span style={{ fontSize: 9, color: T.w5 }}>{sub}</span>}
    </div>
  </div>
);

const CompRow = ({ c }) => (
  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "10px 16px", borderBottom: `1px solid ${T.border}`, alignItems: "center", transition: "background 0.1s" }}
    onMouseEnter={e => e.currentTarget.style.background = T.bg1} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
    <div><div style={{ fontWeight: 600, color: T.w, fontSize: 12 }}>{c.name}</div><div style={{ color: T.w5, fontSize: 10, fontFamily: mono }}>{c.handle}</div></div>
    <span style={{ color: T.w3, fontFamily: mono, fontSize: 12 }}>{fmt(c.followers)}</span>
    <span style={{ color: c.engagement >= 5 ? T.g : T.a, fontFamily: mono, fontSize: 12 }}>{c.engagement}%</span>
    <span style={{ color: T.w3, fontFamily: mono, fontSize: 12 }}>{fmt(c.views30d)}</span>
  </div>
);

const LeadSourceBar = ({ source, count, pct, color }) => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
      <span style={{ fontSize: 11, color: T.w3 }}>{source}</span>
      <span style={{ fontSize: 11, color: T.w, fontFamily: mono, fontWeight: 600 }}>{count} <span style={{ color: T.w5, fontWeight: 400 }}>({pct}%)</span></span>
    </div>
    <div style={{ height: 4, background: T.border, borderRadius: 2 }}>
      <div style={{ width: pct+"%", height: "100%", background: color, borderRadius: 2, transition: "width 0.6s ease" }}/>
    </div>
  </div>
);

const Modal = ({ children, onClose }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(6px)" }} onClick={onClose}>
    <div style={{ width: 440, maxHeight: "90vh", overflowY: "auto", padding: 28, borderRadius: 10, background: T.bg2, border: `1px solid ${T.border}`, boxShadow: "0 40px 80px rgba(0,0,0,0.7)" }} onClick={e => e.stopPropagation()}>{children}</div>
  </div>
);

const Tab = ({ tabs, active, onChange }) => (
  <div style={{ display: "flex", borderBottom: `1px solid ${T.border}` }}>
    {tabs.map(t => (
      <button key={t} onClick={() => onChange(t)} style={{
        padding: "11px 18px", border: "none", background: "transparent", cursor: "pointer",
        color: active === t ? T.w : T.w5, fontSize: 12, fontWeight: 600,
        borderBottom: active === t ? `2px solid ${T.a}` : "2px solid transparent",
        fontFamily: font, textTransform: "capitalize", transition: "color 0.15s",
      }}>{t}</button>
    ))}
  </div>
);

const LEAD_COLORS = [T.a, T.g, T.y, T.p, T.r, "#F472B6", "#818CF8", "#FB923C", "#2DD4BF", "#E879F9", "#94A3B8"];

// ─── AUTH SCREEN ─────────────────────────────────────────────────────────────
const AuthScreen = ({ onLogin, clientAccounts, setClientAccounts }) => {
  const [mode, setMode] = useState("choose"); // choose | admin | signup
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [niche, setNiche] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const reset = () => { setError(""); setEmail(""); setPass(""); setConfirmPass(""); setName(""); setHandle(""); setNiche(""); setInviteCode(""); };

  const loginAdmin = () => {
    setError(""); setLoading(true);
    setTimeout(() => {
      const admin = ADMINS.find(a => a.email.toLowerCase() === email.toLowerCase() && a.password === pass);
      if (!admin) { setError("Invalid admin credentials."); setLoading(false); return; }
      onLogin({ role: "agency", name: admin.name, email: admin.email });
    }, 400);
  };

  const loginClient = () => {
    setError(""); setLoading(true);
    setTimeout(() => {
      const client = clientAccounts.find(c => c.email.toLowerCase() === email.toLowerCase() && c.password === pass);
      if (!client) { setError("Invalid email or password."); setLoading(false); return; }
      onLogin({ role: "client", name: client.name, email: client.email, clientId: client.clientId });
    }, 400);
  };

  const signUp = () => {
    setError("");
    if (!name.trim() || !email.trim() || !handle.trim()) { setError("Fill in all required fields."); return; }
    if (pass.length < 6) { setError("Password: 6+ characters."); return; }
    if (pass !== confirmPass) { setError("Passwords don't match."); return; }
    if (inviteCode !== INVITE_CODE) { setError("Invalid invitation code."); return; }
    if (clientAccounts.find(c => c.email.toLowerCase() === email.toLowerCase()) || ADMINS.find(a => a.email.toLowerCase() === email.toLowerCase())) { setError("Email already in use."); return; }
    setLoading(true);
    setTimeout(() => {
      const newId = "c" + Date.now();
      const h = handle.startsWith("@") ? handle : "@" + handle;
      const newClient = {
        id: newId, name, handle: h, igLink: `https://instagram.com/${h.replace("@","")}`,
        niche: niche || "General", avatar: name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase(),
        email, followers: 0, followersChange: 0, following: 0, posts: 0, engagement: 0,
        views7d: 0, views30d: 0, views90d: 0, likes7d: 0, likes30d: 0, comments7d: 0, comments30d: 0,
        shares7d: 0, shares30d: 0, saves7d: 0, saves30d: 0, leads7d: 0, leads30d: 0, conversions: 0,
        reachRate: 0, storyViews: 0, dailyViews: [0,0,0,0,0,0,0], dailyFollowers: [0,0,0,0,0,0,0],
        leadSources: [], topPosts: [], competitors: [],
        notes: "", contractEnd: "", plan: "Standard", monthlyBudget: 0,
      };
      const newAccount = { email, password: pass, name, clientId: newId };
      SEED_CLIENTS.push(newClient);
      const updated = [...clientAccounts, newAccount];
      setClientAccounts(updated);
      saveStorage("cc-client-accounts", updated);
      saveStorage("cc-clients-data", SEED_CLIENTS);
      onLogin({ role: "client", name, email, clientId: newId });
    }, 400);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg, fontFamily: font }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.02, backgroundImage: `linear-gradient(${T.w} 1px, transparent 1px), linear-gradient(90deg, ${T.w} 1px, transparent 1px)`, backgroundSize: "100px 100px", pointerEvents: "none" }}/>

      <div style={{ width: mode === "signup" ? 440 : 380, padding: "36px 32px", borderRadius: 12, background: T.bg1, border: `1px solid ${T.border}`, boxShadow: "0 40px 100px rgba(0,0,0,0.5)", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: 10, background: T.w, color: T.bg, fontSize: 18, fontWeight: 800, marginBottom: 12 }}>CC</div>
          <h1 style={{ color: T.w, fontSize: 20, fontWeight: 700, margin: 0 }}>CC Accelerator</h1>
          <p style={{ color: T.w5, fontSize: 12, marginTop: 4 }}>
            {mode === "choose" ? "Content Agency Command Center" : mode === "admin" ? "Admin Sign In" : mode === "client-login" ? "Client Sign In" : "Create Client Account"}
          </p>
        </div>

        {/* ── Choose mode ── */}
        {mode === "choose" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button onClick={() => { setMode("admin"); reset(); }} style={{
              padding: "16px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.bg,
              color: T.w, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: font,
              display: "flex", alignItems: "center", gap: 12, transition: "border-color 0.15s",
              textAlign: "left",
            }} onMouseEnter={e => e.currentTarget.style.borderColor = T.a} onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: T.aD, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 16 }}>⚡</span>
              </div>
              <div><div style={{ fontSize: 14, fontWeight: 600 }}>Admin Login</div><div style={{ fontSize: 11, color: T.w5, marginTop: 2 }}>For agency founders</div></div>
            </button>

            <button onClick={() => { setMode("client-login"); reset(); }} style={{
              padding: "16px", borderRadius: 8, border: `1px solid ${T.border}`, background: T.bg,
              color: T.w, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: font,
              display: "flex", alignItems: "center", gap: 12, transition: "border-color 0.15s",
              textAlign: "left",
            }} onMouseEnter={e => e.currentTarget.style.borderColor = T.g} onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: T.gD, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 16 }}>👤</span>
              </div>
              <div><div style={{ fontSize: 14, fontWeight: 600 }}>Client Login</div><div style={{ fontSize: 11, color: T.w5, marginTop: 2 }}>View your stats & analytics</div></div>
            </button>

            <div style={{ textAlign: "center", marginTop: 12 }}>
              <span style={{ color: T.w5, fontSize: 12 }}>New client? </span>
              <button onClick={() => { setMode("signup"); reset(); }} style={{ background: "none", border: "none", color: T.a, fontSize: 12, cursor: "pointer", fontWeight: 600, fontFamily: font, textDecoration: "underline", textUnderlineOffset: 3 }}>Create account</button>
            </div>
          </div>
        )}

        {/* ── Admin Login ── */}
        {mode === "admin" && (
          <>
            <Inp label="Admin Email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter admin email" onKeyDown={e => e.key === "Enter" && loginAdmin()} autoFocus />
            <Inp label="Password" value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="Enter admin password" onKeyDown={e => e.key === "Enter" && loginAdmin()} />
            {error && <div style={{ color: T.r, fontSize: 12, padding: "8px 10px", background: T.rD, borderRadius: 6, marginBottom: 12 }}>{error}</div>}
            <Btn onClick={loginAdmin} primary disabled={loading}>{loading ? "Signing in..." : "Sign In as Admin"}</Btn>
            <div style={{ height: 8 }}/>
            <Btn onClick={() => { setMode("choose"); reset(); }}>← Back</Btn>
          </>
        )}

        {/* ── Client Login ── */}
        {mode === "client-login" && (
          <>
            <Inp label="Email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" onKeyDown={e => e.key === "Enter" && loginClient()} autoFocus />
            <Inp label="Password" value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="••••••••" onKeyDown={e => e.key === "Enter" && loginClient()} />
            {error && <div style={{ color: T.r, fontSize: 12, padding: "8px 10px", background: T.rD, borderRadius: 6, marginBottom: 12 }}>{error}</div>}
            <Btn onClick={loginClient} primary disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Btn>
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <span style={{ color: T.w5, fontSize: 12 }}>No account? </span>
              <button onClick={() => { setMode("signup"); reset(); }} style={{ background: "none", border: "none", color: T.a, fontSize: 12, cursor: "pointer", fontWeight: 600, fontFamily: font, textDecoration: "underline", textUnderlineOffset: 3 }}>Sign up</button>
            </div>
            <div style={{ height: 6 }}/>
            <Btn onClick={() => { setMode("choose"); reset(); }}>← Back</Btn>
          </>
        )}

        {/* ── Sign Up ── */}
        {mode === "signup" && (
          <>
            <Inp label="Brand / Full Name *" value={name} onChange={e => setName(e.target.value)} placeholder="Acme Studios" autoFocus />
            <Inp label="Email *" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@brand.com" />
            <Inp label="Instagram Handle *" value={handle} onChange={e => setHandle(e.target.value)} placeholder="@yourbrand" />
            <Inp label="Niche" value={niche} onChange={e => setNiche(e.target.value)} placeholder="Fashion, Fitness, Tech..." />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Inp label="Password *" value={pass} onChange={e => setPass(e.target.value)} type="password" placeholder="6+ chars" />
              <Inp label="Confirm *" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} type="password" placeholder="Re-enter" />
            </div>
            <Inp label="Invitation Code *" value={inviteCode} onChange={e => setInviteCode(e.target.value)} placeholder="Enter code" isMono />
            {inviteCode === INVITE_CODE && <span style={{ fontSize: 10, color: T.g, display: "block", marginTop: -6, marginBottom: 8 }}>✓ Valid invitation code</span>}
            {error && <div style={{ color: T.r, fontSize: 12, padding: "8px 10px", background: T.rD, borderRadius: 6, marginBottom: 12 }}>{error}</div>}
            <Btn onClick={signUp} primary disabled={loading}>{loading ? "Creating..." : "Create Account"}</Btn>
            <div style={{ height: 6 }}/>
            <Btn onClick={() => { setMode("choose"); reset(); }}>← Back</Btn>
          </>
        )}
      </div>
    </div>
  );
};

// ─── CLIENT VIEW ─────────────────────────────────────────────────────────────
const ClientView = ({ client, onLogout }) => {
  const [tab, setTab] = useState("overview");
  const c = client;
  if (!c) return <div style={{ minHeight: "100vh", background: T.bg, color: T.w, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font }}>Client data not found.</div>;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: font }}>
      <header style={{ padding: "10px 28px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: T.bg1+"DD", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 6, background: T.w, color: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 10 }}>{c.avatar}</div>
          <div>
            <h2 style={{ color: T.w, margin: 0, fontSize: 14, fontWeight: 700 }}>{c.name}</h2>
            <a href={c.igLink} target="_blank" rel="noopener" style={{ color: T.a, fontSize: 11, fontFamily: mono, textDecoration: "none" }}>{c.handle}</a>
          </div>
        </div>
        <button onClick={onLogout} style={{ padding: "6px 14px", borderRadius: 6, border: `1px solid ${T.border}`, background: "transparent", color: T.w4, fontSize: 11, cursor: "pointer", fontFamily: font }}>Logout</button>
      </header>

      <div style={{ padding: "0 28px" }}><Tab tabs={["overview","content","leads","competitors"]} active={tab} onChange={setTab} /></div>

      <div style={{ padding: 24, maxWidth: 1400, margin: "0 auto" }}>
        {tab === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 20 }}>
              <Stat label="Followers" value={fmt(c.followers)} change={c.followers?(c.followersChange/c.followers)*100:0} icon="👥" sub={`+${fmt(c.followersChange)}`}/>
              <Stat label="Views (7d)" value={fmt(c.views7d)} change={12.4} icon="👁"/>
              <Stat label="Views (30d)" value={fmt(c.views30d)} change={8.2} icon="📊"/>
              <Stat label="Engagement" value={c.engagement+"%"} change={0.8} icon="⚡"/>
              <Stat label="Likes (7d)" value={fmt(c.likes7d)} change={6.2} icon="❤️"/>
              <Stat label="Comments (7d)" value={fmt(c.comments7d)} change={4.8} icon="💬"/>
              <Stat label="Saves (7d)" value={fmt(c.saves7d)} change={15.2} icon="🔖"/>
              <Stat label="Leads (30d)" value={c.leads30d} change={22.1} icon="🎯"/>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, padding: 18 }}>
                <h3 style={{ color: T.w, margin: "0 0 14px", fontSize: 12, fontWeight: 600 }}>Views This Week</h3>
                <Bar data={c.dailyViews} labels={DAYS}/>
              </div>
              <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, padding: 18 }}>
                <h3 style={{ color: T.w, margin: "0 0 14px", fontSize: 12, fontWeight: 600 }}>Follower Growth</h3>
                <Bar data={c.dailyFollowers.map((v,i,a)=>i===0?0:v-a[i-1])} labels={DAYS} color={T.g}/>
              </div>
            </div>
          </>
        )}
        {tab === "content" && (
          <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, padding: 18 }}>
            <h3 style={{ color: T.w, margin: "0 0 16px", fontSize: 12, fontWeight: 600 }}>Top Posts</h3>
            {(!c.topPosts?.length) && <p style={{ color: T.w5, fontSize: 12 }}>No posts tracked yet.</p>}
            {(c.topPosts||[]).map((p,i) => (
              <div key={p.id} style={{ display: "grid", gridTemplateColumns: "auto 2fr 1fr 1fr 1fr", padding: "11px 0", borderBottom: i<c.topPosts.length-1?`1px solid ${T.border}`:"none", alignItems: "center", gap: 12 }}>
                <span style={{ color: T.a, fontSize: 11, fontFamily: mono, width: 18 }}>#{i+1}</span>
                <div><div style={{ color: T.w, fontSize: 12, fontWeight: 500 }}>{p.caption}</div><div style={{ color: T.w5, fontSize: 9, marginTop: 1 }}>{p.date}</div></div>
                {[{v:p.views,l:"views"},{v:p.likes,l:"likes"},{v:p.comments,l:"cmts"}].map(x=>(
                  <div key={x.l} style={{ textAlign: "center" }}><div style={{ color: T.w, fontSize: 13, fontWeight: 600, fontFamily: mono }}>{fmt(x.v)}</div><div style={{ color: T.w5, fontSize: 8 }}>{x.l}</div></div>
                ))}
              </div>
            ))}
          </div>
        )}
        {tab === "leads" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, padding: 18 }}>
              <h3 style={{ color: T.w, margin: "0 0 16px", fontSize: 12, fontWeight: 600 }}>Lead Sources (30 Days)</h3>
              {(!c.leadSources?.length) && <p style={{ color: T.w5, fontSize: 12 }}>No lead data yet.</p>}
              {(c.leadSources||[]).map((ls,i) => <LeadSourceBar key={ls.source} source={ls.source} count={ls.count} pct={ls.pct} color={LEAD_COLORS[i%LEAD_COLORS.length]}/>)}
            </div>
            <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, padding: 18 }}>
              <h3 style={{ color: T.w, margin: "0 0 16px", fontSize: 12, fontWeight: 600 }}>Lead Summary</h3>
              {[{l:"Total Leads (7d)",v:c.leads7d},{l:"Total Leads (30d)",v:c.leads30d},{l:"Conversions",v:c.conversions},{l:"Conversion Rate",v:c.leads30d?(c.conversions/c.leads30d*100).toFixed(1)+"%":"0%"}].map(r=>(
                <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${T.border}` }}>
                  <span style={{ color: T.w3, fontSize: 12 }}>{r.l}</span>
                  <span style={{ color: T.w, fontSize: 12, fontWeight: 600, fontFamily: mono }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === "competitors" && (
          <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}` }}><h3 style={{ color: T.w, margin: 0, fontSize: 12, fontWeight: 600 }}>Competitors — {c.niche}</h3></div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "8px 16px", borderBottom: `1px solid ${T.border}` }}>
              {["Account","Followers","Eng.","Views 30d"].map(h=><span key={h} style={{ fontSize: 8, color: T.w5, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: mono }}>{h}</span>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "10px 16px", borderBottom: `1px solid ${T.border}`, background: T.aD }}>
              <div><div style={{ fontWeight: 600, color: T.a, fontSize: 12 }}>{c.name} (You)</div><div style={{ color: T.w5, fontSize: 10, fontFamily: mono }}>{c.handle}</div></div>
              <span style={{ color: T.w, fontFamily: mono, fontSize: 12 }}>{fmt(c.followers)}</span>
              <span style={{ color: T.g, fontFamily: mono, fontSize: 12 }}>{c.engagement}%</span>
              <span style={{ color: T.w, fontFamily: mono, fontSize: 12 }}>{fmt(c.views30d)}</span>
            </div>
            {(!c.competitors?.length) && <div style={{ padding: 16, textAlign: "center", color: T.w5, fontSize: 11 }}>No competitors tracked.</div>}
            {(c.competitors||[]).map((comp,i) => <CompRow key={i} c={comp}/>)}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── AGENCY DASHBOARD ────────────────────────────────────────────────────────
const AgencyDash = ({ onLogout, userName }) => {
  const [sel, setSel] = useState(null);
  const [view, setView] = useState("overview");
  const [cTab, setCTab] = useState("analytics");
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState({});
  const [q, setQ] = useState("");
  const [compModal, setCompModal] = useState(false);
  const [newComp, setNewComp] = useState({name:"",handle:"",followers:"",engagement:"",views30d:""});
  const [addModal, setAddModal] = useState(false);
  const [newC, setNewC] = useState({name:"",handle:"",niche:"",email:"",igLink:""});
  const [leadModal, setLeadModal] = useState(false);
  const [newLead, setNewLead] = useState({source:LEAD_SOURCES[0],count:""});

  const all = SEED_CLIENTS;
  const totF = all.reduce((a,c)=>a+c.followers,0);
  const totV = all.reduce((a,c)=>a+c.views30d,0);
  const totL = all.reduce((a,c)=>a+c.leads30d,0);
  const avgE = all.length?(all.reduce((a,c)=>a+c.engagement,0)/all.length).toFixed(1):"0";
  const totR = all.reduce((a,c)=>a+(c.monthlyBudget||0),0);

  const filtered = all.filter(c=>c.name.toLowerCase().includes(q.toLowerCase())||c.handle.toLowerCase().includes(q.toLowerCase())||c.niche.toLowerCase().includes(q.toLowerCase()));
  const open = (c) => { setSel(c); setView("client"); setCTab("analytics"); };
  const c = sel;

  const addClient = () => {
    if(!newC.name||!newC.handle) return;
    const h = newC.handle.startsWith("@")?newC.handle:"@"+newC.handle;
    SEED_CLIENTS.push({
      id:"c"+Date.now(), name:newC.name, handle:h,
      igLink: newC.igLink || `https://instagram.com/${h.replace("@","")}`,
      niche:newC.niche||"General", avatar:newC.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(),
      email:newC.email||"", followers:0, followersChange:0, following:0, posts:0, engagement:0,
      views7d:0,views30d:0,views90d:0,likes7d:0,likes30d:0,comments7d:0,comments30d:0,
      shares7d:0,shares30d:0,saves7d:0,saves30d:0,leads7d:0,leads30d:0,conversions:0,
      reachRate:0,storyViews:0,dailyViews:[0,0,0,0,0,0,0],dailyFollowers:[0,0,0,0,0,0,0],
      leadSources:[],topPosts:[],competitors:[],notes:"",contractEnd:"",plan:"Standard",monthlyBudget:0,
    });
    saveStorage("cc-clients-data", SEED_CLIENTS);
    setNewC({name:"",handle:"",niche:"",email:"",igLink:""});
    setAddModal(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: font, display: "flex" }}>
      {/* Sidebar */}
      <aside style={{ width: 230, background: T.bg1, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0, zIndex: 200 }}>
        <div style={{ padding: "18px 14px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 30, height: 30, borderRadius: 6, background: T.w, color: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11 }}>CC</div>
            <div><div style={{ color: T.w, fontWeight: 700, fontSize: 13 }}>CC Accelerator</div><div style={{ color: T.w5, fontSize: 9, fontFamily: mono }}>{userName}</div></div>
          </div>
        </div>
        <div style={{ padding: "10px 8px" }}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." style={{ width: "100%", padding: "7px 9px", borderRadius: 5, border: `1px solid ${T.border}`, background: T.bg, color: T.w, fontSize: 11, outline: "none", boxSizing: "border-box", fontFamily: font }} onFocus={e=>e.target.style.borderColor=T.a} onBlur={e=>e.target.style.borderColor=T.border}/>
        </div>
        <nav style={{ flex: 1, overflow: "auto", padding: "0 5px" }}>
          <button onClick={()=>{setView("overview");setSel(null);}} style={{ width: "100%", padding: "9px 9px", borderRadius: 5, border: "none", cursor: "pointer", background: view==="overview"?T.aD:"transparent", color: view==="overview"?T.a:T.w4, fontSize: 11, fontWeight: 600, textAlign: "left", marginBottom: 2, fontFamily: font, display: "flex", alignItems: "center", gap: 7 }}>◻ Overview</button>
          <div style={{ padding: "7px 9px 3px", fontSize: 8, color: T.w5, textTransform: "uppercase", letterSpacing: "0.14em", fontFamily: mono }}>Clients · {all.length}</div>
          {filtered.map(cl=>(
            <button key={cl.id} onClick={()=>open(cl)} style={{ width: "100%", padding: "7px 9px", borderRadius: 5, border: "none", cursor: "pointer", background: sel?.id===cl.id?T.aD:"transparent", color: sel?.id===cl.id?T.w:T.w4, fontSize: 11, fontWeight: 500, textAlign: "left", marginBottom: 1, fontFamily: font, display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 22, height: 22, borderRadius: 4, flexShrink: 0, background: sel?.id===cl.id?T.w:T.borderH, color: sel?.id===cl.id?T.bg:T.w4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 700 }}>{cl.avatar}</div>
              <div style={{ overflow: "hidden" }}><div style={{ fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cl.name}</div><div style={{ fontSize: 8, color: T.w5, fontFamily: mono }}>{cl.niche}</div></div>
            </button>
          ))}
          <button onClick={()=>setAddModal(true)} style={{ width: "100%", padding: "7px 9px", borderRadius: 5, border: `1px dashed ${T.border}`, cursor: "pointer", background: "transparent", color: T.w5, fontSize: 11, textAlign: "left", marginTop: 4, fontFamily: font, display: "flex", alignItems: "center", gap: 7 }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.a;e.currentTarget.style.color=T.a;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.w5;}}>+ Add Client</button>
        </nav>
        <div style={{ padding: "10px", borderTop: `1px solid ${T.border}` }}>
          <button onClick={onLogout} style={{ width: "100%", padding: "7px", borderRadius: 5, border: `1px solid ${T.border}`, background: "transparent", color: T.w5, fontSize: 10, cursor: "pointer", fontFamily: font }}>Logout</button>
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: 230, minHeight: "100vh" }}>
        {view === "overview" && (
          <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 20 }}><h1 style={{ color: T.w, fontSize: 20, fontWeight: 700, margin: "0 0 3px" }}>Agency Overview</h1><p style={{ color: T.w5, fontSize: 11, margin: 0 }}>All client performance</p></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, marginBottom: 20 }}>
              <Stat label="Total Reach" value={fmt(totF)} change={2.8} icon="👥"/>
              <Stat label="Views (30d)" value={fmt(totV)} change={9.4} icon="👁"/>
              <Stat label="Leads" value={totL} change={18.2} icon="🎯"/>
              <Stat label="Avg Eng." value={avgE+"%"} change={1.2} icon="📈"/>
              <Stat label="MRR" value={"$"+totR.toLocaleString()} change={5.4} icon="💰"/>
            </div>
            <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}` }}><h3 style={{ color: T.w, margin: 0, fontSize: 12, fontWeight: 600 }}>Client Performance</h3></div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(6, 1fr)", padding: "7px 16px", borderBottom: `1px solid ${T.border}` }}>
                {["Client","Followers","Views 7d","Eng.","Leads","Plan","Revenue"].map(h=><span key={h} style={{ fontSize: 8, color: T.w5, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: mono }}>{h}</span>)}
              </div>
              {all.map(cl=>(
                <div key={cl.id} onClick={()=>open(cl)} style={{ display: "grid", gridTemplateColumns: "2fr repeat(6, 1fr)", padding: "10px 16px", borderBottom: `1px solid ${T.border}`, alignItems: "center", cursor: "pointer", transition: "background 0.1s" }}
                  onMouseEnter={e=>e.currentTarget.style.background=T.bg1} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 5, background: T.borderH, color: T.w, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700 }}>{cl.avatar}</div>
                    <div><div style={{ color: T.w, fontWeight: 600, fontSize: 11 }}>{cl.name}</div><div style={{ color: T.w5, fontSize: 8, fontFamily: mono }}>{cl.handle}</div></div>
                  </div>
                  <span style={{ color: T.w3, fontFamily: mono, fontSize: 11 }}>{fmt(cl.followers)}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ color: T.w3, fontFamily: mono, fontSize: 11 }}>{fmt(cl.views7d)}</span><MiniChart data={cl.dailyViews} h={16} w={40}/></div>
                  <span style={{ color: cl.engagement>=5?T.g:T.a, fontWeight: 600, fontFamily: mono, fontSize: 11 }}>{cl.engagement}%</span>
                  <span style={{ color: T.w3, fontFamily: mono, fontSize: 11 }}>{cl.leads30d}</span>
                  <span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 3, fontWeight: 600, fontFamily: mono, background: T.aD, color: T.a }}>{cl.plan}</span>
                  <span style={{ color: T.g, fontWeight: 600, fontFamily: mono, fontSize: 11 }}>${(cl.monthlyBudget||0).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "client" && c && (
          <div>
            <div style={{ padding: "18px 24px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: T.w, color: T.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>{c.avatar}</div>
                <div>
                  <h1 style={{ color: T.w, margin: 0, fontSize: 18, fontWeight: 700 }}>{c.name}</h1>
                  <div style={{ display: "flex", gap: 10, marginTop: 2, alignItems: "center" }}>
                    <a href={c.igLink} target="_blank" rel="noopener" style={{ color: T.a, fontSize: 11, fontFamily: mono, textDecoration: "none" }}>{c.handle} ↗</a>
                    <span style={{ color: T.border }}>·</span>
                    <span style={{ color: T.w4, fontSize: 10 }}>{c.niche}</span>
                    <span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 3, fontWeight: 600, background: T.aD, color: T.a, fontFamily: mono }}>{c.plan}</span>
                  </div>
                </div>
              </div>
              <button onClick={()=>{setView("overview");setSel(null);}} style={{ padding: "7px 14px", borderRadius: 5, border: `1px solid ${T.border}`, background: "transparent", color: T.w4, fontSize: 11, cursor: "pointer", fontFamily: font }}>← Back</button>
            </div>

            <div style={{ padding: "0 24px" }}><Tab tabs={["analytics","content","leads","competitors","details"]} active={cTab} onChange={setCTab}/></div>

            <div style={{ padding: 24 }}>
              {cTab === "analytics" && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))", gap: 8, marginBottom: 16 }}>
                    <Stat label="Followers" value={fmt(c.followers)} change={c.followers?(c.followersChange/c.followers)*100:0} icon="👥" sub={`+${fmt(c.followersChange)}`}/>
                    <Stat label="Views 7d" value={fmt(c.views7d)} change={12.4} icon="👁"/>
                    <Stat label="Views 30d" value={fmt(c.views30d)} change={8.2} icon="📊"/>
                    <Stat label="Views 90d" value={fmt(c.views90d)} change={15.6} icon="📈"/>
                    <Stat label="Likes 7d" value={fmt(c.likes7d)} change={6.2} icon="❤️"/>
                    <Stat label="Comments 7d" value={fmt(c.comments7d)} change={4.8} icon="💬"/>
                    <Stat label="Shares 7d" value={fmt(c.shares7d)} change={9.1} icon="🔄"/>
                    <Stat label="Saves 7d" value={fmt(c.saves7d)} change={15.2} icon="🔖"/>
                    <Stat label="Engagement" value={c.engagement+"%"} change={0.8} icon="⚡"/>
                    <Stat label="Reach Rate" value={c.reachRate+"%"} change={3.2} icon="🌍"/>
                    <Stat label="Leads 30d" value={c.leads30d} change={22.1} icon="🎯"/>
                    <Stat label="Conversions" value={c.conversions} change={14.6} icon="💰"/>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, padding: 16 }}>
                      <h3 style={{ color: T.w, margin: "0 0 12px", fontSize: 11, fontWeight: 600 }}>Daily Views</h3>
                      <Bar data={c.dailyViews} labels={DAYS}/>
                    </div>
                    <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, padding: 16 }}>
                      <h3 style={{ color: T.w, margin: "0 0 12px", fontSize: 11, fontWeight: 600 }}>Follower Growth</h3>
                      <Bar data={c.dailyFollowers.map((v,i,a)=>i===0?0:v-a[i-1])} labels={DAYS} color={T.g}/>
                    </div>
                  </div>
                </>
              )}

              {cTab === "content" && (
                <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, padding: 16 }}>
                  <h3 style={{ color: T.w, margin: "0 0 14px", fontSize: 11, fontWeight: 600 }}>Top Posts</h3>
                  {(!c.topPosts?.length) && <p style={{ color: T.w5, fontSize: 11 }}>No posts tracked.</p>}
                  {(c.topPosts||[]).map((p,i)=>(
                    <div key={p.id} style={{ display: "grid", gridTemplateColumns: "auto 2fr 1fr 1fr 1fr", padding: "10px 0", borderBottom: i<c.topPosts.length-1?`1px solid ${T.border}`:"none", alignItems: "center", gap: 12 }}>
                      <span style={{ color: T.a, fontSize: 10, fontFamily: mono, width: 18 }}>#{i+1}</span>
                      <div><div style={{ color: T.w, fontSize: 11, fontWeight: 500 }}>{p.caption}</div><div style={{ color: T.w5, fontSize: 8, marginTop: 1 }}>{p.date}</div></div>
                      {[{v:p.views,l:"views"},{v:p.likes,l:"likes"},{v:p.comments,l:"cmts"}].map(x=>(
                        <div key={x.l} style={{ textAlign: "center" }}><div style={{ color: T.w, fontSize: 12, fontWeight: 600, fontFamily: mono }}>{fmt(x.v)}</div><div style={{ color: T.w5, fontSize: 7 }}>{x.l}</div></div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {cTab === "leads" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <h3 style={{ color: T.w, margin: 0, fontSize: 11, fontWeight: 600 }}>Lead Sources (30d)</h3>
                      <button onClick={()=>setLeadModal(true)} style={{ padding: "4px 10px", borderRadius: 4, border: `1px solid ${T.border}`, background: "transparent", color: T.a, fontSize: 10, cursor: "pointer", fontFamily: font }}>+ Add</button>
                    </div>
                    {(!c.leadSources?.length) && <p style={{ color: T.w5, fontSize: 11 }}>No lead data. Click + Add to track sources.</p>}
                    {(c.leadSources||[]).map((ls,i)=><LeadSourceBar key={ls.source} source={ls.source} count={ls.count} pct={ls.pct} color={LEAD_COLORS[i%LEAD_COLORS.length]}/>)}
                  </div>
                  <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, padding: 16 }}>
                    <h3 style={{ color: T.w, margin: "0 0 14px", fontSize: 11, fontWeight: 600 }}>Lead Summary</h3>
                    {[{l:"Leads (7d)",v:c.leads7d},{l:"Leads (30d)",v:c.leads30d},{l:"Conversions",v:c.conversions},{l:"Conv. Rate",v:c.leads30d?(c.conversions/c.leads30d*100).toFixed(1)+"%":"0%"},{l:"Story Views",v:fmt(c.storyViews)},{l:"Reach Rate",v:c.reachRate+"%"}].map(r=>(
                      <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${T.border}` }}>
                        <span style={{ color: T.w3, fontSize: 11 }}>{r.l}</span>
                        <span style={{ color: T.w, fontSize: 11, fontWeight: 600, fontFamily: mono }}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {cTab === "competitors" && (
                <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ color: T.w, margin: 0, fontSize: 11, fontWeight: 600 }}>Competitors — {c.niche}</h3>
                    <button onClick={()=>setCompModal(true)} style={{ padding: "4px 10px", borderRadius: 4, border: `1px solid ${T.border}`, background: "transparent", color: T.a, fontSize: 10, cursor: "pointer", fontFamily: font }}>+ Add</button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "7px 16px", borderBottom: `1px solid ${T.border}` }}>
                    {["Account","Followers","Eng.","Views 30d"].map(h=><span key={h} style={{ fontSize: 8, color: T.w5, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: mono }}>{h}</span>)}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "10px 16px", borderBottom: `1px solid ${T.border}`, background: T.aD }}>
                    <div><div style={{ fontWeight: 600, color: T.a, fontSize: 11 }}>{c.name}</div><div style={{ color: T.w5, fontSize: 9, fontFamily: mono }}>{c.handle}</div></div>
                    <span style={{ color: T.w, fontFamily: mono, fontSize: 11 }}>{fmt(c.followers)}</span>
                    <span style={{ color: T.g, fontFamily: mono, fontSize: 11 }}>{c.engagement}%</span>
                    <span style={{ color: T.w, fontFamily: mono, fontSize: 11 }}>{fmt(c.views30d)}</span>
                  </div>
                  {(!c.competitors?.length) && <div style={{ padding: 14, textAlign: "center", color: T.w5, fontSize: 10 }}>None tracked.</div>}
                  {(c.competitors||[]).map((comp,i)=><CompRow key={i} c={comp}/>)}
                </div>
              )}

              {cTab === "details" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, padding: 16 }}>
                    <h3 style={{ color: T.w, margin: "0 0 14px", fontSize: 11, fontWeight: 600 }}>Client Info</h3>
                    {[{l:"Name",v:c.name},{l:"Instagram",v:c.handle},{l:"IG Link",v:c.igLink||"—"},{l:"Niche",v:c.niche},{l:"Email",v:c.email||"—"},{l:"Plan",v:c.plan},{l:"Budget",v:"$"+(c.monthlyBudget||0).toLocaleString()},{l:"Contract",v:c.contractEnd||"—"},{l:"Posts",v:c.posts?.toLocaleString()||"0"}].map(r=>(
                      <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${T.border}` }}>
                        <span style={{ color: T.w3, fontSize: 11 }}>{r.l}</span>
                        <span style={{ color: T.w, fontSize: 11, fontWeight: 500, fontFamily: mono, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: T.bg1, border: `1px solid ${T.border}`, borderRadius: 8, padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <h3 style={{ color: T.w, margin: 0, fontSize: 11, fontWeight: 600 }}>Notes</h3>
                      <button onClick={()=>setEditing(!editing)} style={{ padding: "3px 8px", borderRadius: 4, border: `1px solid ${T.border}`, background: "transparent", color: editing?T.g:T.w4, fontSize: 9, cursor: "pointer", fontFamily: mono }}>{editing?"Save":"Edit"}</button>
                    </div>
                    {editing?(
                      <textarea value={notes[c.id]??c.notes??""} onChange={e=>setNotes(prev=>({...prev,[c.id]:e.target.value}))}
                        style={{ width: "100%", minHeight: 180, padding: 10, borderRadius: 5, border: `1px solid ${T.border}`, background: T.bg, color: T.w, fontSize: 11, lineHeight: 1.7, outline: "none", resize: "vertical", fontFamily: font, boxSizing: "border-box" }}/>
                    ):(
                      <p style={{ color: T.w3, fontSize: 11, lineHeight: 1.8, margin: 0 }}>{notes[c.id]??c.notes??"No notes. Click Edit."}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {addModal && <Modal onClose={()=>setAddModal(false)}>
        <h3 style={{ color: T.w, margin: "0 0 18px", fontSize: 15, fontWeight: 700 }}>Add Client</h3>
        {[{k:"name",l:"Name *",p:"Brand"},{k:"handle",l:"Instagram Handle *",p:"@brand"},{k:"igLink",l:"Instagram Profile URL",p:"https://instagram.com/brand"},{k:"niche",l:"Niche",p:"Fashion"},{k:"email",l:"Email",p:"client@brand.com"}].map(f=>(
          <Inp key={f.k} label={f.l} value={newC[f.k]} onChange={e=>setNewC(p=>({...p,[f.k]:e.target.value}))} placeholder={f.p}/>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <Btn onClick={()=>setAddModal(false)}>Cancel</Btn>
          <Btn onClick={addClient} primary>Add</Btn>
        </div>
      </Modal>}

      {compModal && <Modal onClose={()=>setCompModal(false)}>
        <h3 style={{ color: T.w, margin: "0 0 18px", fontSize: 15, fontWeight: 700 }}>Add Competitor</h3>
        {[{k:"name",l:"Name",p:"Brand"},{k:"handle",l:"Handle",p:"@brand"},{k:"followers",l:"Followers",p:"150000"},{k:"engagement",l:"Engagement %",p:"4.5"},{k:"views30d",l:"Views (30d)",p:"3000000"}].map(f=>(
          <Inp key={f.k} label={f.l} value={newComp[f.k]} onChange={e=>setNewComp(p=>({...p,[f.k]:e.target.value}))} placeholder={f.p}/>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <Btn onClick={()=>setCompModal(false)}>Cancel</Btn>
          <Btn onClick={()=>{if(c&&newComp.name){c.competitors.push({name:newComp.name,handle:newComp.handle,followers:parseInt(newComp.followers)||0,engagement:parseFloat(newComp.engagement)||0,views30d:parseInt(newComp.views30d)||0});setNewComp({name:"",handle:"",followers:"",engagement:"",views30d:""});setCompModal(false);}}} primary>Add</Btn>
        </div>
      </Modal>}

      {leadModal && <Modal onClose={()=>setLeadModal(false)}>
        <h3 style={{ color: T.w, margin: "0 0 18px", fontSize: 15, fontWeight: 700 }}>Add Lead Source</h3>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 10, color: T.w4, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4, display: "block", fontFamily: mono }}>Source</label>
          <select value={newLead.source} onChange={e=>setNewLead(p=>({...p,source:e.target.value}))} style={{ width: "100%", padding: "11px 13px", borderRadius: 6, border: `1px solid ${T.border}`, background: T.bg, color: T.w, fontSize: 13, outline: "none", fontFamily: font, boxSizing: "border-box" }}>
            {LEAD_SOURCES.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <Inp label="Number of Leads" value={newLead.count} onChange={e=>setNewLead(p=>({...p,count:e.target.value}))} placeholder="e.g. 25"/>
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <Btn onClick={()=>setLeadModal(false)}>Cancel</Btn>
          <Btn onClick={()=>{
            if(c&&newLead.count){
              const cnt = parseInt(newLead.count)||0;
              const existing = c.leadSources||[];
              const found = existing.find(l=>l.source===newLead.source);
              if(found){found.count+=cnt;} else {existing.push({source:newLead.source,count:cnt,pct:0});}
              const total = existing.reduce((a,l)=>a+l.count,0);
              existing.forEach(l=>l.pct=parseFloat((l.count/total*100).toFixed(1)));
              existing.sort((a,b)=>b.count-a.count);
              c.leadSources = existing;
              setNewLead({source:LEAD_SOURCES[0],count:""});
              setLeadModal(false);
            }
          }} primary>Add</Btn>
        </div>
      </Modal>}
    </div>
  );
};

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function CCAccelerator() {
  const [user, setUser] = useState(null);
  const [clientAccounts, setClientAccounts] = useState([
    { email: "luxe@demo.com", password: "client123", name: "Luxe Fashion", clientId: "c1" },
    { email: "fitpro@demo.com", password: "client123", name: "FitPro Academy", clientId: "c2" },
    { email: "nomad@demo.com", password: "client123", name: "Nomad Eats", clientId: "c3" },
    { email: "tech@demo.com", password: "client123", name: "TechVault", clientId: "c4" },
  ]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadStorage("cc-client-accounts", null);
    if (saved) setClientAccounts(saved);
    const savedClients = loadStorage("cc-clients-data", null);
    if (savedClients && savedClients.length > 0) {
      SEED_CLIENTS.length = 0;
      savedClients.forEach(c => SEED_CLIENTS.push(c));
    }
    setLoaded(true);
  }, []);

  if (!loaded) return <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: font }}>Loading...</div>;

  if (!user) return <AuthScreen onLogin={setUser} clientAccounts={clientAccounts} setClientAccounts={setClientAccounts} />;

  if (user.role === "client") {
    const client = SEED_CLIENTS.find(c => c.id === user.clientId);
    return <ClientView client={client} onLogout={() => setUser(null)} />;
  }

  return <AgencyDash onLogout={() => setUser(null)} userName={user.name} />;
}
