import { Signal, Wifi, Battery } from "lucide-react";

const SamsungStatusBar = () => {
  return (
    <div className="h-7 px-5 flex items-center justify-between bg-card text-foreground text-[11px] font-medium shrink-0">
      <span className="font-semibold tracking-wide">22:04</span>
      <div className="flex items-center gap-1.5">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5">
          <Battery className="w-3.5 h-3.5" />
          <span className="text-[10px]">81%</span>
        </div>
      </div>
    </div>
  );
};

export default SamsungStatusBar;
