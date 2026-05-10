"use client";

import { useAppStore } from "@/store/useAppStore";
import LandingPage from "@/components/LandingPage";
import OnboardingFlow from "@/components/OnboardingFlow";
import Dashboard from "@/components/Dashboard";
import BuildResult from "@/components/BuildResult";
import LaptopResult from "@/components/LaptopResult";
import FloatingARIA from "@/components/FloatingARIA";

export default function Home() {
  const { currentView } = useAppStore();

  return (
    <>
      {(() => {
        switch (currentView) {
          case "landing":
            return <LandingPage />;
          case "onboarding":
            return <OnboardingFlow />;
          case "dashboard":
            return <Dashboard />;
          case "build-result":
            return <BuildResult />;
          case "laptop-result":
            return <LaptopResult />;
          default:
            return <LandingPage />;
        }
      })()}
      <FloatingARIA />
    </>
  );
}
