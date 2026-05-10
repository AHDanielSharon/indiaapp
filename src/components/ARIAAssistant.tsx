"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, VolumeX, Zap, Brain } from "lucide-react";
import { useARIA } from "@/hooks/useARIA";
import { cn } from "@/lib/utils";

interface ARIAAssistantProps {
  message?: string;
  autoSpeak?: boolean;
  className?: string;
  compact?: boolean;
  onListenResult?: (text: string) => void;
}

export default function ARIAAssistant({
  message,
  autoSpeak = false,
  className,
  compact = false,
  onListenResult,
}: ARIAAssistantProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const prevMessageRef = useRef("");
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { speak, stopSpeaking, startListening, stopListening, isSpeaking, isListening, isSupported } = useARIA({
    onListenResult,
  });

  const typeMessage = useCallback((text: string) => {
    setDisplayText("");
    setCharIndex(0);
    if (typingRef.current) clearTimeout(typingRef.current);

    let i = 0;
    const typeChar = () => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
        typingRef.current = setTimeout(typeChar, 18);
      }
    };
    typeChar();
  }, []);

  useEffect(() => {
    if (message && message !== prevMessageRef.current) {
      prevMessageRef.current = message;
      typeMessage(message);
      if (autoSpeak && !isMuted && isSupported) {
        speak(message, "high");
      }
    }
  }, [message, autoSpeak, isMuted, isSupported, speak, typeMessage]);

  useEffect(() => {
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, []);

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("flex items-start gap-3 p-4 rounded-2xl card-glass-strong neon-border", className)}
      >
        {/* ARIA Avatar compact */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center glow-purple">
            <Brain className="w-5 h-5 text-white" />
          </div>
          {isSpeaking && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse" />
          )}
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-violet-400 tracking-wider uppercase">ARIA</span>
            {isSpeaking && (
              <div className="flex gap-0.5 items-end h-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-0.5 bg-violet-400 rounded-full aria-wave-bar" style={{ height: `${50 + i * 10}%` }} />
                ))}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            {displayText}
            {displayText.length < (message?.length || 0) && (
              <span className="inline-block w-0.5 h-4 bg-violet-400 ml-0.5 animate-pulse" />
            )}
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => isMuted ? setIsMuted(false) : setIsMuted(true)}
            className="p-1.5 rounded-lg btn-secondary"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-gray-400" /> : <Volume2 className="w-3.5 h-3.5 text-violet-400" />}
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("relative", className)}
    >
      {/* Main ARIA Panel */}
      <div className="relative p-6 rounded-3xl card-glass-strong overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 data-grid opacity-30" />
          {isSpeaking && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl"
              style={{ background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.2), transparent 70%)" }}
            />
          )}
        </div>

        <div className="relative z-10">
          {/* ARIA Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* ARIA Orb */}
              <div className="relative">
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500",
                    isSpeaking
                      ? "bg-gradient-to-br from-violet-500 to-purple-700 glow-purple"
                      : isListening
                      ? "bg-gradient-to-br from-cyan-500 to-blue-700 glow-cyan"
                      : "bg-gradient-to-br from-violet-700 to-purple-900"
                  )}
                  style={{
                    animation: isSpeaking ? "glowPulse 1.5s ease-in-out infinite" : undefined,
                  }}
                >
                  <Brain className="w-7 h-7 text-white" />
                </div>

                {/* Status ring */}
                <div
                  className={cn(
                    "absolute -inset-1 rounded-full border-2 transition-colors duration-500",
                    isSpeaking ? "border-violet-500/60" : isListening ? "border-cyan-500/60" : "border-white/10"
                  )}
                />

                {/* Online indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-gray-900" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-lg">ARIA</h3>
                  <span className="px-2 py-0.5 bg-violet-500/20 border border-violet-500/30 rounded-full text-xs text-violet-300 font-medium">
                    AI Active
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {isSpeaking ? "Speaking..." : isListening ? "Listening..." : "BharatTech AI Companion"}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {isSupported && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (isListening) stopListening();
                    else startListening();
                  }}
                  className={cn(
                    "p-2.5 rounded-xl transition-all",
                    isListening ? "bg-cyan-500/20 border border-cyan-500/40 glow-cyan" : "btn-secondary"
                  )}
                >
                  {isListening ? (
                    <Mic className="w-4 h-4 text-cyan-400 animate-pulse" />
                  ) : (
                    <MicOff className="w-4 h-4 text-gray-400" />
                  )}
                </motion.button>
              )}

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (isMuted) {
                    setIsMuted(false);
                    if (message) speak(message, "high");
                  } else {
                    setIsMuted(true);
                    stopSpeaking();
                  }
                }}
                className={cn(
                  "p-2.5 rounded-xl transition-all",
                  !isMuted ? "bg-violet-500/20 border border-violet-500/40" : "btn-secondary"
                )}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-gray-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-violet-400" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Sound Wave Visualization */}
          {isSpeaking && (
            <div className="flex items-end gap-1 justify-center h-8 mb-4">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-violet-600 to-violet-400 rounded-full aria-wave-bar"
                  style={{
                    height: `${20 + Math.sin(i * 0.8) * 60 + 20}%`,
                    animationDelay: `${i * 0.04}s`,
                    animationDuration: `${0.6 + Math.random() * 0.4}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Message Display */}
          <AnimatePresence mode="wait">
            {displayText && (
              <motion.div
                key={message}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-4 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {displayText}
                    {displayText.length < (message?.length || 0) && (
                      <span className="inline-block w-0.5 h-4 bg-violet-400 ml-0.5 animate-pulse align-middle" />
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status Bar */}
          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <span>BharatTech ARIA v2.0</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Neural Engine Active</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
