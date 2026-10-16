import { createContext, useCallback, useState } from "react";

import { DARK_MODE, LIGHT_MODE } from "@/util/Theme";

type ThemeProviderProps = {
  children: React.ReactNode;
};

const defaultContext = {
  theme: LIGHT_MODE,
  toggleTheme: () => {},
};

export const ThemeContext = createContext(defaultContext);

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(defaultContext.theme);

  const toggleTheme = useCallback(() => {
    setTheme((theme) => (theme === DARK_MODE ? LIGHT_MODE : DARK_MODE));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
