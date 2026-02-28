import { useState } from "react";
import { ArrowLeft, Send, ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import data from "@/data/digital-wellbeing-data.json";

const screen = data.screens[3] as any;
const chips = screen.components.find((c: any) => c.type === "chips_row").chips;
const instagramMessages = screen.components.find((c: any) => c.type === "chat_list").messages;

const redditMessages = [
  {
    id: "r_msg_001", role: "user", timestamp: "2026-02-28T21:30:12Z",
    content: "Why did my Reddit session feel so agitating tonight?", message_type: "text",
  },
  {
    id: "r_msg_002", role: "assistant", timestamp: "2026-02-28T21:30:16Z",
    content: "Your Reddit session from 8:02 PM lasted 23 minutes. During that time, your swipe velocity averaged 640 px/s — well above your baseline of 280 px/s. More notably, you spent 18 of those minutes in comment threads rather than browsing posts, which correlates with higher emotional arousal.",
    message_type: "text",
    insight: { mechanism: "rage_browsing", cited_data: { avg_swipe: 640, comment_ratio: 0.78, session_id: "sess_2002_reddit" } },
  },
  {
    id: "r_msg_003", role: "user", timestamp: "2026-02-28T21:31:00Z",
    content: "What kind of content was driving that?", message_type: "text",
  },
  {
    id: "r_msg_004", role: "assistant", timestamp: "2026-02-28T21:31:04Z",
    content: "Based on your scroll pattern, you were deep in threaded discussions — the kind where you rapidly expand replies. Reddit's nested comment structure creates a \"rabbit hole\" effect: each reply pulls you deeper, and the emotional stakes escalate as arguments get more heated.",
    message_type: "insight_card",
    insight: { mechanism: "rabbit_hole_threads", cited_data: { thread_depth_avg: 6.2, expand_actions: 34, session_id: "sess_2002_reddit" } },
    insight_card: {
      title: "The Rabbit Hole Effect",
      body: "Reddit's nested threads create escalating emotional investment. Your data shows you expanded an average of 6.2 reply levels deep, with 34 expand actions in 23 minutes. Each level deeper increases cognitive load and emotional arousal — that's why you felt drained.",
      cited_stat: "34 thread expansions in 23 min — 1.5 per minute, 2.4× your usual Reddit pace",
    },
  },
  {
    id: "r_msg_005", role: "user", timestamp: "2026-02-28T21:31:45Z",
    content: "How can I stop falling into that pattern?", message_type: "text",
  },
  {
    id: "r_msg_006", role: "assistant", timestamp: "2026-02-28T21:31:48Z",
    content: "Two approaches: (1) Enable **Thread Depth Nudge** — after expanding 4 levels deep, you'll see a gentle prompt asking \"Still worth reading?\". (2) Set a **comment-thread time cap** of 10 minutes. Your tension typically spikes around minute 12 in comment threads, so catching it earlier preserves your calm. Want me to set these up?",
    message_type: "text",
    insight: { mechanism: "depth_friction", cited_data: { tension_onset_minute: 12, recommended_cap: 10, session_id: "sess_2002_reddit" } },
  },
];

const AIReflection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const app = searchParams.get("app") || "instagram";

  const initialMessages = app === "reddit" ? redditMessages : instagramMessages;
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleChip = (prefill: string) => {
    setInput(prefill);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: `msg_${Date.now()}`, role: "user", content: input, timestamp: new Date().toISOString(), message_type: "text" },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4">
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">
          AI Reflection — {app === "reddit" ? "Reddit" : "Instagram"}
        </h1>
      </div>

      {/* Chips */}
      <div className="flex gap-2 flex-wrap pb-3">
        {chips.map((chip: any) => (
          <button
            key={chip.id}
            onClick={() => handleChip(chip.prefill_message)}
            className="text-xs px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        <AnimatePresence>
          {messages.map((msg: any) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-card border border-border text-foreground rounded-bl-md"
                }`}
              >
                <p>{msg.content}</p>

                {msg.insight_card && (
                  <div className="mt-3 bg-elevated/10 border border-elevated/20 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-elevated" />
                      <span className="text-xs font-semibold text-elevated">{msg.insight_card.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{msg.insight_card.body}</p>
                    <p className="text-[10px] text-elevated/80 font-mono">{msg.insight_card.cited_stat}</p>
                  </div>
                )}

                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                    <button className="text-muted-foreground hover:text-primary transition-colors">
                      <ThumbsUp className="w-3 h-3" />
                    </button>
                    <button className="text-muted-foreground hover:text-high-tension transition-colors">
                      <ThumbsDown className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="flex gap-2 pt-2 border-t border-border">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about your session..."
          className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:brightness-110 transition-all disabled:opacity-30"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AIReflection;
