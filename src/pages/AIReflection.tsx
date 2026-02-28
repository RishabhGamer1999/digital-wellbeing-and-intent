import { useState } from "react";
import { ArrowLeft, Send, ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import data from "@/data/mindmotion-data.json";

const screen = data.screens[2] as any;
const chips = screen.components.find((c: any) => c.type === "chips_row").chips;
const initialMessages = screen.components.find((c: any) => c.type === "chat_list").messages;

const AIReflection = () => {
  const navigate = useNavigate();
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
        <h1 className="text-lg font-semibold text-foreground">AI Reflection</h1>
      </div>

      {/* Chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
        {chips.map((chip: any) => (
          <button
            key={chip.id}
            onClick={() => handleChip(chip.prefill_message)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
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

                {/* Insight card */}
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

                {/* Feedback */}
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
