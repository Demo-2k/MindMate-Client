// src/types/index.ts

import { JsonWebKeyInput } from "node:crypto";
import { number } from "zod";
import { AiAnalysis, AiInsight } from "./aiAnalyze";

export type EmotionCategory =
  | "БАЯРТАЙ"
  | "ГУНИГТАЙ"
  | "СТРЕССТЭЙ"
  | "УРАМ_ЗОРИГТОЙ"
  | "ХӨӨРСӨН"
  | "ТАЙВАН"
  | "САНАА_ЗОВСОН"
  | "УУРТАЙ"
  | "ГАНЦААРДСАН"
  | "ЭНЕРГИ_ДҮҮРЭН"
  | "СОНИРХОЛГҮЙ";

export type CalendarType = "DONE" | "GOAL" | "REMINDER";

export type User = {
  id: number;
  email: string;
  password: string;
  username: string;
  birthday?: Date;
  themeUrl: string;

  diaryNotes: DiaryNote[];
  progress?: Progress;
  achievements: AchievementType[];

  totalStreaks: number;
  totalPoints: number;

  createdAt: Date;
  updatedAt: Date;
};

export type DiaryNote = {
  id: number;
  userId: number;
  user: User;
  note: string;
  analysis?: AiAnalysis;
  aiInsight?: AiInsight;
  createdAt: Date;
  updatedAt: Date;
};

export type Progress = {
  id: number;
  userId: number;
  user: User;
  streakCount: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
};

export type AchievementType = {
  id: number;
  achId: string;
  title: string;
  desc: string;
  userId: number;
  createdAt: Date;
};

export type Diary = {
  id: number;
  userId: number;
  note: string;
  createdAt: string;
  updatedAt: string;
};
