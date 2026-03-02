import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface TimelineSlot {
  hour: number;
  state: string;
  color: string;
  dominant_app: string;
  session_ids: string[];
  label?: string;
  state_label?: string;
  breakdown?: { utility: number; leisure: number; dysregulation: number };
}

const stateColorMap: Record<string, string> = {
  utility: "bg-utility",
  leisure: "bg-leisure",
  dysregulation: "bg-dysregulation",
  inactive: "bg-inactive",
};

interface IntentTimelineProps {
  slots: TimelineSlot[];
  range?: string;
  component_type?: string;
  description?: string;
}

const IntentTimeline = ({ slots, range = "today" }: IntentTimelineProps) => {
  const navigate = useNavigate();
  const currentHour = 23;
  const isToday = range === "today";
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);

  const heading = isToday
    ? "Today's Intent Spectrum"
    : range === "7_days"
      ? "7-Day Intent Spectrum"
      : "30-Day Intent Spectrum";

  const activeSlot = hoveredSlot !== null ? slots[hoveredSlot] : null;

  return (
    <div className="space-y-3 overflow-visible">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {heading}
      </h2>
      <div className="flex gap-[2px] items-end h-20 relative">
        {slots.map((slot, i) => {
          const isCurrent = isToday && slot.hour === currentHour;

          if (!isToday && slot.breakdown) {
            const { utility, leisure, dysregulation } = slot.breakdown;
            return (
              <motion.div
                key={`${slot.label || slot.hour}-${i}`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                style={{ height: "100%", originY: "bottom" }}
                className={`flex-1 flex flex-col justify-end rounded-t-sm cursor-pointer transition-opacity ${
                  hoveredSlot !== null && hoveredSlot !== i ? "opacity-40" : ""
                }`}
                onClick={() => {
                  if (slot.session_ids[0]) navigate(`/session/${slot.session_ids[0]}`);
                }}
                onMouseEnter={() => setHoveredSlot(i)}
                onMouseLeave={() => setHoveredSlot(null)}
                onTouchStart={() => setHoveredSlot(i)}
              >
                <div className="w-full bg-dysregulation rounded-t-sm" style={{ height: `${dysregulation}%` }} />
                <div className="w-full bg-leisure" style={{ height: `${leisure}%` }} />
                <div className="w-full bg-utility" style={{ height: `${utility}%` }} />
              </motion.div>
            );
          }

          // Today's single-state bar
          const isActive = slot.state !== "inactive" && slot.session_ids.length > 0;
          const height = slot.state === "inactive" ? "15%"
            : slot.state === "utility" ? "45%"
            : slot.state === "leisure" ? "60%"
            : slot.state === "dysregulation" ? "90%"
            : "30%";

          return (
            <motion.button
              key={`${slot.label || slot.hour}-${i}`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.02, duration: 0.3 }}
              style={{ height, originY: "bottom" }}
              className={`flex-1 rounded-t-sm transition-all cursor-pointer relative group ${stateColorMap[slot.state] || "bg-muted"} ${
                isCurrent ? "ring-1 ring-foreground/30" : ""
              } ${isActive ? "hover:brightness-125" : "opacity-40"}`}
              onClick={() => {
                if (slot.session_ids[0]) navigate(`/session/${slot.session_ids[0]}`);
              }}
              title={`${slot.hour}:00 — ${slot.dominant_app} (${slot.state_label || slot.state})`}
            >
              <div className={`absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 ${
                i <= 3 ? "left-0" : i >= slots.length - 4 ? "right-0" : "left-1/2 -translate-x-1/2"
              }`}>
                <div className="bg-card border border-border rounded-md px-2 py-1 text-[10px] whitespace-nowrap shadow-lg max-w-[90vw]">
                  <span className="text-foreground font-medium">{slot.dominant_app}</span>
                  <br />
                  <span className="text-muted-foreground">{`${slot.hour}:00 · ${slot.state_label || slot.state}`}</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex gap-[2px]">
        {isToday ? (
          slots.filter((_, i) => i % 4 === 0).map(slot => (
            <div key={slot.hour} className="flex-[4] text-[9px] text-muted-foreground font-mono">
              {slot.hour.toString().padStart(2, "0")}
            </div>
          ))
        ) : (
          slots.map((slot, i) => {
            const step = range === "7_days" ? 1 : Math.ceil(slots.length / 8);
            if (range !== "7_days" && i % step !== 0) return null;
            return (
              <div key={i} className={`${range === "7_days" ? "flex-1" : `flex-[${step}]`} text-[9px] text-muted-foreground font-mono text-center`}>
                {slot.label || ""}
              </div>
            );
          })
        )}
      </div>

      {/* Hover detail card for 7/30 day view */}
      {!isToday && (
        <motion.div
          initial={false}
          animate={{ height: activeSlot?.breakdown ? "auto" : 0, opacity: activeSlot?.breakdown ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          {activeSlot?.breakdown && (
            <div className="bg-card border border-border rounded-lg px-3 py-2.5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-foreground">{activeSlot.label}</span>
                <span className="text-[10px] text-muted-foreground">{activeSlot.dominant_app}</span>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-utility" />
                  <span className="text-[11px] text-foreground font-medium">{activeSlot.breakdown.utility}%</span>
                  <span className="text-[10px] text-muted-foreground">Utility</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-leisure" />
                  <span className="text-[11px] text-foreground font-medium">{activeSlot.breakdown.leisure}%</span>
                  <span className="text-[10px] text-muted-foreground">Leisure</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-dysregulation" />
                  <span className="text-[11px] text-foreground font-medium">{activeSlot.breakdown.dysregulation}%</span>
                  <span className="text-[10px] text-muted-foreground">Dysreg.</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-3 pt-1">
        {[
          { label: "Utility", cls: "bg-utility", description: "Purposeful, task-driven use" },
          { label: "Leisure", cls: "bg-leisure", description: "Relaxed, intentional browsing" },
          { label: "Dysregulation", cls: "bg-dysregulation", description: "High-tension doomscrolling" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5" title={item.description}>
            <div className={`w-2 h-2 rounded-full ${item.cls}`} />
            <span className="text-[10px] text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntentTimeline;
