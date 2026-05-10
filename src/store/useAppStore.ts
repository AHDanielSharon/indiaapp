"use client";

import { create } from "zustand";
import type { UserProfile, PCBuild, LaptopRecommendation } from "@/lib/ai-engine";

type AppView = "landing" | "onboarding" | "dashboard" | "build-result" | "laptop-result" | "compare";

interface AppStore {
  // Navigation
  currentView: AppView;
  setView: (view: AppView) => void;

  // Session
  sessionId: string;

  // Profile
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;

  // Onboarding
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;

  // Results
  pcBuild: PCBuild | null;
  setPcBuild: (build: PCBuild | null) => void;
  laptops: LaptopRecommendation[];
  setLaptops: (laptops: LaptopRecommendation[]) => void;

  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  ariaMessage: string;
  setAriaMessage: (msg: string) => void;
  ariaThinking: boolean;
  setAriaThinking: (thinking: boolean) => void;
  buildType: "pc" | "laptop";
  setBuildType: (type: "pc" | "laptop") => void;
}

function generateSessionId() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("bharat_session");
    if (stored) return stored;
    const id = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("bharat_session", id);
    return id;
  }
  return `sess_${Date.now()}`;
}

export const useAppStore = create<AppStore>((set) => ({
  currentView: "landing",
  setView: (view) => set({ currentView: view }),

  sessionId: generateSessionId(),

  profile: {},
  updateProfile: (updates) => set((state) => ({ profile: { ...state.profile, ...updates } })),

  onboardingStep: 0,
  setOnboardingStep: (step) => set({ onboardingStep: step }),

  pcBuild: null,
  setPcBuild: (build) => set({ pcBuild: build }),
  laptops: [],
  setLaptops: (laptops) => set({ laptops }),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  ariaMessage: "",
  setAriaMessage: (msg) => set({ ariaMessage: msg }),
  ariaThinking: false,
  setAriaThinking: (thinking) => set({ ariaThinking: thinking }),
  buildType: "pc",
  setBuildType: (type) => set({ buildType: type }),
}));
