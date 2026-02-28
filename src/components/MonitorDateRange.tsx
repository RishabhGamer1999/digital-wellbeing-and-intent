import { useState } from "react";

const chips = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "7_days" },
  { label: "Last 30 Days", value: "30_days" },
];

interface MonitorDateRangeProps {
  value?: string;
  onChange?: (value: string) => void;
}

const MonitorDateRange = ({ value, onChange }: MonitorDateRangeProps) => {
  const [active, setActive] = useState(value || "today");

  const handleSelect = (v: string) => {
    setActive(v);
    onChange?.(v);
  };

  return (
    <div className="flex gap-2">
      {chips.map((chip) => (
        <button
          key={chip.value}
          onClick={() => handleSelect(chip.value)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            active === chip.value
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
};

export default MonitorDateRange;
