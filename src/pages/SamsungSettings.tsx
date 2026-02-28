import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Wifi, Volume2, Bell, Sun, Battery, Sprout, Search, ChevronRight } from "lucide-react";

const settingsItems = [
  { id: "connections", label: "Connections", subtitle: "Wi-Fi, Bluetooth, NFC", icon: Wifi },
  { id: "sounds", label: "Sounds and vibration", subtitle: "Sound mode, Ringtone", icon: Volume2 },
  { id: "notifications", label: "Notifications", subtitle: "Status bar, Do not disturb", icon: Bell },
  { id: "display", label: "Display", subtitle: "Brightness, Eye comfort shield", icon: Sun },
  { id: "battery", label: "Battery", subtitle: "81%", icon: Battery },
  { id: "digital_wellbeing", label: "Digital Wellbeing & Behavioral Insights", subtitle: "Screen time, App timers", icon: Sprout, highlighted: true },
];

const SamsungSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-background">
      {/* One UI large header */}
      <div className="px-5 pt-8 pb-4">
        <h1 className="text-[28px] font-bold text-foreground leading-tight">Settings</h1>
      </div>

      {/* Search bar */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-3 bg-secondary rounded-xl px-4 py-2.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search settings</span>
        </div>
      </div>

      {/* Settings list */}
      <div className="px-3">
        <div className="bg-card rounded-xl overflow-hidden border border-border">
          {settingsItems.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => {
              if (item.id === "digital_wellbeing") {
                  navigate("/intent-spectrum");
                }
              }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 text-left transition-colors ${
                item.highlighted
                  ? "bg-primary/5 hover:bg-primary/10"
                  : "hover:bg-accent"
              } ${i < settingsItems.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                item.highlighted ? "bg-primary/15" : "bg-secondary"
              }`}>
                <item.icon className={`w-4.5 h-4.5 ${
                  item.highlighted ? "text-primary" : "text-muted-foreground"
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  item.highlighted ? "text-primary" : "text-foreground"
                }`}>{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SamsungSettings;
