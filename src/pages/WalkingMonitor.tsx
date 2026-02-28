import { useState, useMemo } from "react";
import MonitorHeader from "@/components/MonitorHeader";
import MonitorDateRange from "@/components/MonitorDateRange";
import { Eye, MapPin, Music, Camera, MessageCircle, Hash, Phone } from "lucide-react";

const circumference = 2 * Math.PI * 54;

const dataByRange = {
  today: {
    totalWalk: 32, phoneActive: 22,
    categories: [
      { label: "Utility", color: "#4CAF50", minutes: 7, apps: [
        { name: "Google Maps", minutes: 5, icon: MapPin }, { name: "Spotify", minutes: 2, icon: Music }] },
      { label: "Distraction", color: "#F44336", minutes: 15, apps: [
        { name: "Instagram", minutes: 10, icon: Camera }, { name: "Reddit", minutes: 3, icon: Hash }, { name: "WhatsApp", minutes: 2, icon: MessageCircle }] },
    ],
    insight: "You spent 15 of your 22 minutes on social media instead of looking up. That's 68% of your walk.",
    sessionLabel: "Today's Walking Sessions",
    sessions: [
      { id: "1", start: "08:15", duration: 32, phoneMin: 22, topApp: "Instagram" },
      { id: "2", start: "12:32", duration: 12, phoneMin: 3, topApp: "Google Maps" },
      { id: "3", start: "17:50", duration: 18, phoneMin: 7, topApp: "Spotify" },
    ],
  },
  "7_days": {
    totalWalk: 210, phoneActive: 128,
    categories: [
      { label: "Utility", color: "#4CAF50", minutes: 42, apps: [
        { name: "Google Maps", minutes: 25, icon: MapPin }, { name: "Spotify", minutes: 12, icon: Music }, { name: "Phone", minutes: 5, icon: Phone }] },
      { label: "Distraction", color: "#F44336", minutes: 86, apps: [
        { name: "Instagram", minutes: 48, icon: Camera }, { name: "Reddit", minutes: 22, icon: Hash }, { name: "WhatsApp", minutes: 16, icon: MessageCircle }] },
    ],
    insight: "Over the past 7 days, 67% of your walking phone time was spent on social media — averaging 12 min/day of distracted walking.",
    sessionLabel: "Last 7 Days — Daily Averages",
    sessions: [
      { id: "d1", start: "Mon", duration: 35, phoneMin: 20, topApp: "Instagram" },
      { id: "d2", start: "Tue", duration: 28, phoneMin: 15, topApp: "Reddit" },
      { id: "d3", start: "Wed", duration: 42, phoneMin: 24, topApp: "Instagram" },
      { id: "d4", start: "Thu", duration: 18, phoneMin: 8, topApp: "Google Maps" },
      { id: "d5", start: "Fri", duration: 30, phoneMin: 22, topApp: "Instagram" },
      { id: "d6", start: "Sat", duration: 25, phoneMin: 18, topApp: "WhatsApp" },
      { id: "d7", start: "Sun", duration: 32, phoneMin: 21, topApp: "Instagram" },
    ],
  },
  "30_days": {
    totalWalk: 840, phoneActive: 480,
    categories: [
      { label: "Utility", color: "#4CAF50", minutes: 155, apps: [
        { name: "Google Maps", minutes: 90, icon: MapPin }, { name: "Spotify", minutes: 45, icon: Music }, { name: "Phone", minutes: 20, icon: Phone }] },
      { label: "Distraction", color: "#F44336", minutes: 325, apps: [
        { name: "Instagram", minutes: 180, icon: Camera }, { name: "Reddit", minutes: 85, icon: Hash }, { name: "WhatsApp", minutes: 60, icon: MessageCircle }] },
    ],
    insight: "This month, you spent 325 of 480 phone-active walking minutes on social media (68%). Your distraction rate has been consistent week over week.",
    sessionLabel: "Last 30 Days — Weekly Averages",
    sessions: [
      { id: "w1", start: "Week 1", duration: 195, phoneMin: 110, topApp: "Instagram" },
      { id: "w2", start: "Week 2", duration: 220, phoneMin: 130, topApp: "Instagram" },
      { id: "w3", start: "Week 3", duration: 210, phoneMin: 118, topApp: "Reddit" },
      { id: "w4", start: "Week 4", duration: 215, phoneMin: 122, topApp: "Instagram" },
    ],
  },
};

const WalkingMonitor = () => {
  const [range, setRange] = useState("today");
  const d = dataByRange[range as keyof typeof dataByRange];
  const ratio = d.phoneActive / d.totalWalk;
  const offset = circumference * (1 - ratio);
  const periodLabel = range === "today" ? "today" : range === "7_days" ? "this week" : "this month";

  return (
    <div className="space-y-5">
      <MonitorHeader title="Walking Monitor" />
      <MonitorDateRange value={range} onChange={setRange} />

      {/* Hero Progress Ring */}
      <div className="bg-card rounded-xl p-6 flex flex-col items-center gap-3">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
            <circle cx="60" cy="60" r="54" fill="none" stroke="#F44336" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-500" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{d.phoneActive}</span>
            <span className="text-[10px] text-muted-foreground">of {d.totalWalk} min</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center max-w-[250px]">
          You were on your phone for {d.phoneActive} of your {d.totalWalk} minutes walking {periodLabel}.
        </p>
      </div>

      {/* Usage Breakdown */}
      <div className="bg-card rounded-xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Walking Phone Usage Breakdown</h2>
        <div className="w-full h-4 rounded-full overflow-hidden flex bg-secondary">
          {d.categories.map((cat) => (
            <div key={cat.label} style={{ width: `${(cat.minutes / d.phoneActive) * 100}%`, backgroundColor: cat.color }}
              className="h-full transition-all duration-500" />
          ))}
        </div>
        {d.categories.map((cat) => (
          <div key={cat.label} className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-xs font-medium text-foreground">{cat.label}</span>
              <span className="text-xs text-muted-foreground ml-auto">{cat.minutes} min</span>
            </div>
            {cat.apps.map((app) => {
              const Icon = app.icon;
              return (
                <div key={app.name} className="flex items-center gap-2 pl-4">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{app.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{app.minutes} min</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Reflective Insight */}
      <div className="bg-card rounded-xl p-4 border border-[#F44336]/20 glow-danger">
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-[#F44336] mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">{d.insight}</p>
        </div>
      </div>

      {/* Session List */}
      <div className="bg-card rounded-xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-foreground">{d.sessionLabel}</h2>
        {d.sessions.map((s) => (
          <div key={s.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <div>
              <p className="text-sm font-medium text-foreground">{s.start}</p>
              <p className="text-[10px] text-muted-foreground">{s.duration} min · {s.phoneMin} min phone</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Top: {s.topApp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalkingMonitor;
