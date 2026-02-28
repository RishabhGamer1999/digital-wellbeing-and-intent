import MonitorHeader from "@/components/MonitorHeader";
import MonitorDateRange from "@/components/MonitorDateRange";
import { Headphones, TrendingUp, Music } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceArea, Tooltip } from "recharts";

const avgVolume = 78;
const gaugeColor = avgVolume > 85 ? "#F44336" : avgVolume > 70 ? "#FF9800" : "#4CAF50";
const gaugeAngle = (avgVolume / 100) * 180;

const volumeSwipeData = [
  { time: "07:30", volume: 55, swipe: 19 },
  { time: "08:15", volume: 62, swipe: 51 },
  { time: "09:00", volume: 70, swipe: 34 },
  { time: "10:30", volume: 45, swipe: 22 },
  { time: "12:00", volume: 60, swipe: 31 },
  { time: "13:00", volume: 78, swipe: 57 },
  { time: "14:00", volume: 82, swipe: 65 },
  { time: "15:30", volume: 88, swipe: 77 },
  { time: "16:00", volume: 91, swipe: 85 },
  { time: "17:00", volume: 75, swipe: 44 },
  { time: "18:30", volume: 65, swipe: 33 },
  { time: "20:00", volume: 80, swipe: 59 },
  { time: "21:00", volume: 85, swipe: 72 },
  { time: "22:04", volume: 90, swipe: 93 },
  { time: "22:30", volume: 88, swipe: 86 },
  { time: "23:00", volume: 72, swipe: 52 },
];

const bpmSegments = [
  { time: "07:30", bpm: 82, color: "#4CAF50" },
  { time: "08:15", bpm: 96, color: "#4CAF50" },
  { time: "09:00", bpm: 104, color: "#FF9800" },
  { time: "12:00", bpm: 88, color: "#4CAF50" },
  { time: "13:00", bpm: 118, color: "#FF9800" },
  { time: "14:00", bpm: 128, color: "#FF9800" },
  { time: "15:30", bpm: 142, color: "#F44336" },
  { time: "16:00", bpm: 148, color: "#F44336" },
  { time: "17:00", bpm: 112, color: "#FF9800" },
  { time: "18:30", bpm: 90, color: "#4CAF50" },
  { time: "20:00", bpm: 122, color: "#FF9800" },
  { time: "21:00", bpm: 136, color: "#FF9800" },
  { time: "22:04", bpm: 151, color: "#F44336" },
  { time: "22:30", bpm: 144, color: "#F44336" },
  { time: "23:00", bpm: 108, color: "#FF9800" },
];

const tracks = [
  { label: "Energetic Track A", bpm: 148, vol: 91, swipe: 810 },
  { label: "Energetic Track B", bpm: 151, vol: 90, swipe: 880 },
  { label: "Energetic Track C", bpm: 144, vol: 88, swipe: 820 },
  { label: "Energetic Track D", bpm: 136, vol: 85, swipe: 680 },
];

// Correlation windows indices (by time label)
const corrWindow1 = { x1: "13:00", x2: "16:00" };
const corrWindow2 = { x1: "21:00", x2: "23:00" };

const VolumeMonitor = () => {
  return (
    <div className="space-y-5">
      <MonitorHeader title="Volume Monitor" />
      <MonitorDateRange />

      {/* Hero Gauge */}
      <div className="bg-card rounded-xl p-6 flex flex-col items-center gap-3">
        <div className="relative w-36 h-20 overflow-hidden">
          <svg viewBox="0 0 140 75" className="w-full h-full">
            {/* Track arc */}
            <path
              d="M 10 70 A 60 60 0 0 1 130 70"
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Filled arc */}
            <path
              d="M 10 70 A 60 60 0 0 1 130 70"
              fill="none"
              stroke={gaugeColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${(gaugeAngle / 180) * 188.5} 188.5`}
            />
          </svg>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <span className="text-2xl font-bold text-foreground">{avgVolume}%</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">Avg Headphone Volume Today</p>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
          style={{ backgroundColor: `${gaugeColor}20`, color: gaugeColor }}
        >
          {avgVolume > 85 ? "High Risk" : avgVolume > 70 ? "Elevated" : "Safe"}
        </span>
      </div>

      {/* Volume vs Swipe Chart */}
      <div className="bg-card rounded-xl p-4 space-y-2">
        <h2 className="text-sm font-semibold text-foreground">Volume vs. Scroll Speed</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={volumeSwipeData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <XAxis dataKey="time" tick={{ fontSize: 8, fill: "hsl(0 0% 55%)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "hsl(0 0% 55%)" }} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ background: "#2C2C2E", border: "none", borderRadius: 8, fontSize: 11 }}
                labelStyle={{ color: "#999" }}
              />
              <ReferenceArea x1={corrWindow1.x1} x2={corrWindow1.x2} fill="rgba(255, 235, 59, 0.2)" strokeOpacity={0} />
              <ReferenceArea x1={corrWindow2.x1} x2={corrWindow2.x2} fill="rgba(255, 235, 59, 0.2)" strokeOpacity={0} />
              <Line type="monotone" dataKey="volume" stroke="#9C27B0" strokeWidth={2} dot={false} name="Volume %" />
              <Line type="monotone" dataKey="swipe" stroke="#FF9800" strokeWidth={2} dot={false} name="Swipe %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 justify-center">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-[#9C27B0] rounded" />
            <span className="text-[10px] text-muted-foreground">Volume</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-[#FF9800] rounded" />
            <span className="text-[10px] text-muted-foreground">Swipe Speed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1.5 bg-[rgba(255,235,59,0.4)] rounded" />
            <span className="text-[10px] text-muted-foreground">Correlation</span>
          </div>
        </div>
      </div>

      {/* BPM Context Bar */}
      <div className="bg-card rounded-xl p-4 space-y-2">
        <h2 className="text-sm font-semibold text-foreground">Music Tempo During Headphone Use</h2>
        <div className="flex h-6 rounded-full overflow-hidden">
          {bpmSegments.map((seg, i) => (
            <div
              key={i}
              className="flex-1 relative group"
              style={{ backgroundColor: seg.color }}
            >
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] text-muted-foreground whitespace-nowrap">
                {seg.bpm} BPM
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-muted-foreground mt-3">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#4CAF50]" />Calm &lt;100</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#FF9800]" />Energetic 100–140</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#F44336]" />Intense &gt;140</div>
        </div>
      </div>

      {/* Correlation Stat */}
      <div className="bg-card rounded-xl p-4 border border-[#9C27B0]/20">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-[#9C27B0] mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            When your music exceeds 130 BPM, your swipe speed increases by an average of 2.3×. This happened 4 times today.
          </p>
        </div>
      </div>

      {/* Top Tracks */}
      <div className="bg-card rounded-xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Tracks During High-Scroll + High-Volume</h2>
        {tracks.map((t, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <div className="flex items-center gap-3">
              <Music className="w-4 h-4 text-[#9C27B0]" />
              <div>
                <p className="text-sm font-medium text-foreground">{t.label}</p>
                <p className="text-[10px] text-muted-foreground">{t.bpm} BPM · {t.vol}% vol</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{t.swipe} px/s</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolumeMonitor;
