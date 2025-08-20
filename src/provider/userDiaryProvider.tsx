"use client";

import Loading from "@/lib/loading";
import { DiaryNote } from "@/types";
import axios from "axios";

import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

type userDiariesProviderType = {
  diaries: DiaryNote[];
};

export const userDiaryContext = createContext<userDiariesProviderType>(
  {} as userDiariesProviderType
);

export default function UserDiaryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [diaries, setDiaries] = useState<DiaryNote[]>([]);

  const fetchDiary = async () => {
    setLoading(true);
    axios
      .get<DiaryNote[]>(`http://localhost:4001/ai/getAllDiaryNotes/1`)
      .then((response) => {
        console.log("res:", response.data);

        setDiaries(response.data);
      })
      .catch((error) => {
        toast.error("Error");
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };

  useEffect(() => {
    fetchDiary();
  }, []);

  if (loading) return <Loading />;

  return (
    <userDiaryContext.Provider value={{ diaries }}>
      {children}
    </userDiaryContext.Provider>
  );
}
