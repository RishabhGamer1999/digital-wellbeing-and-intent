import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface AlertCardProps {
  appName: string;
  durationMinutes: number;
  triggerLabel: string;
  scrollVelocityAvg: number;
  sessionId: string;
}

const AlertCard = ({ appName, durationMinutes, triggerLabel, scrollVelocityAvg, sessionId }: AlertCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl border border-high-tension/30 bg-high-tension/5 p-4 space-y-3 glow-danger"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-high-tension/15 flex items-center justify-center flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-high-tension" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold text-foreground">{triggerLabel}</p>
          <p className="text-xs text-muted-foreground">
            {appName} · {durationMinutes}min · avg {scrollVelocityAvg} px/s scroll velocity
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate(`/session/${sessionId}`)}
        className="w-full text-sm font-medium py-2 rounded-lg bg-high-tension/15 text-high-tension hover:bg-high-tension/25 transition-colors"
      >
        View Session Details
      </button>
    </motion.div>
  );
};

export default AlertCard;
