import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface TimelineSlot {
  hour: number;
  state: string;
  color: string;
  dominant_app: string;
  session_ids: string[];
  label?: string;
}

const stateColorMap: Record<string, string> = {
  relaxed: "bg-relaxed",
  focused: "bg-focused",
  neutral: "bg-neutral-state",
  elevated: "bg-elevated",
  high_tension: "bg-high-tension",
};

interface IntentTimelineProps {
  slots: TimelineSlot[];
  range?: string;
}

const IntentTimeline = ({ slots, range = "today" }: IntentTimelineProps) => {
  const navigate = useNavigate();
  const currentHour = 23;

  const heading = range === "today"
    ? "Today's Intent Spectrum"
    : range === "7_days"
      ? "7-Day Intent Spectrum"
      : "30-Day Intent Spectrum";

  return (
    <div className="space-y-3 overflow-hidden">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {heading}
      </h2>
      <div className="flex gap-[2px] items-end h-20">
        {slots.map((slot, i) => {
          const isActive = slot.session_ids.length > 0;
          const isCurrent = range === "today" && slot.hour === currentHour;
          const height = slot.state === "relaxed" ? "30%" 
            : slot.state === "focused" ? "55%" 
            : slot.state === "neutral" ? "40%" 
            : slot.state === "elevated" ? "70%" 
            : "90%";

          const tooltipLabel = range === "today"
            ? `${slot.hour}:00 — ${slot.dominant_app} (${slot.state})`
            : `${slot.label || slot.dominant_app} (${slot.state})`;

          return (
            <motion.button
              key={`${slot.label || slot.hour}-${i}`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.02, duration: 0.3 }}
              style={{ height, originY: "bottom" }}
              className={`flex-1 rounded-t-sm transition-all cursor-pointer relative group ${stateColorMap[slot.state]} ${
                isCurrent ? "ring-1 ring-foreground/30" : ""
              } ${isActive ? "hover:brightness-125" : "opacity-40"}`}
              onClick={() => {
                if (slot.session_ids[0]) {
                  navigate(`/session/${slot.session_ids[0]}`);
                }
              }}
              title={tooltipLabel}
            >
              {/* Tooltip on hover */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="bg-card border border-border rounded-md px-2 py-1 text-[10px] whitespace-nowrap shadow-lg">
                  <span className="text-foreground font-medium">{slot.dominant_app}</span>
                  <br />
                  <span className="text-muted-foreground">
                    {range === "today" ? `${slot.hour}:00 · ${slot.state}` : `${slot.label || ""} · ${slot.state}`}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
      {/* Labels */}
      <div className="flex gap-[2px]">
        {range === "today" ? (
          slots.filter((_, i) => i % 4 === 0).map(slot => (
            <div key={slot.hour} className="flex-[4] text-[9px] text-muted-foreground font-mono">
              {slot.hour.toString().padStart(2, "0")}
            </div>
          ))
        ) : (
          slots.filter((_, i) => {
            const step = range === "7_days" ? 1 : Math.ceil(slots.length / 8);
            return i % step === 0;
          }).map((slot, i) => (
            <div key={i} className={`flex-[${range === "7_days" ? 1 : Math.ceil(slots.length / 8)}] text-[9px] text-muted-foreground font-mono`}>
              {slot.label || ""}
            </div>
          ))
        )}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 pt-1">
        {[
          { label: "Relaxed", cls: "bg-relaxed" },
          { label: "Focused", cls: "bg-focused" },
          { label: "Neutral", cls: "bg-neutral-state" },
          { label: "Elevated", cls: "bg-elevated" },
          { label: "High Tension", cls: "bg-high-tension" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${item.cls}`} />
            <span className="text-[10px] text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntentTimeline;
