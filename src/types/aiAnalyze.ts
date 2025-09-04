import { CalendarType, DiaryNote, EmotionCategory } from ".";

export type AiAnalysis = {
  id: number;
  diaryNoteId: number;
  diaryNote: DiaryNote;

  summary: string;
  emotions: EmotionCategory[];
  topics: string[];
  moodAction: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AiInsight = {
  id: number;
  diaryNoteId: number;
  diaryNote: DiaryNote;

  mood_caption: string;
  fun_fact: string;
  achievements: AchievementsType[];
};

export type AchievementsType = {
  id: string;
  desc: string;
  title: string;
};
