import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Activity, MessageCircle, Settings, Layers, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import SamsungStatusBar from "./SamsungStatusBar";
import AndroidNavBar from "./AndroidNavBar";

const navItems = [
  { to: "/intent-spectrum", icon: Activity, label: "Dashboard" },
  { to: "/ai-reflection", icon: MessageCircle, label: "Reflect" },
  { to: "/settings/habits", icon: Settings, label: "Settings" },
  { to: "/overlay/demo", icon: Layers, label: "Overlay" },
];

const AppLayout = () => {
  const location = useLocation();
  const isSettingsOrLanding = location.pathname === "/" || location.pathname === "/digital-wellbeing";
  const showBottomNav = !isSettingsOrLanding;

  return (
    <div className="min-h-screen max-w-[430px] mx-auto bg-[#1C1C1E] flex flex-col overflow-x-hidden">
      {/* Samsung Status Bar */}
      <SamsungStatusBar />

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {isSettingsOrLanding ? (
          <Outlet />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto px-4 py-6"
          >
            <Outlet />
          </motion.div>
        )}
      </main>

      {/* Bottom nav for inner screens */}
      {showBottomNav && (
        <nav className="border-t border-[#2C2C2E] bg-[#1C1C1E]/90 backdrop-blur-md">
          <div className="max-w-4xl mx-auto flex justify-around py-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/intent-spectrum"}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "text-[#4CAF50]"
                      : "text-[#888] hover:text-[#ccc]"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{label}</span>
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
