import { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "@/data/digital-wellbeing-data.json";
import IntentTimeline from "@/components/IntentTimeline";
import AlertCard from "@/components/AlertCard";
import StatsBar from "@/components/StatsBar";
import MonitorDateRange from "@/components/MonitorDateRange";
import { Footprints, Car, Headphones } from "lucide-react";

const screen = data.screens[1];
const timeline = screen.components.find((c: any) => c.type === "timeline") as any;
const alert = screen.components.find((c: any) => c.type === "alert_card") as any;
const stats = screen.components.find((c: any) => c.type === "stats_bar") as any;

const dataByRange = {
  today: {
    label: "Today's Intent Spectrum",
    subtitle: "Your digital wellbeing at a glance",
    stats: { totalScreenTime: stats.stats.total_screen_time, highTensionPercentage: stats.stats.high_tension_percentage, focusedPercentage: stats.stats.focused_percentage },
    slots: timeline.slots,
    alert: { appName: alert.data.app_name, duration: alert.data.duration_minutes, trigger: alert.data.trigger_label, scroll: alert.data.scroll_velocity_avg, session: "sess_2200_instagram" },
    monitors: [
      { icon: Footprints, label: "Walking", sublabel: "22 min on phone while walking", color: "#4CAF50", route: "/digital-wellbeing/monitors/walking" },
      { icon: Car, label: "Driving", sublabel: "9 min active during drive", color: "#FF9800", route: "/digital-wellbeing/monitors/driving" },
      { icon: Headphones, label: "Volume", sublabel: "Avg 78% volume today", color: "#9C27B0", route: "/digital-wellbeing/monitors/volume" },
    ],
  },
  "7_days": {
    label: "Last 7 Days — Intent Spectrum",
    subtitle: "Weekly patterns across your digital habits",
    stats: { totalScreenTime: "38h 12m", highTensionPercentage: 31, focusedPercentage: 28 },
    slots: timeline.slots.map((s: any, i: number) => ({
      ...s,
      state: i % 5 === 0 ? "high_tension" : i % 3 === 0 ? "elevated" : i % 2 === 0 ? "focused" : s.state,
    })),
    alert: { appName: "Instagram", duration: 145, trigger: "Repeated late-night doom scrolling detected", scroll: 820, session: "sess_2200_instagram" },
    monitors: [
      { icon: Footprints, label: "Walking", sublabel: "128 min on phone while walking", color: "#4CAF50", route: "/digital-wellbeing/monitors/walking" },
      { icon: Car, label: "Driving", sublabel: "38 min active during drives", color: "#FF9800", route: "/digital-wellbeing/monitors/driving" },
      { icon: Headphones, label: "Volume", sublabel: "Avg 74% volume this week", color: "#9C27B0", route: "/digital-wellbeing/monitors/volume" },
    ],
  },
  "30_days": {
    label: "Last 30 Days — Intent Spectrum",
    subtitle: "Monthly overview of your digital wellbeing",
    stats: { totalScreenTime: "156h 40m", highTensionPercentage: 28, focusedPercentage: 32 },
    slots: timeline.slots.map((s: any, i: number) => ({
      ...s,
      state: i % 4 === 0 ? "focused" : i % 6 === 0 ? "high_tension" : i % 3 === 0 ? "neutral" : s.state,
    })),
    alert: { appName: "Instagram", duration: 580, trigger: "Consistent high-tension pattern detected monthly", scroll: 790, session: "sess_2200_instagram" },
    monitors: [
      { icon: Footprints, label: "Walking", sublabel: "480 min on phone while walking", color: "#4CAF50", route: "/digital-wellbeing/monitors/walking" },
      { icon: Car, label: "Driving", sublabel: "142 min active during drives", color: "#FF9800", route: "/digital-wellbeing/monitors/driving" },
      { icon: Headphones, label: "Volume", sublabel: "Avg 72% volume this month", color: "#9C27B0", route: "/digital-wellbeing/monitors/volume" },
    ],
  },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [range, setRange] = useState("today");
  const d = dataByRange[range as keyof typeof dataByRange];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{d.label}</h1>
        <p className="text-sm text-muted-foreground mt-1">{d.subtitle}</p>
      </div>

      <MonitorDateRange value={range} onChange={setRange} />

      <StatsBar
        totalScreenTime={d.stats.totalScreenTime}
        highTensionPercentage={d.stats.highTensionPercentage}
        focusedPercentage={d.stats.focusedPercentage}
      />

      {/* Activity Monitors Row */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-foreground">Activity Monitors</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
          {d.monitors.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.label}
                onClick={() => navigate(m.route)}
                className="flex-shrink-0 w-36 bg-card rounded-xl p-3 text-left hover:bg-accent transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${m.color}20` }}>
                  <Icon className="w-4 h-4" style={{ color: m.color }} />
                </div>
                <p className="text-sm font-medium text-foreground">{m.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{m.sublabel}</p>
              </button>
            );
          })}
        </div>
      </div>

      <IntentTimeline slots={d.slots} />

      <AlertCard
        appName={d.alert.appName}
        durationMinutes={d.alert.duration}
        triggerLabel={d.alert.trigger}
        scrollVelocityAvg={d.alert.scroll}
        sessionId={d.alert.session}
      />
    </div>
  );
};

export default Dashboard;
