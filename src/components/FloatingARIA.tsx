"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X, Mic, Volume2, VolumeX, Send, Sparkles } from "lucide-react";
import { useARIA } from "@/hooks/useARIA";
import { useAppStore } from "@/store/useAppStore";
import { getContextualAdvice } from "@/lib/ai-engine";
import { cn } from "@/lib/utils";

const QUICK_TIPS = [
  "What's the best GPU under ₹40,000?",
  "Is DDR5 worth it in India?",
  "How to choose between Intel and AMD?",
  "Best gaming monitor under ₹20,000?",
  "Should I buy a laptop or desktop?",
  "How much RAM do I need for AI/ML?",
];

export default function FloatingARIA() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState<Array<{ role: "user" | "aria"; text: string }>>([]);
  const [isMuted, setIsMuted] = useState(false);
  const { profile } = useAppStore();

  const { speak, stopSpeaking, startListening, isListening, isSpeaking, isSupported } = useARIA({
    onListenResult: (text) => {
      setInputText(text);
      handleSend(text);
    },
  });

  const getARIAResponse = useCallback((userMsg: string): string => {
    const msg = userMsg.toLowerCase();

    if (msg.includes("gpu") || msg.includes("graphics")) {
      if (msg.includes("40000") || msg.includes("40k")) {
        return "Under ₹40,000, your best options are the NVIDIA RTX 4060 (₹35,000) — best 1080p card with DLSS 3 Frame Generation, or the AMD RX 7600 (₹28,000) — excellent rasterization performance. The RTX 4060 wins for gaming longevity due to DLSS. Available on Amazon.in and Flipkart!";
      }
      return "Great question! For Indian budgets: RTX 4060 (₹35K) is the sweet spot for 1080p gaming, RTX 4070 (₹55K) for 1440p, and RTX 4080 Super (₹95K) for enthusiasts. AMD offers better value at entry-level but NVIDIA wins on features like DLSS and CUDA.";
    }

    if (msg.includes("ddr5") || msg.includes("ram")) {
      return "DDR5 is worth it in India IF you're building on AM5 (Ryzen 7000 series) or Intel 13th/14th gen. It costs about ₹3,000-₹5,000 more than DDR4 but future-proofs your platform for 3-4 more years. For tight budgets, DDR4 with Ryzen 5600 is still excellent value!";
    }

    if (msg.includes("intel") || msg.includes("amd")) {
      return "In India's current market: AMD wins on budget builds (Ryzen 5 5600 at ₹13K is unbeatable), Intel wins on very high-end (i9-13900K for extreme performance). For mid-range, AMD Ryzen 7 7700X gives better multi-core performance per rupee. My recommendation: AMD for most Indian users!";
    }

    if (msg.includes("monitor")) {
      return "Best monitors in India under ₹20,000: LG 27GP850-B (27\" 180Hz IPS, ₹18,000) — absolute best value, Dell S2421HGF (24\" 144Hz, ₹12,000) — budget pick, ASUS VG279Q (27\" 165Hz IPS, ₹17,000) — excellent color accuracy. For gaming, prioritize refresh rate over resolution!";
    }

    if (msg.includes("laptop") || msg.includes("desktop")) {
      return "Classic Indian dilemma! Desktop gives 40-60% more performance per rupee — better for gaming, video editing, AI/ML. Laptop is essential if you're commuting to college daily. My advice: if you spend more than 4 hours at home, desktop. If you're a college student who works from multiple locations, laptop. Budget matters too!";
    }

    if (msg.includes("ai") || msg.includes("ml") || msg.includes("machine learning")) {
      return "For AI/ML in India, you need: 16GB+ RAM minimum (32GB recommended), NVIDIA GPU with 8GB+ VRAM (RTX 4060 minimum), fast NVMe SSD for dataset loading. Google Colab Pro (₹1,200/month) extends your capabilities. The RTX 4060 can run LLaMA 2 7B locally — remarkable capability at ₹35,000!";
    }

    if (msg.includes("budget") || msg.includes("cheap") || msg.includes("affordable")) {
      return "India's best budget tech spots: Amazon.in during sale season (Republic Day, Great Indian Festival), Flipkart Big Billion Days, MD Computers in Delhi, SP Road in Bangalore, Lamington Road in Mumbai. Always compare prices across platforms — differences of ₹2,000-₹5,000 are common!";
    }

    // Use contextual advice based on profile
    return getContextualAdvice(profile, "general");
  }, [profile]);

  const handleSend = useCallback((text?: string) => {
    const msg = text || inputText;
    if (!msg.trim()) return;

    setConversation((prev) => [...prev, { role: "user", text: msg }]);
    setInputText("");

    setTimeout(() => {
      const response = getARIAResponse(msg);
      setConversation((prev) => [...prev, { role: "aria", text: response }]);
      if (!isMuted) speak(response, "high");
    }, 500);
  }, [inputText, getARIAResponse, isMuted, speak]);

  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
    }
  }, [isOpen, stopSpeaking]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center",
          "bg-gradient-to-br from-violet-600 to-purple-700 glow-purple",
          "shadow-2xl hover:scale-110 transition-transform",
          isOpen ? "hidden" : "flex"
        )}
        style={{ animation: "glowPulse 2s ease-in-out infinite" }}
      >
        <Brain className="w-7 h-7 text-white" />
        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#050510] animate-pulse" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] flex flex-col rounded-3xl card-glass-strong shadow-2xl overflow-hidden"
            style={{ border: "1px solid rgba(139,92,246,0.3)" }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-violet-900/80 to-purple-900/80 flex items-center gap-3 border-b border-white/5">
              <div className="relative">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center",
                    isSpeaking && "glow-purple"
                  )}
                >
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border border-gray-900 animate-pulse" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">ARIA</span>
                  <span className="px-1.5 py-0.5 bg-violet-500/30 rounded-full text-xs text-violet-300">AI</span>
                </div>
                <p className="text-xs text-gray-400">
                  {isSpeaking ? "Speaking..." : isListening ? "Listening..." : "Ask me anything"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-violet-400" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Conversation */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {conversation.length === 0 ? (
                <div>
                  <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-violet-400" />
                      <span className="text-sm font-semibold text-violet-300">Namaste! 🙏</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      I'm ARIA — your AI tech advisor. Ask me anything about PC builds, laptops, gaming, or tech for India!
                    </p>
                  </div>

                  {/* Quick questions */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Quick Questions</p>
                    <div className="space-y-2">
                      {QUICK_TIPS.map((tip) => (
                        <button
                          key={tip}
                          onClick={() => handleSend(tip)}
                          className="w-full text-left text-sm text-gray-300 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 transition-all"
                        >
                          {tip}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                conversation.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.role === "aria" && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                        <Brain className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                        msg.role === "user"
                          ? "bg-violet-600/80 text-white rounded-br-md"
                          : "bg-white/8 text-gray-200 rounded-bl-md border border-white/10"
                      )}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                {isSupported && (
                  <button
                    onClick={() => isListening ? undefined : startListening()}
                    className={cn(
                      "p-2.5 rounded-xl transition-all flex-shrink-0",
                      isListening ? "bg-cyan-500/20 border border-cyan-500/40 animate-pulse" : "btn-secondary"
                    )}
                  >
                    <Mic className={cn("w-4 h-4", isListening ? "text-cyan-400" : "text-gray-400")} />
                  </button>
                )}
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask ARIA anything..."
                  className="flex-1 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500/50"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-xl btn-primary flex-shrink-0 disabled:opacity-40"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
