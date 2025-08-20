// enums

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
  | "СОНИРХОЛГҮЙ"
  | "ИЧСЭН";
 
export type CalendarType = "DONE" | "GOAL" | "REMINDER";
 
 
export type User = {
  id: number;
  email: string;
  password: string;
  username: string;
  birthday?: Date;
 
  diaryNotes: DiaryNote[];
  progress?: Progress;
 
  createdAt: Date;
  updatedAt: Date;
}
 
 
export type DiaryNote = {
  id: number;
  userId: number;
  user: User;
  note: string;
  analysis?: AiAnalysis;
  createdAt: Date;
  updatedAt: Date;
}
 
// AiAnalysis
export type AiAnalysis = {
  id: number;
  diaryNoteId: number;
  diaryNote: DiaryNote;
 
  summary: string;
  emotions: EmotionCategory[];
  horoscope: string;
  message: string;
 
  calendarTasks: string[];
  calendarHighlight: string;
  calendarDate: Date;
  calendarType: CalendarType;
 
  createdAt: Date;
  updatedAt: Date;
}
 
 
export type Progress = {
  id: number;
  userId: number;
  user: User;
  streakCount: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}