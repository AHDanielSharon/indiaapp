"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Laptop, Star, CheckCircle, XCircle, ArrowLeft, Brain,
  Zap, Shield, RefreshCw, ChevronDown, ChevronUp, Sparkles, RotateCcw,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import ARIAAssistant from "@/components/ARIAAssistant";
import { cn } from "@/lib/utils";
import type { LaptopRecommendation } from "@/lib/ai-engine";

interface LaptopCardProps {
  laptop: LaptopRecommendation;
  index: number;
  isRecommended: boolean;
}

function LaptopCard({ laptop, index, isRecommended }: LaptopCardProps) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className={cn(
        "rounded-3xl border overflow-hidden transition-all",
        isRecommended
          ? "border-violet-500/40 bg-gradient-to-br from-violet-900/30 to-purple-900/30"
          : "border-white/10 card-glass"
      )}
    >
      {isRecommended && (
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm font-bold text-white">🏆 ARIA's Top Pick for You</span>
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-violet-400 font-semibold uppercase tracking-wider">{laptop.title}</span>
            </div>
            <h3 className="text-xl font-black text-white">{laptop.brand}</h3>
            <p className="text-sm text-gray-400">{laptop.model}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-gray-500 mb-0.5">Starting from</p>
            <p className="text-2xl font-black gradient-text">
              ₹{laptop.price.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Score badges */}
        <div className="flex gap-3 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/25">
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs font-semibold text-violet-300">{laptop.futureProofScore}% Future-Proof</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/25">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-300">{laptop.valueScore}% Value</span>
          </div>
        </div>

        {/* Why perfect */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-4">
          <p className="text-sm text-gray-300 leading-relaxed">{laptop.whyPerfect}</p>
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors w-full"
        >
          <span>{expanded ? "Hide" : "Show"} full specifications</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-4">
                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(laptop.specs).map(([key, value]) => (
                    <div key={key} className="p-2 rounded-lg bg-white/5">
                      <p className="text-xs text-gray-500 uppercase">{key}</p>
                      <p className="text-sm text-white font-medium mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Best For */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Best For</p>
                  <div className="flex flex-wrap gap-2">
                    {laptop.bestFor.map((item) => (
                      <div key={item} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span className="text-xs text-emerald-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Limitations */}
                {laptop.limitations.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Limitations</p>
                    <div className="flex flex-wrap gap-2">
                      {laptop.limitations.map((item) => (
                        <div key={item} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                          <XCircle className="w-3 h-3 text-amber-400" />
                          <span className="text-xs text-amber-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Insight */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-violet-900/30 to-purple-900/30 border border-violet-500/15">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-semibold text-violet-400">ARIA's Insight</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{laptop.aiInsight}</p>
                </div>

                {/* Buy Links */}
                <div className="flex gap-3">
                  <a
                    href={`https://www.amazon.in/s?k=${encodeURIComponent(laptop.brand + " " + laptop.model)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-semibold text-center hover:bg-amber-500/30 transition-colors"
                  >
                    🛒 Amazon.in
                  </a>
                  <a
                    href={`https://www.flipkart.com/search?q=${encodeURIComponent(laptop.brand + " " + laptop.model)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold text-center hover:bg-blue-500/30 transition-colors"
                  >
                    🛒 Flipkart
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function LaptopResult() {
  const { laptops, profile, setView, setOnboardingStep, setBuildType } = useAppStore();

  const ariaMessage = laptops.length > 0
    ? `${profile.name ? `${profile.name}, ` : ""}I've analyzed the Indian laptop market specifically for your needs and budget of ₹${profile.budget?.toLocaleString("en-IN") || "—"}. Here are my top recommendations, ranked by how well they match your profile. The first option is my strongest recommendation. Remember — buy from authorized sellers only to ensure genuine warranty support across India!`
    : "Loading your laptop recommendations...";

  const handleRestart = () => {
    setOnboardingStep(0);
    setBuildType("pc");
    setView("onboarding");
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 data-grid opacity-20" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-4 py-2 rounded-xl btn-secondary text-sm text-gray-300"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <Laptop className="w-5 h-5 text-violet-400" />
            <span className="font-bold gradient-text">Laptop Guide</span>
          </div>
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-4 py-2 rounded-xl btn-secondary text-sm text-gray-300"
          >
            <RotateCcw className="w-4 h-4" /> Restart
          </button>
        </motion.div>

        {/* ARIA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <ARIAAssistant message={ariaMessage} autoSpeak={true} />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-medium text-amber-400 uppercase tracking-wider">AI-Curated Selection</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Your <span className="gradient-text">Perfect Laptops</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {laptops.length} recommendations, optimized for your profile
          </p>
        </motion.div>

        {/* Laptop Cards */}
        <div className="space-y-5">
          {laptops.map((laptop, i) => (
            <LaptopCard key={i} laptop={laptop} index={i} isRecommended={i === 0} />
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <p className="font-semibold text-white text-sm mb-1">Want more power per rupee?</p>
              <p className="text-sm text-gray-400">
                A desktop PC gives 40-60% more performance than a laptop at the same price. 
                If you don't need portability, consider building a desktop!
              </p>
              <button
                onClick={() => { setBuildType("pc"); setView("onboarding"); setOnboardingStep(3); }}
                className="mt-3 px-4 py-2 rounded-xl btn-primary text-white text-sm font-semibold flex items-center gap-2 w-fit"
              >
                <Zap className="w-4 h-4" />
                Build a Desktop Instead
              </button>
            </div>
          </div>
        </motion.div>

        {/* Restart */}
        <div className="mt-6 text-center">
          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-xl btn-secondary text-gray-300 text-sm font-medium flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Start Over with New Profile
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-600">
          <p>🇮🇳 BharatTech AI — India's most intelligent technology companion</p>
        </div>
      </div>
    </div>
  );
}
