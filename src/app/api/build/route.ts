import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { buildRecommendations } from "@/db/schema";
import { generatePCBuild, generateLaptopRecommendations, type UserProfile } from "@/lib/ai-engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const profile: UserProfile = body.profile;
    const buildType: "pc" | "laptop" = body.buildType || "pc";

    if (!profile) {
      return NextResponse.json({ error: "Profile is required" }, { status: 400 });
    }

    if (buildType === "laptop") {
      const laptops = generateLaptopRecommendations(profile);
      return NextResponse.json({ laptops, buildType: "laptop" });
    }

    const build = generatePCBuild(profile);

    // Store recommendation
    try {
      await db.insert(buildRecommendations).values({
        sessionId: body.sessionId || "anonymous",
        userType: profile.occupation || "general",
        budget: profile.budget || 0,
        useCase: profile.primaryUseCase || "general",
        recommendedBuild: build as unknown as Record<string, unknown>,
        aiExplanation: build.aiInsight,
        futureProofScore: build.futureProofScore,
        valueScore: build.valueScore,
      });
    } catch {
      // Non-critical — continue even if DB save fails
    }

    return NextResponse.json({ build, buildType: "pc" });
  } catch (error) {
    console.error("Build API error:", error);
    return NextResponse.json({ error: "Failed to generate recommendation" }, { status: 500 });
  }
}
