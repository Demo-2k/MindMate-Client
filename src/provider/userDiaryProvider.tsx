"use client";

import Loading from "@/components/loading";
import { DiaryNote } from "@/types";
import axios from "axios";
import { UserContext } from "@/provider/userProvider";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type userDiariesProviderType = {
  diaries: DiaryNote[];
  fetchDiary: () => Promise<void>;
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
  const { userProvider, loading: userLoading } = useContext(UserContext);

  const fetchDiary = async () => {
    if (!userProvider?.id) return;

    setLoading(true);
    try {
      const response = await axios.get<DiaryNote[]>(
        `http://localhost:4001/ai/getAllDiaryNotes/${userProvider.id}`
      );
      console.log("res:", response);
      setDiaries(response.data);
    } catch (error) {
      toast.error("Error fetching diary notes");
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      //
    }
  };

  useEffect(() => {
    fetchDiary();
  }, [userProvider.id, userLoading]);

  if (loading) return <Loading />;

  return (
    <userDiaryContext.Provider value={{ diaries, fetchDiary }}>
      {children}
    </userDiaryContext.Provider>
  );
}

// const obj1 = {
//   name: "bold",
// };

// const obj2 = {
//   name: "bold",
// };

// [obj1, obj2]
