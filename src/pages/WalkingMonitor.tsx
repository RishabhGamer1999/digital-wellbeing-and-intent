import MonitorHeader from "@/components/MonitorHeader";
import MonitorDateRange from "@/components/MonitorDateRange";
import { Eye, MapPin, Music, Camera, MessageCircle, Hash } from "lucide-react";

const totalWalk = 32;
const phoneActive = 22;
const ratio = phoneActive / totalWalk;
const circumference = 2 * Math.PI * 54;
const offset = circumference * (1 - ratio);

const categories = [
  {
    label: "Utility",
    color: "#4CAF50",
    minutes: 7,
    apps: [
      { name: "Google Maps", minutes: 5, icon: MapPin },
      { name: "Spotify", minutes: 2, icon: Music },
    ],
  },
  {
    label: "Distraction",
    color: "#F44336",
    minutes: 15,
    apps: [
      { name: "Instagram", minutes: 10, icon: Camera },
      { name: "Reddit", minutes: 3, icon: Hash },
      { name: "WhatsApp", minutes: 2, icon: MessageCircle },
    ],
  },
];

const sessions = [
  { id: "walk_sess_001", start: "08:15", duration: 32, phoneMin: 22, topApp: "Instagram" },
  { id: "walk_sess_002", start: "12:32", duration: 12, phoneMin: 3, topApp: "Google Maps" },
  { id: "walk_sess_003", start: "17:50", duration: 18, phoneMin: 7, topApp: "Spotify" },
];

const WalkingMonitor = () => {
  return (
    <div className="space-y-5">
      <MonitorHeader title="Walking Monitor" />
      <MonitorDateRange />

      {/* Hero Progress Ring */}
      <div className="bg-card rounded-xl p-6 flex flex-col items-center gap-3">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#F44336"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{phoneActive}</span>
            <span className="text-[10px] text-muted-foreground">of {totalWalk} min</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center max-w-[250px]">
          You were on your phone for {phoneActive} of your {totalWalk} minutes walking today.
        </p>
      </div>

      {/* Usage Breakdown */}
      <div className="bg-card rounded-xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Walking Phone Usage Breakdown</h2>
        {/* Stacked bar */}
        <div className="w-full h-4 rounded-full overflow-hidden flex bg-secondary">
          {categories.map((cat) => (
            <div
              key={cat.label}
              style={{ width: `${(cat.minutes / phoneActive) * 100}%`, backgroundColor: cat.color }}
              className="h-full"
            />
          ))}
        </div>
        {/* Per-app breakdown */}
        {categories.map((cat) => (
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
          <p className="text-xs text-muted-foreground leading-relaxed">
            You spent 15 of your 22 minutes on social media instead of looking up. That's 68% of your walk.
          </p>
        </div>
      </div>

      {/* Session List */}
      <div className="bg-card rounded-xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Today's Walking Sessions</h2>
        {sessions.map((s) => (
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
