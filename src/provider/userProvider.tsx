"use client";
 
import { User } from "@/types";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

 
 
type userContextType = {
  userProvider: User;
};
 
export const UserContext = createContext({} as userContextType);
 
export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userProvider, setUserProvider] = useState({} as User);
 
  const getCurrentUserByAccessToken = async () => {
    const token = localStorage.getItem("token") as string;
    
    
    try {
      const response = await axios.get(
        `http://localhost:4001/auth/get-current-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      setUserProvider(response?.data?.user);
    } catch (error) {
      console.log(error)
    }
  };
 
  useEffect(() => {
    getCurrentUserByAccessToken();
  }, []);
 
  return (
    <UserContext.Provider value={{ userProvider }}>
      {children}
    </UserContext.Provider>
  );
}