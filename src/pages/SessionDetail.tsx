import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, BookOpen, Settings as SettingsIcon } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot,
} from "recharts";
import data from "@/data/mindmotion-data.json";

const screen = data.screens[1] as any;
const meta = screen.components.find((c: any) => c.type === "session_header").data;
const graph = screen.components.find((c: any) => c.type === "line_graph");

const chartData = graph.series.swipe_velocity.data_points.map((dp: any, i: number) => ({
  time: new Date(dp.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
  velocity: dp.value,
  pressure: graph.series.screen_pressure.data_points[i]?.value ?? 0,
}));

const spikes = graph.spike_events.map((s: any) => ({
  time: new Date(s.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
  annotation: s.annotation,
}));

const stateStyles: Record<string, string> = {
  high_tension: "bg-high-tension/15 text-high-tension border-high-tension/30",
  elevated: "bg-elevated/15 text-elevated border-elevated/30",
  focused: "bg-focused/15 text-focused border-focused/30",
  relaxed: "bg-relaxed/15 text-relaxed border-relaxed/30",
  neutral: "bg-neutral-state/15 text-neutral-state border-neutral-state/30",
};

const SessionDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={() => navigate("/settings/habits")} className="text-muted-foreground hover:text-foreground transition-colors">
          <SettingsIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Session meta */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-foreground">{meta.app}</h1>
          <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border ${stateStyles[meta.detected_state]}`}>
            {meta.detected_state.replace("_", " ")}
          </span>
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          {new Date(meta.start_time).toLocaleTimeString()} — {new Date(meta.end_time).toLocaleTimeString()} · {meta.duration_minutes}min
        </p>
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-xl border border-border p-4 space-y-3"
      >
        <h3 className="text-sm font-medium text-foreground">Kinetic Deep-Dive</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 16%)" />
            <XAxis dataKey="time" tick={{ fontSize: 9, fill: "hsl(0 0% 55%)" }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 9, fill: "hsl(0 0% 55%)" }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "hsl(0 0% 10%)",
                border: "1px solid hsl(0 0% 16%)",
                borderRadius: "8px",
                fontSize: 11,
                color: "hsl(0 0% 95%)",
              }}
            />
            <ReferenceLine y={graph.baseline} stroke="hsl(0 0% 35%)" strokeDasharray="6 3" label={{ value: "Baseline", fill: "hsl(0 0% 45%)", fontSize: 9 }} />
            <Line type="monotone" dataKey="velocity" stroke="hsl(36 100% 50%)" strokeWidth={2} dot={false} name="Swipe Velocity (px/s)" />
            <Line type="monotone" dataKey="pressure" stroke="hsl(4 90% 58%)" strokeWidth={2} dot={false} name="Screen Pressure (mN)" />
            {spikes.map((spike, i) => (
              <ReferenceDot key={i} x={spike.time} y={chartData.find((d: any) => d.time === spike.time)?.velocity ?? 0} r={5} fill="hsl(36 100% 50%)" stroke="hsl(0 0% 7%)" strokeWidth={2} />
            ))}
          </LineChart>
        </ResponsiveContainer>
        {/* Spike annotations */}
        <div className="space-y-1.5">
          {spikes.map((spike: any, i: number) => (
            <div key={i} className="flex items-start gap-2 text-[11px]">
              <div className="w-1.5 h-1.5 rounded-full bg-elevated mt-1.5 flex-shrink-0" />
              <span className="text-muted-foreground"><span className="text-foreground font-medium">{spike.time}</span> — {spike.annotation}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTAs */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/ai-reflection")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:brightness-110 transition-all glow-primary"
        >
          <Sparkles className="w-4 h-4" /> Ask AI why
        </button>
        <button
          onClick={() => navigate("/ai-reflection")}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-accent transition-colors"
        >
          <BookOpen className="w-4 h-4" /> Reflect
        </button>
      </div>
    </div>
  );
};

export default SessionDetail;
