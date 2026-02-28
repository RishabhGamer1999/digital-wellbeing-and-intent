import data from "@/data/mindmotion-data.json";
import IntentTimeline from "@/components/IntentTimeline";
import AlertCard from "@/components/AlertCard";
import StatsBar from "@/components/StatsBar";

const screen = data.screens[0];
const timeline = screen.components.find((c: any) => c.type === "timeline") as any;
const alert = screen.components.find((c: any) => c.type === "alert_card") as any;
const stats = screen.components.find((c: any) => c.type === "stats_bar") as any;

const Dashboard = () => {
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
