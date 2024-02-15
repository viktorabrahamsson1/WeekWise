import { useState } from "react";
import { useLocation } from "react-router";

export const useActiveLink = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleSetActiveLink = (pathName: string) => {
    setActiveLink(pathName);
  };

  return { activeLink, handleSetActiveLink };
};
