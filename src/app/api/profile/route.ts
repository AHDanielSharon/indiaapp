import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { userProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, profile } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    const existing = await db.select().from(userProfiles).where(eq(userProfiles.sessionId, sessionId)).limit(1);

    if (existing.length > 0) {
      await db.update(userProfiles)
        .set({
          name: profile.name,
          age: profile.age,
          city: profile.city,
          state: profile.state,
          occupation: profile.occupation,
          engineeringBranch: profile.engineeringBranch,
          interests: profile.interests,
          budget: profile.budget,
          primaryUseCase: profile.primaryUseCase,
          currentDevice: profile.currentDevice,
          internetSpeed: profile.internetSpeed,
          electricityStability: profile.electricityStability,
          gamingGenres: profile.gamingGenres,
          creativeWork: profile.creativeWork,
          aiMlInterest: profile.aiMlInterest,
          startupGoals: profile.startupGoals,
        })
        .where(eq(userProfiles.sessionId, sessionId));
    } else {
      await db.insert(userProfiles).values({
        sessionId,
        ...profile,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Profile API error:", error);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
