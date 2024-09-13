import { createContext, useState } from "react";

import { LIGHT_MODE, Theme } from "@/util/Theme";

type ThemeContextProps = {
  children: React.ReactNode;
};

const defaultContext = {
  theme: LIGHT_MODE,
  setTheme: (_: Theme) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
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
