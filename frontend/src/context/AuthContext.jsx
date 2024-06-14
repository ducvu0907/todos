import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(localStorage.getItem("user" || null));

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>
    {children}
  </AuthContext.Provider>
}