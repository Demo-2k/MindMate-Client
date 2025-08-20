export interface Analysis {
  calendarDate: string;
  calendarHighlight: string;
  calendarTasks: string[];
  calendarType: string;
  diaryNoteId: number;
  emotions: string[];
  horoscope: string;
  id: number;
  message: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiaryNote {
  id: number;
  userId: number;
  note: string;
  createdAt: string | Date;
  updatedAt: string | Date;

  avatar?: string;
  time?: string;
  likes?: number;
  replies?: number;

  analysis?: Analysis;
}
