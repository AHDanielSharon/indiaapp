"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu, Zap, Brain, Rocket, Shield, Globe, ChevronRight,
  Gamepad2, Code2, Camera, TrendingUp, Users, Star,
  ArrowRight, Play, Sparkles, CircuitBoard
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import ARIAAssistant from "@/components/ARIAAssistant";
import IndiaMapSVG from "@/components/IndiaMapSVG";

const TAGLINES = [
  "India's AI Technology Companion",
  "Your Personal AI Engineer",
  "The Future of Indian Innovation",
  "Next-Gen Digital Ecosystem",
  "Built for a Billion Dreams",
];

const STATS = [
  { value: "10L+", label: "Students Guided", icon: Users },
  { value: "₹500Cr+", label: "Money Saved", icon: Shield },
  { value: "50K+", label: "Builds Created", icon: Cpu },
  { value: "98%", label: "Satisfaction Rate", icon: Star },
];

const USER_TYPES = [
  { icon: Code2, label: "Engineering Student", color: "from-blue-500 to-cyan-500", desc: "CSE, ECE, ME, Civil" },
  { icon: Gamepad2, label: "Gamer", color: "from-purple-500 to-pink-500", desc: "AAA, Competitive, Streaming" },
  { icon: Camera, label: "Creator", color: "from-orange-500 to-red-500", desc: "YouTube, Reels, VFX" },
  { icon: Brain, label: "AI/ML Researcher", color: "from-violet-500 to-purple-500", desc: "PyTorch, TensorFlow, LLMs" },
  { icon: Rocket, label: "Startup Founder", color: "from-emerald-500 to-teal-500", desc: "Build, Scale, Innovate" },
  { icon: Globe, label: "Professional", color: "from-sky-500 to-blue-500", desc: "Remote Work, Productivity" },
];

const FEATURES = [
  {
    icon: Brain,
    title: "ARIA AI Assistant",
    desc: "Voice-powered AI that guides you like a personal tech mentor — speaks, listens, and understands your needs.",
    color: "text-violet-400",
    bg: "from-violet-900/40 to-purple-900/40",
    border: "border-violet-500/20",
  },
  {
    icon: Cpu,
    title: "AI PC Builder",
    desc: "Intelligent component selection that understands Indian budgets, use-cases, and future upgrade paths.",
    color: "text-cyan-400",
    bg: "from-cyan-900/40 to-blue-900/40",
    border: "border-cyan-500/20",
  },
  {
    icon: CircuitBoard,
    title: "Future-Proof Analysis",
    desc: "Predicts technology obsolescence and recommends upgrades before problems arise.",
    color: "text-emerald-400",
    bg: "from-emerald-900/40 to-teal-900/40",
    border: "border-emerald-500/20",
  },
  {
    icon: TrendingUp,
    title: "Indian Market Intelligence",
    desc: "Real-time Indian pricing, availability from Amazon.in and Flipkart, and scam-proof guidance.",
    color: "text-amber-400",
    bg: "from-amber-900/40 to-orange-900/40",
    border: "border-amber-500/20",
  },
];

