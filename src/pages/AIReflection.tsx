import { useState, useEffect } from "react";
import { ArrowLeft, Send, ThumbsUp, ThumbsDown, Lightbulb, Sparkles } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import data from "@/data/digital-wellbeing-data.json";

const screen = data.screens[3] as any;
const sessionChips = screen.components.find((c: any) => c.type === "chips_row").chips;
const instagramMessages = screen.components.find((c: any) => c.type === "chat_list").messages;

// Session-specific messages per app
const sessionAppMessages: Record<string, any[]> = {
  instagram: instagramMessages,
  reddit: [
    { id: "r1", role: "user", timestamp: "2026-02-28T21:30:12Z", content: "Why did my Reddit session feel so agitating tonight?", message_type: "text" },
    { id: "r2", role: "assistant", timestamp: "2026-02-28T21:30:16Z", content: "Your Reddit session from 8:02 PM lasted 23 minutes. Your swipe velocity averaged 640 px/s — well above your baseline. You spent 18 of those minutes in comment threads rather than browsing posts, which correlates with higher emotional arousal.", message_type: "text" },
    { id: "r3", role: "user", timestamp: "2026-02-28T21:31:00Z", content: "What kind of content was driving that?", message_type: "text" },
    { id: "r4", role: "assistant", timestamp: "2026-02-28T21:31:04Z", content: "You were deep in threaded discussions — rapidly expanding replies. Reddit's nested comment structure creates a \"rabbit hole\" effect: each reply pulls you deeper, and emotional stakes escalate as arguments get more heated.", message_type: "insight_card",
      insight_card: { title: "The Rabbit Hole Effect", body: "Reddit's nested threads create escalating emotional investment. You expanded an average of 6.2 reply levels deep, with 34 expand actions in 23 minutes. Each level deeper increases cognitive load and emotional arousal.", cited_stat: "34 thread expansions in 23 min — 1.5/min, 2.4× your usual pace" } },
    { id: "r5", role: "user", timestamp: "2026-02-28T21:31:45Z", content: "How can I stop falling into that pattern?", message_type: "text" },
    { id: "r6", role: "assistant", timestamp: "2026-02-28T21:31:48Z", content: "Two approaches: (1) Enable **Thread Depth Nudge** — after expanding 4 levels deep, you'll see a prompt asking \"Still worth reading?\". (2) Set a **comment-thread time cap** of 10 minutes. Your tension spikes around minute 12, so catching it earlier preserves your calm.", message_type: "text" },
  ],
  twitter: [
    { id: "t1", role: "user", timestamp: "2026-02-28T20:15:00Z", content: "I just spent over an hour on Twitter and I feel awful. What happened?", message_type: "text" },
    { id: "t2", role: "assistant", timestamp: "2026-02-28T20:15:04Z", content: "Your Twitter session from 7:08 PM lasted 68 minutes. Your engagement pattern was heavy on quote tweets and reply threads — you interacted with 42 posts, 31 of which were in heated political or outrage-driven threads. Your scroll speed spiked 3× during those moments.", message_type: "text" },
    { id: "t3", role: "user", timestamp: "2026-02-28T20:16:00Z", content: "Why do I keep getting pulled into those threads?", message_type: "text" },
    { id: "t4", role: "assistant", timestamp: "2026-02-28T20:16:05Z", content: "Twitter's algorithm amplifies emotionally charged content — outrage gets 3× more engagement than neutral posts. Your data shows a clear pattern: you start with your timeline, encounter one provocative tweet, and then spend the next 40+ minutes in reactive mode.", message_type: "insight_card",
      insight_card: { title: "The Outrage Amplifier", body: "Twitter's recommendation engine prioritises high-engagement content, which skews toward outrage and controversy. Your session data shows you shifted from passive browsing to active argument within 8 minutes of opening the app — a pattern that repeated 4 times this week.", cited_stat: "31 of 42 interactions were in outrage threads — 74% of your session" } },
    { id: "t5", role: "user", timestamp: "2026-02-28T20:17:00Z", content: "What can I do about it?", message_type: "text" },
    { id: "t6", role: "assistant", timestamp: "2026-02-28T20:17:04Z", content: "I'd suggest: (1) Enable **Reply Cooldown** — a 30-second pause before you can post a reply in threads, giving your rational brain time to catch up. (2) Activate **Outrage Filter** mode after 15 minutes, which dims engagement-bait content. Your tension peaks at minute 20 — intervening at 15 keeps you in control.", message_type: "text" },
  ],
  youtube: [
    { id: "y1", role: "user", timestamp: "2026-02-28T23:45:00Z", content: "I lost track of time on YouTube again tonight. Why does this keep happening?", message_type: "text" },
    { id: "y2", role: "assistant", timestamp: "2026-02-28T23:45:04Z", content: "Your YouTube session tonight lasted 5 hours and 20 minutes — starting at 6:40 PM with a tutorial video and ending at midnight on your 34th autoplay video. Your watch time accelerated after 9 PM when you shifted from intentional searches to autoplay recommendations.", message_type: "text" },
    { id: "y3", role: "user", timestamp: "2026-02-28T23:46:00Z", content: "Why is autoplay so hard to resist?", message_type: "text" },
    { id: "y4", role: "assistant", timestamp: "2026-02-28T23:46:05Z", content: "YouTube's autoplay creates a \"just one more\" loop — each video is algorithmically selected to be slightly more engaging than the last. Your data shows you only made 6 active choices tonight; the other 28 videos were autoplay selections you passively accepted.", message_type: "insight_card",
      insight_card: { title: "The Autoplay Trap", body: "YouTube's autoplay algorithm creates a passive consumption loop. Tonight, 82% of your videos were autoplay — not your choice. Your average watch completion rate was 94%, meaning you rarely decided to skip. The algorithm effectively made your viewing decisions for you.", cited_stat: "28 of 34 videos were autoplay — only 6 were your active choice" } },
    { id: "y5", role: "user", timestamp: "2026-02-28T23:47:00Z", content: "How do I break this cycle?", message_type: "text" },
    { id: "y6", role: "assistant", timestamp: "2026-02-28T23:47:04Z", content: "Three strategies: (1) **Autoplay Friction** — after 3 consecutive autoplay videos, require a manual tap to continue. (2) Set a **session checkpoint** at 45 minutes with a \"Still watching intentionally?\" prompt. (3) Enable **Wind-Down Mode** after 10 PM that converts the UI to audio-only. Your binge sessions always start between 9–10 PM.", message_type: "text" },
  ],
};

