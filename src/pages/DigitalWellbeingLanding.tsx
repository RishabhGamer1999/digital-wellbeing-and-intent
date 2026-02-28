import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, ChevronRight } from "lucide-react";

const donutSegments = [
  { app: "Instagram", minutes: 87, color: "#E1306C" },
  { app: "Chrome", minutes: 68, color: "#4285F4" },
  { app: "YouTube", minutes: 54, color: "#FF0000" },
  { app: "Slack", minutes: 45, color: "#4A154B" },
  { app: "Notion", minutes: 62, color: "#FFFFFF" },
  { app: "Other", minutes: 67, color: "#9E9E9E" },
];

const totalMinutes = donutSegments.reduce((s, seg) => s + seg.minutes, 0);

const appList = [
  { name: "Instagram", time: "1h 27m", color: "#E1306C" },
  { name: "Chrome", time: "1h 8m", color: "#4285F4" },
  { name: "Notion", time: "1h 2m", color: "#FFFFFF" },
  { name: "YouTube", time: "54m", color: "#FF0000" },
  { name: "Slack", time: "45m", color: "#4A154B" },
];

const DigitalWellbeingLanding = () => {
  const navigate = useNavigate();

  // Build SVG donut
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let accumulated = 0;

  return (
    <div className="min-h-full bg-[#1C1C1E]">
      {/* One UI header */}
      <div className="px-5 pt-2 pb-4 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="text-[#888] hover:text-[#ccc] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-[#E0E0E0]">Digital Wellbeing</h1>
      </div>

      {/* Intent Spectrum Beta card */}
      <div className="px-4 pb-4">
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate("/intent-spectrum")}
          className="w-full bg-[#2C2C2E] border border-[#4CAF50]/20 rounded-xl p-4 flex items-center gap-3 text-left hover:bg-[#3C3C3E] transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-[#4CAF50]/15 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#4CAF50]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#E0E0E0]">Intent Spectrum</span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#4CAF50] text-white">New</span>
            </div>
            <p className="text-xs text-[#888] mt-0.5">Motion-based tension analysis for your digital habits</p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#555] shrink-0" />
        </motion.button>
      </div>

      {/* Screen time donut */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-4 bg-[#2C2C2E] rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-[#E0E0E0] mb-4">Screen time today</h3>
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <svg width="150" height="150" viewBox="0 0 150 150">
              {donutSegments.map((seg, i) => {
                const pct = seg.minutes / totalMinutes;
                const dashLength = pct * circumference;
                const dashOffset = -(accumulated / totalMinutes) * circumference;
                accumulated += seg.minutes;
                return (
                  <circle
                    key={i}
                    cx="75"
                    cy="75"
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="12"
                    strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                    strokeDashoffset={dashOffset}
                    transform="rotate(-90 75 75)"
                    strokeLinecap="round"
                    opacity={0.85}
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-[#E0E0E0]">6h 23m</span>
              <span className="text-[10px] text-[#888]">Total today</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center">
          {donutSegments.map((seg) => (
            <div key={seg.app} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="text-[10px] text-[#aaa]">{seg.app}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* App usage list */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-4 mt-3 bg-[#2C2C2E] rounded-xl overflow-hidden"
      >
        <h3 className="text-sm font-semibold text-[#E0E0E0] px-4 pt-4 pb-2">Most used apps</h3>
        {appList.map((app, i) => (
          <div
            key={app.name}
            className={`flex items-center gap-3 px-4 py-3 ${
              i < appList.length - 1 ? "border-b border-[#3C3C3E]" : ""
            }`}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: app.color + "22" }}>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: app.color }} />
            </div>
            <span className="flex-1 text-sm text-[#E0E0E0]">{app.name}</span>
            <span className="text-xs text-[#888] font-mono">{app.time}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default DigitalWellbeingLanding;
