import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  MessageCircle, Camera as CameraIcon, Phone, Globe,
  Settings, Search,
  Sun
} from "lucide-react";

const appRow = [
  { name: "WhatsApp", color: "#25D366", icon: MessageCircle, target: null },
  { name: "Instagram", gradient: "linear-gradient(135deg, #E91E63, #FF9800)", icon: CameraIcon, target: null },
  { name: "Settings", color: "#9E9E9E", icon: Settings, target: "/settings" },
  { name: "Google", color: "#4285F4", icon: Globe, target: null },
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
    <div
      className="flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #E8EAF6 0%, #C5CAE9 40%, #B3C6E7 70%, #DCEEFB 100%)",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      {/* Aurora glow effect */}
      <div
        className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(100,181,246,0.2) 0%, rgba(129,212,250,0.1) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-[20%] left-[40%] w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(186,147,255,0.15) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />

      {/* Clock Widget */}
      <div className="relative z-10 flex flex-col items-center mt-8 mb-6">
        <span className="text-gray-800 text-[52px] font-light tracking-tight leading-none">9:41</span>
        <span className="text-gray-600 text-[14px] mt-1">Saturday, February 28</span>
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
          <span className="text-gray-700 text-[13px]">24°C</span>
          <span className="text-gray-500 text-[13px]">Delhi</span>
        </div>
      </div>

      {/* Google Search Bar */}
      <div className="relative z-10 px-8 mb-4">
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
            <span className="text-[16px] font-bold" style={{
              background: "linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>G</span>
          </div>
          <span className="text-gray-400 text-[14px] flex-1">Search</span>
          <Search className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* App Row */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-4">
        <div className="grid grid-cols-4 gap-4">
          {appRow.map((app) => (
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
              <span className="text-gray-700 text-[11px]">{app.name}</span>
            </button>
          ))}
        </div>

        {/* Swipe hint */}
        <div className="flex justify-center mt-3">
          <span className="text-[11px]" style={{ color: "rgba(0,0,0,0.3)" }}>
            ↑ swipe up for app drawer
          </span>
        </div>
      </div>

      {/* Dock */}
      <div className="relative z-10 px-6 pb-3">
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
    </div>
  );
};

export default SamsungHomeScreen;
