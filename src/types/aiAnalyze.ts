import { CalendarType, DiaryNote, EmotionCategory } from ".";

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
};

export type AiInsight = {
  id:number,
  diaryNoteId:number,
  diaryNote:DiaryNote,
  mood_caption:string,
  fun_fact:string,
  highlight:string,
  achievements:AchievementsType[],
  tldr:string,
  moodChallenge: moodChallengeType
}

type AchievementsType ={
    id :string,
    desc:string,
    title:string
}

type moodChallengeType ={
    title:string,
    shareStyle:string,
    description:string
}