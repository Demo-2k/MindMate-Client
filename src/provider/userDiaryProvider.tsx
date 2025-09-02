"use client";

import Loading from "@/components/loading";
import { DiaryNote } from "@/types";
import axios from "axios";
import { UserContext } from "@/provider/userProvider";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type userDiariesProviderType = {
  diaries: DiaryNote[];
  fetchDiary: (showLoading?: boolean) => Promise<void>;
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

  const fetchDiary = async (showLoading = true) => {
    if (!userProvider?.id) return;

    if (showLoading) setLoading(true); // ✅ зөвхөн showLoading үед асаана
    try {
      const response = await axios.get<DiaryNote[]>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/getAllDiaryNotes/${userProvider?.id}`
      );
      setDiaries(response.data);
    } catch (error) {
      toast.error("Error fetching diary notes");
      console.error(error);
    } finally {
      if (showLoading) setLoading(false); // ✅ зөвхөн showLoading үед унтраана
    }
  };

  useEffect(() => {
    fetchDiary();
  }, [userProvider?.id, userLoading]);

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