// Particle component
function Particle({ delay, duration, x }: { delay: number; duration: number; x: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-violet-400/60"
      style={{ left: `${x}%`, bottom: -10 }}
      animate={{ y: [0, -window?.innerHeight || -800], opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

export default function LandingPage() {
  const { setView } = useAppStore();
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; duration: number; x: number }>>([]);
  const [ariaMsg] = useState(
    "Namaste! 🙏 I'm ARIA — your AI technology companion. I understand Indian budgets, engineering needs, and your dreams. Let me design the perfect tech setup for your future. Tap 'Begin Your Journey' to start!"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % TAGLINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 8,
        x: Math.random() * 100,
      }))
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0 data-grid opacity-40" />

        {/* Gradient orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
            animation: "orbFloat 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
            animation: "orbFloat 10s ease-in-out infinite 3s",
          }}
        />
        <div
          className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)",
            animation: "orbFloat 12s ease-in-out infinite 6s",
          }}
        />

        {/* Floating particles */}
        {particles.map((p) => (
          <Particle key={p.id} delay={p.delay} duration={p.duration} x={p.x} />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="relative w-10 h-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center glow-purple">
              <Brain className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <span className="font-black text-xl tracking-tight">
              <span className="gradient-text">BharatTech</span>
              <span className="text-white"> AI</span>
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-gray-400">India's AI Platform</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            <span className="text-lg">🇮🇳</span>
            <span className="text-sm text-gray-300">Made in India</span>
          </div>
          <button
            onClick={() => setView("onboarding")}
            className="px-4 py-2 rounded-xl btn-primary text-sm font-semibold text-white"
          >
            Get Started
          </button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* India Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-green-500/20 border border-white/10 mb-6"
          >
            <span className="text-xl">🇮🇳</span>
            <span className="text-sm text-gray-300 font-medium">Revolutionary Indian AI Platform</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black leading-tight mb-4"
          >
            <span className="text-white">The AI That</span>
            <br />
            <span className="gradient-text">Understands India</span>
          </motion.h1>

          {/* Animated Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="h-12 flex items-center justify-center mb-6"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xl md:text-2xl font-light text-gray-300"
              >
                {TAGLINES[taglineIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Powered by AI that deeply understands Indian budgets, engineering needs, gaming culture,
            and startup dreams. Not just a tool — your technology companion for life.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView("onboarding")}
              className="group px-8 py-4 rounded-2xl btn-primary text-white font-bold text-lg flex items-center justify-center gap-3"
            >
              <Zap className="w-5 h-5" />
              Begin Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView("onboarding")}
              className="group px-8 py-4 rounded-2xl btn-secondary text-white font-semibold text-lg flex items-center justify-center gap-3"
            >
              <Play className="w-5 h-5 text-violet-400" />
              Watch Demo
            </motion.button>
          </motion.div>
        </div>

        {/* ARIA Assistant Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto mt-14 relative"
        >
          {/* India Map Background */}
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-48 hidden lg:block">
            <IndiaMapSVG />
          </div>
          <ARIAAssistant message={ariaMsg} autoSpeak={true} />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-4xl mx-auto"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="text-center p-5 rounded-2xl card-glass neon-border"
            >
              <stat.icon className="w-6 h-6 text-violet-400 mx-auto mb-2" />
              <div className="text-2xl font-black gradient-text">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* User Types */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="text-white">Built for </span>
            <span className="gradient-text">Every Indian</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From Tier 3 college students to IIT alumni, from Jaipur gamers to Bangalore founders — ARIA understands everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {USER_TYPES.map((type, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => setView("onboarding")}
              className="group cursor-pointer p-5 rounded-2xl card-glass neon-border hover:border-violet-500/40 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">{type.label}</h3>
              <p className="text-xs text-gray-400">{type.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Get personalized setup</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="gradient-text">Revolutionary</span>
            <span className="text-white"> Features</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Technology so advanced it feels like the future. Built specifically for India's unique needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${feature.bg} border ${feature.border} backdrop-blur-xl`}
            >
              <feature.icon className={`w-10 h-10 ${feature.color} mb-4`} />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Problems we solve */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-violet-900/30 to-purple-900/30 border border-violet-500/20"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              We Solve Real <span className="gradient-text">Indian Problems</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "❌ Students buying wrong laptops → ✅ AI-guided perfect match",
              "❌ Parents wasting money → ✅ Budget-optimized recommendations",
              "❌ Gamers getting scammed → ✅ FPS-verified build analysis",
              "❌ AI/ML students confused → ✅ CUDA-optimized workstations",
              "❌ Offline shop manipulation → ✅ Transparent honest guidance",
              "❌ Technical jargon confusion → ✅ Simple human explanations",
              "❌ Future-proofing anxiety → ✅ Upgrade timeline planning",
              "❌ Electricity bill worries → ✅ Power efficiency analysis",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
              >
                <span className="text-sm text-gray-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* India Ticker */}
      <section className="relative z-10 py-4 border-y border-white/5 overflow-hidden">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-8 whitespace-nowrap"
        >
          {[...Array(3)].map((_, r) => (
            <div key={r} className="flex items-center gap-8">
              {[
                "🎮 Mumbai Gamer saved ₹15,000 with ARIA's build",
                "🧠 IIT Delhi student optimized AI workstation",
                "🚀 Bangalore startup founder got workstation guidance",
                "🎬 Pune YouTuber built perfect creator setup",
                "📚 Hyderabad CSE student chose right laptop",
                "⚡ Jaipur engineer's PC scored 94% future-proof",
                "🏆 Chennai gamer hitting 240FPS in Valorant",
                "💡 ARIA saved Indian families ₹500Cr+ collectively",
              ].map((item, i) => (
                <span key={i} className="text-sm text-gray-400 flex items-center gap-2 px-4">
                  {item}
                  <span className="text-gray-600 mx-2">|</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-6xl mb-6">🇮🇳</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            India's Technology Future
            <br />
            <span className="gradient-text">Starts Here</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Join millions of Indians who trust ARIA to guide their most important technology decisions.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView("onboarding")}
            className="px-10 py-5 rounded-2xl btn-primary text-white font-bold text-xl flex items-center gap-3 mx-auto"
          >
            <Brain className="w-6 h-6" />
            Talk to ARIA Now
            <ArrowRight className="w-6 h-6" />
          </motion.button>

          <p className="mt-6 text-gray-500 text-sm">Free • No registration required • Instant recommendations</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-violet-400" />
          <span className="font-bold gradient-text">BharatTech AI</span>
        </div>
        <p className="text-gray-500 text-sm">
          🇮🇳 Proudly built for India's 1.4 billion people • Jai Hind
        </p>
      </footer>
    </div>
  );
}
