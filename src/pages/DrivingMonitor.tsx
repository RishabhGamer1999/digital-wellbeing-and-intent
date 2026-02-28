import { useState } from "react";
import MonitorHeader from "@/components/MonitorHeader";
import MonitorDateRange from "@/components/MonitorDateRange";
import { AlertTriangle, Car } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceArea, Tooltip } from "recharts";

const totalDrive = 41;
const phoneActive = 9;

const classColors: Record<string, string> = {
  safe: "#4CAF50",
  borderline: "#FF9800",
  dangerous: "#F44336",
};

const initialEvents = [
  { id: 1, app: "Google Maps", duration: 41, speed: 48, classification: "safe", reason: "Navigation active" },
  { id: 2, app: "Spotify", duration: 35, speed: 52, classification: "safe", reason: "Audio playback only" },
  { id: 3, app: "Phone (Bluetooth)", duration: 4, speed: 44, classification: "safe", reason: "Hands-free call" },
  { id: 4, app: "WhatsApp", duration: 3, speed: 58, classification: "dangerous", reason: "Message reply typed" },
  { id: 5, app: "Gmail", duration: 2, speed: 61, classification: "dangerous", reason: "Email opened at 61 km/h" },
  { id: 6, app: "Notification Tray", duration: 1, speed: 35, classification: "borderline", reason: "Pulled down at low speed" },
];

const speedData = [
  { time: "07:58", speed: 0, min: 0 },
  { time: "08:00", speed: 18, min: 2 },
  { time: "08:03", speed: 42, min: 5 },
  { time: "08:06", speed: 55, min: 8 },
  { time: "08:09", speed: 48, min: 11 },
  { time: "08:12", speed: 44, min: 14 },
  { time: "08:15", speed: 50, min: 17 },
  { time: "08:18", speed: 58, min: 20 },
  { time: "08:21", speed: 62, min: 23 },
  { time: "08:24", speed: 60, min: 26 },
  { time: "08:27", speed: 57, min: 29 },
  { time: "08:29", speed: 61, min: 31 },
  { time: "08:31", speed: 59, min: 33 },
  { time: "08:33", speed: 35, min: 35 },
  { time: "08:35", speed: 28, min: 37 },
  { time: "08:37", speed: 12, min: 39 },
  { time: "08:39", speed: 0, min: 41 },
];

const bands = [
  { x1: 20, x2: 23, color: "rgba(244, 67, 54, 0.25)", label: "WhatsApp" },
  { x1: 31, x2: 33, color: "rgba(244, 67, 54, 0.25)", label: "Gmail" },
  { x1: 35, x2: 36, color: "rgba(255, 152, 0, 0.25)", label: "Notification" },
];

const DrivingMonitor = () => {
  const [isPassenger, setIsPassenger] = useState(false);

  const events = initialEvents.map((e) =>
    isPassenger ? { ...e, classification: "safe" } : e
  );

  return (
    <div className="space-y-5">
      <MonitorHeader title="Driving Monitor" />
      <MonitorDateRange />

      {/* Hero Stat */}
      <div className="bg-card rounded-xl p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
          <Car className="w-7 h-7 text-foreground" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{phoneActive} min</p>
          <p className="text-xs text-muted-foreground">Phone active during {totalDrive} min drive</p>
        </div>
      </div>

      {/* Usage Justification List */}
      <div className="bg-card rounded-xl p-4 space-y-2">
        <h2 className="text-sm font-semibold text-foreground mb-2">Phone Events During Drive</h2>
        {events.map((e) => (
          <div key={e.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
            <div
              className="w-2 h-full min-h-[36px] rounded-full shrink-0"
              style={{ backgroundColor: classColors[e.classification] }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{e.app}</span>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-medium capitalize"
                  style={{
                    backgroundColor: `${classColors[e.classification]}20`,
                    color: classColors[e.classification],
                  }}
                >
                  {e.classification}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground">{e.reason}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-foreground">{e.duration} min</p>
              <p className="text-[10px] text-muted-foreground">{e.speed} km/h</p>
            </div>
          </div>
        ))}
      </div>

      {/* Speed vs Usage Timeline */}
      <div className="bg-card rounded-xl p-4 space-y-2">
        <h2 className="text-sm font-semibold text-foreground">Speed vs. Phone Activity</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={speedData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <XAxis dataKey="time" tick={{ fontSize: 9, fill: "hsl(0 0% 55%)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "hsl(0 0% 55%)" }} tickLine={false} axisLine={false} domain={[0, 80]} />
              <Tooltip
                contentStyle={{ background: "#2C2C2E", border: "none", borderRadius: 8, fontSize: 11 }}
                labelStyle={{ color: "#999" }}
              />
              {!isPassenger &&
                bands.map((b) => (
                  <ReferenceArea
                    key={b.label}
                    x1={b.x1}
                    x2={b.x2}
                    fill={b.color}
                    strokeOpacity={0}
                  />
                ))}
              <Line type="monotone" dataKey="speed" stroke="#2196F3" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reflective Insight */}
      <div className="bg-card rounded-xl p-4 border border-[#F44336]/20 glow-danger">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#F44336] mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            You had your screen active while travelling at 60 km/h. No action was taken — this is your record to reflect on.
          </p>
        </div>
      </div>

      {/* Passenger Toggle */}
      <div className="bg-card rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">I was a passenger during this trip</p>
          <p className="text-[10px] text-muted-foreground">Re-classifies all events as safe</p>
        </div>
        <Switch checked={isPassenger} onCheckedChange={setIsPassenger} />
      </div>
    </div>
  );
};

export default DrivingMonitor;
