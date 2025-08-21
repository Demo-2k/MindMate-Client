"use client";

import Loading from "@/lib/loading";
import { DiaryNote } from "@/types";
import axios from "axios";
import { UserContext } from "@/provider/userProvider";
import { createContext, useContext, useEffect, useState } from "react";
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
  const { userProvider } = useContext(UserContext);

  const fetchDiary = async () => {
    if (!userProvider?.id) return; 

    setLoading(true);
    try {
      const response = await axios.get<DiaryNote[]>(
        `http://localhost:4001/ai/getAllDiaryNotes/${userProvider.id}`
      );
      console.log("res:", response.data);
      setDiaries(response.data);
    } catch (error) {
      toast.error("Error fetching diary notes");
      console.error(error);
    } finally {
      setLoading(false); // 
    }
  };

  useEffect(() => {
    fetchDiary();
  }, [userProvider]); 

  if (loading) return <Loading />;

  return (
    <userDiaryContext.Provider value={{ diaries }}>
      {children}
    </userDiaryContext.Provider>
  );
}
