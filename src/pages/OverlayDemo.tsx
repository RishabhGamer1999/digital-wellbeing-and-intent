import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, Heart, MessageCircle, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import data from "@/data/digital-wellbeing-data.json";

const screen = data.screens[6] as any;
const feedItems = screen.components.find((c: any) => c.type === "social_feed").feed_items;
const phases = screen.components.find((c: any) => c.type === "scroll_simulation").phases;
const toast = screen.components.find((c: any) => c.type === "toast");

const OverlayDemo = () => {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState<string>("phase_normal");
  const [showToast, setShowToast] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const lastTime = useRef(Date.now());

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt < 50) return;
    const speed = Math.abs(scrollRef.current.scrollTop - lastScrollTop.current) / (dt / 1000);
    setScrollSpeed(Math.round(speed));
    lastScrollTop.current = scrollRef.current.scrollTop;
    lastTime.current = now;

    if (speed > 600 && currentPhase === "phase_normal") {
      setCurrentPhase("phase_spike");
      setTimeout(() => {
        setCurrentPhase("phase_viscous");
        setShowToast(true);
      }, 500);
    }
  }, [currentPhase]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const resistance = currentPhase === "phase_viscous" ? 4.5 : 1;

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="space-y-4 shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Viscous Scroll Demo</h1>
          <p className="text-xs text-muted-foreground">Scroll fast to trigger the intervention</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Scroll speed</p>
          <p className={`text-sm font-mono font-semibold ${scrollSpeed > 600 ? "text-high-tension" : scrollSpeed > 300 ? "text-elevated" : "text-primary"}`}>
            {scrollSpeed} px/s
          </p>
        </div>
      </div>

      {/* Phase indicator */}
      <div className="flex gap-2">
        {Object.entries(phases).map(([key, phase]: [string, any]) => (
          <div
            key={key}
            className={`flex-1 text-center text-[10px] py-1.5 rounded-lg border transition-colors ${
              currentPhase === phase.id
                ? phase.id === "phase_viscous"
                  ? "bg-high-tension/15 border-high-tension/30 text-high-tension"
                  : phase.id === "phase_spike"
                  ? "bg-elevated/15 border-elevated/30 text-elevated"
                  : "bg-primary/15 border-primary/30 text-primary"
                : "bg-card border-border text-muted-foreground"
            }`}
          >
            {phase.label}
          </div>
        ))}
      </div>

      {/* Feed */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto rounded-xl border border-border bg-card mt-4"
        style={{
          scrollBehavior: currentPhase === "phase_viscous" ? "smooth" : "auto",
          overscrollBehavior: "contain",
        }}
      >
        {/* Duplicate feed items for scrollable content */}
        {[...feedItems, ...feedItems, ...feedItems].map((item: any, i: number) => (
          <div key={`${item.id}-${i}`} className="border-b border-border p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full" style={{ background: item.placeholder_color }} />
              <span className="text-sm font-medium text-foreground">{item.user_handle}</span>
            </div>
            <div
              className="w-full h-48 rounded-lg overflow-hidden relative"
              style={{ background: `linear-gradient(135deg, ${item.placeholder_color}44, ${item.placeholder_color}BB)` }}
            >
              {/* Faux post content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="w-16 h-16 rounded-full border-2 border-white/30" style={{ background: `${item.placeholder_color}99` }} />
                <div className="flex gap-1">
                  <div className="w-12 h-2 rounded-full bg-white/20" />
                  <div className="w-8 h-2 rounded-full bg-white/15" />
                </div>
                <div className="w-20 h-2 rounded-full bg-white/10" />
              </div>
              {/* Decorative shapes */}
              <div className="absolute top-3 right-3 w-6 h-6 rounded-md rotate-12 bg-white/10" />
              <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-white/8" />
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <button className="flex items-center gap-1 text-xs hover:text-high-tension transition-colors">
                <Heart className="w-4 h-4" /> {item.like_count.toLocaleString()}
              </button>
              <button className="flex items-center gap-1 text-xs hover:text-foreground transition-colors">
                <MessageCircle className="w-4 h-4" /> {item.comment_count}
              </button>
              <button className="hover:text-foreground transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-50 bg-card border border-high-tension/30 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg glow-danger max-w-[400px] mx-auto"
          >
            <span className="text-xs text-foreground">{toast.message}</span>
            <button onClick={() => navigate("/settings/habits")} className="text-[10px] text-primary hover:underline">
              Settings
            </button>
            <button onClick={() => { setShowToast(false); setCurrentPhase("phase_normal"); }} className="text-muted-foreground hover:text-foreground">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OverlayDemo;
