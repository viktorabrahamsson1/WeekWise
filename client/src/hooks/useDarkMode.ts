import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    const storedPreference = localStorage.getItem("isDarkMode");
    return storedPreference ? JSON.parse(storedPreference) : false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("isDarkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("isDarkMode", "false");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleDarkMode };
};
