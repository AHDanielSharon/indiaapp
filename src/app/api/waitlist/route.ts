import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { waitlist } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, city, interest } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await db.insert(waitlist).values({ email, name, city, interest }).onConflictDoNothing();

    return NextResponse.json({ success: true, message: "You're on the waitlist! 🚀" });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }
}
