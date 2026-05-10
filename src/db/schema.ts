import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  varchar,
} from "drizzle-orm/pg-core";

export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).notNull().unique(),
  userProfile: jsonb("user_profile"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const buildRecommendations = pgTable("build_recommendations", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }),
  userType: varchar("user_type", { length: 100 }),
  budget: integer("budget"),
  useCase: text("use_case"),
  recommendedBuild: jsonb("recommended_build"),
  aiExplanation: text("ai_explanation"),
  futureProofScore: integer("future_proof_score"),
  valueScore: integer("value_score"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).unique(),
  name: text("name"),
  age: integer("age"),
  city: text("city"),
  state: text("state"),
  occupation: text("occupation"),
  engineeringBranch: text("engineering_branch"),
  interests: jsonb("interests"),
  budget: integer("budget"),
  primaryUseCase: text("primary_use_case"),
  currentDevice: text("current_device"),
  internetSpeed: text("internet_speed"),
  electricityStability: text("electricity_stability"),
  gamingGenres: jsonb("gaming_genres"),
  creativeWork: jsonb("creative_work"),
  aiMlInterest: boolean("ai_ml_interest").default(false),
  startupGoals: text("startup_goals"),
  preferredLanguage: varchar("preferred_language", { length: 50 }).default("en"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 255 }),
  role: varchar("role", { length: 20 }),
  content: text("content"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: text("email").unique(),
  name: text("name"),
  city: text("city"),
  interest: text("interest"),
  createdAt: timestamp("created_at").defaultNow(),
});
