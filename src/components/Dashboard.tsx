"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Zap, Loader2 } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#050510] text-white flex items-center justify-center">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 data-grid opacity-30" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* ARIA Processing Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center glow-purple"
        >
          <Brain className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-black text-white mb-3">
            <span className="gradient-text">ARIA is Thinking...</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Analyzing your profile, Indian market data, and generating your perfect setup...
          </p>
        </motion.div>

        {/* Processing steps */}
        <div className="space-y-3">
          {[
            { icon: Brain, text: "Understanding your profile..." },
            { icon: Cpu, text: "Selecting optimal components..." },
            { icon: Zap, text: "Calculating performance scores..." },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.5 }}
              className="flex items-center gap-3 p-3 rounded-xl card-glass text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <step.icon className="w-4 h-4 text-violet-400" />
              </div>
              <span className="text-sm text-gray-300">{step.text}</span>
              <Loader2 className="w-4 h-4 text-violet-400 ml-auto animate-spin" />
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 text-xs text-gray-500"
        >
          Powered by BharatTech Neural Engine
        </motion.div>
      </div>
    </div>
  );
}
