"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu, Zap, Shield, TrendingUp, Clock, AlertTriangle, CheckCircle,
  ArrowLeft, RefreshCw, Download, Share2, Gamepad2, Battery, Thermometer,
  ChevronDown, ChevronUp, Star, Brain, Sparkles, RotateCcw,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import ARIAAssistant from "@/components/ARIAAssistant";
import { cn } from "@/lib/utils";
import type { PCComponent } from "@/lib/ai-engine";

interface ScoreBarProps {
  label: string;
  value: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

function ScoreBar({ label, value, color, icon: Icon }: ScoreBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-sm text-gray-300">{label}</span>
        </div>
        <span className={`text-sm font-bold ${color}`}>{value}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className={`h-full rounded-full bg-gradient-to-r ${
            value >= 85 ? "from-emerald-500 to-teal-400" :
            value >= 70 ? "from-blue-500 to-cyan-400" :
            "from-amber-500 to-orange-400"
          }`}
        />
      </div>
    </div>
  );
}

interface ComponentCardProps {
  component: PCComponent;
  category: string;
}

function ComponentCard({ component, category }: ComponentCardProps) {
  const [expanded, setExpanded] = useState(false);

  const categoryIcons: Record<string, string> = {
    cpu: "🧠", gpu: "🎮", ram: "💾", storage: "💿", motherboard: "⚡",
    psu: "🔋", cooling: "❄️", cabinet: "🖥️",
  };

  const categoryColors: Record<string, string> = {
    cpu: "from-blue-600 to-cyan-600",
    gpu: "from-purple-600 to-pink-600",
    ram: "from-emerald-600 to-teal-600",
    storage: "from-amber-600 to-orange-600",
    motherboard: "from-red-600 to-pink-600",
    psu: "from-yellow-600 to-amber-600",
    cooling: "from-cyan-600 to-blue-600",
    cabinet: "from-slate-600 to-gray-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl card-glass neon-border hover:border-violet-500/30 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryColors[category] || "from-gray-600 to-gray-700"} flex items-center justify-center flex-shrink-0 text-xl`}>
          {categoryIcons[category] || "🔧"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{component.name}</p>
              <h4 className="font-bold text-white text-sm leading-tight">{component.model}</h4>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-sm font-black text-emerald-400">
                ₹{component.price.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400" />
              <span className="text-xs text-gray-400">{component.futureProof}% future-proof</span>
            </div>
            <span className="text-gray-600">•</span>
            <span className="text-xs text-gray-400">{component.brand}</span>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 mt-2 text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            {expanded ? "Less" : "Why this?"}
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-gray-300 leading-relaxed">{component.whyChosen}</p>
                  <p className="text-xs text-gray-500">{component.specs}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function BuildResult() {
  const { pcBuild, profile, setView, setOnboardingStep, setBuildType } = useAppStore();
  const [activeTab, setActiveTab] = useState<"overview" | "components" | "gaming" | "future">("overview");

  const ariaMessage = pcBuild
    ? `${profile.name ? `${profile.name},` : ""} I've completed your personalized analysis! ${pcBuild.aiInsight} Your future-proof score is ${pcBuild.futureProofScore}% — which means this system will remain relevant and powerful for approximately ${pcBuild.estimatedLifespan} years in the Indian market.`
    : "Processing your recommendation...";

  const handleRestart = () => {
    setOnboardingStep(0);
    setBuildType("pc");
    setView("onboarding");
  };

  if (!pcBuild) {
    return (
      <div className="min-h-screen bg-[#050510] flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-violet-400 mx-auto mb-4 animate-spin" />
          <p className="text-gray-400">Loading your recommendation...</p>
        </div>
      </div>
    );
  }

  const components = [
    { key: "cpu", comp: pcBuild.cpu },
    { key: "gpu", comp: pcBuild.gpu },
    { key: "ram", comp: pcBuild.ram },
    { key: "storage", comp: pcBuild.storage },
    { key: "motherboard", comp: pcBuild.motherboard },
    { key: "psu", comp: pcBuild.psu },
    { key: "cooling", comp: pcBuild.cooling },
    { key: "cabinet", comp: pcBuild.cabinet },
  ].filter((c) => c.comp) as { key: string; comp: PCComponent }[];

  return (
    <div className="min-h-screen bg-[#050510] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 data-grid opacity-20" />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">
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
            <Brain className="w-5 h-5 text-violet-400" />
            <span className="font-bold gradient-text">BharatTech AI</span>
          </div>
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-4 py-2 rounded-xl btn-secondary text-sm text-gray-300"
          >
            <RotateCcw className="w-4 h-4" /> Restart
          </button>
        </motion.div>

        {/* ARIA Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <ARIAAssistant message={ariaMessage} autoSpeak={true} />
        </motion.div>

        {/* Build Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-3xl bg-gradient-to-br from-violet-900/40 to-purple-900/40 border border-violet-500/20 mb-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium text-amber-400 uppercase tracking-wider">AI Recommendation</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mb-1">{pcBuild.title}</h1>
              <p className="text-gray-400 text-sm">{pcBuild.tagline}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-gray-500 mb-1">Total Build Cost</p>
              <p className="text-3xl font-black gradient-text">
                ₹{pcBuild.totalCost.toLocaleString("en-IN")}
              </p>
              {profile.budget && (
                <p className="text-xs text-gray-500 mt-1">
                  {pcBuild.totalCost <= profile.budget ? "✅ Within budget" : `⚠️ ₹${(pcBuild.totalCost - profile.budget).toLocaleString("en-IN")} over budget`}
                </p>
              )}
            </div>
          </div>

          {/* Score Grid */}
          <div className="grid grid-cols-4 gap-3 mt-6">
            {[
              { label: "Future-Proof", value: pcBuild.futureProofScore, color: "text-violet-400", emoji: "🚀" },
              { label: "Value", value: pcBuild.valueScore, color: "text-emerald-400", emoji: "💚" },
              { label: "Performance", value: pcBuild.performanceScore, color: "text-cyan-400", emoji: "⚡" },
              { label: "Thermals", value: pcBuild.thermalScore, color: "text-amber-400", emoji: "❄️" },
            ].map((score) => (
              <div key={score.label} className="text-center p-3 rounded-2xl bg-white/5">
                <div className="text-xl mb-1">{score.emoji}</div>
                <div className={`text-2xl font-black ${score.color}`}>{score.value}%</div>
                <div className="text-xs text-gray-500 mt-0.5">{score.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: Brain },
            { id: "components", label: "Components", icon: Cpu },
            { id: "gaming", label: "Gaming FPS", icon: Gamepad2 },
            { id: "future", label: "Future Plan", icon: TrendingUp },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0",
                activeTab === tab.id
                  ? "bg-violet-600 text-white glow-purple"
                  : "btn-secondary text-gray-400"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Score Bars */}
              <div className="p-6 rounded-2xl card-glass neon-border space-y-4">
                <h3 className="font-bold text-white">Performance Analysis</h3>
                <ScoreBar label="Future-Proof Score" value={pcBuild.futureProofScore} color="text-violet-400" icon={Zap} />
                <ScoreBar label="Value for Money" value={pcBuild.valueScore} color="text-emerald-400" icon={Shield} />
                <ScoreBar label="Raw Performance" value={pcBuild.performanceScore} color="text-cyan-400" icon={TrendingUp} />
                <ScoreBar label="Thermal Efficiency" value={pcBuild.thermalScore} color="text-amber-400" icon={Thermometer} />
              </div>

              {/* Power & Cost */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl card-glass neon-border">
                  <Battery className="w-6 h-6 text-amber-400 mb-2" />
                  <p className="text-xs text-gray-400 mb-1">Power Consumption</p>
                  <p className="text-xl font-black text-amber-400">{pcBuild.powerConsumption}W</p>
                  <p className="text-xs text-gray-500 mt-1">Under full load</p>
                </div>
                <div className="p-4 rounded-2xl card-glass neon-border">
                  <Zap className="w-6 h-6 text-emerald-400 mb-2" />
                  <p className="text-xs text-gray-400 mb-1">Monthly Electricity</p>
                  <p className="text-xl font-black text-emerald-400">₹{pcBuild.monthlyElectricityCost}</p>
                  <p className="text-xs text-gray-500 mt-1">~8hrs/day usage</p>
                </div>
              </div>

              {/* Strengths & Bottlenecks */}
              <div className="grid md:grid-cols-2 gap-4">
                {pcBuild.strengths.length > 0 && (
                  <div className="p-4 rounded-2xl bg-emerald-900/20 border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-semibold text-emerald-400 text-sm">Strengths</h4>
                    </div>
                    <ul className="space-y-2">
                      {pcBuild.strengths.map((s, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">✓</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {pcBuild.bottlenecks.length > 0 && (
                  <div className="p-4 rounded-2xl bg-amber-900/20 border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <h4 className="font-semibold text-amber-400 text-sm">Watch Out For</h4>
                    </div>
                    <ul className="space-y-2">
                      {pcBuild.bottlenecks.map((b, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">⚠</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* AI Insight Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-900/30 to-purple-900/30 border border-violet-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-5 h-5 text-violet-400" />
                  <span className="font-semibold text-violet-400">ARIA's Deep Insight</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{pcBuild.aiInsight}</p>
              </div>
            </motion.div>
          )}

          {activeTab === "components" && (
            <motion.div
              key="components"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 mb-4">
                <span className="text-sm text-gray-300">Total Component Cost</span>
                <span className="text-lg font-black gradient-text">₹{pcBuild.totalCost.toLocaleString("en-IN")}</span>
              </div>
              {components.map(({ key, comp }) => (
                <ComponentCard key={key} component={comp} category={key} />
              ))}
              <div className="p-4 rounded-2xl bg-blue-900/20 border border-blue-500/20 mt-4">
                <p className="text-sm text-blue-300">
                  💡 <strong>Shopping Tip:</strong> Compare prices on Amazon.in, Flipkart, and MD Computers. 
                  Prices fluctuate 5-15% weekly in India. Best deals often during Republic Day and Diwali sales!
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "gaming" && (
            <motion.div
              key="gaming"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {Object.keys(pcBuild.gamingFps || {}).length > 0 ? (
                <>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-4">
                      <Gamepad2 className="w-5 h-5 text-purple-400" />
                      <h3 className="font-bold text-white">Estimated Gaming FPS (1080p)</h3>
                    </div>
                    <div className="space-y-4">
                      {Object.entries(pcBuild.gamingFps || {}).map(([game, fps]) => (
                        <div key={game}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-300">{game}</span>
                            <span className={cn(
                              "text-sm font-bold",
                              fps >= 144 ? "text-emerald-400" : fps >= 60 ? "text-cyan-400" : "text-amber-400"
                            )}>
                              {fps} FPS
                            </span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(100, (fps / 240) * 100)}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={cn(
                                "h-full rounded-full",
                                fps >= 144 ? "bg-gradient-to-r from-emerald-500 to-teal-400" :
                                fps >= 60 ? "bg-gradient-to-r from-cyan-500 to-blue-400" :
                                "bg-gradient-to-r from-amber-500 to-orange-400"
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      * FPS estimates are approximate and may vary based on game settings, drivers, and system optimization. 
                      DLSS/FSR can significantly boost FPS in supported titles.
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Gamepad2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Gaming FPS data not available for this build configuration.</p>
                  <p className="text-sm text-gray-500 mt-2">This build is optimized for professional workloads.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "future" && (
            <motion.div
              key="future"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Lifespan */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-500/20">
                <Clock className="w-8 h-8 text-emerald-400 mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">
                  System Lifespan: ~{pcBuild.estimatedLifespan} Years
                </h3>
                <p className="text-sm text-gray-400">
                  Based on current technology trajectory and Indian software ecosystem requirements, 
                  this build will remain competitive until approximately {new Date().getFullYear() + pcBuild.estimatedLifespan}.
                </p>
              </div>

              {/* Upgrade Timeline */}
              <div className="p-5 rounded-2xl card-glass neon-border">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-white">Smart Upgrade Timeline</h3>
                </div>
                <div className="space-y-3">
                  {pcBuild.upgradeTimeline.split("|").map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-violet-400 font-bold">{i + 1}</span>
                      </div>
                      <p className="text-sm text-gray-300">{step.trim()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* India Tech Growth */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <h3 className="font-bold text-white">India Tech Growth Insight</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>🇮🇳 India's gaming market growing at 28% CAGR — your setup is positioned perfectly.</p>
                  <p>🧠 AI/ML adoption in Indian industry is accelerating — CUDA cores will be invaluable.</p>
                  <p>📈 Indian creator economy projected to reach $480B — content creation tools are critical.</p>
                  <p>🚀 India's startup ecosystem is world's 3rd largest — your workstation matches the ambition.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={handleRestart}
            className="flex-1 py-4 rounded-2xl btn-secondary text-white font-semibold flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Different Build
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 py-4 rounded-2xl btn-primary text-white font-bold flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Save Recommendation
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: "My BharatTech AI Build", url: window.location.href });
              }
            }}
            className="px-6 py-4 rounded-2xl btn-secondary text-white font-semibold flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-600">
          <p>🇮🇳 BharatTech AI — India's most intelligent technology companion</p>
        </div>
      </div>
    </div>
  );
}
