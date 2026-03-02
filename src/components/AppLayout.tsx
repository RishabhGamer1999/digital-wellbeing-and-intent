import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Activity, Settings, Layers, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import SamsungStatusBar from "./SamsungStatusBar";
import AndroidNavBar from "./AndroidNavBar";

const navItems = [
  { to: "/intent-spectrum", icon: Activity, label: "Dashboard" },
  { to: "/ai-reflection?mode=generic_reflect", icon: Sparkles, label: "AI Reflect", isAI: true },
  { to: "/settings/habits", icon: Settings, label: "Settings" },
  { to: "/overlay/demo", icon: Layers, label: "Overlay" },
];

const AppLayout = () => {
  const location = useLocation();
  const isSettingsOrLanding = location.pathname === "/" || location.pathname === "/settings" || location.pathname === "/digital-wellbeing";
  const showBottomNav = !isSettingsOrLanding;

  return (
    <div className="min-h-screen max-w-[430px] mx-auto bg-background flex flex-col overflow-x-hidden shadow-xl">
      {/* Samsung Status Bar */}
      <SamsungStatusBar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col min-h-0">
        {isSettingsOrLanding ? (
          <Outlet />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto px-4 py-6 flex-1 flex flex-col min-h-0 w-full"
          >
            <Outlet />
          </motion.div>
        )}
      </main>

      {/* Bottom nav for inner screens */}
      {showBottomNav && (
        <nav className="border-t border-border bg-card/90 backdrop-blur-md">
          <div className="max-w-4xl mx-auto flex justify-around py-2">
            {navItems.map(({ to, icon: Icon, label, isAI }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/intent-spectrum"}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                    isAI
                      ? isActive ? "text-primary" : "text-primary/60 hover:text-primary"
                      : isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                <Icon className={`w-5 h-5 ${isAI ? "drop-shadow-[0_0_6px_rgba(76,175,80,0.5)]" : ""}`} />
                <span className={`text-[10px] font-medium ${isAI ? "font-semibold" : ""}`}>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      )}

      {/* Android Navigation Bar */}
      <AndroidNavBar />
    </div>
  );
};

export default AppLayout;
