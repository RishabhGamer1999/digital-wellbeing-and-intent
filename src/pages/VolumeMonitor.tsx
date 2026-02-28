import { useState } from "react";
import MonitorHeader from "@/components/MonitorHeader";
import MonitorDateRange from "@/components/MonitorDateRange";
import { TrendingUp, Music } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceArea, Tooltip } from "recharts";

const dataByRange = {
  today: {
    avgVolume: 78,
    chartData: [
      { time: "07:30", volume: 55, swipe: 19 }, { time: "08:15", volume: 62, swipe: 51 },
      { time: "09:00", volume: 70, swipe: 34 }, { time: "10:30", volume: 45, swipe: 22 },
      { time: "12:00", volume: 60, swipe: 31 }, { time: "13:00", volume: 78, swipe: 57 },
      { time: "14:00", volume: 82, swipe: 65 }, { time: "15:30", volume: 88, swipe: 77 },
      { time: "16:00", volume: 91, swipe: 85 }, { time: "17:00", volume: 75, swipe: 44 },
      { time: "18:30", volume: 65, swipe: 33 }, { time: "20:00", volume: 80, swipe: 59 },
      { time: "21:00", volume: 85, swipe: 72 }, { time: "22:04", volume: 90, swipe: 93 },
      { time: "22:30", volume: 88, swipe: 86 }, { time: "23:00", volume: 72, swipe: 52 },
    ],
    corrWindows: [{ x1: "13:00", x2: "16:00" }, { x1: "21:00", x2: "23:00" }],
    bpm: [
      { time: "07:30", bpm: 82, color: "#4CAF50" }, { time: "08:15", bpm: 96, color: "#4CAF50" },
      { time: "09:00", bpm: 104, color: "#FF9800" }, { time: "12:00", bpm: 88, color: "#4CAF50" },
      { time: "13:00", bpm: 118, color: "#FF9800" }, { time: "14:00", bpm: 128, color: "#FF9800" },
      { time: "15:30", bpm: 142, color: "#F44336" }, { time: "16:00", bpm: 148, color: "#F44336" },
      { time: "17:00", bpm: 112, color: "#FF9800" }, { time: "18:30", bpm: 90, color: "#4CAF50" },
      { time: "20:00", bpm: 122, color: "#FF9800" }, { time: "21:00", bpm: 136, color: "#FF9800" },
      { time: "22:04", bpm: 151, color: "#F44336" }, { time: "22:30", bpm: 144, color: "#F44336" },
      { time: "23:00", bpm: 108, color: "#FF9800" },
    ],
    insight: "When your music exceeds 130 BPM, your swipe speed increases by an average of 2.3×. This happened 4 times today.",
    tracks: [
      { label: "Energetic Track A", bpm: 148, vol: 91, swipe: 810 },
      { label: "Energetic Track B", bpm: 151, vol: 90, swipe: 880 },
      { label: "Energetic Track C", bpm: 144, vol: 88, swipe: 820 },
      { label: "Energetic Track D", bpm: 136, vol: 85, swipe: 680 },
    ],
  },
  "7_days": {
    avgVolume: 74,
    chartData: [
      { time: "Mon", volume: 68, swipe: 42 }, { time: "Tue", volume: 72, swipe: 55 },
      { time: "Wed", volume: 80, swipe: 68 }, { time: "Thu", volume: 65, swipe: 35 },
      { time: "Fri", volume: 82, swipe: 78 }, { time: "Sat", volume: 78, swipe: 62 },
      { time: "Sun", volume: 70, swipe: 48 },
    ],
    corrWindows: [{ x1: "Wed", x2: "Fri" }],
    bpm: [
      { time: "Mon", bpm: 95, color: "#4CAF50" }, { time: "Tue", bpm: 110, color: "#FF9800" },
      { time: "Wed", bpm: 135, color: "#FF9800" }, { time: "Thu", bpm: 88, color: "#4CAF50" },
      { time: "Fri", bpm: 145, color: "#F44336" }, { time: "Sat", bpm: 120, color: "#FF9800" },
      { time: "Sun", bpm: 98, color: "#4CAF50" },
    ],
    insight: "This week, your swipe speed spiked 2.1× on days when average BPM exceeded 130. Wednesday and Friday were your most intense listening days.",
    tracks: [
      { label: "Weekly Hit A", bpm: 145, vol: 82, swipe: 780 },
      { label: "Weekly Hit B", bpm: 138, vol: 80, swipe: 720 },
      { label: "Weekly Hit C", bpm: 135, vol: 78, swipe: 690 },
      { label: "Weekly Hit D", bpm: 132, vol: 76, swipe: 660 },
    ],
  },
  "30_days": {
    avgVolume: 72,
    chartData: [
      { time: "Wk1", volume: 70, swipe: 45 }, { time: "Wk2", volume: 75, swipe: 58 },
      { time: "Wk3", volume: 78, swipe: 65 }, { time: "Wk4", volume: 68, swipe: 40 },
    ],
    corrWindows: [{ x1: "Wk2", x2: "Wk3" }],
    bpm: [
      { time: "Wk1", bpm: 102, color: "#FF9800" }, { time: "Wk2", bpm: 128, color: "#FF9800" },
      { time: "Wk3", bpm: 140, color: "#F44336" }, { time: "Wk4", bpm: 95, color: "#4CAF50" },
    ],
    insight: "Over 30 days, high-BPM listening correlated with 1.9× faster scrolling. Week 3 was your peak — avg volume hit 78% with 140 BPM tracks.",
    tracks: [
      { label: "Monthly Fave A", bpm: 142, vol: 80, swipe: 750 },
      { label: "Monthly Fave B", bpm: 138, vol: 78, swipe: 710 },
      { label: "Monthly Fave C", bpm: 134, vol: 76, swipe: 680 },
      { label: "Monthly Fave D", bpm: 130, vol: 74, swipe: 640 },
    ],
  },
};

