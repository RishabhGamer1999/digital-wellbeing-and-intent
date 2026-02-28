import { useState } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import data from "@/data/digital-wellbeing-data.json";

const screen = data.screens[5] as any;
const viscousSection = screen.components.find((c: any) => c.id === "viscous_scrolling_section");
const frictionSlider = screen.components.find((c: any) => c.type === "slider");
const hapticToggle = screen.components.find((c: any) => c.id === "haptic_cushioning_toggle");
const timeBound = screen.components.find((c: any) => c.id === "time_bound_triggers_section");

const HabitSettings = () => {
  const navigate = useNavigate();
  const [apps, setApps] = useState(
    viscousSection.app_entries.map((a: any) => ({ ...a, enabled: a.viscous_enabled }))
  );
  const [friction, setFriction] = useState([frictionSlider.current_value]);
  const [haptic, setHaptic] = useState(hapticToggle.enabled);

  const toggleApp = (id: string) => {
    setApps((prev: any[]) => prev.map((a) => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Habit Settings</h1>
      </div>

      {/* Viscous Scrolling */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border border-border p-4 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{viscousSection.label}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{viscousSection.description}</p>
        </div>
        <div className="space-y-1">
          {apps.map((app: any) => (
            <div key={app.id} className="flex items-center justify-between py-2.5 px-1">
              <span className="text-sm text-foreground">{app.app_name}</span>
              <Switch checked={app.enabled} onCheckedChange={() => toggleApp(app.id)} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Friction Level */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl border border-border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Friction Level</h3>
          <span className="text-xs text-primary font-mono font-semibold">{friction[0]}/10</span>
        </div>
        <Slider value={friction} onValueChange={setFriction} min={1} max={10} step={1} />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>Gentle</span><span>Firm</span><span>Heavy</span>
        </div>
      </motion.div>

      {/* Haptic */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">{hapticToggle.label}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{hapticToggle.description}</p>
          </div>
          <Switch checked={haptic} onCheckedChange={setHaptic} />
        </div>
      </motion.div>

      {/* Time-Bound Triggers */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl border border-border p-4 space-y-3">
        <h3 className="text-sm font-semibold text-foreground">{timeBound.label}</h3>
        {timeBound.rules.map((rule: any) => (
          <div key={rule.id} className="flex items-center gap-3 py-2 px-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground flex-1">{rule.label}</span>
            <span className="text-xs text-muted-foreground font-mono">After {rule.after}</span>
          </div>
        ))}
        <button className="text-xs text-primary font-medium hover:underline">+ Add Rule</button>
      </motion.div>
    </div>
  );
};

export default HabitSettings;
