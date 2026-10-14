import React, { createContext, useCallback, useState } from "react";
import { App, FolderApp, TerminalApp } from "@/apps";

// Must match the window size in Window.module.css.
const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 450;

export const TASKBAR_HEIGHT = 48;

// New windows are staggered so the ones underneath stay clickable.
const CASCADE_OFFSET = 36;
const CASCADE_STEPS = 6;

interface BaseWindowState {
  id: string;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
}

export interface TerminalWindowState extends BaseWindowState {
  kind: "terminal";
  app: TerminalApp;
}

export interface ExplorerWindowState extends BaseWindowState {
  kind: "explorer";
  // Folders from the root down to the one being shown.
  path: FolderApp[];
}

export type WindowState = TerminalWindowState | ExplorerWindowState;

type WindowContent =
  | Pick<TerminalWindowState, "kind" | "app">
  | Pick<ExplorerWindowState, "kind" | "path">;

// The app a window is showing, for its name and icon.
export const windowApp = (w: WindowState): App =>
  w.kind === "explorer" ? w.path[w.path.length - 1] : w.app;

// The frontmost window that isn't minimized.
export const activeWindowId = (windows: WindowState[]) =>
  windows
    .filter((w) => !w.minimized)
    .reduce<
      WindowState | undefined
    >((a, w) => (a && a.z > w.z ? a : w), undefined)?.id;

/* eslint-disable @typescript-eslint/no-unused-vars */
const defaultContext = {
  windows: [] as WindowState[],
  // `parentPath` is the folder chain the app was opened from.
  openApp: (_app: App, _parentPath: FolderApp[]) => {},
  closeWindow: (_id: string) => {},
  minimizeWindow: (_id: string) => {},
  focusWindow: (_id: string) => {},
  // Restores and focuses the window, or minimizes it if it's already active.
  toggleWindow: (_id: string) => {},
  navigate: (_id: string, _path: FolderApp[]) => {},
};
/* eslint-enable @typescript-eslint/no-unused-vars */

export const WindowContext = createContext(defaultContext);

const nextZ = (windows: WindowState[]) =>
  Math.max(0, ...windows.map((w) => w.z)) + 1;

const update = (
  windows: WindowState[],
  id: string,
  change: Partial<BaseWindowState>
) => windows.map((w) => (w.id === id ? { ...w, ...change } : w));

// Brings a window to the front, restoring it if it was minimized.
const raise = (windows: WindowState[], id: string) =>
  update(windows, id, { z: nextZ(windows), minimized: false });

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
          : { kind: "terminal", app };

      if (windows.some((w) => w.id === app.id)) {
        // Already open: bring it to the front instead of opening a copy.
        return raise(windows, app.id).map((w) =>
          w.id === app.id ? { ...w, ...content } : w
        );
      }

      const offset = (windows.length % CASCADE_STEPS) * CASCADE_OFFSET;
      const desktopHeight = window.innerHeight - TASKBAR_HEIGHT;
      const x = Math.max(0, (window.innerWidth - WINDOW_WIDTH) / 2) + offset;
      const y = Math.max(0, (desktopHeight - WINDOW_HEIGHT) / 2) + offset;
      const z = nextZ(windows);
      return [
        ...windows,
        { id: app.id, x, y, z, minimized: false, ...content },
      ];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((windows) => windows.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((windows) => update(windows, id, { minimized: true }));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows((windows) =>
      activeWindowId(windows) === id ? windows : raise(windows, id)
    );
  }, []);

  const toggleWindow = useCallback((id: string) => {
    setWindows((windows) =>
      activeWindowId(windows) === id
        ? update(windows, id, { minimized: true })
        : raise(windows, id)
    );
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
      value={{
        windows,
        openApp,
        closeWindow,
        minimizeWindow,
        focusWindow,
        toggleWindow,
        navigate,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}
