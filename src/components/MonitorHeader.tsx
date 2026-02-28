import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MonitorHeaderProps {
  title: string;
}

const MonitorHeader = ({ title }: MonitorHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        onClick={() => navigate("/intent-spectrum")}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <h1 className="text-xl font-bold text-foreground">{title}</h1>
    </div>
  );
};

export default MonitorHeader;
