"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Brain, Cpu, Laptop, Gamepad2,
  Code2, Camera, Rocket, Users, MapPin, Zap, ChevronRight,
  Monitor, Wifi, Battery, TrendingUp, Sparkles
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import ARIAAssistant from "@/components/ARIAAssistant";
import { cn } from "@/lib/utils";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
}

// Step 1: Welcome & Name
function StepWelcome({ onNext }: StepProps) {
  const { profile, updateProfile } = useAppStore();
  const [name, setName] = useState(profile.name || "");
  const [city, setCity] = useState(profile.city || "");

  const indianCities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Surat", "Kanpur",
    "Nagpur", "Indore", "Bhopal", "Patna", "Vadodara", "Coimbatore",
    "Mysore", "Ranchi", "Visakhapatnam", "Other"
  ];

  const handleNext = () => {
    updateProfile({ name, city });
    onNext();
  };

  return (
    <div className="space-y-6">
      <ARIAAssistant
        message={`Namaste! 🙏 Welcome to BharatTech AI. I'm ARIA — your personal AI technology companion. I'm going to ask you a few questions to understand your needs perfectly. This takes about 2 minutes and will completely transform how you think about technology. Let's start — what's your name?`}
        autoSpeak={true}
      />

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            👤 What's your name?
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            📍 Which city are you from?
          </label>
          <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
            {indianCities.map((c) => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all text-left",
                  city === c
                    ? "bg-violet-600 text-white border border-violet-500"
                    : "btn-secondary text-gray-300"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!name}
        className="w-full py-4 rounded-2xl btn-primary text-white font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-40"
      >
        <span>Let's Begin{name ? `, ${name}!` : "!"}</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// Step 2: Who are you?
function StepIdentity({ onNext, onBack }: StepProps) {
  const { profile, updateProfile } = useAppStore();
  const [selected, setSelected] = useState(profile.occupation || "");
  const [branch, setBranch] = useState(profile.engineeringBranch || "");

  const occupations = [
    { id: "student-engineering", label: "Engineering Student", icon: Code2, color: "from-blue-600 to-cyan-600", desc: "B.Tech / M.Tech" },
    { id: "student-general", label: "College Student", icon: Users, color: "from-violet-600 to-purple-600", desc: "Any stream" },
    { id: "gamer", label: "Gamer", icon: Gamepad2, color: "from-pink-600 to-rose-600", desc: "Casual or Pro" },
    { id: "creator", label: "Content Creator", icon: Camera, color: "from-orange-600 to-amber-600", desc: "YouTube / Reels" },
    { id: "ai-researcher", label: "AI/ML Researcher", icon: Brain, color: "from-purple-600 to-indigo-600", desc: "Research & Development" },
    { id: "startup-founder", label: "Startup Founder", icon: Rocket, color: "from-emerald-600 to-teal-600", desc: "Building something big" },
    { id: "professional", label: "Working Professional", icon: Monitor, color: "from-sky-600 to-blue-600", desc: "Remote / Office" },
    { id: "family", label: "Family Purchase", icon: Users, color: "from-rose-600 to-pink-600", desc: "For home use" },
  ];

  const engBranches = ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT", "Chemical", "Biotechnology", "Other"];

  const handleNext = () => {
    updateProfile({
      occupation: selected,
      engineeringBranch: selected.includes("engineering") ? branch : undefined,
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <ARIAAssistant
        message={`Amazing! ${profile.name ? `${profile.name}, ` : ""}to give you the most accurate recommendations, I need to understand who you are. Your profile completely changes the system I'll design for you — a gamer needs different hardware than an AI researcher!`}
        autoSpeak={true}
      />

      <div className="grid grid-cols-2 gap-3">
        {occupations.map((occ) => (
          <motion.button
            key={occ.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelected(occ.id)}
            className={cn(
              "p-4 rounded-2xl text-left transition-all border",
              selected === occ.id
                ? "border-violet-500/60 bg-violet-500/10"
                : "border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5"
            )}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${occ.color} flex items-center justify-center mb-2`}>
              <occ.icon className="w-5 h-5 text-white" />
            </div>
            <div className="font-semibold text-white text-sm">{occ.label}</div>
            <div className="text-xs text-gray-400">{occ.desc}</div>
          </motion.button>
        ))}
      </div>

      {selected.includes("engineering") && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <label className="block text-sm font-medium text-gray-300 mb-2">🎓 Your Engineering Branch</label>
          <div className="flex flex-wrap gap-2">
            {engBranches.map((b) => (
              <button
                key={b}
                onClick={() => setBranch(b)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  branch === b ? "bg-violet-600 text-white" : "btn-secondary text-gray-300"
                )}
              >
                {b}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="px-6 py-4 rounded-2xl btn-secondary text-white font-semibold flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selected}
          className="flex-1 py-4 rounded-2xl btn-primary text-white font-bold flex items-center justify-center gap-2 disabled:opacity-40"
        >
          Continue <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// Step 3: Primary Use Case
function StepUseCase({ onNext, onBack }: StepProps) {
  const { profile, updateProfile } = useAppStore();
  const [useCase, setUseCase] = useState(profile.primaryUseCase || "");
  const [interests, setInterests] = useState<string[]>(profile.interests as string[] || []);

  const useCases = [
    { id: "gaming", label: "Gaming", icon: "🎮", desc: "AAA games, esports, competitive" },
    { id: "ai-ml", label: "AI / ML", icon: "🧠", desc: "PyTorch, TensorFlow, LLMs" },
    { id: "video-editing", label: "Video Editing", icon: "🎬", desc: "YouTube, Reels, Shorts" },
    { id: "programming", label: "Programming", icon: "💻", desc: "Development, coding, DevOps" },
    { id: "3d-design", label: "3D & Design", icon: "🎨", desc: "Blender, AutoCAD, SolidWorks" },
    { id: "streaming", label: "Streaming", icon: "📡", desc: "OBS, live content creation" },
    { id: "office-work", label: "Office / Study", icon: "📚", desc: "Documents, online classes" },
    { id: "startup", label: "Startup Work", icon: "🚀", desc: "Build, code, meetings" },
  ];

  const extras = [
    "Gaming", "Video Editing", "Programming", "AI/ML", "3D Design",
    "Streaming", "Music Production", "Photography", "Trading/Finance"
  ];

  const toggleInterest = (item: string) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleNext = () => {
    updateProfile({
      primaryUseCase: useCase,
      interests,
      aiMlInterest: useCase === "ai-ml" || interests.includes("AI/ML"),
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <ARIAAssistant
        message="Excellent! Now tell me — what will you primarily use your computer for? This is the most important question. The wrong answer here leads to thousands of rupees wasted. Be honest — I'll optimize everything around your real needs!"
        autoSpeak={true}
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">🎯 Primary Use Case</label>
        <div className="grid grid-cols-2 gap-3">
          {useCases.map((uc) => (
            <motion.button
              key={uc.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => setUseCase(uc.id)}
              className={cn(
                "p-4 rounded-2xl text-left transition-all border",
                useCase === uc.id
                  ? "border-violet-500/60 bg-violet-500/10"
                  : "border-white/10 bg-white/3 hover:border-white/20"
              )}
            >
              <div className="text-2xl mb-1">{uc.icon}</div>
              <div className="font-semibold text-white text-sm">{uc.label}</div>
              <div className="text-xs text-gray-400">{uc.desc}</div>
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          ✨ Additional interests (select all that apply)
        </label>
        <div className="flex flex-wrap gap-2">
          {extras.map((item) => (
            <button
              key={item}
              onClick={() => toggleInterest(item)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                interests.includes(item) ? "bg-violet-600/80 text-white border border-violet-500" : "btn-secondary text-gray-300"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="px-6 py-4 rounded-2xl btn-secondary text-white font-semibold flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleNext}
          disabled={!useCase}
          className="flex-1 py-4 rounded-2xl btn-primary text-white font-bold flex items-center justify-center gap-2 disabled:opacity-40"
        >
          Continue <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// Step 4: Budget
function StepBudget({ onNext, onBack }: StepProps) {
  const { profile, updateProfile, setBuildType, buildType } = useAppStore();
  const [budget, setBudget] = useState(profile.budget || 60000);

  const budgetPresets = [
    { value: 25000, label: "₹25K", tag: "Entry" },
    { value: 40000, label: "₹40K", tag: "Budget" },
    { value: 60000, label: "₹60K", tag: "Mid-Range" },
    { value: 80000, label: "₹80K", tag: "Performance" },
    { value: 100000, label: "₹1L", tag: "High-End" },
    { value: 150000, label: "₹1.5L", tag: "Premium" },
    { value: 200000, label: "₹2L+", tag: "Extreme" },
  ];

  const getBudgetInsight = (b: number) => {
    if (b < 35000) return "🟡 Tight budget — I'll optimize every rupee smartly. Laptop recommended.";
    if (b < 60000) return "🟢 Good budget — strong desktop builds possible. Excellent value range.";
    if (b < 100000) return "🔵 Great budget — high-performance builds with future-proofing.";
    if (b < 150000) return "💎 Premium range — professional-grade workstations available.";
    return "🚀 Extreme budget — no compromises. Best-in-class for everything.";
  };

  const handleNext = () => {
    updateProfile({ budget });
    onNext();
  };

  return (
    <div className="space-y-6">
      <ARIAAssistant
        message={`Great! Budget is where most Indians go wrong. Too low and you'll face frustration. Too high and you'll waste money. I'll find the perfect sweet spot. Remember — in India, the best value is usually in the ₹50K-₹80K range for desktops. What's your budget?`}
        autoSpeak={true}
      />

      {/* Device Type */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">💻 Desktop PC or Laptop?</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setBuildType("pc")}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all",
              buildType === "pc" ? "border-violet-500/60 bg-violet-500/10" : "border-white/10 bg-white/3"
            )}
          >
            <Cpu className="w-8 h-8 text-cyan-400 mb-2" />
            <div className="font-bold text-white">Desktop PC</div>
            <div className="text-xs text-gray-400">More power per rupee</div>
          </button>
          <button
            onClick={() => setBuildType("laptop")}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all",
              buildType === "laptop" ? "border-violet-500/60 bg-violet-500/10" : "border-white/10 bg-white/3"
            )}
          >
            <Laptop className="w-8 h-8 text-violet-400 mb-2" />
            <div className="font-bold text-white">Laptop</div>
            <div className="text-xs text-gray-400">Portability for college</div>
          </button>
        </div>
      </div>

      {/* Budget Slider */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-300">💰 Your Budget</label>
          <span className="text-2xl font-black gradient-text">
            ₹{budget >= 100000 ? `${(budget / 100000).toFixed(1)}L` : `${(budget / 1000).toFixed(0)}K`}
          </span>
        </div>

        <input
          type="range"
          min={15000}
          max={300000}
          step={5000}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #7c3aed ${((budget - 15000) / 285000) * 100}%, #1f2937 ${((budget - 15000) / 285000) * 100}%)`,
          }}
        />

        <div className="flex flex-wrap gap-2 mt-4">
          {budgetPresets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => setBudget(preset.value)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                Math.abs(budget - preset.value) < 5000
                  ? "bg-violet-600 text-white"
                  : "btn-secondary text-gray-300"
              )}
            >
              {preset.label}
              <span className="text-xs ml-1 opacity-60">{preset.tag}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={Math.floor(budget / 10000)}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10"
        >
          <p className="text-sm text-gray-300">{getBudgetInsight(budget)}</p>
        </motion.div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="px-6 py-4 rounded-2xl btn-secondary text-white font-semibold flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-4 rounded-2xl btn-primary text-white font-bold flex items-center justify-center gap-2"
        >
          Continue <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// Step 5: Environment & Future Goals
function StepEnvironment({ onNext, onBack }: StepProps) {
  const { profile, updateProfile } = useAppStore();
  const [electricity, setElectricity] = useState(profile.electricityStability || "");
  const [internet, setInternet] = useState(profile.internetSpeed || "");
  const [goals, setGoals] = useState(profile.startupGoals || "");

  const electricityOptions = [
    { id: "stable", label: "Stable (City)", icon: Zap, desc: "Rare cuts, inverter not needed" },
    { id: "moderate", label: "Moderate", icon: Battery, desc: "2-4 hours cuts daily" },
    { id: "unstable", label: "Unstable (Rural)", icon: Battery, desc: "Frequent long cuts" },
  ];

  const internetOptions = [
    { id: "fiber", label: "Fiber (100+ Mbps)", desc: "Jio Fiber / ACT / Airtel" },
    { id: "broadband", label: "Broadband (20-100 Mbps)", desc: "Standard home connection" },
    { id: "mobile", label: "Mobile Data (4G)", desc: "Primary internet source" },
    { id: "slow", label: "Slow (<10 Mbps)", desc: "Limited connectivity" },
  ];

  const handleNext = () => {
    updateProfile({ electricityStability: electricity, internetSpeed: internet, startupGoals: goals });
    onNext();
  };

  return (
    <div className="space-y-6">
      <ARIAAssistant
        message="Almost done! These final details are crucial for India-specific optimization. Electricity stability affects whether I recommend a UPS. Internet speed changes cloud vs local processing recommendations. Every Indian's situation is unique!"
        autoSpeak={true}
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">⚡ Electricity Stability in Your Area</label>
        <div className="grid grid-cols-3 gap-3">
          {electricityOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setElectricity(opt.id)}
              className={cn(
                "p-3 rounded-xl border text-left transition-all",
                electricity === opt.id ? "border-violet-500/60 bg-violet-500/10" : "border-white/10 bg-white/3"
              )}
            >
              <opt.icon className="w-5 h-5 text-amber-400 mb-1.5" />
              <div className="font-medium text-white text-sm">{opt.label}</div>
              <div className="text-xs text-gray-500">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          <Wifi className="inline w-4 h-4 mr-1" />Internet Speed
        </label>
        <div className="grid grid-cols-2 gap-2">
          {internetOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setInternet(opt.id)}
              className={cn(
                "p-3 rounded-xl border text-left transition-all",
                internet === opt.id ? "border-cyan-500/60 bg-cyan-500/10" : "border-white/10 bg-white/3"
              )}
            >
              <div className="font-medium text-white text-sm">{opt.label}</div>
              <div className="text-xs text-gray-500">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <TrendingUp className="inline w-4 h-4 mr-1" />5-Year Goal (optional)
        </label>
        <textarea
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          placeholder="E.g., become a game developer, launch AI startup, work at Google, create 1M subscriber YouTube channel..."
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/60 resize-none h-24 text-sm"
        />
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="px-6 py-4 rounded-2xl btn-secondary text-white font-semibold flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-4 rounded-2xl btn-primary text-white font-bold flex items-center justify-center gap-3"
        >
          <Sparkles className="w-5 h-5" />
          Generate My AI Recommendation
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

const STEPS = [
  { title: "Welcome", subtitle: "Let's get to know you", component: StepWelcome },
  { title: "Your Identity", subtitle: "Who are you?", component: StepIdentity },
  { title: "Use Case", subtitle: "What do you need?", component: StepUseCase },
  { title: "Budget", subtitle: "How much to invest?", component: StepBudget },
  { title: "Environment", subtitle: "Your setup context", component: StepEnvironment },
];

export default function OnboardingFlow() {
  const { onboardingStep, setOnboardingStep, setView, profile, buildType, setIsLoading, setPcBuild, setLaptops, sessionId } = useAppStore();

  const handleNext = useCallback(async () => {
    if (onboardingStep < STEPS.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      // Generate recommendation
      setIsLoading(true);
      setView("dashboard");
      try {
        const res = await fetch("/api/build", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile, buildType, sessionId }),
        });
        const data = await res.json();
        if (buildType === "laptop") {
          setLaptops(data.laptops || []);
          setView("laptop-result");
        } else {
          setPcBuild(data.build);
          setView("build-result");
        }
      } catch {
        setView("build-result");
      } finally {
        setIsLoading(false);
      }
    }
  }, [onboardingStep, setOnboardingStep, setView, profile, buildType, setIsLoading, setPcBuild, setLaptops, sessionId]);

  const handleBack = useCallback(() => {
    if (onboardingStep > 0) {
      setOnboardingStep(onboardingStep - 1);
    } else {
      setView("landing");
    }
  }, [onboardingStep, setOnboardingStep, setView]);

  const CurrentStep = STEPS[onboardingStep].component;
  const progress = ((onboardingStep) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-[#050510] text-white">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 data-grid opacity-30" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setView("landing")}
            className="p-2 rounded-xl btn-secondary"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400" />
          </button>
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-violet-400" />
            <span className="font-bold gradient-text text-lg">BharatTech AI</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">
              Step {onboardingStep + 1} of {STEPS.length} — {STEPS[onboardingStep].title}
            </span>
            <span className="text-sm text-violet-400 font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-600 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex gap-1 mt-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 h-0.5 rounded-full transition-colors duration-300",
                  i <= onboardingStep ? "bg-violet-500" : "bg-white/10"
                )}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={onboardingStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-black text-white mb-1">{STEPS[onboardingStep].title}</h2>
            <p className="text-gray-400 text-sm mb-6">{STEPS[onboardingStep].subtitle}</p>
            <CurrentStep onNext={handleNext} onBack={handleBack} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
