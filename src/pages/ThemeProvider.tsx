import { createContext, useState } from "react";

import { DARK_MODE, Theme } from "@/util/Theme";

type ThemeContextProps = {
  children: React.ReactNode;
};

const defaultContext = {
  theme: DARK_MODE,
  setTheme: (_: Theme) => {},
};

export const ThemeContext = createContext(defaultContext);

export function ThemeProvider({ children }: ThemeContextProps) {
  const [theme, setTheme] = useState(defaultContext.theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
