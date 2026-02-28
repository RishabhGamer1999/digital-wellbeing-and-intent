import { useNavigate } from "react-router-dom";
import data from "@/data/digital-wellbeing-data.json";
import IntentTimeline from "@/components/IntentTimeline";
import AlertCard from "@/components/AlertCard";
import StatsBar from "@/components/StatsBar";
import { Footprints, Car, Headphones } from "lucide-react";

const screen = data.screens[1];
const timeline = screen.components.find((c: any) => c.type === "timeline") as any;
const alert = screen.components.find((c: any) => c.type === "alert_card") as any;
const stats = screen.components.find((c: any) => c.type === "stats_bar") as any;

const monitors = [
  {
    icon: Footprints,
    label: "Walking",
    sublabel: "22 min on phone while walking",
    color: "#4CAF50",
    route: "/digital-wellbeing/monitors/walking",
  },
  {
    icon: Car,
    label: "Driving",
    sublabel: "9 min active during drive",
    color: "#FF9800",
    route: "/digital-wellbeing/monitors/driving",
  },
  {
    icon: Headphones,
    label: "Volume",
    sublabel: "Avg 78% volume today",
    color: "#9C27B0",
    route: "/digital-wellbeing/monitors/volume",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Intent Spectrum</h1>
        <p className="text-sm text-muted-foreground mt-1">Your digital wellbeing at a glance</p>
      </div>

      <StatsBar
        totalScreenTime={stats.stats.total_screen_time}
        highTensionPercentage={stats.stats.high_tension_percentage}
        focusedPercentage={stats.stats.focused_percentage}
      />

      {/* Activity Monitors Row */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-foreground">Activity Monitors</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
          {monitors.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.label}
                onClick={() => navigate(m.route)}
                className="flex-shrink-0 w-36 bg-card rounded-xl p-3 text-left hover:bg-accent transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${m.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: m.color }} />
                </div>
                <p className="text-sm font-medium text-foreground">{m.label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{m.sublabel}</p>
              </button>
            );
          })}
        </div>
      </div>

      <IntentTimeline slots={timeline.slots} />

      <AlertCard
        appName={alert.data.app_name}
        durationMinutes={alert.data.duration_minutes}
        triggerLabel={alert.data.trigger_label}
        scrollVelocityAvg={alert.data.scroll_velocity_avg}
        sessionId="sess_2200_instagram"
      />
    </div>
  );
};

export default Dashboard;
