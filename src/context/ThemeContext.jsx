import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

const validThemes = ["light", "dark"];

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("appTheme");
    return validThemes.includes(stored) ? stored : "light";
  }
  return "light";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("appTheme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
