import { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "@/data/digital-wellbeing-data.json";
import IntentTimeline from "@/components/IntentTimeline";
import AlertCard from "@/components/AlertCard";
import StatsBar from "@/components/StatsBar";
import MonitorDateRange from "@/components/MonitorDateRange";
import { Footprints, Car, Headphones, Zap } from "lucide-react";

const screen = data.screens[1];
const timeline = screen.components.find((c: any) => c.type === "timeline") as any;
const alert = screen.components.find((c: any) => c.type === "alert_card") as any;
const stats = screen.components.find((c: any) => c.type === "stats_bar") as any;

const dataByRange = {
  today: {
    label: "Today's Intent Spectrum",
    subtitle: "Your digital wellbeing at a glance",
    stats: { totalScreenTime: stats.stats.total_screen_time, highTensionPercentage: stats.stats.high_tension_percentage, focusedPercentage: stats.stats.focused_percentage },
    slots: [
      { hour: 0, state: "inactive", color: "#2C2C2E", dominant_app: "Clock", session_ids: [], state_label: "Inactive" },
      { hour: 1, state: "inactive", color: "#2C2C2E", dominant_app: "Clock", session_ids: [], state_label: "Inactive" },
      { hour: 2, state: "inactive", color: "#2C2C2E", dominant_app: "Clock", session_ids: [], state_label: "Inactive" },
      { hour: 3, state: "inactive", color: "#2C2C2E", dominant_app: "Clock", session_ids: [], state_label: "Inactive" },
      { hour: 4, state: "inactive", color: "#2C2C2E", dominant_app: "Clock", session_ids: [], state_label: "Inactive" },
      { hour: 5, state: "inactive", color: "#2C2C2E", dominant_app: "Clock", session_ids: [], state_label: "Inactive" },
      { hour: 6, state: "inactive", color: "#2C2C2E", dominant_app: "Clock", session_ids: [], state_label: "Inactive" },
      { hour: 7, state: "utility", color: "#2196F3", dominant_app: "Gmail", session_ids: ["sess_070"], state_label: "Utility" },
      { hour: 8, state: "utility", color: "#2196F3", dominant_app: "Notion", session_ids: ["sess_080"], state_label: "Utility" },
      { hour: 9, state: "leisure", color: "#4CAF50", dominant_app: "Slack", session_ids: ["sess_090"], state_label: "Leisure" },
      { hour: 10, state: "leisure", color: "#4CAF50", dominant_app: "Chrome", session_ids: ["sess_100"], state_label: "Leisure" },
      { hour: 11, state: "leisure", color: "#4CAF50", dominant_app: "Notion", session_ids: ["sess_110"], state_label: "Leisure" },
      { hour: 12, state: "leisure", color: "#4CAF50", dominant_app: "YouTube", session_ids: ["sess_120"], state_label: "Leisure" },
      { hour: 13, state: "utility", color: "#2196F3", dominant_app: "Spotify", session_ids: ["sess_130"], state_label: "Utility" },
      { hour: 14, state: "utility", color: "#2196F3", dominant_app: "Slack", session_ids: ["sess_140"], state_label: "Utility" },
      { hour: 15, state: "leisure", color: "#4CAF50", dominant_app: "Chrome", session_ids: ["sess_150"], state_label: "Leisure" },
      { hour: 16, state: "leisure", color: "#4CAF50", dominant_app: "Twitter", session_ids: ["sess_160"], state_label: "Leisure" },
      { hour: 17, state: "leisure", color: "#4CAF50", dominant_app: "Maps", session_ids: ["sess_170"], state_label: "Leisure" },
      { hour: 18, state: "utility", color: "#2196F3", dominant_app: "Spotify", session_ids: ["sess_180"], state_label: "Utility" },
      { hour: 19, state: "utility", color: "#2196F3", dominant_app: "YouTube", session_ids: ["sess_190"], state_label: "Utility" },
      { hour: 20, state: "leisure", color: "#4CAF50", dominant_app: "Reddit", session_ids: ["sess_200"], state_label: "Leisure" },
      { hour: 21, state: "leisure", color: "#4CAF50", dominant_app: "Reddit", session_ids: ["sess_210"], state_label: "Leisure" },
      { hour: 22, state: "dysregulation", color: "#F44336", dominant_app: "Instagram", session_ids: ["sess_2200_instagram"], state_label: "Dysregulation" },
      { hour: 23, state: "dysregulation", color: "#F44336", dominant_app: "Instagram", session_ids: ["sess_2200_instagram"], state_label: "Dysregulation" },
    ],
    alert: { appName: alert.data.app_name, duration: alert.data.duration_minutes, trigger: alert.data.trigger_label, scroll: alert.data.scroll_velocity_avg, session: "sess_2200_instagram" },
    highTension: [
      { app: "Instagram", tag: "Endless scrolling", duration: 47, session: "sess_2200_instagram", color: "#E040FB" },
      { app: "Reddit", tag: "Rage browsing", duration: 23, session: "sess_2200_instagram", color: "#FF5252" },
    ],
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
    slots: [
      { hour: 0, state: "elevated", color: "#FF9800", dominant_app: "Instagram", session_ids: ["sess_2200_instagram"], label: "Mon" },
      { hour: 1, state: "high_tension", color: "#F44336", dominant_app: "Twitter", session_ids: ["sess_2200_instagram"], label: "Tue" },
      { hour: 2, state: "focused", color: "#8BC34A", dominant_app: "Notion", session_ids: ["sess_070"], label: "Wed" },
      { hour: 3, state: "relaxed", color: "#4CAF50", dominant_app: "Spotify", session_ids: [], label: "Thu" },
      { hour: 4, state: "high_tension", color: "#F44336", dominant_app: "Reddit", session_ids: ["sess_2200_instagram"], label: "Fri" },
      { hour: 5, state: "elevated", color: "#FF9800", dominant_app: "YouTube", session_ids: ["sess_2200_instagram"], label: "Sat" },
      { hour: 6, state: "focused", color: "#8BC34A", dominant_app: "Chrome", session_ids: ["sess_060"], label: "Sun" },
    ],
    alert: { appName: "Instagram", duration: 145, trigger: "Repeated late-night doom scrolling detected", scroll: 820, session: "sess_2200_instagram" },
    highTension: [
      { app: "Instagram", tag: "Doom scrolling", duration: 145, session: "sess_2200_instagram", color: "#E040FB" },
      { app: "Twitter", tag: "Rage threads", duration: 68, session: "sess_2200_instagram", color: "#FF5252" },
    ],
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
    slots: Array.from({ length: 30 }, (_, i) => {
      const day = i + 1;
      const states = ["relaxed", "focused", "neutral", "elevated", "high_tension"];
      const apps = ["Instagram", "Reddit", "Twitter", "YouTube", "Notion", "Chrome", "Spotify"];
      const state = states[(day * 7 + day) % 5];
      return {
        hour: i,
        state,
        color: state === "high_tension" ? "#F44336" : state === "elevated" ? "#FF9800" : state === "focused" ? "#8BC34A" : state === "neutral" ? "#9E9E9E" : "#4CAF50",
        dominant_app: apps[day % 7],
        session_ids: state === "relaxed" ? [] : ["sess_2200_instagram"],
        label: `${day}`,
      };
    }),
    alert: { appName: "Instagram", duration: 580, trigger: "Consistent high-tension pattern detected monthly", scroll: 790, session: "sess_2200_instagram" },
    highTension: [
      { app: "Instagram", tag: "Late-night spiral", duration: 580, session: "sess_2200_instagram", color: "#E040FB" },
      { app: "YouTube", tag: "Binge watching", duration: 320, session: "sess_2200_instagram", color: "#FF5252" },
    ],
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
        <div className="grid grid-cols-3 gap-2">
          {d.monitors.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.label}
                onClick={() => navigate(m.route)}
                className="bg-card rounded-xl p-3 text-left hover:bg-accent transition-colors min-w-0"
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

      <IntentTimeline slots={d.slots} range={range} />

      {/* High-Tension Sessions */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-high-tension" />
          High-Tension Sessions
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {d.highTension.map((ht) => (
            <button
              key={ht.app}
              onClick={() => navigate(`/session/${ht.session}`)}
              className="bg-card rounded-xl p-3 text-left border border-high-tension/15 hover:border-high-tension/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${ht.color}20` }}>
                  <Zap className="w-3 h-3" style={{ color: ht.color }} />
                </div>
                <span className="text-sm font-semibold text-foreground truncate">{ht.app}</span>
              </div>
              <p className="text-[10px] text-high-tension font-medium">{ht.tag}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{ht.duration} min</p>
            </button>
          ))}
        </div>
      </div>

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
