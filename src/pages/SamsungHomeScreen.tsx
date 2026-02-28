import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  MessageCircle, Camera as CameraIcon, Phone, Globe,
  Settings, Play, Music, Image, Clock, Ghost,
  Sun
} from "lucide-react";

const appGrid = [
  [
    { name: "WhatsApp", color: "#25D366", icon: MessageCircle, target: null },
    { name: "Instagram", gradient: "linear-gradient(135deg, #E91E63, #FF9800)", icon: CameraIcon, target: null },
    { name: "Settings", color: "#9E9E9E", icon: Settings, target: "/settings" },
    { name: "Snapchat", color: "#FFEB3B", icon: Ghost, target: null },
  ],
  [
    { name: "YouTube", color: "#F44336", icon: Play, target: null },
    { name: "Spotify", color: "#1DB954", icon: Music, target: null },
    { name: "Gallery", color: "#9C27B0", icon: Image, target: null },
    { name: "Clock", color: "#FF9800", icon: Clock, target: null },
  ],
];

const dockApps = [
  { name: "Phone", color: "#4CAF50", icon: Phone },
  { name: "Messages", color: "#2196F3", icon: MessageCircle },
  { name: "Browser", color: "#1565C0", icon: Globe },
  { name: "Camera", color: "#607D8B", icon: CameraIcon },
];

const SamsungHomeScreen = () => {
  const navigate = useNavigate();

  const handleAppTap = (target: string | null) => {
    if (target) {
      navigate(target);
    } else {
      toast("This app is outside the prototype scope", { duration: 1500 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      {/* Device Frame */}
      <div className="relative w-[430px] max-w-full" style={{ aspectRatio: "9 / 19.3" }}>
        {/* Outer frame - Titanium Black */}
        <div
          className="absolute inset-0 rounded-[44px] border-[3px] border-[#2A2A2A]"
          style={{
            background: "#1A1A1A",
            boxShadow: "0 0 0 1px #0D0D0D, inset 0 0 0 1px #333",
          }}
        >
          {/* Side buttons - Volume (left) */}
          <div className="absolute -left-[5px] top-[22%] w-[4px] h-[40px] bg-[#2A2A2A] rounded-l-sm" />
          <div className="absolute -left-[5px] top-[30%] w-[4px] h-[40px] bg-[#2A2A2A] rounded-l-sm" />
          {/* Power button (right) */}
          <div className="absolute -right-[5px] top-[28%] w-[4px] h-[50px] bg-[#2A2A2A] rounded-r-sm" />

          {/* Screen area */}
          <div
            className="absolute inset-[3px] rounded-[40px] overflow-hidden flex flex-col"
            style={{
              background: "linear-gradient(180deg, #050A1A 0%, #0D1B3E 60%, #0A1428 100%)",
            }}
          >
            {/* Aurora glow effect */}
            <div
              className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(29,233,182,0.15) 0%, rgba(0,188,212,0.08) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div
              className="absolute bottom-[20%] left-[40%] w-[200px] h-[200px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(0,188,212,0.12) 0%, transparent 60%)",
                filter: "blur(50px)",
              }}
            />

            {/* Punch-hole camera */}
            <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full bg-[#0A0A0A] border border-[#1a1a2e] z-20" />

            {/* Status Bar */}
            <div className="relative z-10 flex items-center justify-between px-6 pt-3 pb-1 text-white text-[12px] font-medium shrink-0">
              <span className="font-semibold">9:41</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-[2px] items-end">
                  {[6, 8, 10, 12].map((h, i) => (
                    <div key={i} className="w-[3px] rounded-sm bg-white" style={{ height: `${h}px` }} />
                  ))}
                </div>
                <svg width="14" height="10" viewBox="0 0 14 10" fill="white">
                  <path d="M7 0C4.24 0 1.73 1.11 0 2.85L1.41 4.27C2.77 2.91 4.78 2 7 2s4.23.91 5.59 2.27L14 2.85C12.27 1.11 9.76 0 7 0zM7 4C5.56 4 4.24 4.56 3.24 5.49L4.66 6.91C5.29 6.34 6.11 6 7 6s1.71.34 2.34.91l1.42-1.42C9.76 4.56 8.44 4 7 4zM7 8c-.55 0-1.05.22-1.41.59L7 10l1.41-1.41A1.993 1.993 0 007 8z" />
                </svg>
                <div className="flex items-center gap-0.5">
                  <div className="w-[20px] h-[10px] border border-white rounded-[2px] relative">
                    <div className="absolute inset-[1px] right-[4px] bg-white rounded-[1px]" style={{ width: "72%" }} />
                  </div>
                  <span className="text-[10px]">84%</span>
                </div>
              </div>
            </div>

            {/* Clock Widget */}
            <div className="relative z-10 flex flex-col items-center mt-8 mb-6">
              <span className="text-white text-[52px] font-light tracking-tight leading-none">9:41</span>
              <span className="text-white/70 text-[14px] mt-1">Saturday, February 28</span>
              {/* Weather pill */}
              <div
                className="flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Sun className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-[13px]">24°C</span>
                <span className="text-white/50 text-[13px]">Delhi</span>
              </div>
            </div>

            {/* App Grid */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-6 gap-5">
              {appGrid.map((row, rowIdx) => (
                <div key={rowIdx} className="grid grid-cols-4 gap-4">
                  {row.map((app) => (
                    <button
                      key={app.name}
                      onClick={() => handleAppTap(app.target)}
                      className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform"
                    >
                      <div
                        className="w-[54px] h-[54px] rounded-[14px] flex items-center justify-center shadow-lg"
                        style={{
                          background: app.gradient || app.color,
                        }}
                      >
                        <app.icon className="w-6 h-6 text-white" strokeWidth={1.8} />
                      </div>
                      <span className="text-white/90 text-[11px]">{app.name}</span>
                    </button>
                  ))}
                </div>
              ))}

              {/* Swipe hint */}
              <div className="flex justify-center mt-2">
                <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                  ↑ swipe up for app drawer
                </span>
              </div>
            </div>

            {/* Dock */}
            <div className="relative z-10 px-6 pb-3 mt-auto">
              <div
                className="flex justify-around items-center py-2.5 px-4 rounded-[20px]"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {dockApps.map((app) => (
                  <button
                    key={app.name}
                    onClick={() => handleAppTap(null)}
                    className="active:scale-90 transition-transform"
                  >
                    <div
                      className="w-[48px] h-[48px] rounded-[12px] flex items-center justify-center"
                      style={{ background: app.color }}
                    >
                      <app.icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Home Indicator */}
            <div className="flex justify-center pb-2 pt-1">
              <div
                className="rounded-full"
                style={{
                  width: "134px",
                  height: "5px",
                  background: "rgba(255,255,255,0.5)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamsungHomeScreen;
