import React, { useContext } from "react";

import useContextData from "../hooks/useContext";

type AppContext = {
  isLoggedIn: boolean;
  userInfo: {
    userId: string;
    userRole: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

type AppContextProviderProps = {
  children: React.ReactNode;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const { isError, userInfo } = useContextData();

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        userInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
