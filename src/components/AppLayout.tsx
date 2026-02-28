import { NavLink, Outlet } from "react-router-dom";
import { Activity, MessageCircle, Settings, Layers } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", icon: Activity, label: "Dashboard" },
  { to: "/ai-reflection", icon: MessageCircle, label: "Reflect" },
  { to: "/settings/habits", icon: Settings, label: "Settings" },
  { to: "/overlay/demo", icon: Layers, label: "Overlay" },
];

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">MindMotion</h1>
        </div>
        <span className="text-xs text-muted-foreground font-mono">Feb 28, 2026</span>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto px-4 py-6"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Bottom nav */}
      <nav className="border-t border-border bg-card/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex justify-around py-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
