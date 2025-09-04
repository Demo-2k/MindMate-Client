"use client";

import { User } from "@/types";
import axios from "axios";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type userContextType = {
  userProvider: User | null;
  loading: boolean;
  getCurrentUserByAccessToken: () => void;
  setUserProvider: Dispatch<SetStateAction<User | null>>;
};

export const UserContext = createContext({} as userContextType);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userProvider, setUserProvider] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUserByAccessToken = async () => {
    const token = localStorage.getItem("token") as string;

    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/get-current-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserProvider(response?.data?.user || null);
    } catch (error) {
      setUserProvider(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUserByAccessToken();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userProvider,
        loading,
        getCurrentUserByAccessToken,
        setUserProvider,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
