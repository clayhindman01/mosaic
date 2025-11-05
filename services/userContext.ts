import React, { createContext, useContext } from "react";
import { UserContextType } from "../types/UserType";

export const userContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};