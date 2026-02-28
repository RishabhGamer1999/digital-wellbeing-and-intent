import { Clock, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

interface StatsBarProps {
  totalScreenTime: string;
  highTensionPercentage: number;
  focusedPercentage: number;
}

const StatsBar = ({ totalScreenTime, highTensionPercentage, focusedPercentage }: StatsBarProps) => {
  const stats = [
    { icon: Clock, label: "Screen Time", value: totalScreenTime, color: "text-foreground" },
    { icon: Zap, label: "High Tension", value: `${highTensionPercentage}%`, color: "text-high-tension" },
    { icon: Target, label: "Focused", value: `${focusedPercentage}%`, color: "text-focused" },
  ];

  return (
    <div className="flex gap-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08 }}
          className="flex-1 bg-card rounded-xl border border-border p-3 space-y-1"
        >
          <div className="flex items-center gap-1.5">
            <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{stat.label}</span>
          </div>
          <p className={`text-lg font-semibold font-mono ${stat.color}`}>{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsBar;
