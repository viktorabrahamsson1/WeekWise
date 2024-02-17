import React, { useContext } from "react";

import useAuthData from "../hooks/useAuth";

type AppContext = {
  isLoading: boolean;
  isLoggedIn: boolean;
  userInfo: {
    userId: string;
    userRole: string;
    firstName: string;
    lastName: string;
    email: string;
    isVerified: boolean;
  };
};

type AppContextProviderProps = {
  children: React.ReactNode;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const { userInfo, isLoading, isLoggedIn } = useAuthData();

  return (
    <AppContext.Provider
      value={{
        userInfo,
        isLoading,
        isLoggedIn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a appcontextProvider");
  }
  return context as AppContext;
};
