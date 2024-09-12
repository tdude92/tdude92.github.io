import { createContext, useState } from "react";

import { LIGHT_MODE, Theme } from "@/util/Theme";

type ThemeContextProps = {
  children: React.ReactNode;
};

const defaultContext = {
  theme: LIGHT_MODE,
  setTheme: (_: Theme) => {},
};

export const ThemeContext = createContext(defaultContext);

export function ThemeProvider({ children }: ThemeContextProps) {
  const [theme, setTheme] = useState(LIGHT_MODE);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