// Generic mode opening message
const genericOpeningMessage = {
  id: "generic_open",
  role: "assistant",
  timestamp: new Date().toISOString(),
  content: "Today you spent **6h 23m** on screen. Your highest tension period was between 10–11 PM, driven primarily by Instagram. 18% of your day was in high-tension states, while 34% was focused work. Your most-used app was Instagram (47 min), followed by Reddit (23 min). What would you like to explore?",
  message_type: "text",
};

// Generic chips
const genericChips = [
  { id: "gc1", label: "Why was I tense today?", prefill_message: "Why was I tense today?" },
  { id: "gc2", label: "Which app drained me most?", prefill_message: "Which app drained me most?" },
  { id: "gc3", label: "When was I most focused?", prefill_message: "When was I most focused?" },
  { id: "gc4", label: "Help me build a better routine", prefill_message: "Help me build a better routine" },
];

// Session-specific chips
const sessionSpecificChips = [
  { id: "sc1", label: "Why do I feel drained?", prefill_message: "Why do I feel so drained after this session?" },
  { id: "sc2", label: "What triggered this?", prefill_message: "What triggered this session?" },
  { id: "sc3", label: "Was I stressed?", prefill_message: "Was I stressed during this session based on my sensor data?" },
  { id: "sc4", label: "Help me set a limit", prefill_message: "Help me set a screen time limit to prevent this from happening again." },
];

const appFilterOptions = ["All Apps", "Instagram", "Reddit", "TikTok", "Twitter", "YouTube"];

const AIReflection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const mode = searchParams.get("mode") || "generic_reflect";
  const app = searchParams.get("app") || "";
  const sessionId = searchParams.get("session_id") || "";
  const autoSend = searchParams.get("auto_send");
  
  const isSessionMode = mode === "session_reflect";
  const appLabel = app ? app.charAt(0).toUpperCase() + app.slice(1) : "";

  // Session metadata (from data.json for the Instagram session — used as template)
  const sessionMeta = (data.screens[2] as any).components.find((c: any) => c.type === "session_header")?.data;
  const sessionTimeRange = sessionMeta
    ? `${new Date(sessionMeta.start_time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} – ${new Date(sessionMeta.end_time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} · ${sessionMeta.duration_minutes} min · ${sessionMeta.detected_state.replace("_", " ").replace(/\b\w/g, (c: string) => c.toUpperCase())}`
    : "";

  // Determine initial messages
  const getInitialMessages = () => {
    if (isSessionMode) {
      const msgs = sessionAppMessages[app] || sessionAppMessages.instagram;
      if (autoSend === "trigger") {
        return [
          { id: "auto_user", role: "user", timestamp: new Date().toISOString(), content: "What triggered this session?", message_type: "text" },
          ...(msgs.length > 1 ? [msgs[1]] : []),
        ];
      }
      return msgs;
    }
    return [genericOpeningMessage];
  };

  const [messages, setMessages] = useState<any[]>(getInitialMessages);
  const [input, setInput] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Apps");

  // Get chips based on mode and filter
  const currentChips = isSessionMode
    ? sessionSpecificChips
    : activeFilter !== "All Apps"
      ? sessionSpecificChips
      : genericChips;

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
      <div className="pb-3">
        {isSessionMode && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors mb-2 px-2 py-1 rounded-lg bg-card border border-border"
          >
            <ArrowLeft className="w-3 h-3" />
            {appLabel} Session Detail
          </button>
        )}
        <div className="flex items-center gap-3">
          {!isSessionMode && (
            <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {isSessionMode ? `${appLabel} Session` : "AI Reflect"}
            </h1>
            <p className="text-[11px] text-muted-foreground">
              {isSessionMode ? sessionTimeRange : "Ask about your overall behaviour"}
            </p>
          </div>
        </div>
      </div>

      {/* Chips */}
      <div className="flex gap-2 flex-wrap pb-3">
        {currentChips.map((chip: any) => (
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

      {/* App filter chips (generic mode only) */}
      {!isSessionMode && (
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
          {appFilterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              className={`text-[10px] px-2.5 py-1 rounded-full border whitespace-nowrap transition-colors ${
                activeFilter === opt
                  ? "bg-primary/15 text-primary border-primary/30 font-medium"
                  : "bg-card text-muted-foreground border-border hover:border-primary/20"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

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
