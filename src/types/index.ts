// src/types/index.ts

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
};

export type DiaryNote = {
  id: number;
  userId: number;
  user: User;
  note: string;
  analysis?: AiAnalysis;
  createdAt: Date;
  updatedAt: Date;
};

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

export type Progress = {
  id: number;
  userId: number;
  user: User;
  streakCount: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Diary = {
  id: number;
  userId: number;
  note: string;
  createdAt: string;
  updatedAt: string;
};

//  "createDiary": {
//         "id": 47,
//         "userId": 1,
//         "note": "Хажуунаас ямар нэгэн санаа гаргаад алдаа дутагдал засах юу байна сайжруулах юм байна гээд санал хүсэлт хэлэх хүн байхгүй болохоор бүр хийж байгаа юмандаа эргэлзээд бүр нэг л бишээ. Сүүлдээ бүр хэтэрхий их бодоод хаанаас яаж эхэлхээч мэдэхээ байлаа бүр",
//         "createdAt": "2025-08-22T08:53:05.736Z",
//         "updatedAt": "2025-08-22T08:53:05.736Z"
//     }
