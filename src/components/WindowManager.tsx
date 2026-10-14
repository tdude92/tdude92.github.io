import React, { createContext, useCallback, useState } from "react";
import { App, FolderApp } from "@/apps";
import TerminalData from "@/TerminalData";

// Must match the window size in Window.module.css.
const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 450;

// New windows are staggered so the ones underneath stay clickable.
const CASCADE_OFFSET = 36;
const CASCADE_STEPS = 6;

interface BaseWindowState {
  id: string;
  x: number;
  y: number;
  z: number;
}

export interface TerminalWindowState extends BaseWindowState {
  kind: "terminal";
  data: TerminalData;
}

export interface ExplorerWindowState extends BaseWindowState {
  kind: "explorer";
  // Folders from the root down to the one being shown.
  path: FolderApp[];
}

export type WindowState = TerminalWindowState | ExplorerWindowState;

type WindowContent =
  | Pick<TerminalWindowState, "kind" | "data">
  | Pick<ExplorerWindowState, "kind" | "path">;

/* eslint-disable @typescript-eslint/no-unused-vars */
const defaultContext = {
  windows: [] as WindowState[],
  // `parentPath` is the folder chain the app was opened from.
  openApp: (_app: App, _parentPath: FolderApp[]) => {},
  closeWindow: (_id: string) => {},
  focusWindow: (_id: string) => {},
  navigate: (_id: string, _path: FolderApp[]) => {},
};
/* eslint-enable @typescript-eslint/no-unused-vars */

export const WindowContext = createContext(defaultContext);

const nextZ = (windows: WindowState[]) =>
  Math.max(0, ...windows.map((w) => w.z)) + 1;

type WindowManagerProps = {
  children: React.ReactNode;
};

export default function WindowProvider({ children }: WindowManagerProps) {
  // Starts empty so the server-rendered page has no windows: their position
  // depends on the viewport size, which is only known in the browser.
  const [windows, setWindows] = useState<WindowState[]>([]);

  const openApp = useCallback((app: App, parentPath: FolderApp[]) => {
    setWindows((windows) => {
      const content: WindowContent =
        app.type === "folder"
          ? { kind: "explorer", path: [...parentPath, app] }
          : { kind: "terminal", data: app.terminal() };
      const z = nextZ(windows);

      const existing = windows.find((w) => w.id === app.id);
      if (existing) {
        // Already open: bring it to the front instead of opening a copy.
        const { id, x, y } = existing;
        return windows.map((w) =>
          w.id === id ? { id, x, y, z, ...content } : w
        );
      }

      const offset = (windows.length % CASCADE_STEPS) * CASCADE_OFFSET;
      const x = Math.max(0, (window.innerWidth - WINDOW_WIDTH) / 2) + offset;
      const y = Math.max(0, (window.innerHeight - WINDOW_HEIGHT) / 2) + offset;
      return [...windows, { id: app.id, x, y, z, ...content }];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((windows) => windows.filter((w) => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((windows) => {
      const z = nextZ(windows);
      const target = windows.find((w) => w.id === id);
      if (!target || target.z === z - 1) {
        return windows;
      }
      return windows.map((w) => (w.id === id ? { ...w, z } : w));
    });
  }, []);

  const navigate = useCallback((id: string, path: FolderApp[]) => {
    setWindows((windows) =>
      windows.map((w) =>
        w.id === id && w.kind === "explorer" ? { ...w, path } : w
      )
    );
  }, []);

  return (
    <WindowContext.Provider
      value={{ windows, openApp, closeWindow, focusWindow, navigate }}
    >
      {children}
    </WindowContext.Provider>
  );
}
