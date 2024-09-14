import React, { createContext, useState } from "react";
import TerminalData from "./view/Terminal/TerminalData";
import AboutMe from "./view/Terminal/TerminalData/AboutMe";

type WindowManagerProps = {
  children: React.ReactNode;
};

const defaultContext = {
  windows: [AboutMe()],
  setWindows: (_: TerminalData[]) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
};

export const WindowContext = createContext(defaultContext);

export default function WindowProvider({ children }: WindowManagerProps) {
  const [windows, setWindows] = useState<TerminalData[]>(
    defaultContext.windows
  );
  return (
    <WindowContext.Provider value={{ windows, setWindows }}>
      {children}
    </WindowContext.Provider>
  );
}
