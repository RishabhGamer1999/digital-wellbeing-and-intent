import { useState } from "react";
import { ArrowLeft, Footprints, Zap, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceArea, ReferenceDot,
} from "recharts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import data from "@/data/digital-wellbeing-data.json";

const screen = data.screens[7] as any;
const graph = screen.components.find((c: any) => c.type === "dual_axis_line_graph");
const chips = screen.components.find((c: any) => c.type === "chip_toggle_group");
const statCards = screen.components.find((c: any) => c.type === "stat_card_row");
const cta = screen.components.find((c: any) => c.type === "cta_card");

const formatTime = (ts: string) => {
  const d = new Date(ts);
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
};

const MovementActivity = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("walking");
  const [ctaDismissed, setCtaDismissed] = useState(false);

  const filteredData = graph.data_points
    .filter((p: any) => activeFilter === "all" || p.movement_state === activeFilter)
    .map((p: any) => ({
      ...p,
      time: formatTime(p.timestamp),
    }));

  // Find danger zone ranges for ReferenceArea
  const dangerRanges: { start: string; end: string }[] = [];
  let rangeStart: string | null = null;
  for (const p of filteredData) {
    if (p.danger_zone) {
      if (!rangeStart) rangeStart = p.time;
    } else {
      if (rangeStart) {
        dangerRanges.push({ start: rangeStart, end: filteredData[filteredData.indexOf(p) - 1]?.time || rangeStart });
        rangeStart = null;
      }
    }
  }
  if (rangeStart) {
    dangerRanges.push({ start: rangeStart, end: filteredData[filteredData.length - 1]?.time || rangeStart });
  }

  const spikes = graph.spike_events;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Movement & Screen Activity</h1>
          <p className="text-xs text-muted-foreground">Zombie Walking Monitor</p>
        </div>
      </div>

      {/* Filter pills */}
      <ToggleGroup
        type="single"
        value={activeFilter}
        onValueChange={(v) => v && setActiveFilter(v)}
        className="justify-start gap-2"
      >
        {chips.chips.map((chip: any) => (
          <ToggleGroupItem
            key={chip.id}
            value={chip.value}
            className="rounded-full text-xs px-4 py-1.5 h-auto border border-border data-[state=on]:bg-primary/15 data-[state=on]:border-primary/30 data-[state=on]:text-primary"
          >
            {chip.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* Dual-axis graph */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Step Cadence vs Swipe Velocity</h3>
        </div>
        <div className="flex gap-4 text-[10px] text-muted-foreground mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Step Cadence (steps/min)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-elevated" />
            <span>Swipe Velocity (px/s)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2 rounded-sm" style={{ background: "rgba(244, 67, 54, 0.15)", border: "1px dashed #F44336" }} />
            <span>Danger Zone</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={filteredData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="time" tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis
              yAxisId="left"
              domain={[0, 140]}
              tick={{ fontSize: 9, fill: "#4CAF50" }}
              label={{ value: "steps/min", angle: -90, position: "insideLeft", style: { fontSize: 9, fill: "#4CAF50" } }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 1000]}
              tick={{ fontSize: 9, fill: "#FF9800" }}
              label={{ value: "px/s", angle: 90, position: "insideRight", style: { fontSize: 9, fill: "#FF9800" } }}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 11,
              }}
            />
            {/* Danger zone shaded regions */}
            {dangerRanges.map((r, i) => (
              <ReferenceArea
                key={i}
                x1={r.start}
                x2={r.end}
                yAxisId="left"
                fill="rgba(244, 67, 54, 0.15)"
                stroke="#F44336"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
            ))}
            {/* Spike annotations */}
            {spikes.map((spike: any) => {
              const pt = filteredData.find((d: any) => d.timestamp === spike.timestamp);
              if (!pt) return null;
              return (
                <ReferenceDot
                  key={spike.id}
                  x={pt.time}
                  y={pt.swipe_velocity}
                  yAxisId="right"
                  r={5}
                  fill="#F44336"
                  stroke="#fff"
                  strokeWidth={1.5}
                />
              );
            })}
            <Line yAxisId="left" type="monotone" dataKey="step_cadence" stroke="#4CAF50" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="swipe_velocity" stroke="#FF9800" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        {/* Danger Zone label */}
        <p className="text-[10px] text-high-tension mt-2 text-center font-medium">
          ⚠ Distracted Walking Window — active walking + high swipe velocity
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-3">
        {statCards.cards.map((card: any) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl border border-border p-3 text-center space-y-1"
          >
            <div className="mx-auto w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${card.color}20` }}>
              {card.id.includes("walk_time") ? (
                <Footprints className="w-4 h-4" style={{ color: card.color }} />
              ) : card.id.includes("peak") ? (
                <Zap className="w-4 h-4" style={{ color: card.color }} />
              ) : (
                <AlertTriangle className="w-4 h-4" style={{ color: card.color }} />
              )}
            </div>
            <p className="text-lg font-bold text-foreground">{card.value}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Safety Intercept CTA */}
      {!ctaDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-high-tension/10 border border-high-tension/30 rounded-xl p-4 space-y-3"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-high-tension/20 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-4.5 h-4.5 text-high-tension" />
            </div>
            <p className="text-sm text-foreground leading-relaxed">{cta.message}</p>
          </div>
          <div className="flex gap-3 pl-12">
            <button
              onClick={() => navigate("/settings/habits")}
              className="px-4 py-2 rounded-lg bg-high-tension text-white text-xs font-semibold hover:bg-high-tension/90 transition-colors"
            >
              Enable Now
            </button>
            <button
              onClick={() => setCtaDismissed(true)}
              className="px-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Not Now
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MovementActivity;