const VolumeMonitor = () => {
  const [range, setRange] = useState("today");
  const d = dataByRange[range as keyof typeof dataByRange];
  const gaugeColor = d.avgVolume > 85 ? "#F44336" : d.avgVolume > 70 ? "#FF9800" : "#4CAF50";
  const gaugeAngle = (d.avgVolume / 100) * 180;

  return (
    <div className="space-y-5">
      <MonitorHeader title="Volume Monitor" />
      <MonitorDateRange value={range} onChange={setRange} />

      {/* Hero Gauge */}
      <div className="bg-card rounded-xl p-6 flex flex-col items-center gap-3">
        <div className="relative w-36 h-20 overflow-hidden">
          <svg viewBox="0 0 140 75" className="w-full h-full">
            <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke="hsl(var(--secondary))" strokeWidth="10" strokeLinecap="round" />
            <path d="M 10 70 A 60 60 0 0 1 130 70" fill="none" stroke={gaugeColor} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${(gaugeAngle / 180) * 188.5} 188.5`} className="transition-all duration-500" />
          </svg>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <span className="text-2xl font-bold text-foreground">{d.avgVolume}%</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center">Avg Headphone Volume</p>
        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
          style={{ backgroundColor: `${gaugeColor}20`, color: gaugeColor }}>
          {d.avgVolume > 85 ? "High Risk" : d.avgVolume > 70 ? "Elevated" : "Safe"}
        </span>
      </div>

      {/* Volume vs Swipe Chart */}
      <div className="bg-card rounded-xl p-4 space-y-2">
        <h2 className="text-sm font-semibold text-foreground">Volume vs. Scroll Speed</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={d.chartData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <XAxis dataKey="time" tick={{ fontSize: 8, fill: "hsl(0 0% 55%)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "hsl(0 0% 55%)" }} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "#2C2C2E", border: "none", borderRadius: 8, fontSize: 11 }} labelStyle={{ color: "#999" }} />
              {d.corrWindows.map((w, i) => (
                <ReferenceArea key={i} x1={w.x1} x2={w.x2} fill="rgba(255, 235, 59, 0.2)" strokeOpacity={0} />
              ))}
              <Line type="monotone" dataKey="volume" stroke="#9C27B0" strokeWidth={2} dot={false} name="Volume %" />
              <Line type="monotone" dataKey="swipe" stroke="#FF9800" strokeWidth={2} dot={false} name="Swipe %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 justify-center">
          <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-[#9C27B0] rounded" /><span className="text-[10px] text-muted-foreground">Volume</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-[#FF9800] rounded" /><span className="text-[10px] text-muted-foreground">Swipe Speed</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-1.5 bg-[rgba(255,235,59,0.4)] rounded" /><span className="text-[10px] text-muted-foreground">Correlation</span></div>
        </div>
      </div>

      {/* BPM Context Bar */}
      <div className="bg-card rounded-xl p-4 space-y-2">
        <h2 className="text-sm font-semibold text-foreground">Music Tempo During Headphone Use</h2>
        <div className="flex h-6 rounded-full overflow-hidden">
          {d.bpm.map((seg, i) => (
            <div key={i} className="flex-1 relative group" style={{ backgroundColor: seg.color }}>
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
          <p className="text-xs text-muted-foreground leading-relaxed">{d.insight}</p>
        </div>
      </div>

      {/* Top Tracks */}
      <div className="bg-card rounded-xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Tracks During High-Scroll + High-Volume</h2>
        {d.tracks.map((t, i) => (
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
